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

Before we move on to showing our data on the map, lets make a few small tweaks to the map to add some additional UI goodness. First off, let's update the center of the map with a point from within our data set. This way, when the map loads, it's right over the data points. We'll also update the zoom distance on map initialization to be a good deal closer in.

Finally, we're going to add an additional tile layer as a base map. We'll then pass it in to the map initialization function. Remember how that layers options is in the form of an array? Well, this is why. After all is said and done, it should look like: 


```
const tileLayer1 = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=[YOUR TOKEN]', {
    id: 'mapbox.light',
    attribution: false
});

const tileLayer2 = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=[YOUR TOKEN]', {
    id: 'mapbox.streets',
    attribution: false
});

const map = L.map('map', {
    center: [
        38.79930767201779,
          -77.12911152370515
        ],
    zoom: 10,
    layers: [tileLayer1, tileLayer2],
});
```
We're going to two things next. The first is to add our geojson to the map using the Leaflet Ajax plugin. Leaflet is an object oriented framework, and many of the objects have inheritance. L.Geojson.Ajax inherits the the feature groups class and from the layer class. Therefore, we not only make an ajax call to retrieve the geojson data, we also create a layer and pass additional options into that new layer at the same time. The syntax looks like:

```
const geoLayer = new L.GeoJSON.AJAX('data/stations.geojson', {
    // options here
})
```

You'll notice we don't pass any options in yet. We'll get to that later. Lastly, we are going to initialize a control. A control allows you to toggle layers on and off your map. The syntax looks like the following:

```
const baseMaps = {
    "Grey": tileLayer1,
    "Streets": tileLayer2
};

const overlayMaps = {
    "Our Points": geoLayer
};

L.control.layers(baseMaps, overlayMaps).addTo(map);
```

You can see we pass two object literals into control.layers() - the first param represents the basemaps, and the second represents additional layers you've added. Finally, we call .addTo(map) - this is a common parlance in Leaflet you'll see for many UI features. 

Now we should have a map, with base layers, a control, and look: our geojson data points! Those icons are the default Leaflet markers, but we can change that in our next and last section.
Onward!

#### 4 - Interactions ##### 
