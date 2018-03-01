

const tileLayer1 = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZXZhbmpzYW5kZXJzb24iLCJhIjoiY2ozdnQ0NG95MDAxaDJ3cW85ZDZocXppZiJ9.E5UyKvTcbX1rEpDqogRzWQ', {
    id: 'mapbox.light',
    attribution: false
});

const tileLayer2 = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZXZhbmpzYW5kZXJzb24iLCJhIjoiY2ozdnQ0NG95MDAxaDJ3cW85ZDZocXppZiJ9.E5UyKvTcbX1rEpDqogRzWQ', {
    id: 'mapbox.streets',
    attribution: false
});

const our_icon = L.divIcon({
    iconSize: new L.Point(10,10),
    className: 'map-icon'
});

const map = L.map('map', {
    center: [
        38.79930767201779,
          -77.12911152370515
        ],
    zoom: 10,
    layers: [tileLayer1, tileLayer2],
});

const geoLayer = new L.GeoJSON.AJAX('data/stations.geojson', {
    onEachFeature: onEach,
    pointToLayer: function(feature, latlng){
        return L.marker(latlng, {icon: our_icon})
    }
})

geoLayer.addTo(map);

const baseMaps = {
    "Grey": tileLayer1,
    "Streets": tileLayer2
};

const overlayMaps = {
    "Our Points": geoLayer
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

function onEach(feature,layer){
    layer.on({
        click: displayPopup
    })
}

function displayPopup(e){
    let content ='';
    const {properties} = e.target.feature;
    for(let prop in properties){
        content += `<p>${properties[prop]}</p>`;
    }
    map.setView(e.target._latlng, 12, {animate: true});
    e.target.bindPopup(content).openPopup();
}
