---
layout: with-sidebar
sidebar: documentation
title: simplify_preserve_topology(...)

type: function
function: simplify_preserve_topology($1)
description: Reduces the number of vertices in a line or polygon, preserving topology
versions:
- 2.1
datatypes:
- line
- multiline
- polygon
- multipolygon
params:
  $1:
  - line
  - multiline
  - polygon
  - multipolygon
  $2:
  - number
returns: typeof($1)

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

Similar to [`simplify(...)`](/docs/functions/simplify.html), the `simplify_preserve_topology(...)` function reduces the number of vertices in a line or polygon using the [Ramer–Douglas–Peucker algorithm](https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm). This is useful for approximation or for reducing the total size of a geospatial dataset.

![The DPR algorithm in action](/img/dpr_algorithm.gif)

Unlike `simplify(...)`, this function will not over-simplify geometries.

`simplify_preserve_topology(...)` takes two arguments:

- The geometry to be simplified
- The tolerance, in meters, used to simplify the segments in your geometry.

For example, to get a simplified version of the polygon for the City of Seattle from the [Tiger LINE "Places" dataset](https://dev.socrata.com/foundry/odn.data.socrata.com/h7w8-g2pa):

{% include tryit.html domain='odn.data.socrata.com' path='/resource/h7w8-g2pa.json' args="$select=name, simplify_preserve_topology(the_geom, 0.001) AS the_geom&name=Seattle" %}

For more information on how simplification works, you should refer to the [`ST_Simplify`](http://postgis.net/docs/manual-2.2/ST_Simplify.html) PostGIS function.

### Example Use Case: Generating WKT Polygons for `within_polygon(...)`

One handy use of `simplify_preserve_topology(...)` is to generate simplified polygons that work with our [`within_polygon(...)`](/docs/functions/within_polygon.html) function. To use `within_polygon(...)`, you need to generate a string in [Well Known Text](https://en.wikipedia.org/wiki/Well-known_text), a text markup language for representing geometries, and that string also needs to be fit within the limit of a URL string, which can be as short as 2000 characters for some HTTP client libraries.

Fortunately, our [CSV](/docs/formats/csv.html) output type already encodes polygons in WKT, and you can use `simplify_preserve_topology(...)` with our CSV output. So, if you wanted to fetch a simplified version of the Seattle city boundary to feed into another SoQL query, you could use a call similar to the one above, but change the output type to get you CSV and WKT:

{% include tryit.html domain='odn.data.socrata.com' path='/resource/h7w8-g2pa.csv' args="$select=simplify_preserve_topology(the_geom, 0.001) AS the_geom&name=Seattle" %}
