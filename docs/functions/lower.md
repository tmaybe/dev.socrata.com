---
layout: with-sidebar
sidebar: documentation
title: lower(...)

type: function
datatypes:
- text 
backend: new
description: Returns the lowercase equivalent of a string of text
---

{% include function_header.html %}

The `lower(...)` function is used within the `$select` or `$where` parameters to lower-case a [Text](/docs/datatypes/text.html) value. For example, you could use it within the `$select` statement to lower-case names from the White House salaries dataset:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$select=lower(name), salary" %}
