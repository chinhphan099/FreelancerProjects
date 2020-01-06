
var log = console.log;

jQuery(document).ready(function($){
	
		
	
	$('.wheel').superWheel({
		slices: [
			{
				text    : '20% OFF',
				message : 'You win 20% off',
				background   : '#424242',
				value     : 1
			},{
				text    : 'No luck',
				message : 'You have No luck today',
				background   : '#333333',
				value     : 0
			},{
				text    : '30% OFF',
				message : 'You win 30% off',
				background   : '#424242',
				value     : 1
			},{
				value      : 'd',
				text    : 'Lose',
				message : 'You Lose :(',
				background   : '#333333',
				win     : 0
			},{
				text    : '40% OFF',
				message : 'You win 40% off',
				background   : '#424242',
				value     : 1
			},{
				text    : 'Nothing',
				message : 'You get Nothing :(',
				background   : '#333333',
				value     : 0
			}
		],
		
		
		//======================================
		//======================================
		//======      Wheel Parameters    ======
		//======================================
		//======================================
		text : {
			size: 14,
			color: '#fff',
			offset : 8,
			letterSpacing: 0,
			orientation: 'v',
			arc: true
		},
		
		slice : {
			background : "#333",
			selected:{
				//background: '#fff',
				//color: '#333'
			}
		},
		line:{
			width : 6,
			color : "#939393",
		},
		outer : {
			width : 12,
			color : "#939393",
		},
		
		inner : {
			width : 12,
			color : "#939393",
		},
		
		
		duration: 8000,
		
	});
	
	
	
	
	
	
	
	
	/*
	$('.wheel').superWheel('onStart',function(results){
		log('onStart',results);
	});
	
	$('.wheel').superWheel('onStep',function(results){
		log('onStep',results);
	});
	
	$('.wheel').superWheel('onProgress',function(results){
		log('onProgress',results);
	});
	
	$('.wheel').superWheel('onComplete',function(results){
		log('onComplete',results);
	});
	
	$('.wheel').superWheel('onFail',function(results){
		log('onFail',results);
	});
	*/
	
	
	
	
	
	
	var tick = new Audio('assets/media/tick.mp3');
	
	
	$(document).on('click','.spin-to-win',function(e){
		e.preventDefault();
		$('.wheel').superWheel('start','value',0);
	});
	
	
	$('.wheel').superWheel('onStep',function(results){
		
		if (typeof tick.currentTime !== 'undefined')
			tick.currentTime = 0;
        
		tick.play();
		
	});
	
});

