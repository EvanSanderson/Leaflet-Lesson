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

It's awfully nice of Leaflet to provide default icons, but in most map projects you are going to want more control over the styling and structure of the icons. Let's take care of that but passing an additional option to the L.Geojson.Ajax instatiation. First we'll need to create a variable that represents our 'Div Icon'.

```
const our_icon = L.divIcon({
    iconSize: new L.Point(10,10),
    className: 'map-icon'
});
```

We're passing an option literal here with two key value pairs: iconSize and className. Icon size sets the dimensions of the icon (10px X 10px here), and className provides a CSS class we can use as a reference to style the icon. 

Then we want to insert that divIcon in the pointToLayer option in our L.Geojson.Ajax call:

```
const geoLayer = new L.GeoJSON.AJAX('data/stations.geojson', {
    pointToLayer: function(feature, latlng){
        return L.marker(latlng, {icon: our_icon})
    }
})
```

The syntax looks like a callback function (with the feature and the coordinates of the feature as parameters), which returns a L.marker object using the coordinates of the feature, and passing in our Div Icon as the icon. A lot to take in here, but its important to note that any of those options passed to L.GeoJSON.AJAX refer to each individual feature in your feature set (it's like everything is occuring in those brackets within a loop of the feature set). 

We can add a little bit of styling to our icons now. 

```
.map-icon {
    border:1px solid white;
    background: darkslategrey; 
    z-index: 99999;
    opacity: .8;
    border-radius: 3px;
}

.map-icon:hover {
    background: gray;
    cursor: pointer;
    opacity: .5;
}
```

The final step before adding interactions is making it so that our icon layer appears immediately on the map when the page is loaded. That's as simple as:

```
geoLayer.addTo(map);
```

Now for the interactions: where do we think that layer of logic is going to go? If you guessed as another option within the L.Geojson.AJAX call, then you are correct! We'll be using the onEachFeature key, and we'll point it a function (yet to be declared called onEach - lame, I know). Our L.Geojson.AJAX friend will now look like:

```
const geoLayer = new L.GeoJSON.AJAX('data/stations.geojson', {
    onEachFeature: onEach, 
    pointToLayer: function(feature, latlng){
        return L.marker(latlng, {icon: our_icon})
    }
})
```

We create the onEach function and it looks like the following:

```
function onEach(feature,layer){
    layer.on({
        click: displayPopup
    })
}
```

You could put a variety of interactions here, but for now we are going to stick with a simple one: a click event. It's all pretty semantic here - when clicking on a layer (the point) we will call the function displayPopup. So guess what? Time to make yet another function.

```
function displayPopup(e){
    let content ='';
    const {properties} = e.target.feature;
    for(let prop in properties){
        content += `<p>${properties[prop]}</p>`;
    }
    map.setView(e.target._latlng, 12, {animate: true});
    e.target.bindPopup(content).openPopup();
}
```

Lets break this down. First, we set up our content empty string. This is what will eventually go into the popup. Then, we use object destructuring to grab the properties section of the param "e". "e" refers to the event (the click), and contains a lot of important information. In this case, we want to drill down into the feature, and the properties of that feature. Then, we iterate over the properties, adding a new "<p></p>" element for each property. Finally, we use map.setView to zoom into the point and e.target.bindPopup(content).openPopup to add our content to a popup and then pop the popup up. Wow, what a sentence.

### Finale ###

I hope you enjoyed getting to create a map. Leaflet has a ton of features, and if you are interested in learning more, poke around in the docs and explore. You might even consider using it as part of your final project :) 

BONUS: Add another Geojson layer - this time, using the geometry type Polygon!
SECOND BONUS: Use the "line" property in the stations.geojson data set to color each point based on its line, and create a real map of the DC metro!
DOUBLE SECRET EXTRA AWESOME BONUS: Find a geojson data set with a time series, and create a range slider that lets you slide through the time series and watch the data change!


