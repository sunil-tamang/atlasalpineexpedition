// https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js
(function(factory){if(typeof define==="function"&&define.amd){define(["jquery"],function($){return factory($)})}else if(typeof module==="object"&&typeof module.exports==="object"){exports=factory(require("jquery"))}else{factory(jQuery)}})(function($){$.easing.jswing=$.easing.swing;var pow=Math.pow,sqrt=Math.sqrt,sin=Math.sin,cos=Math.cos,PI=Math.PI,c1=1.70158,c2=c1*1.525,c3=c1+1,c4=2*PI/3,c5=2*PI/4.5;function bounceOut(x){var n1=7.5625,d1=2.75;if(x<1/d1){return n1*x*x}else if(x<2/d1){return n1*(x-=1.5/d1)*x+.75}else if(x<2.5/d1){return n1*(x-=2.25/d1)*x+.9375}else{return n1*(x-=2.625/d1)*x+.984375}}$.extend($.easing,{def:"easeOutQuad",swing:function(x){return $.easing[$.easing.def](x)},easeInQuad:function(x){return x*x},easeOutQuad:function(x){return 1-(1-x)*(1-x)},easeInOutQuad:function(x){return x<.5?2*x*x:1-pow(-2*x+2,2)/2},easeInCubic:function(x){return x*x*x},easeOutCubic:function(x){return 1-pow(1-x,3)},easeInOutCubic:function(x){return x<.5?4*x*x*x:1-pow(-2*x+2,3)/2},easeInQuart:function(x){return x*x*x*x},easeOutQuart:function(x){return 1-pow(1-x,4)},easeInOutQuart:function(x){return x<.5?8*x*x*x*x:1-pow(-2*x+2,4)/2},easeInQuint:function(x){return x*x*x*x*x},easeOutQuint:function(x){return 1-pow(1-x,5)},easeInOutQuint:function(x){return x<.5?16*x*x*x*x*x:1-pow(-2*x+2,5)/2},easeInSine:function(x){return 1-cos(x*PI/2)},easeOutSine:function(x){return sin(x*PI/2)},easeInOutSine:function(x){return-(cos(PI*x)-1)/2},easeInExpo:function(x){return x===0?0:pow(2,10*x-10)},easeOutExpo:function(x){return x===1?1:1-pow(2,-10*x)},easeInOutExpo:function(x){return x===0?0:x===1?1:x<.5?pow(2,20*x-10)/2:(2-pow(2,-20*x+10))/2},easeInCirc:function(x){return 1-sqrt(1-pow(x,2))},easeOutCirc:function(x){return sqrt(1-pow(x-1,2))},easeInOutCirc:function(x){return x<.5?(1-sqrt(1-pow(2*x,2)))/2:(sqrt(1-pow(-2*x+2,2))+1)/2},easeInElastic:function(x){return x===0?0:x===1?1:-pow(2,10*x-10)*sin((x*10-10.75)*c4)},easeOutElastic:function(x){return x===0?0:x===1?1:pow(2,-10*x)*sin((x*10-.75)*c4)+1},easeInOutElastic:function(x){return x===0?0:x===1?1:x<.5?-(pow(2,20*x-10)*sin((20*x-11.125)*c5))/2:pow(2,-20*x+10)*sin((20*x-11.125)*c5)/2+1},easeInBack:function(x){return c3*x*x*x-c1*x*x},easeOutBack:function(x){return 1+c3*pow(x-1,3)+c1*pow(x-1,2)},easeInOutBack:function(x){return x<.5?pow(2*x,2)*((c2+1)*2*x-c2)/2:(pow(2*x-2,2)*((c2+1)*(x*2-2)+c2)+2)/2},easeInBounce:function(x){return 1-bounceOut(1-x)},easeOutBounce:bounceOut,easeInOutBounce:function(x){return x<.5?(1-bounceOut(1-2*x))/2:(1+bounceOut(2*x-1))/2}})});


// Preserve the existing modal dismissal outside its content.
$(document).on('click', function () { hideModal(); });

