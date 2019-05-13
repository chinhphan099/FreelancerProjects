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

  var pluginName = 'validates';
  var getRules = function(formId) {
    var rules = {};
    switch (formId) {
      case 'comment_form':
        rules = $.extend(rules, {
          txt_name: {required: true},
          txt_title: {required: true},
          txt_comment: {required: true},
        });
        break;
      case 'forgot_frm':
        rules = $.extend(rules, {
          txt_username: {required: true}
        });
        break;
      case 'login_frm':
        rules = $.extend(rules, {
          txt_username: {required: true},
          txt_password: {required: true}
        });
        break;
      case 'signup_frm':
        rules = $.extend(rules, {
          txt_username_1: {required: true},
          txt_password_1: {required: true},
          txt_name_1: {required: true}
        });
        break;
      case 'register_frm':
        rules = $.extend(rules, {
          txt_last_name: {required: true},
          txt_first_name: {required: true},
          txt_email: {
            required: true,
            email: true,
            cemail: true
          },
          txt_phone: {required: true},
          txt_pass: {required: true},
          txt_pass_2: {
            required: true,
            equalTo: '#txt_pass'
          },
          txt_dob: {required: true},
          gender_sb: {required: true}
        });
        break;
      case 'account_info_frm':
        rules = $.extend(rules, {
          txt_email: {required: true},
          txt_name: {required: true},
          txt_tel: {required: true},
          txt_date: {required: true}
        });
        break;
      case 'add_address_frm':
        rules = $.extend(rules, {
          txt_name: {required: true},
          txt_address: {required: true},
          txt_city: {required: true},
          txt_district: {required: true},
          txt_ward: {required: true},
          txt_phone: {required: true}
        });
        break;
      default:
    }
    return rules;
  },
  messages = function(formId) {
    var messages = {};
    switch (formId) {
      case 'comment_form':
        messages = $.extend(messages, {
          txt_name: {required: L10n.validateMess.required},
          txt_title: {required: L10n.validateMess.required},
          txt_comment: {required: L10n.validateMess.required}
        });
        break;
      case 'forgot_frm':
        messages = $.extend(messages, {
          txt_username: {required: L10n.validateMess.required}
        });
        break;
      case 'login_frm':
        messages = $.extend(messages, {
          txt_username: {required: L10n.validateMess.required},
          txt_password: {required: L10n.validateMess.required}
        });
        break;
      case 'signup_frm':
        messages = $.extend(messages, {
          txt_username_1: {required: L10n.validateMess.required},
          txt_password_1: {required: L10n.validateMess.required},
          txt_name_1: {required: L10n.validateMess.required}
        });
        break;
      case 'register_frm':
        messages = $.extend(messages, {
          txt_last_name: {required: L10n.validateMess.required},
          txt_first_name: {required: L10n.validateMess.required},
          txt_email: {
            required: L10n.validateMess.required,
            email: L10n.validateMess.cemail,
            cemail: L10n.validateMess.cemail
          },
          txt_phone: {required: L10n.validateMess.required},
          txt_pass: {required: L10n.validateMess.required},
          txt_pass_2: {
            required: L10n.validateMess.required,
            equalTo: L10n.validateMess.equalToPass
          },
          txt_dob: {required: L10n.validateMess.required},
          gender_sb: {required: L10n.validateMess.required}
        });
        break;
      case 'account_info_frm':
        messages = $.extend(messages, {
          txt_email: {required: L10n.validateMess.required},
          txt_name: {required: L10n.validateMess.required},
          txt_tel: {required: L10n.validateMess.required},
          txt_date: {required: L10n.validateMess.required}
        });
        break;
      case 'add_address_frm':
        messages = $.extend(messages, {
          txt_name: {required: L10n.validateMess.required},
          txt_address: {required: L10n.validateMess.required},
          txt_city: {required: L10n.validateMess.required},
          txt_district: {required: L10n.validateMess.required},
          txt_ward: {required: L10n.validateMess.required},
          txt_phone: {required: L10n.validateMess.required}
        });
        break;
      default:
    }
    return messages;
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      this.formId = this.options[pluginName];
      $('#' + this.formId).validate({
        rules: getRules.call(that, that.formId),
        messages: messages.call(that, that.formId),
        errorElement: 'p',
        highlight: function(element) {
          $(element).addClass('error').closest('fieldset').addClass('errors');
        },
        unhighlight: function(element) {
          $(element).removeClass('error').closest('fieldset').removeClass('errors');
        },
        errorPlacement: function(error, element) {
          if ($(element).is('select')) {
            error.insertAfter(element.closest('.custom-select'));
          }
          else if($(element).attr('type') === 'date') {
            error.insertAfter(element.closest('.custom-date'));
            return false;
          }
          else if($(element).attr('type') === 'file') {
            error.insertAfter(element.closest('.custom-file'));
            return false;
          }
          else if($(element).is(':checkbox')) {
            error.insertAfter(element.closest('.checkbox'));
          }
          else {
            error.insertAfter(element);
          }
        }
      });
    },
    reset: function() {
      $('#' + this.formId).resetForm();
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
