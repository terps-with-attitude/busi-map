// var categories = new Array("fast food", "fine dining", "buffet");
// var dc, mapa, dict;
// var num = 0;

// function pullInData() {

// 	dict = new Map();
// 	dc = new google.maps.LatLng(38.907864,-77.072151);
// 	mapa = new google.maps.Map(document.getElementById('mapa'), {
// 	center: dc,
// 	zoom: 15
//  	});


// 	// var request = { location: dc,
// 	// 				query: categories[num++]
// 	// 			  };


// 	var service = new google.maps.places.PlacesService(mapa);


// 	// for (var i = 0; i < categories.length;i++) {
// 	// 	service.textSearch(request, callback);
// 	// }


// 	for(var category in categories)
// 	{
// 		var request = {
// 			location : dc,
// 			query : category
// 		}

// 		service.textSearch(request, callback);
// 	}


// 	var mapIter = dict.keys();




// 	return dict;
// }




// function callback(results, status) {
// 	if (status == google.maps.places.PlacesServiceStatus.OK) {
// 		dict.set(category,results);
//    }
// }


		var googleMap;
		var infowindow;
		

      	function pullInData(location, categories, markerArray, placeDict, googleMap) {
        var dcLocation = location;
        
        

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(googleMap);


        clearAll(markerArray);
        for (category in categories) {
        	//console.log(categories[category]);

        	var request = {
				location: dcLocation,
				type: "restaurant",
				radius: 2000,
				query: categories[category]
        	}

      		service.textSearch(request, callbackCreator(categories[category], markerArray, placeDict, googleMap));
      		// for(place in dict.get(categories[category]))
      		// {
      		// 	console.log(dict.get(categories[category])[place]);
      		// }
        }

        
      }

      function callbackCreator(category, markerArray, placeDict, googleMap)
      {
      	return function(results, status) {
      		if (status === google.maps.places.PlacesServiceStatus.OK) {
          		placeDict.set(category, results);
              for(place in results){
                              
                markerArray.push( new google.maps.Marker({
                 map : map, 
                 position : results[place].geometry.location 
                }));
              }
      		}
      	}
      }

      function clearAll(markerArray) {

        for(marker in markerArray)
        {
          markerArray[marker].setMap(null);
          console.log("blah");
        }

        markerArray = [];

      }


      