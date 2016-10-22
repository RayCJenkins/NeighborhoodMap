var LocationCategory = {
  LIGHTHOUSE: {value: 0, name: "Lighthouse"},
  BEACH: {value: 1, name: "Beach"},
  RESORT: {value: 2, name: "Resort"},
  RESTAURANT: {value: 2, name: "Restaurant"},
  AIRPORT: {value: 2, name: "Airport"}
};

var interestingLocations = [
	{
		title: 'Faro Celarain',
		category: LocationCategory.LIGHTHOUSE,
		location: {lat: 20.272649, lng: -86.988067}
	},
	{
		title: 'Playa Palancar',
		category: LocationCategory.BEACH,
		location: {lat: 20.354600, lng: -87.023703}
	},
	{
		title: 'IBEROSTAR Cozumel',
		category: LocationCategory.RESORT,
		location: {lat: 20.370337, lng: -87.022319}
	},
	{
		title: 'Allegro Cozumel',
		category: LocationCategory.RESORT,
		location: {lat: 20.382024, lng: -87.020023}
	},
	{
		title: 'Paradise Beach Cozumel',
		category: LocationCategory.BEACH,
		location: {lat: 20.401232, lng: -87.017598}
	},
	{
		title: 'Señor Frogs',
		category: LocationCategory.RESTAURANT,
		location: {lat: 20.507465, lng: -86.954556}
	},
	{
		title: 'Cozumel International Airport',
		category: LocationCategory.AIRPORT,
		location: {lat: 20.511626, lng: -86.930501}
	}
]

var Location = function(data) {
	this.title = ko.observable(data.title);
	this.category = ko.observable(data.category);
	this.location = ko.observable(data.location);
	this.categoryName = ko.computed(function() {
		return this.category.name;
	});
}

var ViewModel = function() {
	var self = this;

	this.Locations = ko.observableArray([]);

	interestingLocations.forEach(function(locationItem) {
		self.Locations.push(new Location(locationItem));
	});
}

ko.applyBindings(new ViewModel());



var map;
var markers = [];

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
        	center: {lat: 20.423462, lng: -86.924081},
        	zoom: 12,
        	mapTypeControl: false
        });

	var infoWindow = new google.maps.InfoWindow();

	for (var i = 0; i < interestingLocations.length; i++) {
      var marker = new google.maps.Marker({
          map: map,
          position: interestingLocations[i].location,
          title: interestingLocations[i].title,
          animation: google.maps.Animation.DROP,
          id: i
        });
      markers.push(marker);
      marker.addListener('click', function() {
        fillInfoWindow(this, infoWindow);
      });
	}
}

function fillInfoWindow(marker, infowindow) {
	if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
	}
}






