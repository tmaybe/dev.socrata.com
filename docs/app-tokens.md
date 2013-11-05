---
layout: with-sidebar
sidebar: documentation
title: Application Tokens
---

The Socrata Open Data API uses application tokens for two purposes:
* Using an application token reduces the [throttling](/docs/throttling.html), resulting in more API requests allowed per unit of time.
* Authentication using OAuth

**Note:** The Socrata Open Data API has two concepts around API access: authentication and application tokens. You only need to authenticate if you wish to add, delete, or modify data that is attached to your account, or if you wish to read data you own that you have marked as private. Read-only requests only require the application token. See the [publisher API documentation](/publisher/getting-started/) for more details on changing data.

## Obtaining an Application Token

You can obtain an application token by [registering your application](http://opendata.socrata.com/profile/app_tokens) in your Socrata profile. After creating the application, click on **App Tokens** in the left-hand navigation bar. The app token will be visible.

## Application Tokens and Throttling

While it is possible to perform simple unauthenticated queries against the Socrata Open Data API without making use of an application token, you'll receive much higher throttling limits if you include an application token in your requests.

There are two ways to include the application token in the request:
* Use the `X-App-Token` HTTP header. 
* Use the `$$app_token` parameter in your request (`app_token` if you're using the old SODA1 API)
 
Using the header is the preferred method.

**Note:** Application tokens are not necessarily used for authentication, but you should still preserve the security of your application token by always using `HTTPS` requests.

The following curl command makes a request using an application token as an HTTP header:

    > curl --header "X-App-Token: b6bThWI6I3dJfulFek8JRizjo" https://sandbox.socrata.com/resources/earthquakes.json

The following curl command makes a request using an application token as a parameter:

    > curl https://sandbox.socrata.com/resources/earthquakes.json?$$app_token=b6bThWI6I3dJfulFek8JRizjo

By using an application token, data can be more effectively collected on API usage.

## Using the Application Token for Authentication
Application tokens can also be used for authentication, using OAuth2.0 or HTTP Basic Authentication. For more information, see the [authentication](/docs/authentication.html) section.


