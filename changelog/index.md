---
layout: default
title: Changelog
redirect_from:
- /changelog.html
custom_css:
- //cdnjs.cloudflare.com/ajax/libs/octicons/2.0.2/octicons.min.css
- /common/css/github-activity.css
custom_js:
- /js/changelog.js
---

# API Changelog

Every API must change from time to time. While we strive to keep breaking changes to a minimum, some changes in behavior may affect your application. Many changes also bring new or enhanced functionality to the API.

{% include newsletter.html %}

<table>
  <thead>
    <th>Date</th>
    <th>Change</th>
  </thead>
  <tbody>
    {% for change in site.categories.changelog %}
      <tr>
        <td>{{ change.date | date: "%Y-%m-%d" }}</td>
        <td><a href="{{change.url}}">{{ change.title }}</a></td>
      </tr>
    {% endfor %}
  </tbody>
</table>

# Developer Documentation Updates 

On an almost content basis, we are making updates to the content, samples, and detailed documentation available on this website. In fact, you can contribute by [filing issues](https://github.com/socrata/dev.socrata.com/issues/new) for problems you find or by [submitting pull requests](https://github.com/socrata/dev.socrata.com/compare?expand=1) with fixes or improvements.

You can see details on all the recent activities on the Socrata Developer Portal below.

<div id="feed">&nbsp;</div>

You can also subscribe to [API Changelog](https://hooks.slack.com/services/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), which will notify you when any significant changes are made to the documentation on our developer portal.

<script type="text/javascript" src="//www.apichangelog.com/static/widget/follow.js" api="socrata"></script>
