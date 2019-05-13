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

  var pluginName = 'upload';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
        avt = $(that.options[pluginName]).attr('src');

      this.element.off('change.changeFile').on('change.changeFile', function() {
        if(this.files[0]) {
          if(that.validFileSizeAndType(this)) {
            that.showThumbnail(this.files[0]);
          }
        }
        else {
          $(that.options[pluginName]).attr('src', avt);
        }
      });
    },
    validFileSizeAndType: function(file) {
      if(file.files[0] === undefined) {
        return false;
      }
      if(!(/\.(jpg|jpeg|png|tiff|tif|pdf)$/i).test(file.files[0].name)) {
        return false;
      }
      // if(file.files[0].size > 1048576) {
      //   return false;
      // }
      return true;
    },
    showThumbnail: function(file) {
      var img = $(this.options[pluginName]),
        reader = new FileReader();

      reader.onload = function(e) {
        img.attr('src', e.target.result);
      };
      reader.readAsDataURL(file);
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

  $.fn[pluginName].defaults = {};

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
