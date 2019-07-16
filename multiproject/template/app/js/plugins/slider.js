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
 *    slickPause
 *    slickPlay
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'cslider',
    timeResize,
    win = $(window),
    resize = ('onorientationchange' in window) ? 'orientationchange.resize' + pluginName : 'resize.resize' + pluginName,
    TypeSliders = {
      SINGLE: 'single',
      CAROUSEL: 'carousel',
      CENTERMODE: 'centerMode',
      VARIABLEWIDTH: 'variableWidth',
      VERTICAL: 'vertical',
      SYNCING: 'syncing'
    };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options, this.element.data(pluginName));
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      this.handle = this.element.find(this.options.handle);
      if(this.handle.is(':visible')) {
        if(this.options.initUnder) {
          if(win.width() <= this.options.initUnder) {
            this.handle.removeClass('no-slide');
            this.initialize();
          }
          else {
            this.handle.addClass('no-slide');
          }
        }
        else {
          this.initialize();
        }

        win.on(resize, function() {
          if(timeResize) {
            clearTimeout(timeResize);
          }
          timeResize = setTimeout(function() {
            $('[data-' + pluginName + ']').each(function() {
              if($('.slick', this).is(':visible')) {
                if($(this).data()[pluginName].options[pluginName].initUnder) {
                  if(win.width() < $(this).data()[pluginName].options[pluginName].initUnder) {
                    $('.slick', this).removeClass('no-slide');
                    if(!$('.slick', this).hasClass('slick-initialized')) {
                      $(this)[pluginName]('initialize');
                    }
                    else {
                      $(this)[pluginName]('setPositionArrows');
                    }
                  }
                  else if($('.slick', this).hasClass('slick-initialized')) {
                    $('.slick', this).addClass('no-slide');
                    $(this)[pluginName]('destroy');
                  }
                }
                else {
                  $(this)[pluginName]('setPositionArrows');
                  $(this)[pluginName]('slickNoSlide');

                  // Just only have on Resize event.
                  if($('.slick', this).hasClass('no-slide')) {
                    $(this)[pluginName]('destroy');
                    $(this)[pluginName]('init');
                  }
                }
              }
            });
          }, 600);
        });
      }
    },
    initialize: function() {
      if(this.element.find('img').length) {
        this.checkImgLoad();
      }
      else {
        this.initSlider();
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
              that.initSlider();
            }
          })
          .error(function() {
            ++imagesLoaded;
            if (imagesLoaded === totalImages) {
              that.initSlider();
            }
          });
      });
    },
    initSlider: function() {
      var that = this,
        option,
        navFor = {};

      this.handle.on('init.' + pluginName, function(event, slick) {
        that.onInitSlick(event, slick);
      });

      switch(this.options.type) {
        case TypeSliders.SINGLE:
          this.handle.slick(this.options.singleSlider);
          break;
        case TypeSliders.CAROUSEL:
          this.handle.slick(this.options.carousel);
          break;
        case TypeSliders.CENTERMODE:
          this.handle.slick(this.options.centerMode);
          break;
        case TypeSliders.VARIABLEWIDTH:
          this.handle.slick(this.options.variableWidth);
          break;
        case TypeSliders.VERTICAL:
          this.handle.slick(this.options.vertical);
          break;
        case TypeSliders.SYNCING:
          if(this.options.view) {
            navFor.asNavFor = this.options.navFor;
            option = $.extend(this.options.sycingView, navFor);
          }
          else {
            navFor.asNavFor = this.options.navFor;
            option = $.extend(this.options.sycingThumb, navFor);
          }
          this.handle.slick(option);
          break;
        default:
          this.handle.slick(this.options.singleSlider);
      }

      this.handle.on('afterChange.' + pluginName, function() {
        that.setPositionArrows();
      });
      this.hoverBulletEvent();
      this.setPositionArrows();
      this.slickNoSlide();
    },
    onInitSlick: function(event, slick) {
      console.log(event, slick);
    },
    hoverBulletEvent: function() {
      if(this.options[pluginName].hoverOnSlide) {
        this.handle.find('.slick-dots').on('mouseenter.bullet', 'li', function() {
          $(this).trigger('click');
        });
      }
    },
    setPositionArrows: function() {
      var arrowControl = this.handle.find('.slick-arrow'),
        imgVisible = this.handle.find('[aria-hidden="false"] .img-view'),
        maxHeight = 0,
        posTop = 0;

      $(imgVisible).each(function() {
        maxHeight = Math.max($(this).height(), maxHeight);
      });
      posTop = (maxHeight / 2) - (arrowControl.outerHeight() / 2);
      arrowControl.animate({'top': posTop}, 300);
    },
    slickNoSlide: function() {
      var getSlick = this.handle.slick('getSlick');

      if(getSlick.slideCount <= getSlick.options.slidesToShow) {
        this.element.addClass('no-slide');
      }
      else {
        this.element.removeClass('no-slide');
      }
    },
    slickPause: function() {
      this.handle.slickPause();
    },
    slickPlay: function() {
      this.handle.slickPlay();
    },
    destroy: function() {
      this.handle
        .slick('unslick')
        .off('afterChange.' + pluginName);
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
    handle: '.slick',
    singleSlider: {
      arrows: true,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      accessibility: false, // Disable Slide go to top on after change
      rtl: $('html').attr('dir') === 'rtl' ? true : false
    },
    carousel: {
      arrows: true,
      dots: true,
      infinite: true,
      speed: 600,
      slidesToShow: 9,
      slidesToScroll: 9,
      // autoplay: true,
      // autoplaySpeed: 3000,
      rtl: $('html').attr('dir') === 'rtl' ? true : false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 544,
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
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            centerPadding: '25%'
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerPadding: 0
          }
        }
      ]
    },
    sycingView: {
      arrows: true,
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      focusOnSelect: true,
      rtl: $('html').attr('dir') === 'rtl' ? true : false
    },
    sycingThumb: {
      arrows: true,
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow: 5,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: 0,
      focusOnSelect: true,
      // autoplay: true,
      // autoplaySpeed: 3000,
      rtl: $('html').attr('dir') === 'rtl' ? true : false,
      responsive: [
        {
          breakpoint: 1024,
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
      speed: 600,
      variableWidth: true,
      infinite: true
    },
    vertical: {
      vertical: true,
      verticalSwiping: true,
      slidesToShow: 1,
      slidesToScroll: 1
    }
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
