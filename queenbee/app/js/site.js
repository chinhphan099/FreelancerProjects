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
		ua = navigator.userAgent,
		isTablet = /Tablet|iPad/i.test(ua),
		standarTransitionend = (!!window.URL || !!window.webkitURL) ? 'webkitTransitionEnd.transitionEnd' : 'transitionend.transitionEnd',
		resize = ('onorientationchange' in window) ? 'orientationchange.resizeWindow' : 'resize.resizeWindow';

	// Global Functions
	function calWidthSubmenu() {
		if(win.width() > 991) {
			$('.sub-nav', '.navigation').css('width', ($('.menu', '.navigation').width() - 2) / 5);
		}
		else {
			$('.sub-nav', '.navigation').removeAttr('style');
		}
	}

	function controlNavigation() {
		$('.control-nav').off('click.toggleNavigation', '> i').on('click.toggleNavigation', '> i', function () {
			html.toggleClass('openMenu');
		});
	}

	function headSearch() {
		$('.head-search').off('click.toggleSearch', '> i').on('click.toggleSearch', '> i', function () {
			html.toggleClass('openSearch');
		});

		$('.head-search .custom-input').on(standarTransitionend, function() {
			if(html.hasClass('openSearch')) {
				$(this).find('input').focus();
			}
			else {
				$(this).find('input').blur();
			}
		});
	}

	function tabletClickEvents() {
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
	}

	function customValid() {
		// Custom Valid Email
		$.validator.addMethod('cemail', function(value, element) {
			if (element.value !== '') {
				return this.optional(element) || /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.) {2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(value);
			}
			else {
				return true;
			}
		}, L10n.validateMess.cemail);
	}

	// Public FUnction
	var globalFct = function() {
		headSearch();
		calWidthSubmenu();
		controlNavigation();
		tabletClickEvents();
		customValid();

		body.off('click.bodyClick').on('click.bodyClick', function(e) {
			if(!$(e.target).closest('.mini-cart').length) {
				if(html.hasClass('temp')) {
					html.removeClass('temp');
				}
			}

			if(!$(e.target).closest('.has-child.temp').length) {
				$('.menu > li').removeClass('temp');
			}
		});

		win.on(resize, function() {
			calWidthSubmenu();
		});

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
			}
		});
	};

	var PLP = function() {
		var productList = $('.shopby-product-list');
		$('.category-alt').off('click.toggleFilter', '.btn-primary').on('click.toggleFilter', '.btn-primary', function() {
			productList.toggleClass('filter-active');
		});
		$('.block-filter').off('click.closeFilter', '.icon-close').on('click.closeFilter', '.icon-close', function() {
			productList.removeClass('filter-active');
		});
	};

	var PDP = function() {
		// Add to wishlist
		$('#addToBagFrm').off('click.addToBag', '#addToWishList').on('click.addToBag', '#addToWishList', function(e) {
			e.preventDefault();
			var checkValid = $(e.delegateTarget).valid();
			if(checkValid) {
				alert('Added to Wishlist !!!');
			}
		});

		// Notify Me
		$('#addToBagFrm').off('click.addToBag', '#notifyBtn').on('click.addToBag', '#notifyBtn', function(e) {
			e.preventDefault();
			var checkValid = $(e.delegateTarget).valid();
			if(checkValid) {
				alert('Notified !!!');
			}
		});
	};

	// Add to bag
	var addToBagEvent = function(id) {
		//alert('Added to bag');
		if(id === 'addToBagBtn') {
			// Before add to bag
			$('#' + id).html('<span><span>Adding to Bag<i class="icon-cart-plus"></i></span></span>');

			// Added to bag success
			$('.mini-cart').addClass('hover').delay(2000).queue(function(){
				$(this).removeClass('hover').dequeue();
				$('#' + id).html('<span><span>Added to Bag<i class="icon-cart-plus"></i></span></span>');
			});
		}
		return false;
	};

	var scrollTopAfterCollapse = function(elmScroll, handle, isPos) {
		var spaceToTop = 0,
			offsetHandle = isPos ? handle.position().top : handle.offset().top;

		if(!isPos) {
			spaceToTop = 68;
		}

		elmScroll.stop().animate({
			scrollTop: offsetHandle - spaceToTop
		}, 400);
	};

	return {
		win: win,
		doc: doc,
		html: html,
		body: body,
		resize: resize,
		globalFct: globalFct,
		PLP: PLP,
		PDP: PDP,
		addToBagEvent: addToBagEvent,
		scrollTopAfterCollapse: scrollTopAfterCollapse
	};

})(jQuery, window);

jQuery(function() {
	Site.globalFct();
	Site.PLP();
	Site.PDP();
});
