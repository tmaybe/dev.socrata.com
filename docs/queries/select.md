---
layout: with-sidebar
sidebar: documentation
title: The $select Parameter
parent_paths: 
- /docs/queries/
parents: 
- Queries using SODA

type: parameter
param: "$select"
in_query: SELECT
description: "The set of columns to be returned, similar to a `SELECT` in SQL"
default: All columns, equivalent to `$select=*`
data_type: string
order: 1
---

The `$select` parameter is similar to a `SELECT` in SQL. It allows expressions and aliases, as well as aggregations when using
`$group`.

For example, to retrieve only the `location` and `magnitude` fields for our earthquakes, set `$select` equal to their field names, separated by a comma (`,`):

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$select=location, magnitude' %}

You can also create column aliases just like you could do in SQL. For example, to alias `magnitude` to `richter`, provide a select of `magnitude AS 'richter'`:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$select=location, magnitude AS richter' %}

You can also use SoQL functions and operators to modify the output of a SODA query. For example, to convert the `depth` from meters to feet, by multiplying it by 3.28:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$select=location, depth * 3.28 AS depth_feet' %}

For a full listing of the functions available by datatype, check out the [datatype-specific documentation](/docs/datatypes/).

