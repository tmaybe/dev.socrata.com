---
layout: with-sidebar
sidebar: documentation 
title: Point Datatype
type: datatype
audience: documentation
---

The `Point` datatype is very similar to the [`Location`](/docs/datatypes/location.html) datatype. It represents a location on the Earth as a WGS84 Latitude and Longitude. The location is encoded as a [GeoJSON "point"](http://geojson.org/geojson-spec.html#point). Example:

{% highlight javascript %}
{
  "type": "Point",
  "coordinates": [
    -87.653274,
    41.936172
  ]
}
{% endhighlight %}

<div class="alert alert-info">
  <em>Heads up!</em> Contrary to the normal convention of "latitude, longitude" ordering in the <code>coordinates</code> property, the GeoJSON orders the coordinates as "longitude, latitude" (X coordinate, Y coordinate), as other GIS coordiate systems are encoded. Note that the SoQL <code>within_box</code> and <code>within_circle</code> functions use the more conventional ordering, however.
</div>

The following table describes the functions that can be used with locations. 

{% include function_listing.html datatype="point" %}
