---
layout: with-sidebar
sidebar: documentation
title: Interacting with the Socrata Data Catalog APIs
---

{% include soda-one.html %}

Along with our data APIs, the Socrata platform also provides catalog APIs to make it easy for you to discover what datasets are on a given Socrata data site. You can:

- Search for datasets using our full-text index that includes their actual content
- Filter datasets and visualizations by type
- Retrieve metadata about datasets

## Searching for Datasets

Every Socrata datasite has its own unique data catalog of datasets. The same API that powers that catalog can also be used to search and filter datasets programmatically.

The best starting point is the Catalog Search API, available at `/api/search/views.json` on any Socrata-powered datasite. There are several different parameters you can optionally pass to that API:

- `q`: Used to perform a full-text search within the catalog. Dataset metadata as well as dataset contents are included in the index
- `limitTo`: Used to filter the results to only contain a given subset of the available types in the catalog. Options include:
  - `TABLES`: Datasets
  - `CHARTS`: Chart visualizations
  - `MAPS`: Map visualizations
  - `BLOB`: Downloadable raw datasets
  - `HREF`: External dataset references
- `tag`: Filter for datasets that have a particular tag
- `category`: Filter for datasets within a given category
- `sortBy`: Used to change the order results are sorted by. If no `sortBy` is provided, results are returned by relevancy for the given search terms. Options include:
  - `NEWEST`: Ordered with the latest created datasets first
  - `OLDEST`: Ordered with the oldest created datasets first
  - `LAST_MODIFIED`: Ordered by the last time the dataset was updated
  - `MOST_ACCESSED`: Ordered by the number of views a dataset has received
  - `ALPHA`: Ordered in alphabetical order
- `limit`: Limit the number of datasets to return
- `page`: Used to page through results. The first page is page "1"

For example, to get only the first five datasets matching a search term of "fire", sorted by the last time they were modified, we'd query:

{% include tryit.html domain='data.seattle.gov' path='/api/search/views.json' args="q=fire&amp;sortBy=LAST_MODIFIED&amp;limit=5" %}

Within the search output, there are a few key fields to look for:

- `count`: The total number of catalog entries that matched your query, even if you have a limit that was smaller
- `searchType`: The type of search that you were performing
- `results`: An array of the catalog entries that matched your query. Details of the structure of those results can be found below

## Retrieving Metadata for Datasets Directly

You can also retrieve metadata for a single dataset directly, using it's dataset identifier. For example, to retrieve the metadata for the [White House Visitors Records](http://explore.data.gov/d/644b-gaut), with identifier `644b-gaut`:

{% include tryit.html domain='explore.data.gov' path='/api/views/views/644b-gaut.json' %}

## The Structure of Dataset Objects

<div class="alert alert-info">The data structure that represents datasets and visualizations in the catalog is a very large and complex object, so we're only going to discuss a few key fields here.</div>

Of the dozens of fields on the dataset object, there are some key fields you should look for in the example below. Some fields are optional, and may not be present:

- `id`: The dataset identifier you can use to form its [API endpoint](/docs/endpoints.html)
- `name`: The dataset's human-readable name
- `description`: The dataset's detailed description
- `attribution`: The source of this dataset, if specified
- `attributionLink`: The source URL for this dataset, if specified
- `category`: The category that has been specified for this dataset
- `createdAt`: The [Unix Epoch](http://en.wikipedia.org/wiki/Unix_time) time at which this dataset was created
- `rowsUpdatedAt`: The [Unix Epoch](http://en.wikipedia.org/wiki/Unix_time) time at which the records in this dataset were last updated 
- `viewLastModified`: The [Unix Epoch](http://en.wikipedia.org/wiki/Unix_time) time at which the metadata about this dataset was last updated
- `displayType`: The way in which the dataset is displayed
  - `table` for tabular datasets and filtered views
  - `map` for map visualizations
  - `chart` for chart visualizations
  - `href` for external datasets
  - `blob` for downloadable raw data files
- `viewType`: The type of the underlying data
  - `table` for tabular data 
  - `blobby` for downloadable datasets
  - `href` for external datasets
- `columns`: An array of the metadata for the columns in a dataset, detailed below
- `license`: The license that has been assigned to the dataset. This is an object with several sub-keys:
  - `name`: The name of the license
  - `termsLink`: A URL to the details of the licensing terms
  - `logoUrl`: A path to an image representing the license, relative to the root of the site
- `metadata`: The extended metadata for this dataset. Of particular interest will be the `custom_fields` key, which contains the publisher-provided extended metadata.
- `owner`: Details about the owner of this visualization or dataset:
  - `id`: Their user ID
  - `displayName`: Their username for display in a UI
- `rights`: An array containing the rights that the currently-authenticated user has on this dataset
- `tableAuthor`: Details about the _owner_ of the underlying dataset, which may differ from that of a visualization
- `tags`: An array containing the tags that have been provided for this dataset

Below is an example SODA 1.0 dataset object.

{% highlight javascript %}
{
  "id" : "uiqp-c4md",
  "name" : "12/25/2012",
  "attribution" : "City of Seattle Fire Department MIS",
  "attributionLink" : "http://web5.seattle.gov/MNM/incidentresponse.aspx",
  "category" : "Public Safety",
  "createdAt" : 1356521730,
  "description" : "Provides Seattle Fire Department 911 dispatches. Updated every 10 minutes.",
  "displayType" : "table",
  "rowsUpdatedAt" : 1396481325,
  "viewLastModified" : 1356521847,
  "viewType" : "tabular",
  "columns" : [ ... ],
  "license" : {
    "name" : "Creative Commons 1.0 Universal",
    "logoUrl" : "images/licenses/ccZero.png",
    "termsLink" : "http://creativecommons.org/publicdomain/zero/1.0/legalcode"
  },
  "metadata" : {
    "custom_fields" : {
      "Refresh Frequency" : {
        "Frequency" : "10 minutes"
      },
      "Data Owner" : {
        "Owner" : "Seattle Fire Department"
      }
    }
  },
  "owner" : {
    "id" : "7kfg-wq9g",
    "displayName" : "Minjee Lee",
    "screenName" : "Minjee Lee"
  },
  "rights" : [ "read" ],
  "tableAuthor" : {
    "id" : "5rii-9ghs",
    "displayName" : "Seattle Fire Department",
    "screenName" : "Seattle Fire Department"
  },
  "tags" : [ "seattle", "911", "fire", "dispatch e911", "sfd mobile" ]
}
{% endhighlight %}

## The Structure of Column Metadata

<div class="alert alert-info">The data structure that represents column metadata is a very large and complex object, so we're only going to discuss a few key fields here.</div>

- `id`: The ID for this column
- `name`: The human-readable name of the column
- `dataTypeName`: The [datatype](/docs/datatypes/) of the column
- `description`: The human-readable description
- `fieldName`: The SODA 2.0 field name

{% highlight javascript %}
[ {
  "id" : 36648745,
  "name" : "Address",
  "dataTypeName" : "text",
  "description" : "Location of Incident",
  "fieldName" : "address",
  ...
}, ... ]
{% endhighlight %}

{% include try.html %}

## Modifying Dataset Metadata

You can also modify dataset metadata, such as dataset names, descriptions, and other details, by performing a `PUT` operation directly to their dataset metadata endpoints. For more information, see the documentation on [updating dataset metadata](/publishers/updating-metadata.html) in the data publisher documentation.
