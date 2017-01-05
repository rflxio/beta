// Scripts for demo 10 / Home Personal
function demo_10() {
    (function ($) {

        // match height
        $('.part,.contact-4 .wrapper').matchHeight();

        // masonry grid
        var $grid = $('.portfolio-2 .grid').masonry({
            itemSelector: '.grid-item'
        });
        $grid.imagesLoaded().progress(function () {
            $grid.masonry('layout');
        });

        // initialize email form
        $('#contact-4').parsley();

        // testimonial carousel 3	
        var owl = $('#testimonial3');
        owl.owlCarousel({
            singleItem: true,
            autoPlay: true,
            navigation: false,
            slideSpeed: 300,
            paginationSpeed: 300,
            rewindSpeed: 400
        });

        $('.next-feature2').on('click', function (event) {
            owl.trigger('owl.next');
        });

        $('.prev-feature2').on('click', function (event) {
            owl.trigger('owl.prev');
        });

    })(jQuery);
}