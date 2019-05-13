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
          }
          else {
            navFor['asNavFor'] = this.options[pluginName].navFor;
            option = $.extend(this.options.sycingThumb, navFor);
          }
          this.element.slick(option);
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
      var arrowControl = this.element.find('.slick-arrow'),
        imgVisible = this.element.find('[aria-hidden="false"] .img-view'),
        maxHeight = 0,
        posTop = 0;

      $(imgVisible).each(function() {
        maxHeight = Math.max($(this).height(), maxHeight);
      });

      posTop = (maxHeight / 2) - (arrowControl.outerHeight(true) / 2);
      arrowControl.animate({'top': posTop}, 300);
    },
    destroy: function() {
      this.element
        .slick('unslick')
        .off('afterChange.' + pluginName);
      win.off(resize);
      $.removeData(this.element[0], pluginName);
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
      arrows: true,
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      rtl: $('html').attr('dir') === 'rtl' ? true : false
    },
    carousel: {
      arrows: false,
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 3,
      rtl: $('html').attr('dir') === 'rtl' ? true : false,
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
    centerMode: {
      centerMode: true,
      centerPadding: '50px',
      slidesToShow: 3,
      focusOnSelect: true,
      rtl: $('html').attr('dir') === 'rtl' ? true : false,
    },
    sycingView: {
      arrows: true,
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      focusOnSelect: true,
      rtl: $('html').attr('dir') === 'rtl' ? true : false
    },
    sycingThumb: {
      arrows: true,
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: 0,
      focusOnSelect: true,
      autoplay: true,
      autoplaySpeed: 3000,
      rtl: $('html').attr('dir') === 'rtl' ? true : false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }
      ]
    },
    variableWidth: {
      arrows: true,
      dots: true,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 6,
      variableWidth: true
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
