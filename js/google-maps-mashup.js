require(['jquery', 'googlemaps'], function($, google) {
  // Construct the query string
  url = 'https://data.ct.gov/resource/v4tt-nt9n.json?'
    + 'organization_type=Public%20School%20Districts'
    + '&$$app_token=09sIcqEhoY0teGY5rhupZGqhW';

  // Intialize our map
  var center = new google.maps.LatLng(41.7656874,-72.680087);
  var mapOptions = {
    zoom: 8,
    center: center
  }
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // Retrieve our data and plot it
  $.getJSON(url, function(data, textstatus) {
    $.each(data, function(i, entry) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(entry.location_1.coordinates[1], 
                      entry.location_1.coordinates[0]),
        map: map,
        title: location.name
      });
    });
  });
});


