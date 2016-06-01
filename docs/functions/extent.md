---
layout: with-sidebar
sidebar: documentation
title: extent(...)

type: function
function: extent($1)
description: Returns a bounding box that encloses a set of geometries
versions:
- 2.1
datatypes:
- point
- multipoint
- line
- multiline
- polygon
- multipolygon
params:
  $1:
  - point
  - multipoint
  - line
  - multiline
  - polygon
  - multipolygon
returns: polygon

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `extent(...)` generates a rectangle that completely encompass a set of points or geometries, to get the rectangle that surrounds all of the crimes in Chicago in 2014:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.geojson' args="$select=count(*),extent(location)&year=2014" %}

This can be very useful in generating heat maps or to describe the geographic area affected by a given dataset.
