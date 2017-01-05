// Scripts for demo 6 / Home Landing Page
function demo_6() {
    (function ($) {

        // match height
        $('.price-2 .table-wrapper .features,.content-block-16 .part').matchHeight();

        // modify some scrollreveal parameters
        sr.reveal('.foo', {
            duration: 700,
            delay: 300,
            distance: '50px',
            viewFactor: 0.5,
            easing: 'ease-in-out'
        });
        //modify on scroll reveal animation
        sr.reveal('.content-block-6 .foo', 100);
        sr.reveal('.content-block-5 .foo', 100);
        sr.reveal('.content-block-3 .foo', 100);
        sr.reveal('.content-block-12 .foo', 100);
        sr.reveal('.price-4 .foo', 100);

    })(jQuery);
}