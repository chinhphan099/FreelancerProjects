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

  var pluginName = 'star';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      this.star = this.options[pluginName];
      this.setActive(this.star);
      this.element.off('click.star', '.icon-star').on('click.star', '.icon-star', function(e) {
        if($(e.delegateTarget).data('clickable')) {
          var text = $(this).find('input').val();
          $(e.delegateTarget).next('.count').html(text);
          $(this).addClass('active').siblings().removeClass('active');
          $(this).prevAll().addClass('active');
        }
      });
    },
    setActive: function(index) {
      if(index > 0) {
        var iconStar = this.element.find('.icon-star').eq(index - 1),
          getValue = iconStar.find('input').val();

        iconStar.addClass('active').prevAll().addClass('active');
        this.element.next('.count').html(getValue);
      }
    },
    destroy: function() {
      this.fileInput.off('click.' + pluginName);
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
  };

  $(function() {
    $('[data-' + pluginName + ']').on('customEvent', function() {
      // to do
    });

    $('[data-' + pluginName + ']')[pluginName]({
      key: 'custom'
    });
  });

}(jQuery, window));
