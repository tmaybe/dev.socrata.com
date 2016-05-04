---
layout: post
title: "Streaming Geospatial Processing in the Socrata Platform"
categories: blog
date: 2015-05-07
original_url: "https://www.socrata.com/developer-blog-article/streaming-geospatial-processing-in-the-socrata-platform/"
author: "Evan Chan"
---

<p>Here at Socrata, we host many public datasets, and most of them contain some kind of geospatial data - crime data, 311 and 911 data for example. We provide visualizations ranging from point maps to choropleths, which let citizens quickly see which school districts have more crime. Computing a choropleth means aggregating a set of points against many polygonal boundaries.</p>
<p><a href="http://www.socrata.com/wp-content/uploads/choropleths-example.png"><img class="aligncenter size-full wp-image-26195" src="https://www.socrata.com/wp-content/uploads/choropleths-example.png" alt="Choropleth Example" width="100%" /></a></p>
<h2>Why Streaming?</h2>
<p>PostGIS is the most popular database used for geospatial processing, and since aggregations for millions of points against polygons is too expensive of a query to execute in real time, traditionally the point-in-polygon calculation is precomputed. One would ingest all the data into a table in PostGIS, then precompute into a JOIN table. However, we found this approach had many limitations:</p>
<ul>
	<li>Latency is too high, need to wait for entire table to be inserted</li>
	<li>Solution is too PostGIS-centric; we want to scale out beyond PostGIS</li>
	<li>We have newer streaming data use cases coming online, where relying on database transforms simply won't work</li>
	<li>Thus, we decided to pursue a streaming approach where we could compute point-in-polygon on the fly.</li>
</ul>
<h2>Our Streaming Geospatial Stack</h2>
<p><a href="http://www.socrata.com/wp-content/uploads/geospace-coding.mermaid.png"><img class="aligncenter size-full wp-image-26196" src="https://www.socrata.com/wp-content/uploads/geospace-coding.mermaid.png" alt="Geospace Coding" width="100%" /></a></p>
<p>Our streaming geospatial microservice is called Geospace. It is written in Scala and keeps boundaries from different shapefiles in memory. Points are then sent to the service and mapped to the containing polygon. For speed, an in-memory RTree implementation from the JTS library is used.</p>
<h2>Presentation at FOSS4G-NA</h2>
<p>For more information, including tips on scaling out the streaming service and performance tips for geospatial computations on the Java/Scala platform, please have a look at the video and slides from our <a href="https://2015.foss4g-na.org/node/1409">presentation at FOSS4G-NA</a> conference in March.</p>
<h2>Open Source Code!</h2>
<p>Socrata believes in open source, so you will find our geospatial microservice, Geospace, <a href="https://github.com/socrata-platform/geospace">on github</a>.</p>
