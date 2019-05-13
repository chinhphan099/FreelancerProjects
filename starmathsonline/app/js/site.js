/**
 * @name Site
 * @description Global variables and functions
 * @version 1.0
 */

var Site = (function($, window, undefined) {
  'use strict';
  var win = $(window),
    html = $('html');

  function checkSearchValue(input) {
    if(!!input.val()) {
      input.closest('.custom-input').addClass('hasValue');
    }
    else {
      input.closest('.custom-input').removeClass('hasValue');
    }
  }

  var globalFct = function() {
    $(document).off('keyup.searchInput', 'input[type="search"]').on('keyup.searchInput', 'input[type="search"]', function() {
      checkSearchValue($(this));
    });

    $('.custom-input').off('click.resetInputSearch', '.icon-close').on('click.resetInputSearch', '.icon-close', function(e) {
      var input = $(e.delegateTarget).find('input');
      input.val('').focus();
      checkSearchValue(input);
    });

    $('.navigation').off('click.toggleMenuItem', '.menu-item-has-children > a').on('click.toggleMenuItem', '.menu-item-has-children > a', function() {
      if(win.width() < 992) {
        $(this).parent().toggleClass('active');
        $(this).next().slideToggle();
      }
    });

    $('.main-header').off('click.toggleMenu', '.control').on('click.toggleMenu', '.control', function() {
      html.toggleClass('openMenu');
    });

    win.on('scroll.windowScroll', function() {
      if(!!$('.header-outer').length && win.scrollTop() > 50) {
        if(html.not('.scrolled')) {
          html.addClass('scrolled');
        }
      }
      else if(html.hasClass('scrolled')) {
        html.removeClass('scrolled');
      }
    });
  };

  return {
    globalFct: globalFct
  };

})(jQuery, window);

jQuery(function() {
  Site.globalFct();
});
