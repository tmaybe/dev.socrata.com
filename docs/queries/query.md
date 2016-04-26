---
layout: with-sidebar
sidebar: documentation
title: The $query Parameter
parent_paths: 
- /docs/queries/
parents: 
- Queries using SODA

type: parameter
param: "$query"
description: "A full SoQL query string, all as one parameter"
data_type: string
order: 8
---

The `$query` parameter allows you to combine multiple SoQL clauses together into a single parameter, for convenience. Similar to SQL, clauses must be specified in a specific order:

- [`SELECT`](/docs/queries/select.html)
- [`WHERE`](/docs/queries/where.html)
- [`ORDER BY`](/docs/queries/order.html)
- [`GROUP BY`](/docs/queries/group.html)
- [`LIMIT`](/docs/queries/limit.html)
- [`OFFSET`](/docs/queries/offset.html)

Note that unlike SQL, there is no `FROM` clause.

For example, you could combine `$select` and `$where` parameters together as follows:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$query=SELECT location, magnitude WHERE magnitude > 4.2' %}

For a full listing of the functionality available in SoQL, check out the [the SoQL documentation](/docs/queries/).

## Sub-Queries

The `$query` parameter also allows you to use another advanced feature of SoQL - sub-queries. Sub-queries allow you to further refine the results of a query by chaining queries together.

To create a sub-select, follow a `$query` string with the `|>` operator and a further query. For example, the following would allow you to determine the number of unique `city_feature` types, as well as the total number of entries, in the Seattle My Neighborhood Maps dataset:

{% include tryit.html domain='data.seattle.gov' path='/resource/3c4b-gdxv.json' args="$query=SELECT city_feature, COUNT(*) AS count GROUP BY city_feature |> SELECT COUNT(city_feature) AS num_types, SUM(count) AS total_features" %}

