---
layout: with-sidebar
sidebar: documentation
title: Search with $q
parent_paths: 
- /docs/queries/
parents: 
- Queries using SODA
---

The `$q` parameter is used to access a special full-text index that searches within the dataset. The full-text index spans all of the fields of the dataset, so think of it more like using a search engine than performing a SQL query.

For example, to search for the string "Islands" inside our earthquakes dataset:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$q=Islands' %}
