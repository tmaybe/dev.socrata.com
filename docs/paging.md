---
layout: with-sidebar
sidebar: documentation 
title: Paging through Data
audience: documentation
status: beta
---

Sometimes Socrata API requests will return a large number of results. Rather than retrieve them all at once, which may affect your application's performance, you can use paging to retrieve the results in batches. Often an application will show the first few results, and then only load the next batch of results when the user has taken an action, such as clicking a **Next** button or scrolling to the bottom of a list.

Paging is accomplished through two query parameters: _$limit_ and _$offset_.

|Query Parameter|Description|Default Value|
|---|---|---|
|_$limit_|The number of results to return|1000|
|_$offset_|The index of the result array where to start the returned list of results.|0| 

## Example

The following example returns a large number of earthquake results in JSON format:

[http://soda.demo.socrata.com/resource/earthquakes.json](http://soda.demo.socrata.com/resource/earthquakes.json)

If we were building a mobile application that only had room for 5 results on a page, we might make our first call to get the first 5 results as follows:

[http://soda.demo.socrata.com/resource/earthquakes.json?$limit=5&$offset=0](http://soda.demo.socrata.com/resource/earthquakes.json?$limit=5&$offset=0)

Then, if the user clicked **Next**, we would retrieve the next five results with this request:

[http://soda.demo.socrata.com/resource/earthquakes.json?$limit=5&$offset=5](http://soda.demo.socrata.com/resource/earthquakes.json?$limit=5&$offset=5)
