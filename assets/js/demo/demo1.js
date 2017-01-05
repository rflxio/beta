// Scripts for demo1 / Home Agency
function demo_1() {
    (function ($) {

        // video popup
        $('.popup-video').magnificPopup({
			disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade my-video',
			preloader: false
        });

        // masonry grid
        var $grid = $('.portfolio-2 .grid').masonry({
            itemSelector: '.grid-item'
        });
        $grid.imagesLoaded().progress(function () {
            $grid.masonry('layout');
        });


        // initialize email form
        $('#contact-4').parsley();

        // match height
        $('.contact-4 .wrapper').matchHeight();


        // modify some scrollreveal parameters
        sr.reveal('.foo', {
            duration: 700,
            delay: 300,
            distance: '50px',
            viewFactor: 0.5,
            easing: 'ease-in-out'
        });
        //modify on scroll reveal animation
        sr.reveal('.content-block-8 .foo', 100);

    })(jQuery);
}