
// returns map to array of markers.
function processPlaces(placeMap)
{

	var outputMap = new Map();
	for (var categoryList in placeMap.values()) 
	{
		var outputArray = new Array();
	 	for (var place in categoryList) 
	 	{
	 		var placeMarker = new google.maps.Marker({
	 			map : null,	
	 			position : place.geometry.location 
	 		});
	 		outputArray.push(placeMarker);
	 	}
	 	outputMap.set(category, outputArray);
	}

	return outputMap;
	
}

// creates map to be displayed.
function createMap(categoryArray, markerMap)
{
	var map = new google.maps.Map(document.getElementById('map-container'), {
		zoom: 12,
		center: {lat: 38.907864, lng:  -77.072151}
	});

	for(var category in categoryArray)
	{
		for(marker in markerMap.get(category))
		{
			marker.setMap(map);
		}
	}
}