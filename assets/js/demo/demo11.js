// Scripts for demo 11 / Home Portfolio
function demo_11() {
    (function ($) {

        // masonry grid
        var $grid = $('.portfolio-2 .grid').masonry({
            itemSelector: '.grid-item'
        });
        $grid.imagesLoaded().progress(function () {
            $grid.masonry('layout');
        });

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

    })(jQuery);
}