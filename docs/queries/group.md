---
layout: with-sidebar
sidebar: documentation
title: The $group Parameter
parent_paths: 
- /docs/queries/
parents: 
- Queries using SODA
---

SoQL also provides a limited amount of aggregation functionality through its `$group` parameter. `$group` must be used in conjunction with `$select` to provide the aggregation functions you wish to use. For example, to find the strongest earthquake by region, we want to `$group` by `region` and provide a `$select` of `region, MAX(magnitude)`:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$select=region,MAX(magnitude)&amp;$group=region' %}

The currently supported grouping expressions are:

| Function | Datatypes Supported | Description                                                |
| ---      | ---                 | ---                                                        |
| `sum`    | Number              | Sums up all the values in a grouping                       |
| `count`  | All                 | Counts the number of values. `null` values are not counted |
| `avg`    | Number              | Finds the average value of numbers in this column          |
| `min`    | Number              | Finds the minimum value of numbers in this column          |
| `max`    | Number              | Finds the maximum value of numbers in this column          |
