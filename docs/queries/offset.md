---
layout: with-sidebar
sidebar: documentation
title: The $offset Parameter
parent_paths: 
- /docs/queries/
parents: 
- Queries using SODA

type: parameter
param: "$offset"
in_query: OFFSET
default: 0
description: "Offset count into the results to start at, used for paging"
data_type: integer
format: int64
order: 6
---

The `$offset` parameter is most often used in conjunction with `$limit` to page through a dataset. The `$offset` is the number of records into a dataset that you want to start, indexed at 0. For example, to retrieve the "4th page" of records (records 151 - 200) where you are using `$limit` to page 50 records at a time, you'd ask for an `$offset` of 150:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv.json' args='$limit=50&amp;$offset=150' %}
