### Leaflet Lesson ####

Welcome to my mini-lesson on making a map! Here's what we are going to cover today:

1) What's a map? (no seriously)
2) When creating a new map project, how do I start?
3) What is a "layer"?
4) What's geojson? 
5) How do I manipulate map data via Javascript?

By the end of this lesson, you should be able to:

1) Create a map!
2) Find geojson!
3) Load geojson into a map as a layer!
4) Add interactivity to your new layer!

Let's get this party started.

(Git clone time folks).

### 1 - Initialzing Your Map ###

Some cools map to check out:

https://coolmaps.esri.com/
https://atlasofthrones.com/
http://downtowndc.org/map/

We'll be using Leaflet today. There are other tools out there, but Leaflet is a good one for beginners. You can find the documentation at http://leafletjs.com/.

For the initialization part, we'll need to grab a Base Map. Mapbox has some good ones, so head over to https://www.mapbox.com/signup/, make an account, then head over to https://www.mapbox.com/account/access-tokens and grab your access token.

Then, checkout branch 1-Initializing. 

```
var tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZXZhbmpzYW5kZXJzb24iLCJhIjoiY2ozdnQ0NG95MDAxaDJ3cW85ZDZocXppZiJ9.E5UyKvTcbX1rEpDqogRzWQ', {
    id: 'mapbox.light',
    attribution: false
});

var map = L.map('map', {
    center: [39.73, -104.99],
    zoom: 5,
    layers: [tileLayer],
});
```

### 2-Geojson say whaaaa ###
