jQuery(document).ready(function($){
	
	
	$(document).on('click','button.main-nav-trigger.js-trigger',function(e){
		e.preventDefault();
		$(this).closest('header.main-header').toggleClass('main-header-nav-visible');
		
	});
	$(document).on('click','header.main-header .main-nav-list a',function(e){
		if($(this).closest('header.main-header').is('.main-header-nav-visible'))
			$(this).closest('header.main-header').removeClass('main-header-nav-visible');
		
	});
	
	// Select all links with hashes
$('.main-header a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - ($('header.main-header').height() + 10)
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
	  
	  window.location.hash = this.hash;
    }
  });
	
	
	
	
	
	
	
	
	
	
	//Prism.highlightElement($('.content pre>code')[0]);
	Prism.highlightAll();
	
	
	$(document).on('click','.show-example',function(e){
		e.preventDefault();
		$(this).find('>span').toggleClass('d-none').closest('.settings').find('>.settings-example').slideToggle();
		
	});
	
	
	
});