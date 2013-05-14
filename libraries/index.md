---
layout: default
title: Home
libraries:
  -
    name: soda-java
    language: Java
    desc: Reference implementation of the SoQL query language.
    docs: /libraries/java/docs
    guide: /libaries/java
  -
    name: soda-ruby
    language: Ruby
    desc: A thin Scalaish wrapper around opencsv
    docs: /libraries/ruby/docs
    guide: /libraries/ruby
  -
    name: soda-scala
    language: Scala
    desc: Rack-inspired toolkit for building HTTP services
    docs: /libraries/scala/docs
    guide: /libraries/scala
---

{% for repo in page.repos %}
  <div class="component repo" data-repo="{{ repo.name}}">
    <h2><a href="https://github.com/socrata/{{ repo.name }}">{{ repo.name }}</a></h2>
    <p class="description">{{ repo.desc }}</p>
  </div>
{% endfor %}
