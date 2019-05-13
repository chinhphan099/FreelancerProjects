// Parent page
var resize = ('onorientationchange' in window) ? 'orientationchange' : 'resize',
  eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent',
  eventer = window[eventMethod],
  messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message',
  showCls = 'show-iframe',
  wrap = document.getElementsByClassName('iframe-wrapper'),
  cssLink = document.location.origin + '/css/style.css';

var funct = {
  init: function() {
    this.loadCss();
    this.createIframe();
  },
  loadCss: function() {
    var cssUrl = document.createElement('link');
      cssUrl.setAttribute('rel', 'stylesheet');
      cssUrl.setAttribute('type', 'text/css');
      cssUrl.setAttribute('href', cssLink);
      document.getElementsByTagName('head')[0].appendChild(cssUrl);
  },
  createIframe: function() {
    for(var i = 0, n = wrap.length; i < n; i++) {
      var iframes = document.createElement('iframe');
        iframes.src = wrap[i].dataset.url;
        iframes.id = 'iframe-' + i;
        iframes.setAttribute('allowtransparency', 'true');
        iframes.setAttribute('frameborder', '');
        iframes.setAttribute('style', 'overflow: hidden');
        iframes.scrolling = 'no';
        iframes.width = '100%';

      wrap[i].appendChild(iframes);
      this.checkIframeLoaded(iframes, i);
    }
  },
  checkIframeLoaded: function(iframe, i) {
    var that = this;
    iframe.onload = function() {
      that.inspectIframe();
    };
  },
  inspectIframe: function() {
    for(var i = 0, m = wrap.length; i < m; i++) {
      var iframe = wrap[i].getElementsByTagName('iframe')[0];
      wrap[i].classList.remove(showCls);
      iframe.width = wrap[i].offsetWidth; // Set width of iframe equal to Wapper
      iframe.contentWindow.postMessage({idIframe: iframe.id}, '*');
      this.setHeight();
    }
  },
  setHeight: function() {
    eventer(messageEvent, function(e) {
      if(e.data.idIframe) {
        var iframe = document.getElementById(e.data.idIframe);
        iframe.parentNode.classList.add(showCls);
        iframe.height = e.data.height;
      }
    }, false);
  }
};

window.onload = function() {
  funct.init();
};
window.addEventListener(resize, function() {
  funct.inspectIframe();
}, false);
