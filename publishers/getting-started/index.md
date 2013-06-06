---
layout: default
title: Getting Started with the Socrata Open Data Publisher API
---

<div id="tryit-visor">
  <div id="tryit-target"><!-- This space intentionally left blank --></div>
</div>

# {{ page.title }}

## About the Publisher API

The Socrata Open Data Publisher API is strictly a superset of the features provided in the Consumer API -- in fact, they are one and the same. For details on how to *access* information, please refer to the [Consumer API][1] documentation. For those of you who wish to publish data, however, venture bravely onwards!

## Authentication, Application Tokens, and Throttling

If you wish to publish data using the Socrata Open Data API, you will need to use one of the SODA API's two authentication methods.

The API is built to authenticate primarily with [OAuth 2][2]. We support only the server-based flow with a callback URL for security reasons. Please see the [API Authentication and Application Tokens][3] section for further details on authenticating using OAuth 2.

If you're only writing a quick application to authenticate as yourself, or you are unable for some other reason to use OAuth 2, the SODA API provides a simpler authentication method using [HTTP Basic][4] authentication. Simply use the email address and password you registered with Socrata. When making authenticated requests, please remember to *always* use HTTPS connections, and to supply an application token.

<div class="more-info">
  For more information, see the <a href="/authentication">API Authentication and Application Tokens</a> section.
</div>

## Getting Data in through the Socrata Open Data API

There are two primary interfaces for publishing your data through the API: for new data for which there is already a source data file, the Import API will allow you to upload, transform, and describe your data however you wish so that it looks the way you desire. For data that needs frequent updating, the SODA API includes a RESTful API for interacting with datasets that are already on the platform.

<div class="more-info">
  For more information on the Imports API, see the <a href="/publishers/importing">importing</a> section.
</div>

 [1]: /consumer/getting-started/
 [2]: http://oauth.net/2/
 [3]: /authentication
 [4]: http://en.wikipedia.org/wiki/Basic_access_authentication

{% include prettifier.html %}
