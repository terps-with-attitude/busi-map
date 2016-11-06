var infowindow;
function pullInData(location, categories, markerArray, placeDict, circleArray, googleMap, idcategorydict, ) {
    var dcLocation = location;
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(googleMap);
    clearAll(markerArray, circleArray);
    for (category in categories) {
        var request = {
            location: dcLocation,
            radius: 1000,
            query: categories[category]
        }

        service.textSearch(request, callbackCreator(categories[category], markerArray, placeDict, circleArray, googleMap, idcategorydict));
    }


        
}




function callbackCreator(category, markerArray, placeDict, circleArray, googleMap, idcategorydict)
{
	return function(results, status, paginator) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
      
        console.log(category);
        icon = idcategorydict.get(category);
        console.log(icon);
    		placeDict.set(category, results);
        for(place in results){
          marker = new google.maps.Marker({
           map : googleMap,
           icon: icon, 
           position : results[place].geometry.location 
          });
          google.maps.event.addListener(marker, 'click', function () {
            var name = place.name;
            var rating = place.rating;
            var html = "<b>" + name + "</b> <br/>" + 'Rating: '+ rating;
            infowindow.setContent(html);
            infowindow.open(map, this);
          });
          markerArray.push(marker);
          console.log(marker.icon);

          

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
          if(paginator.hasnext)
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

