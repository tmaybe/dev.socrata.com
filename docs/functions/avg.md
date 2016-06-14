---
layout: with-sidebar
sidebar: documentation
title: avg(...)

type: function
function: avg($1)
description: Returns the average of a given set of numbers 
versions:
- 2.0
- 2.1
datatypes:
- number
- double
- money
params:
  $1:
    - number
    - double
    - money
returns: number

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `avg(...)` function is most commonly used in `$select` aggregations to return the average of a set of numeric values ([Numbers](/docs/datatypes/number.html), [Doubles](/docs/datatypes/double.html), or [Moneys](/docs/datatypes/money.html)). For example, to fetch the average salary of all of the employees in the White House:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$select=avg(salary)" %}

It can also be used in `$group` aggregations, like this one to get the average salary by job type:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$select=position_title,avg(salary)&$group=position_title" %}
