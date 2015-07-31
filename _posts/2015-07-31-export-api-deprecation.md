---
layout: with-breadcrumbs
title: Socrata Labs Export API Deprecation, $limit raised on new dataset APIs
short_title: Socrata Labs Export API Deprecation
category: changelog
date: 2015-07-31
parent_paths: 
- /changelog/
parents: 
- API Changelog
---

After several months of trial, we've decided to deprecate the beta-version Socrata Labs "Export" API in favor of a solution more tightly integrated with our other APIs. That service will be discontinued in the near future.

We'll be working on a new version of the Export API that is better integrated and more reliable than the beta version. In the meantime, we've raised the maximum [`$limit`](/docs/paging.html) on our [newest API endpoints](/changelog/2015/04/27/new-higher-performance-apis.html) to allow you to get export-like functionality by simply specifying a row count greater than the number of rows in the dataset.

