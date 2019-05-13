/**
 * @name Site
 * @description Global variables and functions
 * @version 1.0
 */

var Site = (function($, window, undefined) {
  'use strict';

  var win = $(window),
    doc = $(document),
    html = $('html'),
    body = $('body'),
    standarTransitionend = (!!window.URL || !!window.webkitURL) ? 'webkitTransitionEnd.transitionEnd' : 'transitionend.transitionEnd',
    resize = ('onorientationchange' in window) ? 'orientationchange.resizeWindow' : 'resize.resizeWindow',
    resizePlugin = ('onorientationchange' in window) ? 'orientationchange.resize' : 'resize.resize';

  var globalFct = function() {
    toggleSearch();
    toggleMenu();
    toggleSortBy();
    viewSwitching();
    customSelect();
    customDate();
    setMinHeightMain();
    win.on(resize, function() {
      setMinHeightMain();
    });
  };

  var setMinHeightMain = function() {
    if($('footer').length) {
      $('main').css('min-height', 'auto');
      var minHeight = doc.height() - $('header').outerHeight() - $('footer').outerHeight(true);
      $('main').css('min-height', minHeight);
    }
  };

  var customValidEmail = function() {
    $.validator.addMethod('cemail', function(value, element) {
      if (element.value !== '') {
        return this.optional(element) || /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.) {2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(value);
      }
      else {
        return true;
      }
    }, L10n.validateMess.cemail);

    $.validator.addMethod('filesize', function(value, element, param) {
      // param = size (en bytes)
      // element = element to validate (<input>)
      // value = value of the element (file name)
      return this.optional(element) || (element.files[0].size <= param);
    });
  };


  var customSelect = function() {
    $('.custom-select select').each(function() {
      $(this).on('change', function () {
        var str = '';
        $(this).find('option:selected').each(function() {
          str += $(this).text() + ' ';
        });
        $(this).prev('span').text(str);
        if($(this).val() === '') {
          $(this).closest('.custom-select').removeClass('selected');
        }
        else {
          $(this).closest('.custom-select').addClass('selected');
        }
      })
      .change();
    });
  };

  var customDate = function() {
    $('.custom-date input').each(function() {
      $(this).on('change', function () {
        var str = $(this).attr('placeholder');

        if($(this).val() === '') {
          $(this).prev('span').text(str);
          $(this).closest('.custom-date').removeClass('selected');
        }
        else {
          $(this).prev('span').text(convertDMY(new Date($(this).val())));
          $(this).closest('.custom-date').addClass('selected');
        }
      })
      .change();
    });
  };

  var convertDMY = function(date) {
    var day = date.getDate(),
      month = date.getMonth() + 1,
      year = date.getFullYear();

    if(day < 10) {day = '0' + day;}
    if(month < 10) {month = '0' + month;}
    return day + '/' + month + '/' + year;
  };

  var viewSwitching = function() {
    $('.view-switching').on('click.viewSwitching', '[data-view]', function() {
      var className = $(this).data('view').class,
        control = $(this).data('view').control;

      $(this).addClass('hidden');
      $(control).removeClass('hidden');
      $('.categories-block').find('.product-list').removeClass().addClass(className);
      win.trigger(resizePlugin + 'equal');
    });
  };

  var toggleSearch = function(){
    $('[data-show-search]').on('click.showSearch', function() {
      html.toggleClass('show-search');
      $('#txt_search').focus();
    });

    $('#cancel_search').on('click.cancelSearch', function() {
      html.removeClass('show-search');
      // document.getElementById('search_frm').reset();
      // $('.autocomplete-suggestions').empty();
    });
  };

  var toggleMenu = function() {
    $('[data-toggle-menu], .overlay').on('click.toggleMenu touchstart.toggleMenu', function(){
      html.addClass('open-menu');
      // $('[data-show-search]').next().removeClass('show');
      return false;
    });
    $('.overlay').on('click.toggleMenu touchstart.toggleMenu', function(){
      html.removeClass('open-menu open-popup');
      return false;
    });
  };

  var expandMenu = function(activeContent) {
    var offset;
    if(activeContent.closest('.nav-group').length) {
      offset = activeContent.closest('li').position().top;
      activeContent.closest('.inner').stop().animate({
        scrollTop: offset
      }, 500);
    }

    if(activeContent.closest('.footer-upper').length) {
      offset = activeContent.offset().top;
      body.animate({
        scrollTop: offset
      }, 500);
    }

    if(activeContent.closest('.filter-list').length) {
      offset = activeContent.closest('li').position().top;
      activeContent.closest('.main').stop().animate({
        scrollTop: offset
      }, 500);
    }
  };

  var toggleSortBy = function() {
    $('.sort-mask').on('click', function() {
      $('.sort-by > [data-handle]').trigger('click');
    });
  };

  return {
    win: win,
    doc: doc,
    html: html,
    body: body,
    resize: resize,
    standarTransitionend: standarTransitionend,
    globalFct: globalFct,
    customValidEmail: customValidEmail,
    expandMenu: expandMenu,
    convertDMY: convertDMY
  };

})(jQuery, window);

jQuery(function() {
  Site.globalFct();
  Site.customValidEmail();
});
