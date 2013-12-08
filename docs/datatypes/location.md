---
layout: with-sidebar
sidebar: documentation 
title: Location Datatype
audience: documentation
status: beta
---

Location is a type that contains latitude, longitude and address. Location is accessed as an array with 3 elements in it.  These elements are:

* The latitude of the location.  This may be null, if the object has been recently uploaded.  This _must_ be decimal degrees, for example: 41.8657007325722
* The longitude of the location.  This may be null, if the object has been recently uploaded.  This _must_ be in decimal degrees, for example: -87.76110202195098
* A JSON object containing the U.S. address.  This may be null.  The object has the following members:
    * address -- The street address of the location.
    * city -- The city this address is in
    * state -- The state this address is in
    * zip -- The zip code for this address

The following table describes the operators that can be used with locations. 

|Operator|Description|
|---|---|
|within_box|Returns true if the location is within the specified box|
