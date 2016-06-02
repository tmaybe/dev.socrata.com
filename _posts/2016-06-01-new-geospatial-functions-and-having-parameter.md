---
layout: post
categories: changelog
tags:
- changelog
- having
- soql
- geospatial
title: "New geospatial functions, $having parameter"
date: 2016-06-01
author: chrismetcalf
---

Just in time for [National Day of Civic Hacking](/blog/2016/05/19/preparing-for-ndoch.html), we've got some great new SoQL functionality for you:

We've added three new geospatial SoQL functions that will help you manage the complexity of geospatial data:

- [`num_points(...)`](/docs/functions/num_points.html) will count the vertices in a geospatial datatype, to help you understand the complexity of shapes and lines
- [`simplify(...)`](/docs/functions/simplify.html) allows you to then take a geometry and reduce the number of vertices to make it more compact
- [`simplify_preserve_topology(...)`](/docs/functions/simplify_preserve_topology.html) performs the same task as `simplify(...)`, but avoids the problem of oversimplification

We've also released the [`$having`](/docs/queries/having.html) SoQL query parameter, which will allow you to filter the results of an aggregation, after the aggregation has been performed. Yet another handy SQL feature brought to open data with SoQL!
