---
layout: with-sidebar
sidebar: documentation 
title: Point Datatype
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
  <em>Heads up!</em> Contrary to the normal convention of "latitude, longitude" ordering in the `coordinates` property, the GeoJSON orders the coordinates as "longitude, latitude" (X coordinate, Y coordinate), as other GIS coordiate systems are encoded. Note that the SoQL `within_box` and `within_circle` functions use the more conventional ordering, however.
</div>

The following table describes the functions that can be used with locations. 

| Operator      | Description                                                                               |
| ---           | ---                                                                                       |
| within_box    | Returns the rows that have locations within the specified box.                            |
| within_circle | Returns the rows that have locations within the specified circle with a radius in meters. |

Below are examples using the above functions in SoQL queries:

## within_box:

    ?$where=within_box(location_col_identifier, top_left_latitude, top_left_longitude, bottom_right_latitude, bottom_right_longitude)

For example, to get all earthquakes in the Seattle area: 

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/earthquakes.json' args='$where=within_box(location, 48.317908, -122.995119, 47.309034, -121.630497)' %}

## within_circle:

    ?$where=within_circle(location_col_identifier, latitude, longitude, radius)

For example, to get all earthquakes within a 50,000 meter radius circle around Seattle: 

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/earthquakes.json' args='$where=within_circle(location, 47.616810, -122.328064, 50000)' %}
