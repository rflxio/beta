// Scripts for demo 8 / Home Minimal
function demo_8() {
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

        // modify some scrollreveal parameters
        sr.reveal('.foo', {
            duration: 700,
            delay: 300,
            distance: '50px',
            viewFactor: 0.5,
            easing: 'ease-in-out'
        });
        //modify on scroll reveal animation
        sr.reveal('.content-block-4 .foo', 120);
        sr.reveal('.content-block-14 .foo', 120);
        sr.reveal('.content-block-12 .foo', 120);

    })(jQuery);
}