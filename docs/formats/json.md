---
layout: with-sidebar
sidebar: documentation 
title: JSON Format
audience: documentation
---

## Basic Format

The JSON format is the most commonly used format for getting SODA2 responses.  In this format, the response
will come back in a JSON array, with each element being a result.  The key will be the column name (or alias) and the
value will be the result.  E.g.

<pre class="prettyprint">
[ {
  "position" : "Member",
  "agency_website" : "SSAB (http://www.ssab.gov)",
  "name" : "Aaron, Henry Jacob",
  "nomination_date" : "2011-02-14T00:00:00",
  "agency_name" : "Social Security Advisory Board"
}, {
  "position" : "Member",
  "confirmed" : true,
  "agency_website" : "EOP-CEA (http://www.whitehouse.gov/administration/eop/cea)",
  "name" : "Abraham, Katharine",
  "confirmation_vote" : "2011-04-14T00:00:00",
  "nomination_date" : "2011-01-26T00:00:00",
  "agency_name" : "Council of Economic Advisers"
} ]
</pre>

## Numbers

Implementations may provide support for more precision and accuracy than IEEE doubles allow.  To handle this case,
numbers in SODA are returned as strings.  If you want to have numbers return as doubles in the JSON, you can cast them to
a `double` in the select part of the SoQL.

## Nulls

Nulls are indicated by not sending any value at all.  E.g.

<pre class="prettyprint">
{
  "position" : "Member",
  "agency_website" : "SSAB (http://www.ssab.gov)",
  "name" : "Aaron, Henry Jacob",
  "nomination_date" : "2011-02-14T00:00:00",
  "agency_name" : "Social Security Advisory Board"
}
</pre>

Would have null values for `confirmed` and `confirmation_vote`.

## Locations

Locations will be returned as JSON objects, with longitude, latitude and address members.  E.g.

<pre class="prettyprint">
{
  "latitude" : 89.5555555,
  "longitude" : 89.5555555
}
</pre>

{% include prettifier.html %}
