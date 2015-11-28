---
layout: with-sidebar
sidebar: documentation
title: starts_with(...)

type: function
datatypes:
- text 
versions:
- 2.1
description: Matches on text strings that start with a given substring
parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

`starts_with(...)` allows you to filter for [Text](/docs/datatypes/text.html) values that start with a given substring. For example, to query the [White House Visitor Records](https://open.whitehouse.gov/dataset/White-House-Visitor-Records-Requests/p86s-ychb?) for for only "state arrivals":

{% include tryit.html domain='open.whitehouse.gov' path='/resource/5frf-sppk.json' args="$where=starts_with(description, 'STATE ARRIVAL')" %}
