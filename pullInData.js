var infowindow;
function pullInData(location, categories, markerArray, placeDict, circleArray, googleMap, idcategorydict) {
    var dcLocation = location;
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(googleMap);
    clearAll(markerArray);
    for (category in categories) {
        var request = {
            location: dcLocation,
            type: "restaurant",
            radius: 2000,
            query: categories[category]
        }

        service.textSearch(request, callbackCreator(categories[category], markerArray, placeDict, circleArray, googleMap, idcategorydict));
    }


        
}




function callbackCreator(category, markerArray, placeDict, circleArray, googleMap, idcategorydict)
{
	return function(results, status, paginator) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
        var icon = 'markers/' + idcategorydict[category] + '.png';
    		placeDict.set(category, results);
        for(place in results){
                        
          markerArray.push( new google.maps.Marker({
           map : googleMap,
           icon: icon, 
           position : results[place].geometry.location 
          }));

          google.maps.event.addListener(marker, 'click', function () {
            var name = place.name;
            var rating = place.rating;
            var html = "<b>" + name + "</b> <br/>" + 'Rating: '+ rating;
            infowindow.setContent(html);
            infowindow.open(map, this);
          });

          circleArray.push( new google.maps.Circle({
            strokeColor: '#8A2BE2',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#8A2BE2',
            fillOpacity: 0.15,
            map: googleMap,
            center: results[place].geometry.location ,
            radius: 2000 //subject to change
          }));
          while(paginator.hasnext)
          {
            paginator.next();
          }
        }
		}
	}
}

function clearAll(markerArray, circleArray) {
  for (marker in markerArray) 
  {
    markerArray[marker].setMap(null);
  }

    markerArray = [];

  for(circle in circleArray)
  {
    circleArray[circle].setMap(null);
  }

  circleArray = [];
}

