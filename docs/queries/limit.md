---
layout: with-sidebar
sidebar: documentation
title: The $limit Parameter
parent_paths: 
- /docs/queries/
parents: 
- Queries using SODA

type: parameter
param: "$limit"
in_query: LIMIT
default: "1000 (2.0 endpoints: maximum of 50,000; 2.1: unlimited [&raquo;](/docs/endpoints.html))" 
description: "Maximum number of results to return"
data_type: integer
format: int64
order: 6
---

The `$limit` parameter controls the total number of rows returned, and it defaults to 1,000 records per request. It can be used either alone, or with `$offset` in order to page through a dataset.

For example, if you wanted to only return the top ten strongest earthquakes, you could use `$limit` in conjunction with `$order`:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv.json' args='$order=magnitude DESC&amp;$limit=10' %}

When combined with an aggregation via [`$group`](/docs/queries/group.html), `$limit` is applied _after_ the aggregation. For example, if the aggregation reduces a result set from 10,000 records to 100, the `$limit` is applied to the result set of 100, rather than the original records.

<div class="alert alert-info">
  <p><strong>Note:</strong> Depending on whether an <a href="/docs/endpoints.html">API endpoint is a new endpoint or a legacy endpoint</a> it will have different maximums for <code>$limit</code>. Legacy endpoints have a maximum <code>$limit</code> of 50,000, while new API endpoints have no maximum. Details are available in the API documentation for each API.</p>
</div>
