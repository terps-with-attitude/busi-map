var infowindow;
function pullInData(location, categories, markerArray, googleMap, idcategorydict) {
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

        service.textSearch(request, callbackCreator(categories[category], idcategorydict));
    }


}

function callbackCreator(category, idcategorydict) {
    return function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (place in results) {
                createMarker(results[place], category, idcategorydict);
            }

        }
    }
}

function createMarker(place, category, idcategorydict) {
    var icon = 'markers/' + idcategorydict[category] + '.png';
    console.log(icon);

    var marker = new google.maps.Marker({
        map: map,
        icon: icon,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        var name = place.name;
        var rating = place.rating;
        var html = "<b>" + name + "</b> <br/>" + 'Rating: '+ rating;
        infowindow.setContent(html);
        infowindow.open(map, this);
    });
    markerArray.push(marker);
}

function clearAll(markerArray) {

    for (marker in markerArray) {
        markerArray[marker].setMap(null);
    }

    markerArray = [];

}


