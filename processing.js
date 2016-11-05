
// returns map to array of markers.
function processPlaces(placeMap)
{

	var outputMap = new Map();
	for (var category in placeMap.keys) 
	{
		var outputArray = new Array();
	 	for (var place in placeMap.get(category)) 
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

function createMap(categoryArray, markerMap)
{
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
		center: {lat: -33.9, lng: 151.2}
	});

	for(var category in categoryArray)
	{

	}
	 
}