

var tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZXZhbmpzYW5kZXJzb24iLCJhIjoiY2ozdnQ0NG95MDAxaDJ3cW85ZDZocXppZiJ9.E5UyKvTcbX1rEpDqogRzWQ', {
    attribution: false
});

var map = L.map('map', {
    center: [39.73, -104.99],
    zoom: 5,
    layers: [tileLayer],
});