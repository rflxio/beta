// Scripts for demo 4 / Home Corporate
function demo_4() {
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

        // handle cursor keys		
        var owlbttn = $('#hero-header-11').data('owlCarousel');
        $(document.documentElement).keyup(function (event) {
            if (event.keyCode == 37) {
                owlbttn.prev();
            } else if (event.keyCode == 39) {
                owlbttn.next();
            }
        });

        // match height
        $('.price-2 .table-wrapper .features,.content-block-15 .part').matchHeight();

        // modify some scrollreveal parameters
        sr.reveal('.foo', {
            duration: 700,
            delay: 300,
            distance: '50px',
            viewFactor: 0.5,
            easing: 'ease-in-out'
        });
        //modify on scroll reveal animation
        sr.reveal('.content-block-12 .foo', 100);
        sr.reveal('.price-2 .foo', 100);

    })(jQuery);
}