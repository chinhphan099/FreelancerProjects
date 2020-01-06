



// Super Wheel Script
jQuery(document).ready(function($){
	
	
	
	
	$('.wheel-with-icons').superWheel({
		slices: [
		{
			text: 'fa fa-battery',
			value: 1,
			message: "You win a Battery",
			background: "#546E7A",
			
		},
		{
			text: 'fa fa-balance-scale',
			value: 1,
			message: "You win a Balance Scale",
			background: "#455A64",
			
		},
		{
			text: 'fa fa-hand-peace-o',
			value: 1,
			message: "You win You win a Hand Peace",
			background: "#546E7A",
			
		},
		{
			text: 'fa fa-heart',
			value: 1,
			message: "You win a Heart",
			background: "#455A64",
			
		},
		{
			text: 'fa fa-bed',
			value: 1,
			message: "You win a Bed",
			background: "#546E7A",
			
		},
		{
			text: 'fa fa-lightbulb-o',
			value: 1,
			message: "You win a Light Bulb",
			background: "#455A64",
			
		}
	],
	text : {
		type: 'icon',
		color: '#CFD8DC',
		size: 25,
		offset : 14,
		orientation: 'h'
		
	},
	line: {
		width: 10,
		color: "#78909C"
	},
	outer: {
		width: 14,
		color: "#78909C"
	},
	inner: {
		width: 15,
		color: "#78909C"
	},
	marker: {
		background: "#00BCD4",
		animate: 1
	},
	
	selector: "value",
	
	
	
	});
	
	
	
	var tick = new Audio('../../dist/tick.mp3');
	
	$(document).on('click','.wheel-with-icons-spin-button',function(e){
		
		$('.wheel-with-icons').superWheel('start','value',1);
		$(this).prop('disabled',true);
	});
	
	
	$('.wheel-with-icons').superWheel('onStart',function(results){
		
		
		$('.wheel-with-icons-spin-button').text('Spinning...');
		
	});
	$('.wheel-with-icons').superWheel('onStep',function(results){
		
		if (typeof tick.currentTime !== 'undefined')
			tick.currentTime = 0;
        
		tick.play();
		
	});
	
	
	$('.wheel-with-icons').superWheel('onComplete',function(results){
		//console.log(results.value);
		if(results.value === 1){
			
			swal({
				type: 'success',
				title: "Congratulations!", 
				html: results.message
			});
			
		}else{
			swal("Oops!", results.message, "error");
		}
		
		
		$('.wheel-with-icons-spin-button:disabled').prop('disabled',false).text('Spin');
		
	});
	
	
	
	
	
});