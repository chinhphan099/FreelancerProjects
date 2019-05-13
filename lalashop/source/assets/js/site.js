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
    if(Detectizr.device.type === 'tablet') {
      document.querySelector('meta[name=viewport]').setAttribute('content', 'width=1024, user-scalable=no');
    }
    setWidthSlider();
    win.on(resize, function() {
      setWidthSlider();
    });
  };

  var setWidthSlider = function() {
    var widthSlider = $('.slide-block').closest('.inner').width() - $('.slide-block').next('.today-deal').width();
    $('.slide-block').css('width', widthSlider);
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
