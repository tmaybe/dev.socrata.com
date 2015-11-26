---
layout: changelog
title: Introducing clarified SODA API versioning
short_title: Introducing clarified SODA API versioning
category: changelog
date: 2015-11-25
parent_paths: 
- /changelog/
parents: 
- API Changelog
---

On this Thanksgiving eve, we have some tasty new updates for you. [In April](/changelog/2015/04/27/new-higher-performance-apis.html) we announced the release of new, high-performance Socrata Open Data APIs for many datasets. Over time, those APIs have been rolled out for more and more datasets, but that process is not yet complete. In the meantime, we've discovered that there is a significant amount of confusion about what functionality is available on which API endpoints. So, in order to clarify that situation, we're re-introducing those new API endpoints as SODA version 2.1.

_No functionality will change_, but we've done a lot of work to make it clearer what functionality is available for what API endpoints. 

- In the API documentation for each dataset ([example](/foundry/#/data.ny.gov/qegy-i7es)), the sidebar now clearly lists the "Endpoint Version", e.g. "2.0" or "2.1", with a link to details on that API version
- The listings of [datatypes](/docs/datatypes/), [data formats](/docs/formats/), and [SoQL functions](/docs/functions/) are now clearly filterable by what API version they are available in
- The [API endpoint](/docs/endpoints.html) documentation page also now describes the differences between the different versions of SODA API endpoints and how data is kept in sync between them

Of course, we'd always prefer for you to use the latest version the API for each dataset. However, we understand that in some cases you may have legacy code that you have not yet migrated to 2.1, and that's OK. We'll continue to run both versions in parallel for some time, and in the next few weeks we'll announce the schedule for deprecation of version 2.0, so please [sign up for our developer newsletter or another notification channel](/changelog/) to make sure you get all the latest news.
