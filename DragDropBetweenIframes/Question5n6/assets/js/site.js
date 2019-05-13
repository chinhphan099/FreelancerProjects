var site = {
	initial: function() {
		var iframes = $('iframe'), element, that = this;

		iframes.each(function(i) {
			var idIframe = '#' + $(this).attr('id');
			var clientFrameWindow = $(idIframe).get(0).contentWindow;
			that.dragEvents(idIframe, clientFrameWindow);
		});
		this.buttonEvent();
		this.overlayEvent();
	},
	dragEvents: function(idIframe, clientFrameWindow) {
		var that = this;
		$(idIframe).load(function() {
			$(clientFrameWindow.document.body).find('*')
				.on('mousedown', function(event) {
					event.stopPropagation();
					element = $(event.target);
					event = event || window.event;
					that.xAxis = event.clientX;
					that.yAxis = event.clientY;
					that.widthElm = element.width();
					that.heightElm = element.height();

					if($(event.target).css('position') === 'absolute') {
						that.xAxis -= $(this).position().left;
						that.yAxis -= $(this).position().top;
					}
					else {
						that.xAxis -= $(this).offset().left;
						that.yAxis -= $(this).offset().top;
					}
				})
				.on('dragstart', function(event) {
					element = $(event.target);
				})
				.on('dragenter',function(event) {
					event.preventDefault();
					event.stopPropagation();
				})
				.on('dragover',function(event) {
					event.preventDefault();
					event.stopPropagation();
					event = event || window.event;
					var x = event.originalEvent.clientX - that.widthElm / 2;
						y = event.originalEvent.clientY - that.heightElm / 2,
						xDisparity = Math.abs(that.widthElm / 2 - that.xAxis),
						yDisparity = Math.abs(that.heightElm / 2 - that.yAxis),
						opacity = 0;

					if(x <= 0) {
						x = 0;
						opacity = 1;
					}
					if(y <= 0) {
						y = 0;
						opacity = 1;
					}
					(that.xAxis < that.widthElm / 2) ? (x += xDisparity) : (x -= xDisparity);
					(that.yAxis < that.heightElm / 2) ? (y += yDisparity) : (y -= yDisparity);
					element.css({'position': 'absolute', 'top': y, 'left': x, 'opacity': opacity});
				});

			$(clientFrameWindow.document).find('body,html').on('drop',function(event) {
				event.preventDefault();
				event.stopPropagation();
				var e = event.isTrigger ? triggerEvent.originalEvent : event.originalEvent;
				try {
					element.animate({'opacity': 1}, 400).appendTo($(clientFrameWindow.document).find('.container'));
				}
				catch(e) {
					console.log(e);
				}
			});
		});
	},
	buttonEvent: function() {
		var that = this;
		$('#closePopup').on('click.closePoup', function() {
			that.closePopup();
		});
		$('#viewStyle').on('click.viewStyle', function() {
			var iframes = $('iframe');
			that.buttonClose = $('.overlay').find('button').clone(true);

			iframes.each(function(i) {
				var idIframe = '#' + $(this).attr('id'),
					clientFrameWindow = $(idIframe).get(0).contentWindow;

				$('.overlay .content').append('<h2>Iframe ID: ' + $(this).attr('id') + '</h2>')
				that.saveData(clientFrameWindow);
			});
		});
	},
	overlayEvent: function() {
		var that = this;
		$('.overlay').off('click.close').on('click.close', function(e) {
			if(!$(e.target).hasClass('.content') && !$(e.target).closest('.content').length) {
				that.closePopup();
			}
		});
	},
	closePopup: function() {
		var that = this;
		$('.overlay').fadeOut(function() {
			$(this).find('.content').html(that.buttonClose);
		});
	},
	saveData: function(clientFrameWindow) {
		that = this;
		var arr = [];

		$(clientFrameWindow.document.body).find('> *').each(function(index, element) {
			that.saveChildData(arr, element);
			if(index === $(clientFrameWindow.document.body).find('> *').length - 1) {
				that.getStyle(arr);
			}
		});
		$('.overlay').fadeIn();
	},
	saveChildData: function(arr, element) {
		var that = this,
			json = {};

		// Need update: get all attributes
		json.tagName = element.tagName.toLowerCase();
		json.style = !!$(element).attr('style') ? $(element).attr('style'): '';
		json.class = !!$(element).attr('class') ? $(element).attr('class'): '';

		if(!!$(element).children().length) {
			json.child = [];
			$(element).find('> *').each(function(i, elm) {
				that.saveChildData(json.child, elm);
			});
		}
		arr.push(json);
	},
	getStyle: function(arr) {
		var output = '';
		for(var i = 0, n = arr.length; i < n; i++) {
			output = 'Tag: <b>' + arr[i].tagName + '</b>';
			arr[i].class ? output+= (' - class: <b>' + arr[i].class + '</b>') : '';
			arr[i].style ? output+= (' - style: <b>' + arr[i].style + '</b>') : '';
			$('.overlay').find('.content').append(output + '<br/>');
			if(!!arr[i].child) {
				this.getStyle(arr[i].child);
			}
		}
	}
};

$(function() {
	site.initial();
});
