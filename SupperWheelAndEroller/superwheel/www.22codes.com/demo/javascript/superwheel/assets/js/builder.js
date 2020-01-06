var log = console.log;
jQuery(document).ready(function($){
	
	function isEmpty(obj) {
		for(var prop in obj) {
			if(obj.hasOwnProperty(prop))
				return false;
		}

		return JSON.stringify(obj) === JSON.stringify({});
	}
	var objectifyForm = function(formArray) { //serialize data function
		var returnArray = {};
		for (var i = 0; i < formArray.length; i++) {
			returnArray[formArray[i]['name']] = formArray[i]['value'];
		}
		return returnArray;
	}
	
	
	
	
	var demoObject = function(obj) {
		
		
		for (var x in obj) {
			
			
			if(typeof obj[x] === 'object' || typeof obj[x] === 'array'){
				
				obj[x] = demoObject(obj[x]);
				
			}else{
				obj[x] = 'Available Only in Purchased Version';
			}
		}
		return obj;
	}
	
	var objectFixer = function(obj) {
		
		
		for (var x in obj) {
			
			
			if(typeof obj[x] === 'object' || typeof obj[x] === 'array'){
				
				obj[x] = objectFixer(obj[x]);
				
			}  else if (!isNaN(Number(obj[x])) && obj[x] !== "") {
				obj[x] = Number(obj[x]);
			}
		}
		return obj;
	}
	
	
	var buildOptions = function(form) {
		
        var options = form.serializeJSON();
		return options;
		
    };
	
	
	var generateCode = function(object) {
		
		
		var defaults = $('.wheel').data('superWheelData').defaults;
		
		if(!object){
			object = buildOptions($(document).find('.builder form'));
			
		}
		
		//if(typeof object.slices !== 'undefined')
			//delete object.slices;
		
		sessionStorage.setItem('superWheel',JSON.stringify(object));
		
		var obj = $.extend({}, objectFixer(object));
		
		
		function formatOptions(options,defaults){
			var newOptions = {};
			
			if(typeof options.slices === 'object')
				newOptions['slices'] = options.slices;
			
			
			for (var x in options) {
				if(x === 'slices') continue;
				if(typeof options[x] === 'object'){
					var formatted = formatOptions(options[x],defaults[x]);
					if($.isEmptyObject(formatted)) continue;
					
					newOptions[x] = formatted;
					continue;
				}
				
				if(typeof defaults[x] !== "undefined" && defaults[x] !== options[x] ){
					newOptions[x] = options[x];
				}
				
				if(options[x] === "def" ){
					newOptions[x] = defaults[x];
				}
				
			}
			
			return newOptions;
		}
		
		
		obj = formatOptions(obj,defaults);
		
		
		var str = JSON.stringify(obj, null, "\t").replace(/\"([^(\")"]+)\":/g,"$1:").replace('"true"','true').replace('"false"','false').replace('"undefined"','undefined').replace('"null"','null');
		
		$('.code-generated>pre>code').text('\n$(\'.wheel\').superWheel('+str+');\n\n\n$(document).on(\'click\',\'.spin_button\',function(e){\n  e.preventDefault();\n  $(\'.wheel\').superWheel(\'start\',\'value\',0);\n});');
		
		Prism.highlightElement($('.code-generated>pre>code')[0]);
    };
	
	var applyChanges = function(e) {
		if(typeof e !== "undefined")
			e.preventDefault();
		
		
		var opt = objectFixer(buildOptions($('.builder form')));
		
		$.each(opt.slices,function(i){
			opt.slices[i].text = opt.slices[i].text ? opt.slices[i].text : 'Untitled';
			
		});
		
		
		opt.slices = Object.values(opt.slices);
		
		$('.wheel').superWheel(opt);
		
		
		generateCode(opt);
		
	}
	
	
	
	window.addEventListener('storage', function(e) {
		if(e.storageArea===sessionStorage) {
			
			var superWheelSession = sessionStorage.getItem('superWheel');
			if( superWheelSession !== null ){
				var __opt = JSON.parse(superWheelSession);
				//setForm(__opt);
				generateCode(__opt);
				applyChanges();
			}
		
		}
	  
	  //if(e.storageArea===localStorage) {}

	});
	
	
	var superWheelSession = sessionStorage.getItem('superWheel');
	if( superWheelSession !== null ){
		var __opt = JSON.parse(superWheelSession);
	}else{
		var __opt = buildOptions($(document).find('.builder form'));
	}
	
	
	//setForm(__opt);
	//var notifyBuilder = $.noist(__opt);
	//generateCode(__opt);
	
	
	
	
	var color_paletts = [
        "#1abc9c", "#2ecc71", "#3498db",
        "#9b59b6", "#34495e", "#16a085",
        "#27ae60", "#2980b9", "#8e44ad",
        "#2c3e50", "#f1c40f", "#e67e22",
        "#e74c3c", "#ecf0f1", "#95a5a6",
        "#f39c12", "#d35400", "#c0392b",
        "#bdc3c7", "#7f8c8d", "#333", "#424242"
    ];
	
	
	$(document).on('click','.sidebar #menu a.list-group-item.accord, .sidebar .submenu .sub-accord',function(e){
		e.preventDefault();
		
		if($(this).is('.accord')){
			var $sidebar = $(this).closest('.sidebar').addClass('section-open');
			var navid = $(this).attr('href').replace('#','','g');
			$sidebar.find('.submenu#sub-menu-section-'+navid).not('.submenu-child').addClass('open');
		}
		
		if($(this).is('.sub-accord')){
			log('Clicked');
			$(this).closest('.submenu').addClass('child-open');
			var $sidebar = $(this).closest('.sidebar');
			var navid = $(this).attr('href').replace('#','','g');
			$sidebar.find('.submenu.submenu-child#sub-sub-menu-section-'+navid).addClass('open');
		}
		
		
	});
	
	
	$(document).on('click','.sidebar .submenu a.back-to-menu',function(e){
		e.preventDefault();
		
		if( $(this).closest('.submenu-child').length === 0 ){
			var $sidebar = $(this).closest('.sidebar').removeClass('section-open');
			$sidebar.find('.submenu').not('.submenu-child').removeClass('open');
		}else{
			$(this).closest('.sidebar').find('.submenu.child-open').removeClass('child-open');
			$(this).closest('.sidebar').find('.submenu.submenu-child').removeClass('open');
		}
		
	});
	
	
	$(document).on('click','#sub-menu-section-slices .delete-slices',function(e){
		
		e.preventDefault();
		
		$(this).addClass('d-none');
		
		$(this).closest('#sub-menu-section-slices').find('.delete-slices-done').removeClass('d-none');
		
		$(this).closest('#sub-menu-section-slices').find('.delete-slice').removeClass('d-none');
		$(this).closest('#sub-menu-section-slices').find('.edit-slice').addClass('d-none');
		
		$(this).closest('#sub-menu-section-slices').find('.add-slice').addClass('d-none');
		
	});
	
	$(document).on('click','#sub-menu-section-slices .delete-slices-done',function(e){
		
		e.preventDefault();
		
		$(this).addClass('d-none');
		$(this).closest('#sub-menu-section-slices').find('.delete-slices').removeClass('d-none');
		$(this).closest('#sub-menu-section-slices').find('.delete-slice')    .addClass('d-none');
		$(this).closest('#sub-menu-section-slices').find('.edit-slice')   .removeClass('d-none');
		$(this).closest('#sub-menu-section-slices').find('.add-slice')    .removeClass('d-none');
		
	});
	
	
	var _currentColor = '#424242';
	
	
	$(document).on('click','.edit-slices .add-slice',function(e){
		e.preventDefault();
		
		if($(this).closest('.edit-slices').find('.slices').is('.limited')){
			$(this).closest('.edit-slices').find('.slices').removeClass('limited');
		}
		
		
		var sliceLength = $('.edit-slices>.slices>.slice').length;
		
		var addItemTMPL =
			'<div class="slice">'+
				'<div class="input-group input-group-sm mb-3">'+
					'<div class="input-group-prepend">'+
						'<button class="btn btn-sm btn-success btn-block back-to-slices" type="button" style="width: 40px"> <i class="fa fa-chevron-left fa-fw" aria-hidden="true"></i></button>'+
						'<span class="input-group-text slice-title">Slice Title '+sliceLength+'</span>'+
					'</div>'+
					'<div class="input-group-append">'+
						'<button class="btn btn-success edit-slice" type="button">'+
							'<i class="fa fa-pencil" aria-hidden="true"></i>'+
						'</button>'+
						'<button class="btn btn-danger d-none delete-slice" type="button">'+
							'<i class="fa fa-trash-o" aria-hidden="true"></i>'+
						'</button>'+
					'</div>'+
				'</div>'+
				'<div class="slice-data">'+
					'<div class="form-group" data-tmp="text">'+
						'<label for="slices-'+sliceLength+'-text">Text:</label>'+
						'<input type="text" name="slices['+sliceLength+'][text]" id="slices-'+sliceLength+'-text" class="form-control form-control-sm slice-text" placeholder="Slice Title" value="Slice Title '+sliceLength+'">'+
					'</div>'+
					'<div class="form-group" data-tmp="value">'+
						'<label for="slices-'+sliceLength+'-value">Value:</label>'+
						'<input type="text" name="slices['+sliceLength+'][value]" id="slices-'+sliceLength+'-value" class="form-control form-control-sm" placeholder="Slice Value" value="Slice Value '+sliceLength+'">'+
					'</div>'+
					'<div class="form-group" data-tmp="message">'+
						'<label for="slices-'+sliceLength+'-message">Message:</label>'+
						'<input type="text" name="slices['+sliceLength+'][message]" id="slices-'+sliceLength+'-message" class="form-control form-control-sm" placeholder="Message" value="Message '+sliceLength+'">'+
					'</div>'+
					'<div class="form-group" data-tmp="background">'+
						'<label for="slices-'+sliceLength+'-background">Background color:</label>'+
						'<div class="text-center colorpickerField colorpicker-element">'+
							'<div class="colorPicker-helper form-control" style="background: '+_currentColor+';">'+_currentColor+'</div>'+
							'<input type="text" class="colorPicker form-control" id="slices-'+sliceLength+'-background" name="slices['+sliceLength+'][background]" value="'+_currentColor+'" >'+
						'</div>'+
					'</div>'+
					'<div class="form-group" data-tmp="color">'+
						'<label for="slices-'+sliceLength+'-color">Text color:</label>'+
						'<div class="text-center colorpickerField colorpicker-element">'+
							'<div class="colorPicker-helper form-control" style="background: #fff;">#fff</div>'+
							'<input type="text" class="colorPicker form-control" id="slices-'+sliceLength+'-color" name="slices['+sliceLength+'][color]" value="#fff" >'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>';
		
		
		var newItem = $(addItemTMPL);
		$('.edit-slices>.slices').append(newItem);
		
		
		
	
		newItem.find(".colorPicker").each(function() {
			$(this).spectrum({
				preferredFormat: "hex",
				showPalette: true,
				palette: [color_paletts],
				change: function() {
					if ($(this).is(".colorPicker"))
						$(this).closest('.form-group').find('div.colorPicker-helper').text($(this).val()).css('background', $(this).val()).colourBrightness();
					applyChanges();
				},
			}).closest('.form-group').find('div.colorPicker-helper').colourBrightness();
		});
		newItem.find('input.slice-text').on('input',function(){
			var _val = $(this).val() ? $(this).val() : 'Untitled';
			
			$(this).closest('.slice').find('.slice-title').text(_val);
		});
		
		applyChanges();
		if(_currentColor === '#333333'){
			_currentColor = '#424242';
		}else{
			_currentColor = '#333333';
		}
	});
	
	
	
	
	$(document).on('click','#sub-menu-section-slices .delete-slice',function(e){
		e.preventDefault();
		var slices = $(this).closest('.slices');
		
		
		
		
		
		
		if(slices.find('.slice').length <= 3 ){
			$(this).closest('.slices').addClass('limited');
		}
		
		$(this).closest('.slice').remove();
		
		
		slices.find('.slice').each(function(i){
			$(this).find('.slice-data [data-tmp]').each(function(){
				var slice_name = $(this).data('tmp');
				$(this).find('label').attr('for','slices-'+i+'-'+slice_name);
				$(this).find('input').attr('name','slices['+i+']['+slice_name+']').attr('id','slices-'+i+'-'+slice_name);
				
			});
			
		});
		
		
		
		applyChanges();
		
		
		
		
	});
	
	$(document).on('click','.edit-slices .edit-slice',function(e){
		e.preventDefault();
		log('Clicked');
		$(this).closest('.submenu').addClass('editing-slices');
		$(this).closest('.slice').addClass('slice-active');
		$(this).closest('.edit-slices').addClass('editing');
		
	});
	
	
	
	
	$(document).on('click','.edit-slices .back-to-slices',function(e){
		e.preventDefault();
		log('Clicked');
		$(this).closest('.submenu').removeClass('editing-slices');
		$(this).closest('.edit-slices').find('.slice.slice-active').removeClass('slice-active');
		$(this).closest('.edit-slices').removeClass('editing');
	});
	
	
	
	$('.builder form').on('submit', function(e) { e.preventDefault(); })
	.on('input', 'select,input,textarea', applyChanges)/*.on('click', '.btn-generate', applyChanges)*/;
	
	
	
	var color_paletts = [
        "#1abc9c", "#2ecc71", "#3498db",
        "#9b59b6", "#34495e", "#16a085",
        "#27ae60", "#2980b9", "#8e44ad",
        "#2c3e50", "#f1c40f", "#e67e22",
        "#e74c3c", "#ecf0f1", "#95a5a6",
        "#f39c12", "#d35400", "#c0392b",
        "#bdc3c7", "#7f8c8d", "#333", "#424242"
    ];
	
	$(".colorPicker").each(function() {
			$(this).spectrum({
				preferredFormat: "hex",
				showPalette: true,
				palette: [color_paletts],
				change: function() {
					if ($(this).is(".colorPicker"))
						$(this).closest('.form-group').find('div.colorPicker-helper').text($(this).val()).css('background', $(this).val()).colourBrightness();
					
					
					
					
					if(typeof applyChanges === 'function') applyChanges();
				},
			}).closest('.form-group').find('div.colorPicker-helper').colourBrightness();
	});
	
	
	
});