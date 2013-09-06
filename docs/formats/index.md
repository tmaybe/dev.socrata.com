---
layout: with-sidebar
sidebar: documentation 
title: Data Formats
audience: documentation
status: beta
---

The Socrata Open Data API supports a number of different output formats that can be specified either via HTTP `Accept` headers or via an output type extension on the API endpoint.

* [JSON](/docs/formats/json.hml)
* [CSV](/docs/formats/csv.html)
* [RDF-XML](/docs/formats/rdf-xml.html)

Neither type is better than the other - simply select the one that works best for your framework and application.

## Output Type Extensions

The simplest way to specify the output type you want to receive is by simply appending an output type extension to your URL. If you don't have the ability to set headers in your HTTP client, this is also the only method you'll have available.

Simply add the extension for the output type you want to receive to the endpoint you use to access the API. For example, if your resource endpoint was `/resource/earthquakes`:

* `/resource/earthquakes.json` would get you [JSON](/docs/formats/json.html) output
* `/resource/earthquakes.csv` would get you [CSV](/docs/formats/csv.html)
* And `/resource/earthquakes.rdf` would get you [RDF-XML](/docs/formats/rdf-xml.html)

## HTTP Accept Headers

[HTTP Accept](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html) headers allow applications to automatically negotiate content types with a web service. With SODA, this also means you can request content types using Accept headers without needing to provide an output type extension.

Simply send an `Accept`header along with the desired [mimetype](http://en.wikipedia.org/wiki/Internet_media_type) for the output type you want to request. For example:

* `Accept: application/json` for [JSON](/docs/formats/json.html) output
* `Accept: text/csv` for [CSV](/docs/formats/csv.html)
*  `Accept: application/rdf+xml` for [RDF-XML](/docs/formats/rdf-xml.html)

The SODA API will also include a `Content-type` header to specify what type of output it is including in its response.
