### Leaflet Lesson ####

Welcome to my mini-lesson on making a map! Here's what we are going to cover today:

1) What's a map? (no seriously)
2) When creating a new map project, how do I start?
3) What is a "layer"?
4) What's geojson? 
5) How do I manipulate map data via Javascript?

By the end of this lesson, you should be able to:

1) Create a map!
2) Know what geojson is!
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
var tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=[YOUR TOKEN]', {
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

Maps don't really care about addresses (although you can utilize addresses in a process called 'geocoding'). Rather, they care about coordinates. So where does this weird term 'geojson' come in?

JSON - Javascript Object Notation
Geo - Relating to the earth and stuff

Geojson === a format for encoding a variety of geographic data structures.

```
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}
```

There are a lot of different places you can find Geojson data, and some nice people have created geojson feature collections of countries and states online, but we'll be using Mapboxes sample for this project at: https://www.mapbox.com/help/define-geojson/.

You'll notice Geojson has three primary keys: type (almost always Feature), geometry, and properties. Geometry will almost always have two more keys: type, and coordinates. The properties key can have any number of additional key: value pairs. These often represent the data you want to showcase itself. Let's have a look at our sample Geojson file. 

Sometimes you might plop a geojson data set right into your javascript file (not recommended). Sometimes you might make an API call to some endpoint, and get geojson back (this da best!). For this case, we are going to take our geojson file, and put it into a seperate folder called data. We'll then use a plugin called Leaflet Ajax to reference it. 

#### 3 - Showing Data On The Map ####
