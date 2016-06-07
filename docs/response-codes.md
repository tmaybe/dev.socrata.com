---
layout: with-sidebar
sidebar: documentation
title: Response Codes &amp; Errors
redirect_from:
  - /long-running-requests
---

| Code                          | Error          | Description         |
| ---                           | ---            |
{% for e in site.data.response_codes %} | <a href="{{ e.url }}" class="code {{ e.class }}">{{e.code}}</a> | `{{ e.name }}` | {{ e.description }} |
{% endfor %}

For any variety of error, we return a standard error message format that looks like the following:

<pre><code>
{
  "code": "query.compiler.malformed",
  "error": true,
  "message": "Could not parse SoQL query \"select * where string_column > 42\"",
  "data": {
    "query": "select * where string_column > 42"
  }
}
</code></pre>
