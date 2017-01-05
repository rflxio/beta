// Scripts for demo 3 / Home Classic
function demo_3() {
    (function ($) {
        // slider/carousel
        var owl = $('#hero-header-1');
        owl.owlCarousel({
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
            owl.trigger('owl.next');
        });

        // prev slide
        $('.prev-feature').on('click', function (event) {
            owl.trigger('owl.prev');
        });

        // handle cursor keys		
        var owlbttn = $('#hero-header-1').data('owlCarousel');
        $(document.documentElement).keyup(function (event) {
            if (event.keyCode == 37) {
                owlbttn.prev();
            } else if (event.keyCode == 39) {
                owlbttn.next();
            }
        });

        // goto top arrow
        scroll_top_duration = 500,
            $back_to_top = $('.footer-top');
        //smooth scroll to top
        $back_to_top.on('click', function (event) {
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0,
            }, scroll_top_duration);
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
        sr.reveal('.content-block-3 .foo', 100);
        sr.reveal('.content-block-11 .foo', 100);
        sr.reveal('.price-1 .foo', 100);

    })(jQuery);
}