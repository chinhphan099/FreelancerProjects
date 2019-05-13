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

  var pluginName = 'menuaim',
    EVENTS = {
      Click: 'click.' + pluginName,
    };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var el = this.element,
        that = this;

      if(Detectizr.device.type !== 'desktop') {
        el.on(EVENTS.Click, '> li > a', function(e) {
          e.stopPropagation();
          e.preventDefault();
          $(this).closest('li').addClass('active').siblings().removeClass('active');
        });

        Site.body.on('click.body touchstart.body', function() {
          $('[data-' + pluginName + ']').find('li').removeClass('active');
        });
      }
      else {
        el.menuAim({
          activate: that.activate,
          deactivate: that.deactivate,
          exitMenu: that.exitMenu
        });
      }
    },
    activate: function(row) {
      $(row).addClass('active');
    },
    deactivate: function(row) {
      $(row).removeClass('active');
    },
    exitMenu: function() {
      $('[data-' + pluginName + ']').find('li').removeClass('active');
      return true;
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

  $.fn[pluginName].defaults = {};

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
