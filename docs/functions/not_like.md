---
layout: with-sidebar
sidebar: documentation
title: not like '...'

type: function
datatypes:
- text 
backend: new 
description: Allows for matching text fields that do not contain a substring
---

{% include function_header.html %}

The `like '...'` function allows you to filter for [Text](/docs/datatypes/text.html) values that do not match a given pattern. Patterns can include placeholders to make fuzzy matches:

- An underscore (&#95;) matches a single character
- A percent symbol (%) matches any string of zero or more characters

For example, to query the [White House Salaries](https://open.whitehouse.gov/d/9j92-xfdk) employees who aren't advisors (the '%' characters are URL encoded as '%25'):

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$where=position_title not like '%25ADVISOR%25'" %}
