/**
 *  @name expand
 *  @description description
 *  @version 1.0
 *  @options
 *    handle: '[data-handle]'
 *    content: '[data-content]'
 *  @events
 *    Handle click
 *    Document click
 *  @methods
 *    init
 *    initialized
 *    listener
 *    expandContent
 *    close
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';
  var pluginName = 'expand',
    win = $(window),
    resize = ('onorientationchange' in window) ? 'orientationchange.resize' + pluginName : 'resize.resize' + pluginName;

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      this.activeEl = this.element.find(this.options.activeEl);
      this.handles = this.element.find(this.options.handle);
      this.contents = this.element.find(this.options.content);
      this.activeContent = this.contents.not(':hidden').length ? this.contents.not(':hidden') : [];
      this.duration = this.options.duration;
      this.isAnimating = false;

      this.initialized();
      this.listener();
    },
    initialized: function() {
      this.expandContent(this.element.find('[data-init]'));

      if(!!this.element.data('breakpoint')) {
        if(win.width() <= $('[data-breakpoint]').data('breakpoint')) {
          this.options[pluginName] = '';
        }
        else {
          this.options[pluginName] = 'noClose';
        }
      }
    },
    listener: function() {
      var that = this;

      this.handles.off('click.changeTab' + pluginName).on('click.changeTab' + pluginName, function(e) {
        var handle = $(this).closest(that.element).find('[data-handle="' + $(this).data('handle') + '"]');

        e.preventDefault();
        e.stopPropagation();

        if(!that.isAnimating) {
          that.expandContent(handle);
        }
      });

      that.contents.off('click.closeTab' + pluginName, '[data-close]').on('click.closeTab' + pluginName, '[data-close]', function(e) {
        e.preventDefault();
        if(!that.isAnimating) {
          if(that.activeContent.find('[data-' + pluginName + ']').find(that.options.content).not(':hidden').length) {
            console.log('Close child Tabs - Button Close click');
            that.activeContent.find('[data-' + pluginName + ']')[pluginName]('close');
          }

          console.log('Close current tab');
          $(this).closest('[data-' + pluginName + ']')[pluginName]('close');
        }
        return false;
      });

      win.off(resize).on(resize, function() {
        $('[data-' + pluginName + ']').filter('[data-breakpoint]').each(function() {
          if(win.width() <= $(this).data('breakpoint')) {
            $(this).data(pluginName).options[pluginName] = '';
          }
          else {
            $(this).data(pluginName).options[pluginName] = 'noClose';
          }
        });
      });
    },
    expandContent: function(handle) {
      var that = this,
        content = handle.closest(this.element).find('[data-content="' + handle.data('handle') + '"]');

      if(content.length) {
        // If has active content
        if(this.activeContent.length) {
          // Handle content is difference with active content
          if(this.activeContent[0] !== content[0]) {
            if(this.activeContent.find('[data-' + pluginName + ']').find(this.options.content).not(':hidden').length) {
              console.log('close all Child');
              this.activeContent.find('[data-' + pluginName + ']')[pluginName]('close');
            }

            this.isAnimating = true;
            console.log('Change Tab');
            this.activeEl.removeClass('active');
            $.isFunction(that.options.expandingTab) && that.options.expandingTab();
            this.activeContent.removeClass('active').slideUp(this.duration, function() {
              handle.closest(that.activeEl).addClass('active');
              $.isFunction(that.options.afterClose) && that.options.afterClose();

              content.addClass('active').slideDown(this.duration, function() {
                that.isAnimating = false;
                that.activeContent = content;
                $.isFunction(that.options.afterOpen) && that.options.afterOpen();
              });
            });
          }
          // Handle content is the same with active content
          else if(this.options[pluginName] !== 'noClose') {
            if(this.activeContent.find('[data-' + pluginName + ']').find(this.options.content).not(':hidden').length) {
              console.log('Close child Tabs - Tab click');
              this.activeContent.find('[data-' + pluginName + ']')[pluginName]('close');
            }

            console.log('Close current tab');
            this.isAnimating = true;
            handle.closest(this.options.activeEl).removeClass('active');
            $.isFunction(that.options.closingTab) && that.options.closingTab();

            this.activeContent.removeClass('active').slideUp(this.duration, function() {
              that.isAnimating = false;
              that.activeContent = [];
              $.isFunction(that.options.afterClose) && that.options.afterClose();
            });
          }
        }
        else {
          console.log('First open');
          this.isAnimating = true;

          handle.closest(this.activeEl).addClass('active');
          $.isFunction(that.options.expandingTab) && that.options.expandingTab();

          content.addClass('active').slideDown(this.duration, function() {
            that.isAnimating = false;
            that.activeContent = content;
            $.isFunction(that.options.afterOpen) && that.options.afterOpen();
          });
        }
      }
    },
    close: function() {
      var that = this;

      this.isAnimating = true;
      this.activeEl.removeClass('active');
      $.isFunction(that.options.closingTab) && that.options.closingTab();
      this.activeContent.removeClass('active').slideUp(function() {
        that.isAnimating = false;
        that.activeContent = [];
        $.isFunction(that.options.afterClose) && that.options.afterClose();
      });
    },
    destroy: function() {
      this.handles.off('click.changeTab' + pluginName);
      this.contents.off('click.closeTab' + pluginName, '[data-close]');
      win.off(resize);
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
    handle: '[data-handle]',
    content: '[data-content]',
    activeEl: '[data-active]',
    duration: 300,
    expandingTab: $.noop,
    afterOpen: $.noop,
    closingTab: $.noop,
    afterClose: $.noop
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({
      expandingTab: function() {
        console.log('expandingTab');
      },
      afterOpen: function() {
        console.log('afterOpen');
      },
      closingTab: function() {
        console.log('closingTab');
      },
      afterClose: function() {
        console.log('afterClose');
      }
    });
  });

}(jQuery, window));
