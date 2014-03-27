---
layout: with-sidebar
sidebar: publisher
title: Manipulating Rows Directly
audience: publisher
---

{% include publisher-note.html %}

## Introduction

The Socrata Publisher APIs allow you to directly retrieve, modify, and delete individual rows in a Socrata dataset, using their [row identifiers](/docs/row-identifiers.html). Please note that all operations that modify datasets must be authenticated as a user who has access to modify that dataset, and must be accompanied by an application token.

With the Publisher API, you will be able to:

- Create new rows individually
- Update/replace existing rows
- Delete rows from your dataset

Bulk updates are also possible via our `upsert` update method.

<ul class="well">
  <li>Learn how to <a href="/docs/authentication.html">authenticate via HTTP Basic or OAuth 2.0</a></li>
  <li>Learn about <a href="/docs/app-tokens.html">application tokens</a></li>
  <li>Learn how to perform an <a href="/publishers/upsert.html">`upsert` operation</a></li>
</ul>

## Creating an Individual Row

To create a single row, we're going to do a "mini-`upsert`" with only a single row. If you have a row identifier configured on your dataset, you'll want to make sure your new row is entirely new, including the row identifier, otherwise you'll update an existing row!

Like all Publisher API requests, you'll want to make sure you're:

- Using a secure HTTPS connection
- Authenticating using HTTP Basic or OAuth 2.0
- Including an application token
- Including the proper `Content-Type` header, in this case `application/json`

In this example, we'll be formatting our new row as a single JSON object, wrapped in an array, like this:

{% highlight javascript %}
[ {
  "city" : "CHICAGO",
  "driver_type" : "Taxi",
  "issue_date" : "1970-11-19T00:00:00.000",
  "license" : "8108",
  "license_type" : "PERMANENT",
  "name" : "KIM, JOSEPH J",
  "sex" : "MALE",
  "state" : "IL",
  "status" : "INACTIVE",
  "status_date" : "2007-05-07T00:00:00.000"
} ]
{% endhighlight %}

Now we'll take that payload and pass it as our payload in a `POST` request to the dataset's API endpoint:

{% highlight http %}
POST /resource/hgqn-vki9.json HTTP 1/1
Host: soda.demo.socrata.com
Accept: */*
Authorization: Basic [REDACTED]
Content-Length: 253
Content-Type: application/json
X-App-Token: K6MG1yJkX2f4hTtAyW74QoRyh

[ {
  "city" : "CHICAGO",
  "driver_type" : "Taxi",
  "issue_date" : "1970-11-19T00:00:00.000",
  "license" : "8108",
  "license_type" : "PERMANENT",
  "name" : "KIM, JOSEPH J",
  "sex" : "MALE",
  "state" : "IL",
  "status" : "INACTIVE",
  "status_date" : "2007-05-07T00:00:00.000"
} ]
{% endhighlight %}

## Retrieving An Individual Row

Before we get into how to update rows, let's review how you access individual rows. To use a row identifier to look up a row, simply append it to the resource endpoint for that dataset. For example, to look up row `1` from the Visitor Records dataset using its row identifier:

<a href="https://explore.data.gov/resource/644b-gaut/1.json">https://explore.data.gov/resource/644b-gaut/1.json</a>

<ul class="well">
  <li>Learn more about <a href="/docs/row-identifiers.html">row identifiers</a></li>
  <li>Learn how to <a href="/publishers/configuring-row-identifiers.html">configure row identifiers</a></li>
</ul>

{% include try.html %}
