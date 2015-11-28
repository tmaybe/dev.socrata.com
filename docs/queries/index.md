---
layout: with-sidebar
sidebar: documentation
title: Queries using SODA
redirect_from:
  - /docs/queries.html
  - /docs/aggregation.html
  - /deprecated/querying-datasets
---

The Socrata APIs provide rich query functionality through a query language we call the "Socrata Query Language" or "SoQL". As its name might suggest, it borrows heavily from [Structured Query Language (SQL)](http://en.wikipedia.org/wiki/Sql), used by many relational database systems. Its paradigms should be familiar to most developers who have previously worked with SQL, and are easy to learn for those who are new to it.

## SoQL Clauses

SoQL statements are broken into "parameters" similar to clauses in SQL statements. Each clause can be expressed either directly
as a URL parameter or as a SoQL statement. If a parameter is not specified, then the default is used. Click each parameter name for more details:

| Parameter                              | Description                                                                                         | Default                                                                                    |
| ---                                    | ---                                                                                                 | ---                                                                                        |
| [`$select`](/docs/queries/select.html) | The set of columns to be returned                                                                   | All columns, equivalent to `$select=*`                                                     |
| [`$where`](/docs/queries/where.html)   | Filters the rows to be returned                                                                     | No filter, and returning a max of `$limit` values                                          |
| [`$order`](/docs/queries/order.html)   | Specifies the order of results                                                                      | Unspecified order, but it will be consistent across paging                                 |
| [`$group`](/docs/queries/group.html)   | Column to group results on, similar to [SQL Grouping](http://www.w3schools.com/sql/sql_groupby.asp) | No grouping                                                                                |
| [`$limit`](/docs/queries/limit.html)   | Maximum number of results to return                                                                 | 1000 (legacy: maximum of 50,000; new endpoints: unlimited [&raquo;](/docs/endpoints.html)) |
| [`$offset`](/docs/queries/offset.html) | Offset count into the results to start at, used for paging                                          | 0                                                                                          |
| [`$q`](/docs/queries/q.html)          | Performs a full text search for a value.                                                            | No search                                                                                  |

Note that for equality comparisons, the `$where` clause can be replaced with using the column name as the query parameter. See 
[filtering](/docs/filtering.html) for more details.

These parameters can then be directly added to the API endpoint. For example, here is how you would query the USGS Earthquakes datasets for quakes of greater than 3.0 on the Richter scale: 

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$where=magnitude > 3.0' %}

In examples, we will leave the parameters as is, but it is best to [URL Encode](http://en.wikipedia.org/wiki/Url_encode) your parameters to ensure they are parsed correctly.
