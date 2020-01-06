



// Super Wheel Script
jQuery(document).ready(function($){
	
	
	
	
	$('.wheel-horizontal').superWheel({
		slices: [
			{
				text: "20% OFF",
				value: 1,
				message: "You win 20% off",
				discount: "95Qm9tof",
				background: "#546E7A",
				
			},
			{
				text: "No luck",
				value: 0,
				message: "You have No luck today",
				discount: "no",
				background: "#455A64",
				
			},
			{
				text: "30% OFF",
				value: 1,
				message: "You win 30% off",
				discount: "8C46fBeH",
				background: "#546E7A",
				
			},
			{
				text: "Lose",
				value: 0,
				message: "You Lose :(",
				discount: "no",
				background: "#455A64",
				
			},
			{
				text: "40% OFF",
				value: 1,
				message: "You win 40% off",
				discount: "aHiH4bfd",
				background: "#546E7A",
				
			},
			{
				text: "Nothing",
				value: 0,
				message: "You get Nothing :(",
				discount: "no",
				background: "#455A64",
				
			}
		],
		text : {
			color: '#CFD8DC',
			offset : 11,
			letterSpacing: 0,
			orientation: 'h',
		},
		line: {
			width: 6,
			color: "#78909C"
		},
		outer: {
			width: 10,
			color: "#78909C"
		},
		inner: {
			width: 12,
			color: "#78909C"
		},
		marker: {
			background: "#00BCD4"
		},
		selector: "value"
	});
	
	
	
	var tick = new Audio('../../dist/tick.mp3');
	
	$(document).on('click','.wheel-horizontal-spin-button',function(e){
		
		$('.wheel-horizontal').superWheel('start','value',Math.floor(Math.random() * 2));
		$(this).prop('disabled',true);
	});
	
	
	$('.wheel-horizontal').superWheel('onStart',function(results){
		
		
		$('.wheel-horizontal-spin-button').text('Spinning...');
		
	});
	$('.wheel-horizontal').superWheel('onStep',function(results){
		
		if (typeof tick.currentTime !== 'undefined')
			tick.currentTime = 0;
        
		tick.play();
		
	});
	
	
	$('.wheel-horizontal').superWheel('onComplete',function(results){
		//console.log(results.value);
		if(results.value === 1){
			
			swal({
				type: 'success',
				title: "Congratulations!", 
				html: results.message+' <br><br><b>Discount : [ '+ results.discount+ ' ]</b>'
			});
			
		}else{
			swal("Oops!", results.message, "error");
		}
		
		
		$('.wheel-horizontal-spin-button:disabled').prop('disabled',false).text('Spin');
		
	});
	
	
	
	
	
});