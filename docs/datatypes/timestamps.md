---
layout: with-sidebar
sidebar: documentation 
title: Timestamp Datatypes
audience: documentation
status: beta
---

<a name="fixed">&nbsp;</a>
##Fixed timestamps

Fixed timestamps represent an instant in time with millisecond precision.  These timestamps _must_ have timezone offset information
associated with them, and will be stored in UTC.  Since, these have time offsets, the time represents a specific time for a specific
place.  

For example, if a time is stored as 3:00pm on April 8th in Washington D.C..  That same time will show up as noon on April 8th in Seattle, WA.

Fixed timestamps are represented in [Unix time](http://en.wikipedia.org/wiki/Unix_time).

<a name="floating">&nbsp;</a>
##Floating timestamps

Floating timestamps represent a logical day and time without reference to any particular time zone.  No matter where they are viewed, they will be seen as being the same time.

For example, if a time is stored as 3:00pm on April 8th in Washington D.C..  That same time will show up as 3:00pm on April 8th in Seattle, WA.

Floating timestamps are represented as [ISO 8601 formatted date strings](http://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations).