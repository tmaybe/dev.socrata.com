---
layout: with-sidebar
sidebar: documentation
title: like '...'

type: function
function: "$1 like $match"
description: Allows for substring searches in text strings
versions:
- 2.1
datatypes:
- text 
params:
  $1:
  - text
  $match:
  - text
returns: boolean

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `like '...'` function allows you to filter for [Text](/docs/datatypes/text.html) values that match a given pattern. Patterns can include placeholders to make fuzzy matches:

- An underscore (&#95;) matches a single character
- A percent symbol (%) matches any string of zero or more characters

For example, to query the [White House Salaries](https://open.whitehouse.gov/d/9j92-xfdk) for "assistants" (the '%' characters are URL encoded as '%25'):

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$where=position_title like '%25ASSISTANT%25'" %}
