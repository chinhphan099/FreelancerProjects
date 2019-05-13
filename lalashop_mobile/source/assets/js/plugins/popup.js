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

  var pluginName = 'popup',
    html = $('html');

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
        contentSlider = this.element.find('.slick-wrap').html();

      this.element.off('click.showpopup', '.details-main-slider img').on('click.showpopup', '.details-main-slider img', function(e) {
        var idPopup = $(e.delegateTarget).data(pluginName).options[pluginName];
        if(!!idPopup) {
          that.renderData(idPopup, contentSlider);
        }
      });
      $('[data-popup="close"]').off('click.closePopup').on('click.closePopup', function() {
        var id = '#' + $(this).closest('.popup').attr('id');
        that.closePopup(id);
      });
    },
    renderData: function(idPopup, contentSlider) {
      var renderContent =
          '<div data-slider="{&quot;type&quot;: &quot;syncing&quot;, &quot;navFor&quot;: &quot;.slider-nav&quot;, &quot;view&quot;: &quot;true&quot;}" class="slick-wrap slider-thumb">' +
            contentSlider +
          '</div>' +
          '<div data-slider="{&quot;type&quot;: &quot;syncing&quot;, &quot;navFor&quot;: &quot;.slider-thumb&quot;}" class="slick-wrap slider-nav">' +
            contentSlider +
          '</div>';

      $('.popup-slider .main .relative').html(renderContent);
      this.showPopup(idPopup);
    },
    showPopup: function(idPopup) {
      $(idPopup).fadeIn('fast', function() {
        $(idPopup).find('[data-slider]').slider('init');
      });
      html.addClass('show-popup-slider');
    },
    closePopup: function(idPopup) {
      $(idPopup).fadeOut();
      $(idPopup).find('[data-slider]').slider('destroy');
      $(idPopup).find('.relative').empty();
      html.removeClass('show-popup-slider');
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
    key: 'value',
    onCallback: null
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
