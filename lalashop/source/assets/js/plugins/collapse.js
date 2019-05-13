/**
 *  @name plugin
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

  var pluginName = 'collapse';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
        el = this.element,
        disScroll = true,
        handle = this.element.data(pluginName);

      el.off('click.' + pluginName).on('click.' + pluginName, function(e) {
        e.preventDefault();
        that.collapse(handle);
      });

      if(Detectizr.device.type !== 'mobile') {
        $(window).off('scroll.' + pluginName).on('scroll.' + pluginName, function() {
          if($(this).scrollTop() === 0) {
            if(!el.hasClass('active')) {
              that.collapse(handle);
            }
            disScroll = true;
          }
          else if(disScroll && el.hasClass('active')) {
            that.collapse(handle);
            disScroll = false;
          }
        });
      }
    },
    collapse: function(handle) {
      this.element.toggleClass(this.options.activeCls);
      $(handle).toggleClass(this.options.showingCls);
      this.element.trigger('collapse');
    },
    destroy: function() {
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
    showingCls: 'showing',
    activeCls: 'active'
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
