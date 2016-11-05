
// returns map to array of markers.
function processPlaces(placeDict, categories)
{

	var outputDict = new Map();
	for (var category in placeDict.keys()) 
	{
		var outputArray = new Array();
	 	for (var place in placeDict.get(categories[category])) 
	 	{
	 		var placeMarker = new google.maps.Marker({
	 			map : null,	
	 			position : place.geometry.location 
	 		});
	 		outputArray.push(placeMarker);
	 	}
	 	outputDict.set(categories[category], outputArray);
	}
	return outputDict;
	
}

// updates map to be displayed.
function updateMap(googleMap, categoryArray, markerMap)
{
	var map = googleMap;

	for(var category in categoryArray)
	{
		for(marker in markerMap.get(category))
		{
			marker.setMap(map);
		}
	}
}