---
layout: with-sidebar
sidebar: documentation
title: The $limit Parameter
parent_paths: 
- /docs/queries/
parents: 
- Queries using SODA
---

The `$limit` parameter controls the total number of rows returned, and it defaults to 1,000 records per request. It can be used either alone, or with `$offset` in order to page through a dataset.

For example, if you wanted to only return the top ten strongest earthquakes, you could use `$limit` in conjunction with `$order`:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$order=magnitude DESC&amp;$limit=10' %}

<div class="alert alert-info">
  <p><strong>Note:</strong> Depending on whether an <a href="/docs/endpoints.html">API endpoint is a new endpoint or a legacy endpoint</a> it will have different maximums for <code>$limit</code>. Legacy endpoints have a maximum <code>$limit</code> of 50,000, while new API endpoints have no maximum. Details are available in the API documentation for each API.</p>
</div>
