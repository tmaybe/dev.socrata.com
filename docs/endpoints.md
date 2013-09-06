---
layout: with-sidebar
sidebar: documentation
title: API Endpoints
---

## What is an API Endpoint?

An `endpoint` in a SODA API is simply a unique URL that represents an object or collection of objects. Every Socrata `dataset`, and even every data `record`, has its own endpoint. The endpoint is what you'll point your HTTP client at to interact with data resources.

All resources are accessed through a common base path of `/resource/` along with their `dataset identifier`. This paradigm holds true for every dataset in every SODA API.

Dataset identifiers can be one of two things:
* When accessing a simple Socrata dataset, the "4x4" identifier for that dataset. Every dataset has a unique identifier - eight alphanumeric characters split into two four-character phrases by a dash. For example, `644b-gaut` is the identifier for the [White House Visitors](http://replaceme.com/url) dataset.
* Customized [API Foundry](http://replaceme.com/url) endpoints get a human-readable alias that can be used to access them. 

The endpoint for any SODA API can be created via this simple rule:

<code class="url">
	<span class="transport">http://</span><span class="domain">$domain</span><span class="path">/resource/</span><span class="identifier">$dataset_identifier</span>
</code>

Via an example, the endpoint for the [White House Visitors Record](http://replaceme.com/url) dataset would be:

<code class="url">
	<span class="transport">http://</span><span class="domain">explore.data.gov</span><span class="path">/resource/</span><span class="identifier">644b-gaut</span>
</code>

You can also find API endpoints in the "Developers" section of Socrata-powered data sites, or under "Export" then "API" on any Socrata dataset page.

Output formats can also be selected by adding an "extension" to your API endpoints. For more details see the [Output Formats](/docs/formats/index.html) section of this documentation.

## Addressing Individual Rows

In addition to having an endpoint for a dataset, each row also has an endpoint based on it's unique identifier. By default, a
row's unique identifier is provided automatically by Socrata. It is called `:id` and is not returned unless asked for. A dataset
can also specifically set a unique identifier in it's metadata, in which case that one is used.

    https://sandbox.demo.socrata.com/resource/nominationsCopy/1.json

NOTE:  If you want to actually see the `:id` values, you can put it in a select statement. E.g. [https://sandbox.demo.socrata.com/resource/nominationsCopy.json?$select=:id,name,agency_name](https://sandbox.demo.socrata.com/resource/nominationsCopy.json?$select=:id,name,agency_name)
