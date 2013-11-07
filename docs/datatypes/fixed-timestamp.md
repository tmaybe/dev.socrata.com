---
layout: with-sidebar
sidebar: documentation 
title: Fixed Timestamp Datatype
audience: documentation
status: beta
---

Fixed timestamps represent an instant in time with millisecond precision.  These timestamps _must_ have timezone offset information
associated with them, and will be stored in UTC.  Since, these have time offsets, the time represents a specific time for a specific
place.  

For example, if a time is stored as 3:00pm on April 8th in Washington D.C..  That same time will show up as noon on April 8th in Seattle, WA.