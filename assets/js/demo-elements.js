// JavaScript Document
// play-pause video on hover
$(document).ready(function () {
    var video = $('.sect2').data('vide').getVideoObject();
    video && video.pause();
    var figure = $('.sect2').hover(hoverVideo, hideVideo);

    function hoverVideo(e) {
        video.play();
    }

    function hideVideo(e) {
        video.pause();
    }
});



// play-pause video on button click
$(document).ready(function () {
    var video = $('.sect3').data('vide').getVideoObject();
    video && video.pause(); //or .pause()
    var trackvid = 0;
    $('#playbttn').on('click', function () {
        if (trackvid == 0) {
            video.play();
            trackvid = 1;
            $('#playbttn i').addClass('change-icon');
        } else {
            video.pause();
            trackvid = 0;
            $('#playbttn i').removeClass('change-icon');
        }
    });
});


// carousel - text and image
var owl = $('#testimonial,#testimonial2');
owl.owlCarousel({
    singleItem: true,
    autoPlay: true,
    navigation: false,
    slideSpeed: 300,
    paginationSpeed: 300,
    rewindSpeed: 400
});


// on scroll animated timer/counter 
$('.timer').counterUp({
    delay: 20,
    time: 2000
});


$(document).ready(function () {
    // simple lightbox    
    $('.multi-lightbox').magnificPopup({
        delegate: 'a',
        type: 'image',
        mainClass: 'mfp-fade'
    });

    // lightbox gallery			
    $('.lightbox-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        mainClass: 'mfp-fade',
        gallery: {
            enabled: true
        }
    });

    // zoom gallery							
    $('.zoom-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300,
            opener: function (element) {
                return element.find('img');
            }
        }
    });

    // simple modal
    $('.simple-popup-link').magnificPopup({
        type: 'inline',
        mainClass: 'my-simple mfp-fade'
    });

    // zoom modal			
    $('.zoom-popup-link').magnificPopup({
        type: 'inline',
        preloader: false,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });

    // slide modal			
    $('.slide-popup-link').magnificPopup({
        type: 'inline',
        preloader: false,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });

});


$(function () {
    // poup with dismiss button
    $('.dismiss-popup-link').magnificPopup({
        type: 'inline',
        preloader: false,
        midClick: true,
        removalDelay: 300,
        modal: true,
        mainClass: 'my-mfp-zoom-in'
    });
    // prevent closing dismiss on overlay
    $(document).on('click', '.popup-modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    $('form').parsley();

});

// Video Popups
$(document).ready(function () {
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade my-video',
        preloader: false
    });
});