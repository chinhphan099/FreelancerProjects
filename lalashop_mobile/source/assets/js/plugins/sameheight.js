/**
 *  @name equal
 *  @description Equal height of blocks on row
 *  @version 1.0
 *  @options
 *    parent: '[data-parent]'
 *    child: '[data-child]'
 *  @events
 *    Réize
 *  @methods
 *    init
 *    initialize
 *    checkImgLoad
 *    setSameHeight
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'equal',
    win = $(window),
    resize = ('onorientationchange' in window) ? 'orientationchange.resize' + pluginName : 'resize.resize' + pluginName;

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      this.parent = this.element.find(this.options.parent);
      this.childs = this.element.find(this.options.child);

      this.initialize();
    },
    initialize: function() {
      if(this.element.find('img').length) {
        this.checkImgLoad();
      }
      else {
        this.setSameHeight();
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
              $.isFunction(that.setSameHeight) && that.setSameHeight();
            }
          })
          .error(function() {
            ++imagesLoaded;
            if (imagesLoaded === totalImages) {
              $.isFunction(that.setSameHeight) && that.setSameHeight();
            }
          });
      });
    },
    setSameHeight: function() {
      var perRow = Math.floor(this.element.width() / this.parent.width());

      this.parent.css('height', 'auto');
      this.childs.css('height', 'auto');

      if(perRow > 1) {
        for(var i = 0, n = this.parent.length; i < n; i += perRow) {
          var itemPerRow = this.parent.slice(i, i + perRow),
            totalPerRow = itemPerRow.length,
            child = '',
            maxHeight = 0,
            idx = 0,
            obj = {};

          itemPerRow.each(function(index) {
            idx = index;
            $(this).find('[data-child]').each(function() {
              child = $(this).attr('data-child');
              if(index % totalPerRow === 0 || obj[child] === undefined) {
                obj[child] = 0;
              }
              obj[child] = Math.max(obj[child], $(this).outerHeight());
            });
          });

          if(idx === totalPerRow - 1) {
            itemPerRow.each(function() {
              for (var key in obj) {
                $(this).find('[data-child="' + key + '"]').css('height', obj[key]);
              }
              maxHeight = Math.max(maxHeight, $(this).outerHeight());
            });

            if(this.options[pluginName] !== 'no4parent') {
              itemPerRow.css('height', maxHeight);
            }
          }
        }
      }
    },
    destroy: function() {
      this.parent.css('height', 'auto');
      this.childs.css('height', 'auto');
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
    parent: '[data-parent]',
    child: '[data-child]'
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
    win.off(resize).on(resize, function() {
      $('[data-' + pluginName + ']')[pluginName]('initialize');
    });
  });

}(jQuery, window));
