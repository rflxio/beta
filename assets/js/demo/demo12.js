// Scripts for demo 12 / One Page Media Agency
function demo_12() {
    (function($) {

        // video popup
        $('.popup-video').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade my-media',
            preloader: false
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

        // initialize email form
        $('#contact-3').parsley();

        // modify some scrollreveal parameters
        sr.reveal('.foo', {
            duration: 700,
            delay: 300,
            distance: '50px',
            viewFactor: 0.5,
            easing: 'ease-in-out'
        });
        //modify on scroll reveal animation
        sr.reveal('.content-block-8 .foo', 120);

    })(jQuery);
}