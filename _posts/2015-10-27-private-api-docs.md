---
layout: post
categories: changelog
title: API Documentation for Private Datasets
short_title: API Documentation for Private Datasets
date: 2015-10-27
parent_paths: 
- /changelog/
parents: 
- API Changelog
author: chrismetcalf
---

Ever since we released the new automatic documentation functionality for Socrata APIs (often called "API Foundry"), the most popular request by far has been the introduction of API documentation for private datasets. We've also noticed an exciting trend of our customers using private APIs as a foundation to build web apps and services upon.

So, we're very proud to announce the availability of automatic API documentation for private datasets! When you visit the API documentation for a private dataset, you'll receive a notice prompting you to authenticate to allow the documentation generation tool temporary access to your dataset:

![Private Dataset](/img/private_apis.png)

Once you've done so, the documentation tool will automatically generate documentation for your private dataset's API, just like you're familiar with for public datasets.

## How does it work?

Security is of critical importance to us, so we didn't cut any corners when developing this new feature. All of its code is Open Source and open to review, and we encourage you to read on if you'd like to learn some of the more technical details on how it works.

For security and performance, our developer site is hosted entirely as static HTML, and API documentation is generated in JavaScript, entirely from within your web browser. In order to allow you to securely log in using your credentials, without entering them anywhere other than your own datasite, we use a secure proxy that sits in between your browser and the Socrata APIs to mediate requests.

When you visit the API documentation for a private dataset, the following things happen:

1. When we first attempt to access the API to gather metadata about your dataset, the API server returns a `403 Unauthenticated` error response to let us know that the dataset is private. We detect that and prompt you to log in to view your API documentation.
2. When you click the "Authenticate" link, you're taken to our secure API proxy, which begins the [OAuth](https://en.wikipedia.org/wiki/OAuth) workflow to authenticate you and allow you to grant access to your dataset. This is the same kind of workflow you'd step through in allowing a website access to your Facebook or Google account:
    1. You'll first be routed to your data portal and asked to log in (unless you already are)
    2. Then you'll be asked to grant access for the proxy to act on your behalf to allow us to generate API documentation
    3. After you approve access, an access token will be returned to the proxy and you'll be rerouted back to your API documentation
3. Once you're logged in, requests will be routed through the secure proxy which will allow access to the private dataset

When you're done, you can either click the "Log out" link or close your browser, and you'll automatically be logged out.

## How is it kept secure?

A number of very deliberate steps were taken to ensure that this could all be done securely:

- Both the developer portal and the API documentation are only available over secure HTTPS connections, just like your bank uses
- The API proxy uses a special "session cookie" to store your authentication information. The actual OAuth token is never actually shared with your web browser, only an encrypted identifier that the proxy server can use to look up your authentication token on the server side
- Access to that session cookie is limited only to requests against the proxy server itself, and only over HTTPS
- All requests between the JavaScript code running in your web browser and the proxy server are restricted with Cross-origin Resource Sharing ([CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)) headers that allow access only over HTTPS and only between the developer portal and the proxy server
- The proxy restricts the kind of requests that can be made so that _only_ `GET` requests are proxied and the proxy can never be used to modify data or metadata

All of the code is also available in Github for your review and feedback:

- The [dev.socrata.com](https://github.com/socrata/dev.socrata.com) developer portal
- The [secure proxy](https://github.com/socrata/proxy.dev.socrata.com)
