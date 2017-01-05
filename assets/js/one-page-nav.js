//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {

    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
            $(".primary-logo").addClass("hide-logo");
            $(".secondary-logo").addClass("show-logo");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
            $(".primary-logo").removeClass("hide-logo");
            $(".secondary-logo").removeClass("show-logo");
        }
    });

    // jQuery for page scrolling feature
    $('a.page-scroll').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 30)
        }, 700, 'easeInOutSine');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a:not(.dropdown-toggle)').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

});