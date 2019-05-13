/**
 *  @name comment
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

  var pluginName = 'comment';
  var validator = function(formId) {
    $('#' + formId).validate({
      rules: {
        txt_name: {required: true},
        txt_title: {required: true},
        txt_comment: {required: true}
      },
      messages: {
        txt_name: L10n.validateMess.required,
        txt_title: L10n.validateMess.required,
        txt_comment: L10n.validateMess.required
      },
      errorElement: 'p',
      highlight: function(element) {
        $(element).addClass('error').closest('fieldset').addClass('errors');
      },
      unhighlight: function(element) {
        $(element).removeClass('error').closest('fieldset').removeClass('errors');
      }
    });
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      this.formId = this.options[pluginName];
      validator.call(this, this.formId);
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
    $('[data-' + pluginName + ']').on('customEvent', function() {});
  });

}(jQuery, window));
