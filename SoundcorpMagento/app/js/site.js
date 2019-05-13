/**
 * @name Site
 * @description Global variables and functions
 * @version 1.0
 */
// https://regex101.com/r/dkFASs/6
var Site = (function($, window, undefined) {
  'use strict';

  var win = $(window),
    doc = $(document),
    html = $('html'),
    body = $('body'),
    standarTransitionend = (!!window.URL || !!window.webkitURL) ? 'webkitTransitionEnd.transitionEnd' : 'transitionend.transitionEnd',
    resize = ('onorientationchange' in window) ? 'orientationchange.resizeWindow' : 'resize.resizeWindow';

  // http://codepen.io/chinhphan099/pen/WxrVyw
  var ua = navigator.userAgent,
    browser = /Edge\/\d+/.test(ua) ? 'ed' : /MSIE 9/.test(ua) ? 'ie9' : /MSIE 10/.test(ua) ? 'ie10' : /MSIE 11/.test(ua) ? 'ie11' : /MSIE\s\d/.test(ua) ? 'ie?' : /rv\:11/.test(ua) ? 'ie11' : /Firefox\W\d/.test(ua) ? 'ff' : /Chrome\W\d/.test(ua) ? 'gc' : /Chromium\W\d/.test(ua) ? 'oc' : /\bSafari\W\d/.test(ua) ? 'sa' : /\bOpera\W\d/.test(ua) ? 'op' : /\bOPR\W\d/i.test(ua) ? 'op' : typeof MSPointerEvent !== 'undefined' ? 'ie?' : '',
    isTablet = /Tablet|iPad/i.test(ua),
    touch = 'ontouchstart' in document.documentElement;

  function controlNavigation() {
    $('.control-nav').off('click.toggleNavigation', '> i').on('click.toggleNavigation', '> i', function () {
      html.toggleClass('openMenu');
    });
  }

  var tabletClickEvents = function() {
    $('.mini-cart').off('click.miniBagTablet', '> a').on('click.miniBagTablet', '> a', function (e) {
      if(isTablet && win.width() > 991 && !html.hasClass('temp')) {
        e.preventDefault();
        e.stopPropagation();
        html.addClass('temp');
      }
    });

    $('.menu .has-child').off('click.subMenuTablet', '> a').on('click.subMenuTablet', '> a', function (e) {
      if(isTablet && win.width() > 991 && !$(this).hasClass('temp')) {
        e.preventDefault();
        e.stopPropagation();
        $(this).parent().addClass('temp').siblings().removeClass('temp');
      }
    });
  };

  var controlSticky = function() {
    if(!!$('.add-to-bag-area').length || !!$('.tab-navigation-wrap').length) {
      var getPost = 69,
      posWin = win.scrollTop(),
      posBagBtn = $('.add-to-bag-area').offset().top,
      posTab = $('.tab-navigation-wrap').offset().top;

      if(html.hasClass('openMenu')) {
        getPost += 42;
      }
      if(html.hasClass('sticky-bag-button')) {
        getPost += 61;
      }

      if($('.product-wrapper').filter(':not(.gift-card)').length) {
        if(posBagBtn <= posWin + getPost - 100) {
          html.addClass('sticky-bag-button');
        }
        else {
          html.removeClass('sticky-bag-button');
        }
      }

      if(posTab <= posWin + getPost) {
        html.addClass('sticky-tab-nav');
      }
      else {
        html.removeClass('sticky-tab-nav');
      }
    }
  };

  var setActiveTabNav = function() {
    if($('.tab-navigation-wrap').length & win.width() > 991) {
      var winTop = win.scrollTop();
      $('.tab-control').each(function(idx, elm) {
        var posTop = $(elm).offset().top - 69 - 61 - 65 - 30,
          id = $(elm).attr('id');

        if(html.hasClass('openMenu')) {
          posTop -= 42;
        }

        if(posTop < winTop) {
          $('.tab-navigation a').filter('[href="#' + id + '"]').closest('li').addClass('active').siblings().removeClass('active');
        }
      });
    }
  };

  var remainChars = function() {
    $('[data-char]').each(function() {
      var text = $(this).find('.count-char').text();
      var total = parseInt($(this).data('char'));
      $(this).find('.count-char').text(text + total);
      $(this).find('textarea').on('keyup.changeText', function() {
        var remain = total - parseInt($(this).val().length);
        $(this).closest('[data-char]').find('.count-char').text(text + remain);
      });
    });
  };

  var globalFct = function() {
    controlNavigation();
    tabletClickEvents();
    controlSticky();
    setActiveTabNav();
    remainChars();

    win.on('scroll.windowScroll', function() {
      if(win.width() > 991) {
        if(win.scrollTop() > 100) {
          if(html.not('.scrolled')) {
            html.addClass('scrolled');
          }
        }
        else if(html.hasClass('scrolled')) {
          html.removeClass('scrolled');
        }
        controlSticky();
        setActiveTabNav();
      }
    });
    win.on(resize, function() {
      $('.add-to-bag-area').removeAttr('style');
    });
  };

  var scrollTopAfterCollapse = function(elmScroll, handle, isPos) {
    var spaceToTop = 0,
      offsetHandle = isPos ? handle.position().top : handle.offset().top;

    if(!isPos) {
      spaceToTop = 50;
    }

    elmScroll.stop().animate({
      scrollTop: offsetHandle - spaceToTop
    }, 400);
  };

  var PLP = function() {
    var productList = $('.shopby-product-list');
    $('.category-alt').off('click.toggleFilter', '.btn-primary').on('click.toggleFilter', '.btn-primary', function() {
      productList.toggleClass('filter-active');
    });
    $('.category-alt').off('click.closeFilter', '.btn-secondary').on('click.closeFilter', '.btn-secondary', function() {
      productList.removeClass('filter-active');
    });
  };

  var PDP = function() {
    $('.light-grey-box #sendToFriend').on('change.sendToFriend', function() {
      if(!!$(this).prop('checked')) {
        $('.light-grey-box .box-content').show();
      }
      else {
        $('.light-grey-box .box-content').hide();
      }
    }).change();
  };

  var toogleShow = function(elm) {
    var content = $(elm.data('toggleshow')),
      checkbox = elm.find('input:checkbox, input:radio');
    if(!!checkbox.length && !!checkbox.prop('checked')) {
      checkbox.prop('checked', false);
    }
    else {
      checkbox.prop('checked', true);
    }
    if(content.is(':visible')) {
      content.stop().fadeOut(300);
    }
    else {
      content.stop().fadeIn(300);
    }
  };

  var checkout = function() {
    $('[data-toggleshow]').on('click.toogleShow', function() {
      toogleShow($(this));
      return false;
    });

    $('.payment-method .radio-list .radio').on('click.payment', function() {
      if(!!$(this).attr('data-show')) {
        var content = $($(this).data('show')),
          radio = $(this).find('input:radio');
        if(content.is(':visible')) {
          content.stop().fadeOut(300);
          radio.prop('checked', false);
        }
        else {
          content.stop().fadeIn(300);
          radio.prop('checked', true);
        }
        return false;
      }
      else {
        $('#visa-block').fadeOut(300);
      }
    });
  };

  return {
    win: win,
    doc: doc,
    html: html,
    body: body,
    resize: resize,
    setActiveTabNav: setActiveTabNav,
    standarTransitionend: standarTransitionend,
    browser: browser,
    isTablet: isTablet,
    touch: touch,
    globalFct: globalFct,
    scrollTopAfterCollapse: scrollTopAfterCollapse,
    PLP: PLP,
    PDP: PDP,
    checkout: checkout
  };

})(jQuery, window);

jQuery(function() {
  Site.globalFct();
  Site.PLP();
  Site.PDP();
  Site.checkout();
});
