---
layout: with-sidebar
sidebar: documentation
title: min(...)

type: function
function: min($1)
description: Returns the minimum of a given set of numbers 
versions:
- 2.1
datatypes:
- double
- floating_timestamp
- money
- number
- text
params:
  $1:
  - double
  - floating_timestamp
  - money
  - number
  - text
returns: typeof($1)

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `min(...)` function is most commonly used in `$select` aggregations to return the minimum of a set of numeric values ([Numbers](/docs/datatypes/number.html), [Doubles](/docs/datatypes/double.html), or [Moneys](/docs/datatypes/money.html)). For example, to fetch the lowest salary of all of the employees in the White House:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$select=min(salary)" %}

It can also be used in `$group` aggregations, like this one to get the minimum salary by job type:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$select=position_title,min(salary)&$group=position_title" %}
