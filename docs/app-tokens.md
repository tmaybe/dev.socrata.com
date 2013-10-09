---
layout: with-sidebar
sidebar: documentation
title: Application Tokens
status: draft
---

While it is possible to perform simple unauthenticated queries against the Socrata Open Data API without making use of an application token, you'll receive much higher throttling limits if you [register your application](http://opendata.socrata.com/profile/app_tokens) and include it in your requests.

You can include your application token using either the `$$app_token` parameter on your request (`app_token` if you're using the old SODA1 API), or using the `X-App-Token` HTTP header. Application tokens are not used for authentication, but you should still preserve the security of your application token by always using `HTTPS` requests.

Making a request using an application token as a parameter:

    > curl https://sandbox.socrata.com/resources/earthquakes.json?$$app_token=b6bThWI6I3dJfulFek8JRizjo

Using an application token in the HTTP header. Using an HTTP header is the preferred method:

    > curl --header "X-App-Token: b6bThWI6I3dJfulFek8JRizjo" https://sandbox.socrata.com/resources/earthquakes.json

