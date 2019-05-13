/**
 *  @name expand(both Tabs & Accordion)
 *  @version 1.0
 *  @author: Phan Chinh
 *  @options
 *    handle: '[data-handle]'
 *    content: '[data-content]'
 *    activeEl: '[data-active]'
 *    initEl: '[data-init]'
 *    closeEl: '[data-close]'
 *    duration: 300
 *    beforeOpen: $.noop
 *    afterOpen: $.noop
 *    beforeClose: $.noop
 *    afterClose: $.noop
 *  @events
 *    Handle click
 *    CloseEl click
 *    Window resize
 *  @methods
 *    init
 *    initialized
 *    listener
 *    close
 *    destroy
 */

;(function($, window, undefined) {
  'use strict';
  var pluginName = 'expand',
    win = $(window),
    html = $('html'),
    resize = ('onorientationchange' in window) ? 'orientationchange.resize' + pluginName : 'resize.resize' + pluginName;

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options, this.element.data(pluginName));
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      this.activeEl = this.element.find(this.options.activeEl);
      this.handles = this.element.find(this.options.handle);
      this.initEl = this.element.find(this.options.initEl);
      this.contents = this.element.find(this.options.content);
      this.activeContent = [];
      this.closeEl = this.options.closeEl;
      this.duration = this.options[pluginName].duration ? this.options[pluginName].duration : this.options.duration;
      this.isAnimating = false;
      this.show = 'slideDown';
      this.hide = 'slideUp';

      if(this.options[pluginName].effect === 'fade') {
        this.show = 'fadeIn';
        this.hide = 'fadeOut';
      }
      if(this.options[pluginName].effect === 'slide') {
        this.show = 'slideDown';
        this.hide = 'slideUp';
      }

      this.initialized();
      this.listener();
    },
    initialized: function() {
      this.contents.removeClass('active').hide();
      this.activeEl.removeClass('active');
      if(this.initEl.length) {
        this.expandContent(this.initEl);
      }

      if(!!this.options[pluginName].breakpoint) {
        if(win.width() <= this.options[pluginName].breakpoint) {
          this.options[pluginName].type = '';
        }
        else {
          this.options[pluginName].type = 'noClose';
        }
      }
    },
    listener: function() {
      var that = this;

      this.handles.off('click.changeTab' + pluginName).on('click.changeTab' + pluginName, function(e) {
        var handle = $(this).closest(that.element).find('[data-handle="' + $(this).data('handle') + '"]');

        if($(e.target).is('a')) {
          e.preventDefault();
        }
        if(!that.isAnimating) {
          that.expandContent(handle);
        }
      });

      that.contents.off('click.closeTab' + pluginName, this.closeEl).on('click.closeTab' + pluginName, this.closeEl, function(e) {
        e.preventDefault();
        if(!that.isAnimating) {
          if(that.activeContent.find('[data-' + pluginName + ']').find(that.options.content).not(':hidden').length) {
            console.log('--- Close child Tabs - Button Close click ---');
            that.activeContent.find('[data-' + pluginName + ']')[pluginName]('close');
          }

          console.log('--- Close current tab ---');
          $(this).closest('[data-' + pluginName + ']')[pluginName]('close');
        }
        return false;
      });

      win.off(resize).on(resize, function() {
        $('[data-' + pluginName + ']').each(function() {
          var breakpoint = $(this).data()[pluginName].options[pluginName].breakpoint;

          if(!!breakpoint) {
            if(win.width() <= breakpoint) {
              $(this).data()[pluginName].options[pluginName].type = '';
            }
            else {
              $(this).data()[pluginName].options[pluginName].type = 'noClose';
            }
          }
        });
      });
    },
    expandContent: function(handle) {
      var content = handle.closest(this.element).find('[data-content="' + handle.data('handle') + '"]');

      handle.find('input[type="radio"]').prop('checked', true);
      if(!content.length) {
        this.noContent(handle);
      }
      else {
        this.hasContent(handle, content);
      }
    },
    noContent: function(handle) {
      var that = this;
      console.log('--- No Content ---');
      this.activeEl.removeClass('active');
      handle.closest(this.activeEl).addClass('active');

      if(this.activeContent.length) {
        this.isAnimating = true;
        //- Before Close
        if($.isFunction(that.options.beforeClose)) {that.options.beforeClose(that.activeContent);}
        this.activeContent.removeClass('active')[this.hide](this.duration, function() {
          //- After Close
          if($.isFunction(that.options.afterClose)) {that.options.afterClose(that.activeContent);}
          //- Remove activeContent
          that.activeContent = [];
          that.isAnimating = false;
        });
      }
    },
    hasContent: function(handle, content) {
      if(this.activeContent.length) {
        if(this.activeContent[0] !== content[0]) {
          this.changeTab(handle, content);
        }
        else if(this.options[pluginName].type !== 'noClose') {
          this.closeCurrentTab(handle);
        }
      }
      else {
        this.firstOpen(handle, content);
      }
    },
    changeTab: function(handle, content) {
      var that = this;
      if(this.activeContent.find('[data-' + pluginName + ']').find(this.options.content).not(':hidden').length) {
        console.log('--- Close all Child ---');
        this.activeContent.find('[data-' + pluginName + ']')[pluginName]('close');
      }

      console.log('--- Change Tab ---');
      //- Before Close
      if($.isFunction(that.options.beforeClose)) {that.options.beforeClose(that.activeContent);}

      this.isAnimating = true;
      this.activeEl.removeClass('active');
      this.activeContent.removeClass('active')[this.hide](this.duration, function() {
        //- After Close
        if($.isFunction(that.options.afterClose)) {that.options.afterClose(that.activeContent);}

        //- Set new activeContent
        that.activeContent = content;
        //- Before Open
        if($.isFunction(that.options.beforeOpen)) {that.options.beforeOpen(that.activeContent);}

        handle.closest(that.activeEl).addClass('active');
        that.activeContent.addClass('active')[that.show](this.duration, function() {
          //- After Open
          if($.isFunction(that.options.afterOpen)) {that.options.afterOpen(that.activeContent);}
          that.isAnimating = false;
        });
      });
    },
    closeCurrentTab: function(handle) {
      var that = this;
      if(this.activeContent.find('[data-' + pluginName + ']').find(this.options.content).not(':hidden').length) {
        console.log('--- Close child Tabs - Tab click ---');
        this.activeContent.find('[data-' + pluginName + ']')[pluginName]('close');
      }

      console.log('--- Close current tab ---');
      //- Before Close
      if($.isFunction(that.options.beforeClose)) {that.options.beforeClose(that.activeContent);}

      this.isAnimating = true;
      handle.closest(this.activeEl).removeClass('active');
      this.activeContent.removeClass('active')[this.hide](this.duration, function() {
        //- After Close
        if($.isFunction(that.options.afterClose)) {that.options.afterClose(that.activeContent);}
        //- Remove activeContent
        that.activeContent = [];
        that.isAnimating = false;
      });
    },
    firstOpen: function(handle, content) {
      var that = this;
      console.log('--- First open ---');

      //- Set new activeContent
      that.activeContent = content;
      //- Before Open
      if($.isFunction(that.options.beforeOpen)) {that.options.beforeOpen(that.activeContent);}

      this.isAnimating = true;
      this.activeEl.removeClass('active');
      handle.closest(this.activeEl).addClass('active');
      that.activeContent.addClass('active')[this.show](this.duration, function() {
        //- After Open
        if($.isFunction(that.options.afterOpen)) {that.options.afterOpen(that.activeContent);}
        that.isAnimating = false;
      });
    },
    close: function() {
      var that = this;

      //- Before Close
      if($.isFunction(that.options.beforeClose)) {that.options.beforeClose(that.activeContent);}

      this.isAnimating = true;
      this.activeEl.removeClass('active');
      this.activeContent.removeClass('active')[this.hide](function() {
        //- After Close
        if($.isFunction(that.options.afterClose)) {that.options.afterClose(that.activeContent);}
        //- Remove ActiveContent
        that.activeContent = [];
        that.isAnimating = false;
      });
    },
    destroy: function() {
      this.activeContent = [];
      this.isAnimating = false;
      this.handles.off('click.changeTab' + pluginName);
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
    initEl: '[data-init]',
    closeEl: '[data-close]',
    duration: 300,
    beforeOpen: function(activeContent) {
      if(activeContent.hasClass('sort-wrap')) {
        console.log(111);
        html.toggleClass('expand-sort');
      }
      if(activeContent.hasClass('popup-filter')) {
        html.addClass('filter-show').removeClass('expand-sort');
      }
    },
    afterOpen: function(activeContent) {
      console.log(activeContent);
      Site.expandMenu(activeContent);
    },
    beforeClose: function(activeContent) {
      console.log('beforeClose');
      if(activeContent.hasClass('sort-wrap')) {
        html.toggleClass('expand-sort');
      }
      if(activeContent.hasClass('popup-filter')) {
        html.removeClass('filter-show');
      }
    },
    afterClose: function(activeContent) {
      console.log('afterClose');
      console.log(activeContent);
    }
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
