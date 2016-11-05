var categories = new Array("fast food", "fine dining", "buffet");
var dc, mapa, dict;
var num = 0;

function pullInData() {

	dict = [];
	dc = new google.maps.LatLng(-33.8665433,151.1956316);
	mapa = new google.maps.Map(document.getElementById('mapa'), {
	center: dc,
	zoom: 15
});
	var request = {
	location: dc,
	query: categories[num++]
	};
	var service = new google.maps.places.PlacesServices(mapa);
	for (var i = 0; i < categories.length;i++) {
		service.textSearch(request, callback);
	}
}

function callback(results, status) {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
	dict.push({
		category: categories[num],
		arrayOfPlaces: results
	});
}
}
