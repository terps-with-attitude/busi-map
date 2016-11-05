var categories = new Array("fast food", "fine dining", "buffet");
var dc, mapa, dict;
var num = 0;

function pullInData() {

	dict = new Map();
	dc = new google.maps.LatLng(38.907864,-77.072151);
	mapa = new google.maps.Map(document.getElementById('mapa'), {
	center: dc,
	zoom: 15
 	});


	// var request = { location: dc,
	// 				query: categories[num++]
	// 			  };


	var service = new google.maps.places.PlacesService(mapa);


	// for (var i = 0; i < categories.length;i++) {
	// 	service.textSearch(request, callback);
	// }


	for(var category in categories)
	{
		var request = {
			location : dc,
			query : category
		}

		service.textSearch(request, callback);
	}


	var mapIter = dict.keys();




	return dict;
}




function callback(results, status) {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		dict.set(category,results);
   }
}
