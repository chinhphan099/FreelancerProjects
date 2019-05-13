/**
 *  @name slider
 *  @version 1.0
 *  @events
 *    afterChange - Event of Slick slider
 *  @methods
 *    init
 *    initialize
 *    checkImgLoad
 *    initSlider
 *    setPositionArrows
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'slider',
    timeResize,
    win = $(window),
    resize = ('onorientationchange' in window) ? 'orientationchange.resize' + pluginName : 'resize.resize' + pluginName,
    TypeSliders = {
      SINGLE: 'single',
      CAROUSEL: 'carousel',
      CAROUSEL3: 'carousel3',
      CAROUSEL5: 'carousel5',
      CENTERMODE: 'centermode',
      VARIABLEWIDTH: 'variableWidth',
      SYNCING: 'syncing'
    };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      if(this.options[pluginName].initUnder) {
        if(this.options[pluginName].initUnder > win.width()) {
          if(this.element.hasClass('slick-initialized')) {
            this.setPositionArrows();
          }
          else {
            this.initialize();
          }
        }
        else if(this.element.hasClass('slick-initialized')) {
          this.element.slick('unslick');
        }
      }
      else {
        if(this.element.hasClass('slick-initialized')) {
          this.setPositionArrows();
        }
        else {
          this.initialize();
        }
      }
    },
    initialize: function() {
      if(!!this.options[pluginName].initUnder) {
        if(this.options[pluginName].initUnder > win.width()) {
          if(this.element.find('img').length) {
            this.checkImgLoad();
          }
          else {
            this.initSlider();
          }
        }
      }
      else {
        if(this.element.find('img').length) {
          this.checkImgLoad();
        }
        else {
          this.initSlider();
        }
      }
    },
    checkImgLoad: function() {
      var that = this,
        imagesLoaded = 0,
        totalImages = this.element.find('img').length;

      this.element.find('img').each(function() {
        var fakeSrc = $(this).attr('src');

        $('<img />')
          .attr('src', fakeSrc).css('display', 'none')
          .load(function() {
            ++imagesLoaded;
            if (imagesLoaded === totalImages) {
              $.isFunction(that.initSlider) && that.initSlider();
            }
          })
          .error(function() {
            ++imagesLoaded;
            if (imagesLoaded === totalImages) {
              $.isFunction(that.initSlider) && that.initSlider();
            }
          });
      });
    },
    initSlider: function() {
      var that = this,
        option,
        navFor = {};

      switch(this.options[pluginName].type) {
        case TypeSliders.SINGLE:
          this.element.slick(this.options.singleSlider);
          break;
        case TypeSliders.CAROUSEL:
          this.element.slick(this.options.carousel);
          break;
        case TypeSliders.CAROUSEL3:
          this.element.slick(this.options.carousel3);
          break;
        case TypeSliders.CAROUSEL5:
          this.element.slick(this.options.carousel5);
          break;
        case TypeSliders.CENTERMODE:
          this.element.slick(this.options.centerMode);
          break;
        case TypeSliders.VARIABLEWIDTH:
          this.element.slick(this.options.variableWidth);
          break;
        case TypeSliders.SYNCING:
          if(this.options[pluginName].view) {
            navFor['asNavFor'] = this.options[pluginName].navFor;
            option = $.extend(this.options.sycingView, navFor);
            this.element.slick(option);
            $('.slider-thumb').on('beforeChange', function(event,slick,slide,nextSlide) {
              $('.slider-nav').find('.slick-slide').removeClass('slick-current').not('.slick-cloned').eq(nextSlide).addClass('slick-current');
            });
          }
          else {
            navFor['asNavFor'] = this.options[pluginName].navFor;
            option = $.extend(this.options.sycingThumb, navFor);
            this.element.slick(option);
          }
          
          break;
        default:
          //this.element.slick(this.options.singleSlider);
      }

      this.element.on('afterChange.' + pluginName, function() {
        that.setPositionArrows();
      });
      this.setPositionArrows();
    },
    setPositionArrows: function() {
      var getSlick = this.element.slick('getSlick');
      if(this.element.hasClass('slider-nav')) {
        if(getSlick.slideCount <= getSlick.options.slidesToShow) {
          this.element.addClass('slick-no-slide');
        }
        else {
          this.element.removeClass('slick-no-slide');
        }
      }
      var arrowControl = this.element.find('.slick-arrow'),
        imgVisible = this.element.find('[aria-hidden="false"] .img-view'),
        maxHeight = 0,
        posTop = 0;

      $(imgVisible).each(function() {
        maxHeight = Math.max($(this).height(), maxHeight);
      });

      posTop = (maxHeight / 2) - (arrowControl.outerHeight() / 2);
      arrowControl.animate({'top': posTop}, 300);
    },
    destroy: function() {
      this.element
        .slick('unslick')
        .off('afterChange.' + pluginName);
      win.off(resize);
      //$.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    singleSlider: {
      arrows: false,
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1
    },
    carousel: {
      arrows: true,
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    },
    carousel3: {
      arrows: false,
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      variableWidth: true,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }
      ]
    },
    carousel5: {
      arrows: false,
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 7,
      slidesToScroll: 1,
      draggable: false,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1
          }
        }
      ]
    },
    variableWidth: {
      arrows: false,
      dots: false,
      infinite: false,
      speed: 300,
      slidesToScroll: 3,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToScroll: 2
          }
        }
      ]
    },
    sycingView: {
      arrows: false,
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      focusOnSelect: true
    },
    sycingThumb: {
      arrows: false,
      dots: false,
      infinite: true,
      centerMode: true,
      speed: 300,
      slidesToShow: 9,
      slidesToScroll: 1,
      focusOnSelect: true,
      centerPadding: 0,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1
          }
        }
      ]
    }
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
    win.off(resize).on(resize, function() {
      if(timeResize) {
        clearTimeout(timeResize);
      }
      timeResize = setTimeout(function() {
        $('[data-' + pluginName + ']')[pluginName]('init');
      }, 600);
    });
  });

}(jQuery, window));
