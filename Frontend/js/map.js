// map.js

let map;
let markers = [];  

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 }, 
        zoom: 12
    });
}

function placeMarkers(locations) {
    clearMarkers();

    locations.forEach(location => {
        let marker = new google.maps.Marker({
            position: { lat: location.latitude, lng: location.longitude },
            map: map,
            title: location.name
        });

        let infoWindow = new google.maps.InfoWindow({
            content: `<h5>${location.name}</h5><p>${location.address}</p>`
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        markers.push(marker);
    });

    if (markers.length) {
        let bounds = new google.maps.LatLngBounds();
        markers.forEach(marker => bounds.extend(marker.getPosition()));
        map.fitBounds(bounds);
    }
}

function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}

export { initMap, placeMarkers };