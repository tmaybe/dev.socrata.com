---
layout: with-sidebar
sidebar: documentation 
title: Filtering
audience: documentation
status: beta
---

If you perform a GET request on an API endpoint using an HTTP client (such as a web browser, a simple utility like cURL, or a REST client like Postman), you will automatically get the first 1000, unfiltered records. However, to narrow down what's returned, you can use SODA 2.0's filtering capability.

##Equality Filtering

The simplest form of filtering is equality. Use the field name as a query parameter, and its value as the filter value. The request will return only results where that field is equal to that value.

For example, to query the [USGS Earthquakes](https://soda.demo.socrata.com/developers/docs/earthquakes) API for quakes with a `region` of "Washington", use this URL:

[https://soda.demo.socrata.com/resource/earthquakes.json?region=Washington](https://soda.demo.socrata.com/resource/earthquakes.json?region=Washington)

##Using the `$where` Parameter

Use the `$where` query parameter to only return results that meet certain criteria. The `$where` parameter supports a number of comparison operations:

|Operations|Description|
|---|---|
|&lt;|Less than (numbers) or alphabetically before (strings)|
|&lt;=|Less than or equal (numbers) or alphabetically before or equal (strings)|
|=|Equal|
|!=|Not equal|
|&lt;|Greater than (numbers) or alphabetically after (strings)|
|&lt;=|Greater than or equal (numbers) or alphabetically after or equal (strings)|
|starts_with(x, y)|String x starts with y (strings only)|
|contains(x,y)|String x contains string y (strings only)|
|IS NULL|Whether a value is null|
|IS NOT NULL|Whether a value is not null|

In addition, it supports these Boolean operations:
* AND
* OR
* NOT
 
Parenthesis can be used as to specify the order of operations.

For more details, see the [queries](/docs/queries.html) page.

##Examples

The following example returns only earthquakes with a magnitude greater than 5:

[http://soda.demo.socrata.com/resource/earthquakes.json?$where=magnitude &gt; 5](http://soda.demo.socrata.com/resource/earthquakes.json?$where=magnitude%3E5)

The following example returns only earthquakes with a magnitude greater than or equal to 5 but less than 5.5:

[http://soda.demo.socrata.com/resource/earthquakes.json?$where=magnitude &gt;= 5 AND magnitude &lt; 5.5](http://soda.demo.socrata.com/resource/earthquakes.json?$where=magnitude%3E5+AND+magnitude%3C5.5)
