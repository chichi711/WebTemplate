AOS.init({
	duration: 800,
	easing: 'slide',
	once: false
});

jQuery(document).ready(function ($) {








	let siteCarousel = function () {











		$('.slide-one-item').owlCarousel({
			center: false,
			items: 1,
			loop: true,
			stagePadding: 0,
			margin: 0,
			smartSpeed: 1000,
			autoplay: true,
			pauseOnHover: false,
			dots: true,
			nav: false,
			navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
		});








	};
	siteCarousel();

















});





