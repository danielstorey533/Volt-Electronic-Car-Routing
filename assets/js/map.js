function initMap() {
  var infoWindow = new google.maps.InfoWindow,
      center     = new google.maps.LatLng(53.3498, -6.2603)
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 53.3498, lng: -6.2603},
        zoom: 8,
        mapTypeControl: true,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: true,
        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                                position: google.maps.ControlPosition.TOP_RIGHT}
  });

  // HTML5 GEOLOCATION
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var yourPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
            marker = new google.maps.Marker({
              position: yourPosition,
              map: map,
              title: 'Your Location'
            })
        map.setCenter(yourPosition);
      });
  }
  // CONSTRUCTOR
  new DirectionsHandler(map);
  // ESB'S KML LAYER
  var esbLayer = new google.maps.KmlLayer({
    url: 'https://esb.ie/ECARS/kml/charging-locations.kml',
    map: map
  });

  console.log(esbLayer);
}
// Directions functionality
function DirectionsHandler(map) {
  // calls in map from initMap
  this.map                = map;
  // place id setup for orig and dest
  this.originPlaceId      = null;
  this.destinationPlaceId = null;
  this.travelMode         = 'DRIVING';
  // directions api init
  this.directionsService  = new google.maps.DirectionsService;
  this.directionsDisplay  = new google.maps.DirectionsRenderer;
  // initiate directions display to setMap with params
  this.directionsDisplay.setMap(map);
  this.directionsDisplay.setOptions({draggable: true}); // allows the directions polliline to be draggable
  this.directionsDisplay.setPanel(document.getElementById('route-panel'));
  // autocomplete setup
  // gets input elements from html
  var originInput         = document.getElementById('origin'),
      destinationInput    = document.getElementById('destination'),
      rangeInput          = document.getElementById('range'),
      // inserts autocomplete functionality to input elements
      originAc            = new google.maps.places.Autocomplete(originInput),
      destinationAc       = new google.maps.places.Autocomplete(destinationInput);
  // retrieves places id for each field
  originAc.setFields(['place_id']);
  destinationAc.setFields(['place_id']);
  // listener setup
  this.setupPlaceChangedListener(originAc, 'ORIG');
  this.setupPlaceChangedListener(destinationAc, 'DEST');
}
// autocomplete listeners
DirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
  var me = this;
  // binds the search to the map
  autocomplete.bindTo('bounds', this.map);
  // gets and pass the place id to route function
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();

    if (!place.place_id) {
      window.alert('Please select a place');
      return;
    }
    if (mode === 'ORIG') {
        me.originPlaceId      = place.place_id;
    } else {
        me.destinationPlaceId = place.place_id;
    }
    me.route();
  });
};
// create route(s) function
DirectionsHandler.prototype.route = function() {
  var me = this;
  // passes the input value to route method
  if (!this.originPlaceId || !this.destinationPlaceId) {return;}
  // route method with params
  this.directionsService.route({
    origin:       {'placeId': this.originPlaceId},
    destination:  {'placeId': this.destinationPlaceId},
    travelMode:   this.travelMode,
    unitSystem:   google.maps.UnitSystem.Metric
//    waypoints:    [{location: ''}] // adds another route w/ marker
  },
  // directions api status check w/ throw error
  function(response, status) {
    if (status === 'OK') {
      me.directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
};
