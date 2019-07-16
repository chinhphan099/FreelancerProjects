/**
 * @name Site
 * @description Global variables and functions
 * @version 1.0
 */

var Site = (function($, window, undefined) {
  'use strict';

  var globalFct = function() {
    new WOW().init();
  };

  return {
    globalFct: globalFct
  };

})(jQuery, window);

jQuery(function() {
  Site.globalFct();
});
