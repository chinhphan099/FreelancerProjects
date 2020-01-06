jQuery(document).ready(function($){
	//open/close lateral filter
	
	
	$(document).on('click',function(e) { 
		if(!$(e.target).closest('.cd-filter').length && !$(e.target).closest('.swal2-container').length){
			$('.cd-filter').removeClass('filter-is-visible');
		}
	});
	
	
	$(document).on('click','.cd-filter .cd-filter-trigger', function(e){
		e.preventDefault();
		if($(this).closest('.cd-filter').is('.filter-is-visible'))
			$(this).closest('.cd-filter').removeClass('filter-is-visible');
		else
			$(this).closest('.cd-filter').addClass('filter-is-visible');
	});
	
	
	
	

	
	
	
	

	
});



// Super Wheel Script
jQuery(document).ready(function($){
	
	
	
	
	$('.wheel').superWheel({
		slices: [
		{
			text: "20% OFF",
			value: 1,
			message: "You win 20% off",
			discount: "95Qm9tof",
			background: "#364C62",
			
		},
		{
			text: "No luck",
			value: 0,
			message: "You have No luck today",
			discount: "no",
			background: "#9575CD",
			
		},
		{
			text: "30% OFF",
			value: 1,
			message: "You win 30% off",
			discount: "8C46fBeH",
			background: "#E67E22",
			
		},
		{
			text: "Lose",
			value: 0,
			message: "You Lose :(",
			discount: "no",
			background: "#E74C3C",
			
		},
		{
			text: "40% OFF",
			value: 1,
			message: "You win 40% off",
			discount: "aHiH4bfd",
			background: "#2196F3",
			
		},
		{
			text: "Nothing",
			value: 0,
			message: "You get Nothing :(",
			discount: "no",
			background: "#95A5A6",
			
		}
	],
	text : {
		size: 14,
		color: '#fff',
		offset : 8,
		letterSpacing: 0,
		orientation: 'v',
		arc: true
	},
	selector: "value",
	frame: 1,
	type: "spin",
	slice: {
		background: "#333",
		selected: {}
	},
	
	line: {
		
		color: "#ecf0f1"
	},
	outer: {
		color: "#ecf0f1"
	},
	inner: {
		color: "#ecf0f1"
	},
	center: {
		rotate: 1,
	},
	marker: {
		background: "#e53935",
		animate: 1
	},
	});
	
	
	
	var tick = new Audio('../../dist/tick.mp3');
	
	$(document).on('click','.spin-button',function(e){
		
		$('.wheel').superWheel('start','value',Math.floor(Math.random() * 2));
		$(this).prop('disabled',true);
	});
	
	
	$('.wheel').superWheel('onStart',function(results){
		
		
		$('.spin-button').text('Spinning...');
		
	});
	$('.wheel').superWheel('onStep',function(results){
		
		if (typeof tick.currentTime !== 'undefined')
			tick.currentTime = 0;
        
		tick.play();
		
	});
	
	
	$('.wheel').superWheel('onComplete',function(results){
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
		
		
		$('.spin-button:disabled').prop('disabled',false).text('Spin');
		
	});
	
});