/**
 * @name Site
 * @description Global variables and functions
 * @version 1.0
 */

var Site = (function($, window, undefined) {
  'use strict';

  var win = $(window),
    doc = $(document),
    body = $('body'),
    standarTransitionend = (!!window.URL || !!window.webkitURL) ? 'webkitTransitionEnd.transitionEnd' : 'transitionend.transitionEnd',
    resize = ('onorientationchange' in window) ? 'orientationchange.resizeWindow' : 'resize.resizeWindow';

  var globalFct = function() {
    $('[data-slider]').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true
    });
  };

  return {
    win: win,
    doc: doc,
    body: body,
    resize: resize,
    standarTransitionend: standarTransitionend,
    globalFct: globalFct
  };

})(jQuery, window);

jQuery(function() {
  Site.globalFct();
});
