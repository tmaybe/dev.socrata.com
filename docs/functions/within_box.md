---
layout: with-sidebar
sidebar: documentation
title: within_box(...)

type: function
datatypes:
- location
- point
description: Returns the rows that have locations within the specified box, defined by latitude, longitude corners
---

{% highlight sql %}
?$where=within_box(location_col_identifier, top_left_latitude, top_left_longitude, bottom_right_latitude, bottom_right_longitude)
{% endhighlight %}

For example, to get all earthquakes in the Seattle area: 

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/earthquakes.json' args='$where=within_box(location, 48.317908, -122.995119, 47.309034, -121.630497)' %}
