---
layout: with-sidebar
sidebar: documentation
custom_js:
- /js/function_listing.js
title: Datatypes
---

There are many core datatypes in SODA. What datatypes you may find depends on the version of your API endpoint:

<div class="filter-options pull-right">
  <div class="btn-group versions" role="group" aria-label="Endpoint Type">
    <button type="button" class="btn btn-default version" data-version="2.1">2.1</button>
    <button type="button" class="btn btn-default version" data-version="2.0">2.0</button>
  </div>
</div>

<table class="table table-striped table-hover function-listing">
  <thead>
    <th>Datatype</th>
    <th class="availability"><a href="/docs/endpoints.html">Availability &raquo;</a></th>
  </thead>
  <tbody>
    {% for page in site.pages %} 
      {% if page.type == "datatype" %} 
        <tr class="function" data-versions="{{page.versions | join}}">
          <td><a href="{{page.url}}">{{page.title | replace: " Datatype", "" }}</a></td>
          <td>{{page.versions | sort | array_to_sentence_string}}</td>
        </tr>
      {% endif %}
    {% endfor %}
  </tbody>
</table>
