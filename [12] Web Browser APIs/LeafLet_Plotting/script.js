var marker = 

function success(position){
    const coords = position.coords;
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    console.log(latitude,longitude);
    mark
}

function error(err){
    console.log(err);
}

navigator.geolocation.getCurrentPosition(success,error);
var map = L.map('map').setView([12.9634, 77.5855], 13);

var marker = L.marker([12.9634, 77.5855]).addTo(map);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);