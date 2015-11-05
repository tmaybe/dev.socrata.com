---
layout: with-sidebar
sidebar: documentation
custom_js:
- /js/function_listing.js
title: Datatypes
---

There are many core datatypes in SODA:

<ul>
  {% for page in site.pages %} 
    {% if page.type == "datatype" %} 
      <li><a href="{{page.url}}">{{page.title | replace: " Datatype", "" }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
