		var googleMap;
		var infowindow;
		var dict = new Map();
		var received = true;

      	function pullInData(location, map, categories) {
        var dcLocation = location;

        googleMap = map;

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

        for (category in categories) {
        	var request = {
				location: dcLocation,
				type: "restaurant",
				radius: 2000,
				query: categories[category]
        	}
      		service.textSearch(request, callbackCreator(categories[category]));
        }
      }

      function callbackCreator(category)
      {
      	return function(results, status) {
      		if (status === google.maps.places.PlacesServiceStatus.OK) {
          		dict.put(category, results);	
      		}
      	}
      }