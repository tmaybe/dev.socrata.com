---
layout: with-sidebar
sidebar: documentation
title: Application Tokens
---

The Socrata Open Data API has two concepts around API access: **authentication** and **application tokens**. You only need to **authenticate** if you wish to add, delete, or modify data that is attached to your account, or if you wish to read data you own that you have marked as private. See the [publisher API documentation](/publisher/getting-started/) for more details on how to do that.

You'll need an **application token** in order to access anything on the API. This enables us to track application usage. If you elect not to use an application token, you'll be subjected to a much lower throttling limit shared among all applications.

In short, *you'll only need to authenticate if you wish to modify datasets using the [Publisher API](/publisher/getting-started/).* Read-only requests need only include an application token.

## Application Tokens and Throttling

While it is possible to perform simple unauthenticated queries against the Socrata Open Data API without making use of an application token, you'll receive much higher throttling limits if you [register your application](http://opendata.socrata.com/profile/app_tokens) and include it in your requests.

You can include your application token using either the `$$app_token` parameter on your request (`app_token` if you're using the old SODA1 API), or using the `X-App-Token` HTTP header. Application tokens are not used for authentication, but you should still preserve the security of your application token by always using `HTTPS` requests.

Making a request using an application token as a parameter:

    > curl https://sandbox.socrata.com/resources/earthquakes.json?$$app_token=b6bThWI6I3dJfulFek8JRizjo

Using an application token in the HTTP header. Using an HTTP header is the preferred method:

    > curl --header "X-App-Token: b6bThWI6I3dJfulFek8JRizjo" https://sandbox.socrata.com/resources/earthquakes.json

## Authenticating using HTTP Basic Authentication

Requests can be authenticated by passing in HTTP Basic Authentication headers. We only support this method for legacy reasons, and encourage all our API users to use the OAuth workflow to authenticate their users. We may deprecate this authentication method in the future.

All HTTP-basic-authenticated requests *must* be performed over a secure (`https`) connection, and *must* include an Application Token. Authenticated requests made over an insecure connection or without an application token will be denied.

Here is a sample on how to use HTTP Basic Authentication:

    > curl --header "X-App-Token: b6bThWI6I3dJfulFek8JRizjo" --user LOGIN:PASS https://sandbox.socrata.com/resource/earthquakes.json

## Authentication with OAuth 2

### Authentication Workflow with OAuth 2

We encourage everyone to authenticate through our [OAuth 2](http://oauth.net/2/mechanism). We support only a subset of OAuth 2 -- the server-based flow with a callback URL -- which we believe is more secure than the other flows in the specification, and which we have found to be consistent with other popular API services on the web.

To authenticate with OAuth 2, you will first need to [register your application](http://opendata.socrata.com/profile/app_tokens) to get an auth token and a secret token. Much like [Google AuthSub](http://code.google.com/apis/gdata/docs/auth/authsub.html), we require you to preregister your server when you create an application (the `Callback Prefix` field), so that we can be sure that access through your application is secure even if both your tokens are stolen. Generally, you'll want to provide as much of your callback URLs as you can: if your authentication callback is `http://my-website.com/socrata-app/auth/callback`, for example, you might want to specify `http://my-website.com/socrata-app` as your callback URL.

Once you have an application and a secret token, you'll be able to authenticate with the SODA OAuth 2 endpoint. You'll first need to **redirect** the user to the Socrata-powered site you wish to access so that they may log in and approve your application:

    https://sandbox.socrata.com/oauth/authorize?client_id=YOUR_AUTH_TOKEN&response_type=code &redirect_uri=YOUR_REDIRECT_URI

Note that the `redirect_uri` here must be an absolute, secure (`https:`) URI which starts with the `callback prefix` you specified when you registered your application. If any of these cases fail, the user will be shown an error indicating as much. Should the user authorize your application, they will be redirected back to the your `redirect_uri`. As example, if I provide `https://my-website.com/socrata-app/auth/callback` as my `redirect_uri`:

    https://my-website.com/socrata-app/callback?code=CODE

Should your `redirect_uri` contain a querystring, it will be preserved, and the code parameter will be added onto the end of it. Likewise, should you provide the optional `state` parameter in the original redirect to `/authenticate`, it will be preserved and sent back to you.

Now that the user has authorized your application, you want to retrieve an `access_token` so that you can perform operations on their behalf. You can do this by **making a `POST` request from your server** for:

    https://sandbox.socrata.com/oauth/access_token
    ?client_id=YOUR_AUTH_TOKEN
    &client_secret=YOUR_SECRET_TOKEN
    &grant_type=authorization_code
    &redirect_uri=YOUR_REDIRECT_URI
    &code=CODE

The `redirect_uri` must be the same as the one you provide previously. The `code` should be the one you were passed back when the user was redirected back to your redirect URI. You'll receive the following response:

    { access_token: ACCESS_TOKEN }

Use this `access_token` in your requests when you have to do work on behalf of the now-authenticated user, as described below in the "Using an OAuth 2 access token" section.

We have a **sample app** available [on GitHub](https://github.com/socrata/oauth_sample_app_ruby) that illustrates how to do all of the above with the Ruby `OAuth2` gem.

### Using an OAuth 2 access token

Once you have obtained an `access_token`, you should include it on requests which need to happen on behalf of the user. The only supported way to do this is via the `Authorization` HTTP Header field. You want to set the header as follows in your request:

    Authorization: OAuth YOUR_ACCESS_TOKEN

Note that all authenticated requests *must* be performed over a secure connection (`https`). Any attempt to use an `access_token` over a non-secure connection will result in immediate revocation of the token.

### Who am I?

One quirk of authenticating via OAuth 2 is that the entire process happens without the 3rd party application (that's you!) having any knowledge of who, exactly, the user is that just authorized the application. To remedy this, we have set up an endpoint that simply returns the information of the current user:

    https://sandbox.socrata.com/users/current.json

