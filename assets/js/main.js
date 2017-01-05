/* Coming Soon Style 1 */
function coming_soon_1() {
    (function ($) {

        // initialize counter
        $('#countdown').countdown('2017/01/01 00:00:00', function (event) {
            $('#countdown #days').html(event.strftime('%D'));
            $('#countdown #hours').html(event.strftime('%H'));
            $('#countdown #minutes').html(event.strftime('%M'));
            $('#countdown #seconds').html(event.strftime('%S'));
        });

        // initialize email form
        $('form').parsley();

    })(jQuery);
}




/* Contact Us page */
function contact_us() {
    (function ($) {

        // initialize email form
        $('#contact-2,#contact-3,#contact-4').parsley();

        // match height
        $('.contact-2 .part,#contact-2 .col-md-6,.contact-4 .wrapper').matchHeight();

    })(jQuery);
}




/* Content blocks page */
function content_blocks() {
    (function ($) {

        // match height
        $('.feature,.part').matchHeight();

        // modify some parameters
        sr.reveal('.foo', {
            duration: 700,
            delay: 300,
            distance: '50px',
            viewFactor: 0.5,
            easing: 'ease-in-out'
        });
        //modify on scroll reveal animation
        sr.reveal('.content-block-2 .foo', 100);
        sr.reveal('.content-block-3 .foo', 100);
        sr.reveal('.content-block-4 .foo', 150);
        sr.reveal('.content-block-5 .foo', 90);
        sr.reveal('.content-block-6 .foo', 90);
        sr.reveal('.content-block-11 .foo', 90);
        sr.reveal('.content-block-13 .foo', 120);
        sr.reveal('.content-block-14 .foo', 120);

    })(jQuery);
}




/* Footers page */
function footers() {
    (function ($) {

        // match height plugin
        $('.footer-4 .col-md-3').matchHeight();

    })(jQuery);
}




/* Hero Headers initialization */
function hero_headers() {
    (function ($) {

        // slider/carousel
        var owl = $('#hero-header-11');
        owl.owlCarousel({
            singleItem: true,
            autoPlay: true,
            navigation: false,
            slideSpeed: 300,
            paginationSpeed: 500,
            rewindSpeed: 400,
            autoHeight: true
        });

        // slider/carousel
        var owl2 = $('#hero-header-1');
        owl2.owlCarousel({
            singleItem: true,
            autoPlay: true,
            navigation: false,
            slideSpeed: 300,
            paginationSpeed: 500,
            rewindSpeed: 400,
            autoHeight: true,
            addClassActive: true,
            afterMove: function () {
                $('.owl-item.active h2').addClass('animated fadeInUpSmall');
                $('.owl-item.active p').addClass('animated-md fadeInUpSmall');
                $('.owl-item.active .bttn').addClass('animated-lt fadeInUpSmall');
            },
            beforeMove: function () {
                $('.owl-item h2').removeClass('animated fadeInUpSmall');
                $('.owl-item p').removeClass('animated-md fadeInUpSmall');
                $('.owl-item .bttn').removeClass('animated-lt fadeInUpSmall');
            },
        });

        $('.owl-item.active h2').addClass('animated fadeInUpSmall');
        $('.owl-item.active p').addClass('animated-md fadeInUpSmall');
        $('.owl-item.active .bttn').addClass('animated-lt fadeInUpSmall');

        // next slide
        $('.next-feature').on('click', function (event) {
            owl2.trigger('owl.next');
        });

        // prev slide
        $('.prev-feature').on('click', function (event) {
            owl2.trigger('owl.prev');
        });

        // handle cursor keys		
        var owlbttn = $('#hero-header-11').data('owlCarousel');
        var owlbttn2 = $('#hero-header-1').data('owlCarousel');
        $(document.documentElement).keyup(function (event) {
            if (event.keyCode === 37) {
                owlbttn.prev();
                owlbttn2.prev();
            } else if (event.keyCode === 39) {
                owlbttn.next();
                owlbttn2.next();
            }
        });

        // video popup
        $('.popup-video').magnificPopup({
			disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade my-video',
			preloader: false
        });

        // initialize counter
        $('#countdown').countdown('2017/09/12 00:00:00', function (event) {
            $('#countdown #days').html(event.strftime('%D'));
            $('#countdown #hours').html(event.strftime('%H'));
            $('#countdown #minutes').html(event.strftime('%M'));
            $('#countdown #seconds').html(event.strftime('%S'));
        });

    })(jQuery);
}




/* Portfolio page */
function portfolio() {
    (function ($) {

        // masonry grid
        var $grid = $('.portfolio-2 .grid').masonry({
            itemSelector: '.grid-item'
        });
        $grid.imagesLoaded().progress(function () {
            $grid.masonry('layout');
        });

    })(jQuery);
}




/* Price Table section */
function price_table() {
    (function ($) {

        // match height
        $('.price-2 .table-wrapper .features').matchHeight();

        // modify some scrollreveal parameters
        sr.reveal('.foo', {
            duration: 700,
            delay: 300,
            distance: '50px',
            viewFactor: 0.5,
            easing: 'ease-in-out'
        });
        //modify on scroll reveal animation
        sr.reveal('.price-1 .foo', 100);
        sr.reveal('.price-2 .foo', 100);
        sr.reveal('.price-3 .foo', 100);
        sr.reveal('.price-4 .foo', 100);

    })(jQuery);
}




