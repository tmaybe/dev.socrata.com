---
layout: post
title: Upper bound now set on Catalog Search API
short_title: Upper bound now set on Catalog Search API
categories: changelog
date: 2016-05-04
parent_paths: 
- /changelog/
parents: 
- API Changelog
author: chrismetcalf
---

In order to maintain the stability and performance of the beta [Catalog Search API](http://labs.socrata.com/docs/search.html), it has been necessary to [establish a maximum of 10,000 records to on the `limit` parameter](https://github.com/socrata/cetera/pull/152). Allowing arbitrarily large `limit`s was causing instability in the catalog service, and this change should make it more reliable for everyone.

