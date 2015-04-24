--- layout: with-sidebar
sidebar: documentation
title: Number Datatype
audience: documentation
type: datatype
redirect_from:
  - /docs/datatypes/numeric.html
---

## Numbers

Numbers are arbitrary precision, arbitrary scale numbers.  They can represent any number exactly, except for numbers whose digits repeat infinitely.

Since Numbers can be either larger or more precise than what doubles allow, many formats, such as [JSON](/docs/formats/json.html), serialize them as strings. For example:

{% highlight javascript %}
[ {
  "number_column" : "42"
} ]
{% endhighlight %}


The following table describes the operators that can be used with Numbers.

| Operation | Description                                                    |
| ---       | ---                                                            |
| `<`       | `TRUE` for numbers less than this one.                         |
| `<=`      | `TRUE` for numbers that are less than or equal to this one.    |
| `>`       | `TRUE` for numbers that are greater than this one.             |
| `>=`      | `TRUE` for numbers that are greater than or equal to this one. |
| `!=`      | `TRUE` for numbers that are not equal to this one.             |
| `=`       | `TRUE` for numbers that are equal to this one.                 |
| `+`       | Adds two numbers                                               |
| `-`       | Subtracts one number from another                              |
| `*`       | Multiplies two numbers                                         |
| `/`       | Divides one number by another                                  |
| `%`       | Returns the modulo of one number divided by another            |
| `^`       | Returns the modulo of one number divided by another            |

The following table describes the functions that can be used with `text` strings. 

{% include function_listing.html datatype="number" %}
