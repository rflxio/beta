// Scripts for demo 5 / Home Event
function demo_5() {
    (function ($) {

        // initialize counter
        $('#countdown').countdown('2017/09/12 00:00:00', function (event) {
            $('#countdown #days').html(event.strftime('%D'));
            $('#countdown #hours').html(event.strftime('%H'));
            $('#countdown #minutes').html(event.strftime('%M'));
            $('#countdown #seconds').html(event.strftime('%S'));
        });

    })(jQuery);
}


// google map initialization
var marker;
function initialize() {

    // change map styles
    var styles = [
        {
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]
              },
        {
            featureType: 'transit',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]
		      },
        {
            featureType: 'poi',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]

		      },
        {
            featureType: 'poi.government',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]

			  },
        {
            featureType: 'poi.sport_complex',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]

			  },
        {
            featureType: 'poi.attraction',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]

			 },
        {
            featureType: 'poi.business',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]

		     },
        {
            featureType: 'transit',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]
		     },
        {
            featureType: 'transit.station',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]

			 },
        {
            featureType: 'landscape',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]

			 },
        {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]
			 },
        {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]
		     },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
                {
                    hue: '#2d313f'
                },
                {
                    saturation: '-20'
                },
                {
                    lightness: '5'
                }
                  ]
			 }
           ];

    var my_position = {
        lat: -37.817214,
        lng: 144.955923
    }
    var mapProp = {
        zoom: 14,
        center: my_position,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        mapTypeControl: false,
        scrollwheel: false
    };

    var iconBase = '../assets/img/other/';
    // map goes here 
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    // set new map style here
    map.setOptions({
        styles: styles
    });
    marker = new google.maps.Marker({
        position: my_position,
        icon: iconBase + 'icon-location.png'
    });
    marker.setMap(map);
    var contentString = 'Envato Inc.';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
        map.setCenter(marker.getPosition());
        map.setZoom(14);
    });
    // to center the marker always on zoom-in-out
    google.maps.event.addListener(map, 'center_changed', function () {
        window.setTimeout(function () {
            map.panTo(marker.getPosition());
        }, 0);
    });
}