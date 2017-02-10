// Multilevel Navigation/Smartmenu Script
$(function() {
    // activate smartmenu
    $('#main-menu').smartmenus();

    // resize menu
    var $window = $(window),
        $nav = $('#main-menu');
    $window.on('resize', function() {
        if ($window.width() > 991) {
            $nav.show();
            $("#main-menu").addClass("resize-menu");
        } else {
            $nav.hide();
        }
    });

    // menu button
    $(".toggle-bttn").click(function() {
        $nav.slideToggle(300);
        event.preventDefault();
    });

    // menu on-scroll event
    $(window).scroll(function() {
        if ($("nav").offset().top > 50) {
            $("nav").addClass("min-padding");
        } else {
            $("nav").removeClass("min-padding");
        }
    });

    //open/close search field
    $('.search').on('click', function() {
        $('body,html').toggleClass('overflow-hidden');
        $(".search span").toggleClass("search-icon");
        $(".goto-top").toggleClass("hide-arrow");
        if ($('.search-field-wrapper').hasClass('is-visible')) {
            $('.search-field-wrapper').removeClass('is-visible');
        } else {
            $('.search-field-wrapper').addClass('is-visible');
			$('#search').focus();
        }
    });

});