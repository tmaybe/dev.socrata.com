---
layout: with-sidebar
sidebar: documentation
title: num_points(...)

type: function
function: num_points($1)
description: Returns the number of vertices in a geospatial data record
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
returns: number

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `num_points(...)` function returns the number of vertices that a given geometry is comprised of. For example, a rectangle would contain four vertices. For example, to get the city with the most vertices in the [Tiger Line "Places" dataset](https://dev.socrata.com/foundry/odn.data.socrata.com/h7w8-g2pa):

{% include tryit.html domain='odn.data.socrata.com' path='/resource/h7w8-g2pa.json' args="$select=name,num_points(the_geom)&$order=num_points(the_geom) DESC&$limit=1" %}

This can be very useful for understanding the complexity of the geometries in a given dataset.

