---
layout: with-sidebar
sidebar: documentation
title: Search with $q
parent_paths: 
- /docs/queries/
parents: 
- Queries using SODA

type: parameter
param: "$q"
default: No search
description: "Performs a full text search for a value."
data_type: string
order: 8
---

The `$q` parameter is used to access a special full-text index that searches within the dataset. The full-text index spans all of the fields of the dataset, so think of it more like using a search engine than performing a SQL query.

For example, to search for the string "Islands" inside our earthquakes dataset:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv.json' args='$q=Islands' %}

Multiple search terms are `AND`ed together, rather than used as a phrase search, and words are [stemmed](https://en.wikipedia.org/wiki/Stemming) before indexing and before each query. Stemming reduces each word down to its base or root form, so plural nouns like "criminals" will be reduced down to the singular "criminal", and verbs like "stealing" will reduced down to their root of "steal". So, searching with `$q=stealing bicycles` would match on the phrase "he was looking for a bicycle to steal" as well as the words "steals" and "bicycles" in different columns of a given record.