// ----------------- Scroll Behavior -----------------
function checkScrollTop() {
  if ($("#twoCol").length) stickElement();

  if ($(window).scrollTop() > 0) {
    hideCallNowAdd();

  } else {
    hideCallNowRemove();


  }
}


	$(document).ready(function(){
		// Gallery
		if($('.image-popup-vertical-fit').length){
			$('.image-popup-vertical-fit').magnificPopup({
			type: 'image',
			mainClass: 'mfp-with-zoom',
			gallery:{
				enabled:true
				},

			zoom: {
				enabled: true,
				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				opener: function(openerElement) {

				return openerElement.is('img') ? openerElement : openerElement.find('img');
			}
			}

			});
	}


	// Hide Call Now btn if the input is focused
	hideCallNow();


	// Testimonials
    if($(".testimonial").length){
		$('.testimonial').slick({
			arrows: false,
			dots: false,
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			// prevArrow: $(".slide-center-prev"),
			// nextArrow: $(".slide-center-next"),
			adaptiveHeight: true,
			autoplay: true,
			autoplaySpeed: 2000,
			responsive: [
	   {
		 breakpoint: 1024,
		 settings: {
		   slidesToShow: 3,
		   slidesToScroll: 3,
		   infinite: true,
		   arrows: false,
		   dots: false
		 }
	   },
	   {
		 breakpoint: 600,
		 settings: {
			arrows: false,
		   slidesToShow: 2,
		   slidesToScroll: 2
		 }
	   },
	   {
		 breakpoint: 480,
		 settings: {
			arrows: false,
		   slidesToShow: 1,
		   slidesToScroll: 1
		 }
	   }

	 ]
		});
	}


    // if( $('#id_email').length > 0 ) float();


    // Checking the position of scrolling in terms of Top position.
    checkScrollTop();

    //Back To Top
    $(window).scroll(function(){
        checkScrollTop();
		if($("#twoCol").length)
		{
			stickElement();
		}
    });


/************************STICKY ELEMENT START***************************/

	toggleFixed();
	$(window).resize(
		function() {
			adjustWidth();
	});


/************************STICKY ELEMENT END***************************/


	$('#copyright__year').html(function(){
		var today = new Date();
		return today.getFullYear();
	});


    //--------------------Popup YouTube Video------------------

    $('#popupTrigger').click(function(event){
		showModal();
		event.stopPropagation();
	});

	// Load Video
	$('#popupTrigger').click(function(){
		var videoSrc = $(this).data('src');
		$('#video').attr('src',videoSrc);
	});

	// Close Modal
	$('button.close, #myModal').click(function(){
		hideModal();
	});

	// Do nothing when clicking on the modal content
	$('.modal-content').click(function(event){
       event.stopPropagation();
    });

});


// });


//--------------------Popup YouTube Video------------------
function showModal(){
	$('#myModal').fadeIn('slow');
		(function fun(){
			//$('.modal-content').css({'transform':'translateY(-50px)'});
		})();
}
function hideModal(){
	$('#myModal').fadeOut('fast');
    $('#video').attr('src','');
		(function fun2(){
			//$('.modal-content').css({ 'transform':'translateY(0px)' });
		})();
}


// POPUP FORM DIV


$(document).ready(function() {
     $('#trigger1').click(function() {
        $('#youtube_overlay').fadeIn(300);
		
     });

     $('#close-btn').click(function() {
         $('#youtube_overlay').fadeOut(300);
         $('.frame').attr('src', $('.frame').attr('src'));
     });
});


$(document).ready(function() {
    
    // Check if it's a mobile device
    if($(window).width() > 768) {
        
        // Show the popup after 100ms delay
        setTimeout(function() {
            $('.popup_form, .popup_form_wrapper').fadeIn(100);
        }, 100);
    }
    
    // Hide the popup when close button or trippy button is clicked
    $('.popup_close_btn_wrapper, .trippy_btn').click(function(event) {
        event.preventDefault();
        $('.popup_form, .popup_form_wrapper').fadeOut();
    });
});


/* Call Now BTN */
function hideCallNow(){
	$("input, textarea").focusin(function(){
		hideCallNowRemove();
		$('.cart_mob').removeClass("show");
		$('.cart_mob').addClass("hide");
    });
    $("input, textarea").focusout(function(){
		hideCallNowAdd();
		$('.cart_mob').removeClass("hide");
		$('.cart_mob').addClass("show");
    });
}
function hideCallNowRemove(){
	$('.backToTop, .call_now').removeClass("show");
	$('.backToTop, .call_now').addClass("hide");
}
function hideCallNowAdd(){
	$('.backToTop, .call_now').removeClass("hide");
	$('.backToTop, .call_now').addClass("show");
}


