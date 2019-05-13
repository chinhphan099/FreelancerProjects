// Child page
var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent',
  eventer = window[eventMethod],
  messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

var funct = {
  init: function() {
    var images = document.getElementsByTagName('img');
    this.mess = {};
    this.imgIsLoaded(images, this.firstMessage());
  },
  imgIsLoaded: function(images, callback) {
    var images_loaded = 0;

    for(var i = 0, total_images = images.length; i < total_images; i++) {
      var img = document.createElement('img');
        img.src = images[i].src;
        img.setAttribute('style', 'display: none');

      img.onload = function() {
        images_loaded++;
        if (images_loaded === total_images) {
          if(typeof callback === 'function') {
            callback();
          }
        }
      };

      img.onerror = function() {
        images_loaded++;
        if (images_loaded === total_images) {
          if(typeof callback === 'function') {
            callback();
          }
        }
      };
    }
  },
  firstMessage: function() {
    var that = this;
    eventer(messageEvent, function(e) {
      if(e.data.idIframe) {
        that.mess.idIframe = e.data.idIframe;
        that.updateHeightIframe();
      }
    }, false);
  },
  updateHeightIframe: function() {
    this.mess.height = document.body.clientHeight;
    window.parent.postMessage(this.mess, '*');
  }
};

window.onload = function() {
  funct.init();
};