/* Promo page */
function promo() {
    (function ($) {

        // video popup
        $('.popup-video').magnificPopup({
			disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade my-video',
			preloader: false
        });

    })(jQuery);
}




/* Sign-In page */
function sign_in() {
    (function ($) {

        //match height
        $('.eq-ht').matchHeight();

    })(jQuery);
}




/* team page */
function team() {
    (function ($) {

        // equal height
        $('.part').matchHeight();

        // team-3 slider/carousel
        var owl = $('#team-3');
        owl.owlCarousel({
            singleItem: true,
            autoPlay: true,
            navigation: false,
            slideSpeed: 300,
            paginationSpeed: 500,
            rewindSpeed: 400
        });

        // modify some scrollreveal parameters
        sr.reveal('.foo', {
            duration: 700,
            delay: 300,
            distance: '50px',
            viewFactor: 0.5,
            easing: 'ease-in-out'
        });
        //modify on scroll reveal animation
        sr.reveal('.team-2 .foo', 100);

    })(jQuery);
}




/* testimonial page */
function testimonial() {
    (function ($) {

        // testimonial carousel 2
        var owl = $('#testimonial2');
        owl.owlCarousel({
            items: 3,
            autoPlay: true,
            navigation: false,
            slideSpeed: 300,
            paginationSpeed: 300,
            rewindSpeed: 400,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 2],
            itemsTablet: [768, 2],
            itemsMobile: [540, 1],
        });

        $('.next-feature').on('click', function (event) {
            owl.trigger('owl.next');
        });

        $('.prev-feature').on('click', function (event) {
            owl.trigger('owl.prev');
        });


        // testimonial carousel 3	
        var owl2 = $('#testimonial3');
        owl2.owlCarousel({
            singleItem: true,
            autoPlay: true,
            navigation: false,
            slideSpeed: 300,
            paginationSpeed: 300,
            rewindSpeed: 400
        });

        $('.next-feature2').on('click', function (event) {
            owl2.trigger('owl.next');
        });

        $('.prev-feature2').on('click', function (event) {
            owl2.trigger('owl.prev');
        });


        // testimonial carousel 5	
        var owl3 = $('#testimonial-5');
        owl3.owlCarousel({
            items: 3,
            autoPlay: true,
            navigation: false,
            slideSpeed: 300,
            paginationSpeed: 300,
            rewindSpeed: 400,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 2],
            itemsTablet: [768, 2],
            itemsMobile: [540, 1]
        });


        // masonry layout
        $('.testimonial-4 .all-details-wrapper').masonry({
            itemSelector: '.col-xs-4'
        });

    })(jQuery);
}




/* clients page */
function clients() {
    (function ($) {

        // Clients carousel
        var owl = $('#clients-4');
        owl.owlCarousel({
            items: 4,
            autoPlay: true,
            pagination: false,
            slideSpeed: 300,
            paginationSpeed: 300,
            rewindSpeed: 400,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 3],
            itemsMobile: [380, 2]
        });

        $('.next-client').on('click', function (event) {
            owl.trigger('owl.next');
        });

        $('.prev-client').on('click', function (event) {
            owl.trigger('owl.prev');
        });

    })(jQuery);
}




/* Counters */
function counters() {
    (function ($) {

        $('.counter').counterUp({
            delay: 50,
            time: 2000
        });

    })(jQuery);
}



// google map initialization
var marker;

function initialize() {

    // change map styles
    var styles = [
        {
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]
              },
        {
            featureType: 'transit',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]
		      },
        {
            featureType: 'poi',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]

		      },
        {
            featureType: 'poi.government',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]

			  },
        {
            featureType: 'poi.sport_complex',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]

			  },
        {
            featureType: 'poi.attraction',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]

			 },
        {
            featureType: 'poi.business',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]

		     },
        {
            featureType: 'transit',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]
		     },
        {
            featureType: 'transit.station',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]

			 },
        {
            featureType: 'landscape',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]

			 },
        {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]
			 },
        {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]
		     },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]
			 }
           ];

    var my_position = {
        lat: -37.817214,
        lng: 144.955923
    };

    var mapProp = {
        zoom: 14,
        center: my_position,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        mapTypeControl: false,
        scrollwheel: false
    };

    // icon address
    var iconBase = 'assets/img/other/';
    // map goes here 
    var map = new google.maps.Map(document.getElementById('googleMap'), mapProp);

    // set new map style here
    map.setOptions({
        styles: styles
    });
    marker = new google.maps.Marker({
        position: my_position,
        icon: iconBase + 'icon-location.png'
    });
    marker.setMap(map);
    var contentString = 'Envato Inc.';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
        map.setCenter(marker.getPosition());
        map.setZoom(14);
    });
    // to center the marker always on zoom-in-out
    google.maps.event.addListener(map, 'center_changed', function () {
        window.setTimeout(function () {
            map.panTo(marker.getPosition());
        }, 0);
    });
}