/************************STICKY ELEMENT START***************************/
function stickElement(){
	var twoCol = $("#twoCol");
	var hT = $('#scroll-to').offset().top,
		hH = $('#scroll-to').outerHeight(),
		wS = $(window).scrollTop();
		if (wS > hT-66 && wS < (hT+hH-500)){
//			console.log("View");
			twoCol.addClass("fix");
		}
		else{
//			console.log("Not view");
			twoCol.removeClass("fix");
		}
}


/************************STICKY ELEMENT END***************************/

// document.addEventListener("DOMContentLoaded", function() {
//     const searchBox = document.getElementById('search-box');


/* Teams Filter Button  */
document.addEventListener('DOMContentLoaded', function() {
    // Get all the 'a' tags containing the team members
    const $allMembers = [...document.querySelectorAll('.team-members > a')];
    const $teamMembersWrapper = document.querySelector('.team-members');

    function filterMembers(role) {
        // Hide all members first
        $allMembers.forEach(member => member.style.display = 'none');

        // Show the members that match the filter (or all, if the filter is "all")
        $allMembers.forEach(member => {
            const child = member.querySelector('.team-member');
            if (role === "all" || child.getAttribute('data-role') === role) {
                member.style.display = 'block';
            }
        });
    }

    document.querySelector('.filter-buttons').addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            // Update button states
            document.querySelectorAll('.filter-buttons button').forEach(button => button.classList.remove('active'));
            e.target.classList.add('active');

            // Apply the filter
            filterMembers(e.target.getAttribute('data-filter'));
        }
    });

    // Default filter
    filterMembers('Climbing Guide');
});


// Treks Filter

  $(document).ready(function() {
    const $treksWrapper = $('.treks_wrapper');
    const $allTreks = $('.trekss').detach(); // Detach and store all treks initially
    const $buttons = $('.filter-trek button');

    function filterTreks(region) {
        $treksWrapper.empty(); // Remove all trek elements from the wrapper
        $allTreks.filter(`[data-region="${region}"]`).appendTo($treksWrapper); // Append the filtered treks
    }

    $buttons.click(function() {
        $buttons.removeClass('active');
        $(this).addClass('active');
        filterTreks($(this).attr('data-region'));
    });

    // By default, show only Everest Region treks
    filterTreks('everest');
});


//Video Banner


//     let observer = new IntersectionObserver(handleIntersect, options);
//     observer.observe(document.querySelector("#bannerVideo"));


// FAQ JS CODE 
document.addEventListener('DOMContentLoaded', function() { 
    // Get all the accordion buttons
    var acc = document.getElementsByClassName("faq-toggle");
    
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            // Toggle the "active" class to highlight the clicked button
            this.classList.toggle("active");

            // Toggle between hiding and showing the associated panel
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {
    var acc = document.getElementsByClassName("accordion");

    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");

            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
});


// New Filter

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.update__trek-card');
  const filterButtons = document.querySelectorAll('.update__filter-btn');
  const radios = document.querySelectorAll('input[type="radio"]');
  const clearBtn = document.getElementById('update__clear-filters');

  const getFilters = () => ({
    category: document.querySelector('.update__filter-btn.active')?.dataset.value || null,
    difficulty: document.querySelector('input[name="difficulty"]:checked')?.value || null,
    region: document.querySelector('input[name="region"]:checked')?.value || null
  });

  const applyFilters = () => {
    const filters = getFilters();

    cards.forEach(card => {
      const visible = Object.entries(filters).every(([key, value]) =>
        !value || card.dataset[key] === value
      );
      card.style.display = visible ? 'block' : 'none';
    });
  };

  // Filter button click
  filterButtons.forEach(btn =>
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    })
  );

  // Radio change
  radios.forEach(radio =>
    radio.addEventListener('change', applyFilters)
  );

  // Clear filters
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      radios.forEach(r => (r.checked = false));
      applyFilters();
    });
  }
});
