---
layout: post
categories: blog
tags:
- blog
- analysis
- integrations
- cartodb
- plot.ly
- geospatial
- statistics
title: "Analyze data with one click via CartoDB, Plot.ly"
date: 2016-07-01
author: chrismetcalf
---

We're excited to introduce a new feature of our API documentation tool - one-click integration with the [Plot.ly](https://plot.ly/) data visualization and analysis tool, as well as the [CartoDB](https://cartodb.com/) geospatial mapping platform.

Now, within the sidebar of every dataset API documentation page, like [this one of all of Chicago's bike routes](https://dev.socrata.com/foundry/data.cityofchicago.org/hvv9-38ut), you'll find a new "External Integrations" section with options to explore that dataset with Plot.ly or CartoDB.

For example, with one click, we loaded that Chicago bike routes dataset into CartoDB, and created this visualization that color codes the bike routes by type:

<iframe width="100%" height="520" frameborder="0" src="https://chrismetcalf.cartodb.com/viz/f851d1b4-3fc6-11e6-a7b9-0e98b61680bf/embed_map" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

If your data isn't geospatial, don't worry. You can also use [Plot.ly](https://plot.ly/) to build interactive graphs and charts, like this one based on [City of Reno call for service response times](https://dev.socrata.com/foundry/performance.reno.gov/i98d-i2kb):

<iframe width="100%" height="520" frameborder="0" scrolling="no" src="https://plot.ly/~chrismetcalf/8.embed"></iframe>

The feature is still new, and we plan on adding new integrations with other services in the future. If you have any questions, issues, or new functionality you'd like to see, [reach out and let us know!](/support.html)

