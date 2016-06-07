---
layout: with-sidebar
sidebar: documentation
title: The $order Parameter
parent_paths: 
- /docs/queries/
parents: 
- Queries using SODA

type: parameter
param: "$order"
in_query: ORDER BY
default: Unspecified order
description: "Column to order results on, similar to ORDER BY in SQL"
data_type: string
order: 3
---

The `$order` parameter determines how the results should be sorted, using the values from the specified columns, similar to a SQL `ORDER BY`. Sorting can be performed in either ascending or descending order, the default being ascending, but you can also reverse the order with `DESC`.

For example, to sort our earthquakes by `magnitude`, in descending order:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv.json' args='$order=magnitude DESC' %}

We could sort them in ascending order by replacing `DESC` with `ASC`, or by simply omitting it.

{% include ordering-note.html %}
