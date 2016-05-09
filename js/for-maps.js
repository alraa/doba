jQuery(function($){

if ($('body').hasClass('map')) {
    var geocoder;
    var map;
    var marker_head;
    var info_head;

    function initialize() {
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(48.9314462, 24.710438);
        var mapOptions = {
            zoom: 16,
            center: latlng,
            scrollwheel: false,
            disableDefaultUI: true,
            styles: [{
                "stylers": [{
                    "saturation": -100
                }]
            }]
        }
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        marker_head = new google.maps.Marker({
            position: latlng,
            map: map
        });
        
        info_head = new google.maps.InfoWindow({
            content: "<p><strong>Москва, ул. Тверская, д.7</strong></p>"
        });
        google.maps.event.addListener(marker_head, 'click', function() {
            info_head.open(map, marker_head);
        });
       
    }
    $('a', '.map-links').on('click', function(e) {
        e.preventDefault();
        if ($(this).data('marker') == 'marker_head') {
            map.panTo(marker_head.getPosition());
            info_head.open(map, marker_head);
        }
        $('a', '.map-links').removeClass('active');
        $(this).addClass('active');
    })
    google.maps.event.addDomListener(window, 'load', initialize);
}
});