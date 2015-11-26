---
layout: with-sidebar
sidebar: documentation
title: The $order Parameter
parent_paths: 
- /docs/queries/
parents: 
- Queries using SODA
---

The `$order` parameter determines how the results should be sorted, using the values from the specified columns, similar to a SQL `ORDER BY`. Sorting can be performed in either ascending or descending order, the default being ascending, but you can also reverse the order with `DESC`.

For example, to sort our earthquakes by `magnitude`, in descending order:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$order=magnitude DESC' %}

We could sort them in ascending order by replacing `DESC` with `ASC`, or by simply omitting it.

{% include ordering-note.html %}
