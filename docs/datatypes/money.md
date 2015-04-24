---
layout: with-sidebar
sidebar: documentation
title: Money Datatype
audience: documentation
type: datatype
---

## Money

Monetary values are fixed precision numbers, as most currencies aren't divisible beyond their smallest unit (ex. one cent). In most representations, they're encoded as strings to preserve accuracy. For example:

{% highlight javascript %}
[ {
  "money_column": "10000.00",
} ]
{% endhighlight %}

The following table describes the operators that can be used with Money fields.

| Operation | Description                                                            |
| ---       | ---                                                                    |
| `<`       | `TRUE` for monetary values less than this one.                         |
| `<=`      | `TRUE` for monetary values that are less than or equal to this one.    |
| `>`       | `TRUE` for monetary values that are greater than this one.             |
| `>=`      | `TRUE` for monetary values that are greater than or equal to this one. |
| `!=`      | `TRUE` for monetary values that are not equal to this one.             |
| `=`       | `TRUE` for monetary values that are equal to this one.                 |
| `+`       | Adds two monetary values                                               |
| `-`       | Subtracts one monetary value from another                              |
| `*`       | Multiplies two values, can be performed with numbers                   |
| `/`       | Divides one value by another, can be performed with numbers            |

The following table describes the functions that can be used with `money` fields. 

{% include function_listing.html datatype="money" %}
