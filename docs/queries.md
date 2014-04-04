---
layout: with-sidebar
sidebar: documentation
title: Queries using SODA2
status: draft
comment: This one is very draft...
redirect_from:
  - /docs/queries
  - /deprecated/querying-datasets
---

SODA2 provides a new rich API for querying against data on the Socrata Platform, borrowing concepts from SQL to
provide a generic ability to query data.  Using the querying capability allows web and mobile applications
to quickly and easily retrieve data.

At the root of the query API is a language called SoQL, and the API provides multiple ways to express SoQL in a query, making it easier for different programming languages and uses.

SoQl can then be used on any of the dataset [endpoints](/docs/endpoints.html).

## SoQL Clauses

SoQL statements are broken into "clauses" similar to clauses in SQL statements.  Each clause can be expressed either directly
as a URL parameter or as a SoQL statement.  If a clause is not specified, then the default is used. The clauses for SoQL are:

|Clause|Query Parameter|Description|Default|
|---|---|---|---|
|[select](#select)|$select|Which columns to return | All columns|
|[where](#where)|$where|Filter on results to return | All results, but no higher than the _limit_ parameter|
|[order](#order)|$order|Order to return the results|Unspecified order, but it will be consistent across paging|
|[group](#group)|$group|Column to group results on, similar to [SQL Grouping](http://www.w3schools.com/sql/sql_groupby.asp)|No grouping|
|[limit](#limitoffset)|$limit|Maximum number of results to return|1000|
|[offset](#limitoffset)|$offset|Offset count into the results to start at|0|
|[search](#search)|$q|Resultins in a full text search for a value.|No search|

Note that for equality comparisions, the _$where_ clause can be replaced with using the column name as the query parameter. See 
[filtering](/docs/filtering.html) for more details.

Any clause can be specified either directly in a SoQL statement, or as part of the URI.  For example, a SoQL query would look like:

    select agency_name
    where position='Member'

This can either be directly added to a URL, or added in pieces. The following three requests are equivalent SoQL queries:

    https://sandbox.demo.socrata.com/resource/nominationsCopy.json?$query=select+agency_name+where+position='Member'
    https://sandbox.demo.socrata.com/resource/nominationsCopy.json?$select=agency_name&$where=position='Member'
    https://sandbox.demo.socrata.com/resource/nominationsCopy.json?$select=agency_name&position=Member

<a name="select">&nbsp;</a>
### Select Clause

A `select` clause is similar to a select in SQL.  It allows expressions and aliases, as well as aggregations when using a
`group` clause.

#### Listing Columns

The most basic use of a `select` clause is simply listing the columns you are returning.  To do this, list the columns
you are interested in, separated by a `','`. For example:

    select agency_name,position


#### Aliasing Columns

In SoQL, you can create column aliases in the `select` clause.  There are two main reasons for doing this:

*  It makes it easier to access computed values elsewhere in the expression
*  It allows the query to rename the columns for the response

The syntax for aliases is the "as" keyword.  Currently, aliases need to be lower case and cannot have white space.  These
restrictions may be relaxed in the future.

The following example returns the column `agency_name`, but it is named `myalias` in the response: 

[https://sandbox.demo.socrata.com/resource/nominationsCopy.json?$select=agency_name **as myalias**&position=Member](https://sandbox.demo.socrata.com/resource/nominationsCopy.json?$select=agency_name+as+myalias&position=Member)

#### Column Expressions

In SoQL we provide the ability to create expressions in the `select` clause as well.  This provides a way to have the responses converted into more readily usable
values.  Look at the [datatypes](/soda2/datatypes) section to get a list of all the expressions supported per datatype.

The following example converts the `agency_name` column to upper case:

[https://sandbox.demo.socrata.com/resource/nominationsCopy.json?$select=**upper(agency_name)**&position=Member](https://sandbox.demo.socrata.com/resource/nominationsCopy.json?$select=upper%28agency_name%29&position=Member)

#### Grouping Expresssions

In addition to transforms and data conversions on returned values, SoQL provides a set of grouping expressions that can
be used in concert with the `group` clause.  The currently supported grouping expressions are:

|Function|DataTypes|Description|
|---|---|---|
|sum|Number|Sums up all the values in a grouping|
|count|All|Counts the number of values.  null values are not counted.|
|avg|Number|Finds the average value of numbers in this column|
|min|Number|Finds the minimum value of numbers in this column.|
|max|Number|Finds the maximum value of numbers in this column.|

The following example returns how many rows have the same `agency_name` value for each agency_name:

[https://sandbox.demo.socrata.com/resource/nominationsCopy.json?$select=agency_name,count(agency_name)&amp;$group=agency_name](https://sandbox.demo.socrata.com/resource/nominationsCopy.json?$select=agency_name,count%28agency_name%29&$group=agency_name)


#### Names with spaces and capital letters

It is important to note, that the column names in a SoQL query are not always exactly the same as the column names in the user interface.
For example, if you go to the [NominationsCopy](https://sandbox.demo.socrata.com/resource/nominationsCopy) dataset, you will see the
name of the `agency_name` column is really "Agency Name".  There is a simple conversion from the user names to the query langauges name:

1.  Convert string to lower case
2.  Replace white space (spaces, tabs, etc) with `_`

So, "Agency Name" becomes `agency_name`.

<a name="where">&nbsp;</a>
### Where Clause

The `where` clause contains any filtering for the request by only returning results that meet the specified criteria.  See the [filtering](/soda2/filtering) section for more information.

`where` clauses
support a variety of different comparison operations.  See the [datatypes](/soda2/datatypes) section for the full
list of operations.

In addition to the data type specific operations, the `where` clause supports:

|Operator|Description|Example|
|---|---|---|
|AND|The logical **and** of two expressions.|`a AND b` will return true ONLY if `a` and `b` are both true.|
|OR|The logical **or** of two expressions.|`a or b` will return true if either `a` or `b` are true.|
|NOT|The logical **not** of an expression.|`NOT a` will return true, ONLY if a is false.|
|IS NULL|Whether a value is null or not.|`a IS NULL` will return true, ONLY if `a` is null.|
|IS NOT NULL|Whether a values is not null.|`a IS NOT NULL` will return true, ONLY if `a` is not null|
|()|Parentheses are used for defining order of operations.|`b>3 AND (a=1 OR a=2)`|

For example, using the following query parameter returns results where the `position` value is equal to "Member":

[?$where=**position='Member'**](https://sandbox.demo.socrata.com/resource/nominationsCopy.json?$where=position=%27Member%27)

Using this query parameter returns the same results, but only where the `confirmation_vote` value is `null`:

[?$where=position='Member' **AND confirmation_vote IS NULL**](https://sandbox.demo.socrata.com/resource/nominationsCopy.json?$where=position=%27Member%27%20AND%20confirmation_vote%20IS%20NULL)


<a name="order">&nbsp;</a>
### Order Clause

The `order` clause determines how the results should be sorted, using the values from the specified columns, and sorting in either ascending or descending order. The default is ascending order.

For example, the following query parameter orders by `nomination_date`, in ascending order:

[**?$order=nomination_date**](https://sandbox.demo.socrata.com/resource/nominationsCopy.json?$order=nomination_date)

Using this query parameter also orders by `nomination_date`, but in descending order:

[$order=nomination_date **desc**](https://sandbox.demo.socrata.com/resource/nominationsCopy.json?$order=nomination_date%20desc)

<a name="group">&nbsp;</a>
### Group Clause

The `group` clause works similarly to the Group By feature in SQL.  It will group results based on the specified column, allowing the `select`
clause to use the *Grouping Expressions*.

The following example returns how many rows have the same `agency_name` value for each agency_name:

[https://sandbox.demo.socrata.com/resource/nominationsCopy.json?$select=agency_name,count(agency_name)&amp;$group=agency_name](https://sandbox.demo.socrata.com/resource/nominationsCopy.json?$select=agency_name,count%28agency_name%29&$group=agency_name)

<a name="limitoffset">&nbsp;</a>
### Limit and Offset Clauses

`limit` and `offset` are both used for [paging](/docs/paging.html) results.  `limit` will determine the maximum number of rows to return.
`offset` will return the count into the result set to start returning results from.

The following example returns 5 results, starting at the 11th result (offset = 10):

[https://sandbox.demo.socrata.com/resource/nominationsCopy.json**?$limit=5&$offset=10**](https://sandbox.demo.socrata.com/resource/nominationsCopy.json?$limit=5&$offset=10)

<a name="search">&nbsp;</a>
### Search Clause

In addition to traditional database searches, SODA2 also allows for full text search. The following example returns results that have the string "National":

[https://sandbox.demo.socrata.com/resource/nominationsCopy.json**?$q=National**](https://sandbox.demo.socrata.com/resource/nominationsCopy.json?$q=National)

## Returning type information

In many of the returned formats, the original type information of the columns can be lost.  For example, in JSON a Number may look like a String, and a String will also
look like a String.  Some consumers may want to operate in a more type-safe manner, to make sure their language bindings are in line with the original dataset's types.

To aid in these clients, the Socrata API returns two custom headers that allow a caller to determine the original Socrata types.

|Header|Description|
|---|---|
|X-SODA2-Fields|A JSON array containing a list of fields returned in this response|
|X-SODA2-Types|A JSON array containing a list of SODA2 types. This array will be in the same order as the fields in `X-SODA2-Fields`.

{% include try.html %}
