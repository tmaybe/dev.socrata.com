---
layout: with-sidebar
sidebar: documentation
title: date_trunc_y(...)

type: function
datatypes:
- floating_timestamp
versions:
- 2.0
- 2.1
description: Truncates a calendar date at the year threshold
parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `date_trunc_y(...)` function is used in the `$select`, `$where`, or `$group` parameters to truncate [Floating Timestamps](/docs/datatypes/number.html) at the year level. For example, `date_trunc_y('2012-09-22T18:05:00.000')` would result in new timestamp of `'2012-01-01T00:00:00.000'`. This is handy for aggregation & display usages. For example, to aggregate the Chicago Crimes dataset by type and year: 

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$select=date_trunc_y(date) as year, primary_type, count(*)&$group=year, primary_type" %}
