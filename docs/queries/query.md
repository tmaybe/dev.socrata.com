---
layout: with-sidebar
sidebar: documentation
title: The $query Parameter
parent_paths: 
- /docs/queries/
parents: 
- Queries using SODA
---

The `$query` parameter allows you to combine multiple SoQL clauses together into a single parameter, for convenience. For example, you could combine a `$select` and a `$where` query together as follows:
`$group`.

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$query=SELECT location, magnitude WHERE magnitude > 4.2' %}

For a full listing of the functionality available in SoQL, check out the [the SoQL documentation](/docs/queries/).

