---
layout: with-sidebar
sidebar: documentation
title: within_circle(...)
type: function
datatypes:
- location
- point
description: Returns the rows that have locations within a specified circle, measured in meters
---

## within_circle:

{% highlight sql %}
?$where=within_circle(location_col_identifier, latitude, longitude, radius)
{% endhighlight %}

For example, to get all earthquakes within a 50,000 meter radius circle around Seattle: 

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/earthquakes.json' args='$where=within_circle(location, 47.616810, -122.328064, 50000)' %}
