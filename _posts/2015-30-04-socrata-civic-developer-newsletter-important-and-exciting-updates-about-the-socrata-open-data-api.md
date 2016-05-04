---
layout: post
title: "Socrata Civic Developer Newsletter: Important and exciting updates about the Socrata Open Data API"
categories: blog
date: 2015-04-30
original_url: "https://www.socrata.com/developer-blog-article/socrata-civic-developer-newsletter-important-and-exciting-updates-about-the-socrata-open-data-api/"
author: "chrismetcalf"
---

<p class="p3">The following is cross-posted from the <a href="https://tinyletter.com/socrata-developers">Socrata Civic Developer Newsletter</a>. If you'd like to get these fun updates in your inbox, <a href="https://tinyletter.com/socrata-developers">sign up now</a>!</p>
<h1 class="p3" style="text-align: center;"><span class="s2">Oh boy, have we got good news for you!</span></h1>
<p class="p4">From time to time I'll use this newsletter to send important announcements about upcoming changes and improvements to the APIs and the tools we provide to civic developers like yourself. Today I have the privilege of introducing something not only important, but also very, very exciting.</p>
<p class="p4">Over the past 18 months, our team has been working on some amazing improvements to the Socrata platform. You may have already seen some of these improvements such as Data Lens, our revolutionary new user experience for citizens, community advocates, and everyday people to visualize, contextualize open data. But don't worry, we haven't left you out - we're also introducing a ton of new functionality to the Socrata Open Data APIs.</p>
<h1 class="p7" style="text-align: center;"><span class="s2">The New &amp; Improved Socrata Open Data APIs</span></h1>
<p>The same backend that powers our exciting Data Lens interface is also available for all you civic developers to take advantage of starting... now! These new and improved Socrata Open Data APIs are like the ones you're already familiar with, only faster, more flexible, and with a lot more functionality. For example:</p>
<ul>
	<li>
<p>The datatypes you already know and love are getting awesome new functionality, such as <a href="http://dev.socrata.com/docs/functions/like.html">substring searching</a> for the <a href="http://dev.socrata.com/docs/datatypes/text.html">Text</a> datatype and <a href="http://dev.socrata.com/docs/functions/between.html">range queries</a> for <a href="http://dev.socrata.com/docs/datatypes/number.html">Number</a> and <a href="http://dev.socrata.com/docs/datatypes/floating_timestamp.html">Timestamp</a> datatypes.</p>
</li>
	<li>
<p>We're also introducing the new <a href="http://dev.socrata.com/docs/datatypes/point.html">Point</a> datatype (replacing <a href="http://dev.socrata.com/docs/datatypes/location.html">Location</a>), with exciting new geospatial SoQL functionality like <a href="http://dev.socrata.com/docs/functions/within_polygon.html">within_polygon(...)</a> and<a href="http://dev.socrata.com/docs/functions/convex_hull.html">convex_hull(...)</a>. Point also comes with friends - <a href="http://dev.socrata.com/docs/datatypes/line.html">Line</a> and <a href="http://dev.socrata.com/docs/datatypes/polygon.html">Polygon</a>.</p>
</li>
	<li>
<p>And, possibly most exciting of all, all of our data is now available via<a href="http://dev.socrata.com/docs/formats/geojson.html">GeoJSON</a>, a standard format which can easily be consumed by dozens of off-the-shelf applications and libraries such as <a href="http://cartodb.com/">CartoDB</a>, <a href="https://www.mapbox.com/">Mapbox</a>, and <a href="http://leafletjs.com/">Leaflet.js</a>.</p>
</li>
</ul>
<p>We've also released a ton of new documentation on the new functionality available in the Socrata Open Data APIs, from details on <a href="http://dev.socrata.com/docs/datatypes/">the new datatypes</a> to the available<a href="http://dev.socrata.com/docs/functions/index.html">SoQL functions</a>. As we add more functionality to the API, we'll document those updates in the <a href="http://dev.socrata.com/changelog/">changelog</a> and announce them here in this newsletter.</p>
<p>If you're currently using the API in your application, you will need make some updates to take advantage of this new functionality. But we'll be giving you ample time and notification before the old dataset API endpoints are retired, and we've provided <a href="http://dev.socrata.com/changelog/2015/04/27/new-higher-performance-apis.html">a walk-through on how to upgrade</a> to the new ones. If you encounter any problems whatsoever in the migration process, don't be shy - let us know!</p>
<h1 class="p4" style="text-align: center;"><span class="s2">Socrata Labs: New Catalog &amp; Export APIs</span></h1>
<p>In addition to the awesome new functionality that we're introducing to the Socrata Open Data APIs, we're also introducing new APIs via <a href="http://labs.socrata.com/">Socrata Labs</a>, our new website designed to give you an early preview of new APIs our team is working on. Labs APIs are pre-release, and give you a chance to try them and provide feedback to our team. Once they've spent some time in Labs and we've given the community to test them out, we'll release them as full production APIs as part of the <a href="http://dev.socrata.com/">Socrata Developer Portal</a>.</p>
<p>As part of the initial launch of Socrata Labs, we're excited to launch two new APIs:</p>
<ul>
	<li>
<p>The <a href="http://labs.socrata.com/docs/search.html">Catalog Search API</a> - The catalog search API allows you to query the entire Socrata open data catalog, across all of the public datasets hosted on all of our customers public data portals. In addition, we're applying machine learning techniques to improve how datasets are categorized and to allow for consistent categories across data catalogs.</p>
</li>
	<li>
<p>Our new <a href="http://labs.socrata.com/docs/export.html">Export API</a> - Beyond providing much faster, cached export functionality, the new export service also allows you to filter exports using<a href="http://dev.socrata.com/docs/queries.html">SoQL queries</a> to retrieve only the data you were looking for.</p>
</li>
</ul>
<p>As these are prerelease APIs, they may change to reflect feedback from the community, but we wanted to get them in front of all of you as early as possible to see what you'll be able to build with them!</p>
<h1 class="p8" style="text-align: center;"><span class="s2">Are you a data publisher?</span></h1>
<p class="p9">If you're one of our amazing data publishers, or even if you're just curious about what it takes to load data into a Socrata data portal, you should sign up for our <a href="https://tinyletter.com/socrata-publishers">Socrata Data Publisher Newsletter</a>. Published by <a href="https://twitter.com/adrianlaurenzi">Adrian Laurenzi</a>, my counterpart on our Customer Success team, it will include tips and tricks, announcements about new features, and other awesome resources for data publishers.</p>
