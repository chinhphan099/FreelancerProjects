var log = console.log;

/*!
	devtools-detect
	Detect if DevTools is open
	https://github.com/sindresorhus/devtools-detect
	by Sindre Sorhus
	MIT License
*/

(function () {
	'use strict';
	var devtools = {
		open: false,
		orientation: null
	};
	var threshold = 160;
	var emitEvent = function (state, orientation) {
		window.dispatchEvent(new CustomEvent('devtoolschange', {
			detail: {
				open: state,
				orientation: orientation
			}
		}));
	};

	setInterval(function () {
		var widthThreshold = window.outerWidth - window.innerWidth > threshold;
		var heightThreshold = window.outerHeight - window.innerHeight > threshold;
		var orientation = widthThreshold ? 'vertical' : 'horizontal';

		if (!(heightThreshold && widthThreshold) &&
      ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
			if (!devtools.open || devtools.orientation !== orientation) {
				emitEvent(true, orientation);
			}

			devtools.open = true;
			devtools.orientation = orientation;
		} else {
			if (devtools.open) {
				emitEvent(false, null);
			}

			devtools.open = false;
			devtools.orientation = null;
		}
	}, 500);

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = devtools;
	} else {
		window.devtools = devtools;
	}
})();


jQuery(document).ready(function($){
	//If Inspector is opened
	
	//var ___element = new Image; var ___toInteger = false; ___element.__defineGetter__("id", function() { ___toInteger = true; }); setInterval(function() { ___toInteger = false; console.log(___element); if(___toInteger) window.location = "http://www.22Codes.com/cheating.html"; }, 1000); setInterval(function() { if(!___toInteger && window.devtools.open === true) window.location = "http://www.22Codes.com/cheating.html"; },1000);
	
	
var ex1Items = [
		{
			name: 'Adnane',
		},{
			name: 'Zarrouk',
		},{
			name: 'Aberdeen',
		},{
			name: 'Aliz',
		},{
			name: 'Clea',
		},{
			name: 'Lucas',
		},{
			name: 'Ethan',
		},{
			name: 'Aiden',
		},{
			name: 'Federica',
		},{
			name: 'Emanuella',
		},{
			name: 'Oliver',
		},{
			name: 'Grayson',
		},{
			name: 'Kitty',
		},{
			name: 'Samuel',
		},{
			name: 'Trixie',
		},{
			name: 'Cicely',
		},{
			name: 'Nathan',
		}
];
	
	
	/* Example 1 */
	$('.example-1 .roller').eroller({
		items	: ex1Items,
		key		: 'name',
	});
	
	for(var x = 0; x < ex1Items.length; x++){
		$('.example-1 .select-item').append('<option>'+(ex1Items[x].name)+'</option>');
	}
	
	var easings = {
				default			: 'cubic-bezier(0, 0, 0.28, 1)',
				linear			: 'cubic-bezier(0, 0, 1, 1)',
				easeInSine		: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
				easeOutSine		: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
				easeInOutSine	: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
				easeInQuad		: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
				easeOutQuad		: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				easeInOutQuad	: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
				easeInCubic		: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
				easeOutCubic	: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
				easeInOutCubic	: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
				easeInQuart		: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
				easeOutQuart	: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
				easeInOutQuart	: 'cubic-bezier(0.77, 0, 0.175, 1)',
				easeInQuint		: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
				easeOutQuint	: 'cubic-bezier(0.23, 1, 0.32, 1)',
				easeInOutQuint	: 'cubic-bezier(0.86, 0, 0.07, 1)',
				easeInExpo		: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
				easeOutExpo		: 'cubic-bezier(0.19, 1, 0.22, 1)',
				easeInOutExpo	: 'cubic-bezier(1, 0, 0, 1)',
				easeInCirc		: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
				easeOutCirc		: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
				easeInOutCirc	: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
				easeInBack		: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
				easeOutBack		: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				easeInOutBack	: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
			};
	$.each(easings,function(i){
		$('.easings').append(i+'</br>');
	});
	
	//Buttons
	var direction1	= 'left';
	$('.example-1').on('click','.stop-spin',function(){
		$('.example-1 .roller').eroller('stop');
	});
	
	
	$('.example-1').on('click','.start-spin',function(){
		var selectedDirection = $('.example-1 .select-direction');
		if (typeof selectedDirection[0] !== 'undefined' && selectedDirection[0].value !== undefined && selectedDirection[0].value !== direction1){
			
			direction1	=  selectedDirection[0].value;
			
			$('.example-1 .roller').eroller('destroy').eroller({
				items	: ex1Items,
				key		: 'name',
				direction		: direction1,
			});
		}
		
		var selectedWinner = $('.example-1 .select-item');
		if (typeof selectedWinner[0] !== 'undefined' && selectedWinner[0].value !== undefined){
			var getWinner	=  selectedWinner[0].value;
			$('.example-1 .roller').eroller('start','name',getWinner,8000);
			$(".example-1 .start-spin").prop("disabled", true);
			$(".example-1 .panel-tabs a").addClass("disabled");
		}
	});
	
	$('.example-1').on('eroller.complete','.roller',function(event,item){
		$(".example-1 .start-spin").prop("disabled", false);
		$(".example-1 .panel-tabs a").removeClass("disabled");
		
	});
	$('.example-1').on('eroller.stop','.roller',function(event,item){
		$(".example-1 .start-spin").prop("disabled", false);
		$(".example-1 .panel-tabs a").removeClass("disabled");
		
	});
	
	
	
	
	
	
	
	
	
	
	var items = [
	{
		//class:"red",
		text: '<i class="fa fa-cubes" aria-hidden="true"></i>',
		value: 'Cubes',
		message: 'You win a Cubes',
	},{
		//class:"gray",
		text: '<i class="fa fa-gift" aria-hidden="true"></i>',
		value: 'Gift',
		message: 'You win a Gift',
	},{
		//class:"red",
		text: '<i class="fa fa-leaf" aria-hidden="true"></i>',
		value: 'Leaf',
		message: 'You win a Leaf',
	},{
		//class:"gray",
		text: '<i class="fa fa-heartbeat" aria-hidden="true"></i>',
		value: 'Heartbeat',
		message: 'You win a Heartbeat',
	},{
		//class:"red",
		text: '<i class="fa fa-key" aria-hidden="true"></i>',
		value: 'Key',
		message: 'You win a Key',
	},{
		//class:"gray",
		text: '<i class="fa fa-sun-o" aria-hidden="true"></i>',
		value: 'Sun',
		message: 'You win a Sun',
	},{
		//class:"red",
		text: '<i class="fa fa-taxi" aria-hidden="true"></i>',
		value: 'Taxi',
		message: 'You win a Taxi',
	},{
		//class:"green",
		text: '<i class="fa fa-futbol-o" aria-hidden="true"></i>',
		value: 'Ball',
		message: 'You win a Ball',
	},{
		//class:"gray",
		text: '<i class="fa fa-snowflake-o" aria-hidden="true"></i>',
		value: 'Snow',
		message: 'You win a Snow',
	},{
		//class:"red",
		text: '<i class="fa fa-refresh fa-spin" aria-hidden="true"></i>',
		value: 'Spin',
		message: 'You win a Spin',
	},{
		//class:"gray",
		text: '<i class="fa fa-book" aria-hidden="true"></i>',
		value: 'Book',
		message: 'You win a Book',
	},{
		//class:"red",
		text: '<i class="fa fa-battery-full" aria-hidden="true"></i>',
		value: 'Battery',
		message: 'You win a Battery',
	},{
		//class:"gray",
		text: '<i class="fa fa-beer" aria-hidden="true"></i>',
		value: 'Beer',
		message: 'You win a Beer',
	},{
		//class:"red",
		text: '<i class="fa fa-gamepad" aria-hidden="true"></i>',
		value: 'Gamepad',
		message: 'You win a Gamepad',
	},{
		//class:"gray",
		text: '<i class="fa fa-puzzle-piece" aria-hidden="true"></i>',
		value: 'Puzzle Piece',
		message: 'You win a Puzzle Piece',
	}
];
	/* Example 2 */
	$('.example-2 .roller').eroller({
		items	: items,
		key		: 'text',
		align		: 'v',
	});
	
	// Buttons
	var direction2 = 'top';
	$('.example-2').on('click','.start-spin',function(){
		
		var selectedDirection2 = $('.example-2 .select-direction');
		if (typeof selectedDirection2[0] !== 'undefined' && selectedDirection2[0].value !== undefined  && selectedDirection2[0].value !== direction2){
			direction2	=  selectedDirection2[0].value;
			
			$('.example-2 .roller').eroller('destroy').eroller({
				items	: items,
				key		: 'text',
				align	: 'v',
				direction		: direction2,
			});
		}
		
		var randomWinner  = items[Math.floor(Math.random() * items.length)];;
		$('.example-2 .roller').eroller('start','value',randomWinner.value,8000);
		$(".example-2 .panel-tabs a").addClass("disabled");
		
		$(".example-2 .start-spin").prop("disabled", true);
		
	});
	
	//Events
	$('.example-2').on('eroller.start','.roller',function(){
		$('.example-2 b.message').text('Rolling...');
		
	});
	
	$('.example-2').on('eroller.complete','.roller',function(event,item){
		$(".example-2 .start-spin").prop("disabled", false);
		$('.example-2 b.message').html(item.message);
		$(".example-2 .panel-tabs a").removeClass("disabled");
	});
	
	
	
	/* Example 3 */
	function getDuplicates(array) {
		var sorted_arr = array.slice().sort(); // You can define the comparing function here. 
                                     // JS by default uses a crappy string compare.
                                     // (we use slice to clone the array so the
                                     // original array won't be modified)
		var results = [];
		var c = 0;
		for (var i = 0; i < sorted_arr.length - 1; i++) { 
			if (sorted_arr[i + 1] == sorted_arr[i]) {
				results[c] = sorted_arr[i];
				c++;
			}
		}
		return results;
	}
	
	
	$('.example-3 .roller-1').eroller({
		items	: items,
		key		: 'text',
		align   : 'v',
	});
	$('.example-3 .roller-2').eroller({
		items	: items,
		key		: 'text',
		align   : 'v',
		direction		: 'top',
	});
	$('.example-3 .roller-3').eroller({
		items	: items,
		key		: 'text',
		align   : 'v',
	});
	
	
	// Buttons
	$('.example-3').on('click','.start-spin',function(){
		var randomWinner  = items[Math.floor(Math.random() * items.length)];
		$('.example-3 .roller-1').eroller('start','value',randomWinner.value,10000);
		randomWinner  = items[Math.floor(Math.random() * items.length)];
		$('.example-3 .roller-2').eroller('start','value',randomWinner.value,10200);
		randomWinner  = items[Math.floor(Math.random() * items.length)];
		$('.example-3 .roller-3').eroller('start','value',randomWinner.value,9800);
		
		$('.example-3 b.message').text('Rolling...');
		$(".example-3 .start-spin").prop("disabled", true);
		$(".example-3 .panel-tabs a").addClass("disabled");
	});
	
	//Events
	var winners = [],calc = 0;
	$('.example-3').on('eroller.complete','.roller-1 ,.roller-2 ,.roller-3',function(event,item){
		
		winners[calc] = item.value;
		++calc;
		if(calc === 3){
			var wins = getDuplicates(winners);
			
			if( wins.length === 0 )
				$('.example-3 b.message').html('You win Nothing' );
			else{
				$('.example-3 b.message').html('You win ' +(wins.length + 1)+ ' '+wins[0]+'\'s' );
			}
			$(".example-3 .start-spin").prop("disabled", false);
			$(".example-3 .panel-tabs a").removeClass("disabled");
			calc = 0;
		}
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/* Example 4 */
	function vsWinners(items,exclude){
		
		var winner = items[Math.floor(Math.random() * items.length)];
		
		if(winner.playerName === exclude)
			return vsWinners(items,exclude);
		
		
		
		return winner;
	}
	
	var playersData = [
		{
			image : './players/player-1.jpg',
			playerName: 'Aberdeen',
		},{
			image : './players/player-2.jpg',
			playerName: 'Aliz',
		},{
			image : './players/player-3.jpg',
			playerName: 'Clea',
		},{
			image : './players/player-4.jpg',
			playerName: 'Lucas',
		},{
			image : './players/player-5.jpg',
			playerName: 'Ethan',
		},{
			image : './players/player-6.jpg',
			playerName: 'Aiden',
		},{
			image : './players/player-7.jpg',
			playerName: 'Federica',
		},{
			image : './players/player-8.jpg',
			playerName: 'Emanuella',
		},{
			image : './players/player-9.jpg',
			playerName: 'Oliver',
		},{
			image : './players/player-10.jpg',
			playerName: 'Grayson',
		},{
			image : './players/player-11.jpg',
			playerName: 'Kitty',
		},{
			image : './players/player-12.jpg',
			playerName: 'Samuel',
		},{
			image : './players/player-13.jpg',
			playerName: 'Trixie',
		},{
			image : './players/player-14.jpg',
			playerName: 'Cicely',
		},{
			image : './players/player-15.jpg',
			playerName: 'Nathan',
		}
	];
	$('.example-4 .player-1').eroller({
		items		: playersData,
		align		: 'v',
		indicator   : false,
	});
	$('.example-4 .player-2').eroller({
		items		: playersData,
		align		: 'v',
		direction	: 'top',
		indicator   : false,
	});
	
	
	// Buttons
	
	$('.example-4').on('click','.start-spin',function(){
		
		
		var player1  = playersData[Math.floor(Math.random() * playersData.length)];
		$('.example-4 .player-1').eroller('start','playerName',player1.playerName, 7000 );
		
		var player2  = vsWinners(playersData,player1.playerName);
		$('.example-4 .player-2').eroller('start','playerName',player2.playerName, 7000 );
		
		
		$('.example-4 .player-1-name').html('&nbsp;');
		$('.example-4 .player-2-name').html('&nbsp;');
		
		
		$(".example-4 .start-spin").prop("disabled", true);
		$(".example-4 .panel-tabs a").addClass("disabled");
	});
	
	//Events
	
	
	$('.example-4').on('eroller.complete','.player-1',function(event,item){
		$('.example-4 .player-1-name').html(item.playerName);
	});
	
	$('.example-4').on('eroller.complete','.player-2',function(event,item){
		$('.example-4 .player-2-name').html(item.playerName);
	});
	
	
	var calc = 0;
	$('.example-4').on('eroller.complete','.player-1 ,.player-2',function(event,item){
		++calc;
		if(calc === 2){
			$(".example-4 .start-spin").prop("disabled", false);
			$(".example-4 .panel-tabs a").removeClass("disabled");
			calc = 0;
		}
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/* Example 10 */
	$('.example-10 .roller').eroller({
		items	: items,
		key		: 'text',
	});
	
	
	//Buttons
	$('.example-10').on('click','.start-spin',function(){
		
		var randomWinner  = items[Math.floor(Math.random() * items.length)];;
		$('.example-10 .roller').eroller('start','value',randomWinner.value,8000);
		
	});
	
	
	$('.example-10').on('click','.finish-spin',function(){
		
		$('.example-10 .roller').eroller('finish');
		$(".example-10 .start-spin").prop("disabled", false);
		
	});
	
	
	$('.example-10').on('click','.clear-spin',function(){
		
		$('.example-10 .roller').eroller('clear');
		$(".example-10 .start-spin").prop("disabled", false);
		
	});
	
	$('.example-10').on('click','.destroy-spin',function(){
		
		$('.example-10 .roller').eroller('destroy');
		$('.example-10 pre.roller-log').append('Roller : Destroyed<br>');
		$(".example-10 button:not(.reinit-spin)").prop("disabled", true);
		
	});
	
	$('.example-10').on('click','.reinit-spin',function(){
		
		$('.example-10 .roller').eroller('destroy').eroller({
			items : items
		});
		
		$('.example-10 pre.roller-log').append('Roller : Re Initialized<br>');
		$(".example-10 button").prop("disabled", false);
	});
	
	
	
	
	//Events
	$('.example-10').on('eroller.init','.roller',function(event,progress){
		$('.example-10 pre.roller-log').append('Roller : Initialized<br>');
	});
	
	
	
	$('.example-10').on('eroller.start','.roller',function(){
		$('.example-10 pre.roller-log').append('Roller : Started<br>');
	});
	
	
	$('.example-10').on('eroller.complete','.roller',function(event,item){
		$('.example-10 pre.roller-log').append('Roller : Completed - Message : '+item.message+'<br>');
		$(".example-10 .start-spin").prop("disabled", false);
	});
	
	$('.example-10').on('eroller.clear','.roller',function(){
		$('.example-10 pre.roller-log').append('Roller : Cleared<br>');
	});
	
	$('.example-10').on('eroller.finish','.roller',function(item){
		$('.example-10 pre.roller-log').append('Roller : Finished<br>');
	});
});