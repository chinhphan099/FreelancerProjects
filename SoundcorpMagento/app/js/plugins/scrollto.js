/**
 *  @name scrollto
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'scrollto',
    html = $('html'),
    win = $(window);

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options, this.element.data(pluginName));
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
        el = this.element,
        destination = this.options.handle,
        initUnder = this.options.initUnder;

      this.toggleShow();
      win.off('scroll.' + pluginName).on('scroll.' + pluginName, function() {
        that.toggleShow();
      });
      el.off('click.' + pluginName).on('click.' + pluginName, function(e) {
        e.preventDefault();
        e.stopPropagation();
        if(win.width() < initUnder && $(destination).length) {
          that.scrollTo(destination);
        }
      });
    },
    toggleShow: function() {
      if(this.options[pluginName].handle === 'body') {
        if(win.scrollTop() > 500) {
          this.element.fadeIn('slow');
        }
        else {
          this.element.fadeOut('slow');
        }
      }
    },
    scrollTo: function(elm) {
      var that = this,
        posTop = $(elm).offset().top;

      if(win.width() > 991) {
        posTop = posTop - 69 - 63;
        if(html.hasClass('openMenu')) {
          posTop -= 42;
        }
        if(html.hasClass('sticky-bag-button')) {
          posTop -= 61;
        }
        if($(elm).attr('id') === 'reviews' && !html.hasClass('sticky-bag-button')) {
          posTop = $(elm).offset().top - (69 + 65);
          if($('.product-wrapper').filter(':not(.gift-card)').length) {
            posTop -= 61;
          }
          if(html.hasClass('openMenu')) {
            posTop = posTop - 42;
          }
          if($('.product-wrapper').filter(':not(.gift-card)').length) {
            $('.add-to-bag-area').height($('.wrap-inner').outerHeight(true));
          }
        }
      }
      else if(win.width() < 767) {
        posTop -= 106;
      }
      else {
        posTop -= 69;
      }
      var scrollTo = !!$(elm).length ? posTop : 0;

      $('html, body').animate({
        scrollTop: scrollTo
      }, that.options.duration, 'easeOutCubic'); // jquery.easing.1.3.js

      win.on(Site.standarTransitionend, function() {
        if(win.width() < 992) {
          if($(elm).attr('id') === 'reviews') {
            $(elm).trigger('click');
          }
        }
        Site.setActiveTabNav();
      });
    },
    destroy: function() {
      this.element.off('click.' + pluginName);
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
    duration: 600,
    initUnder: 9999
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
