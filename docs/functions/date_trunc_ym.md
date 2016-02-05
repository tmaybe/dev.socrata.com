---
layout: with-sidebar
sidebar: documentation
title: date_trunc_ym(...)

type: function
function: date_trunc_ym($1)
description: Truncates a calendar date at the year/month threshold
versions:
- 2.0
- 2.1
datatypes:
- floating_timestamp
params:
  $1:
  - floating_timestamp
returns: text

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `date_trunc_ym(...)` function is used in the `$select`, `$where`, or `$group` parameters to truncate [Floating Timestamps](/docs/datatypes/number.html) at the year and month level. For example, `date_trunc_ym('2012-09-22T18:05:00.000')` would result in new timestamp of `'2012-09-01T00:00:00.000'`. This is handy for aggregation & display usages. For example, to aggregate the Chicago Crimes dataset by month: 

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$select=date_trunc_ym(date) as month, count(*)&$group=month" %}
