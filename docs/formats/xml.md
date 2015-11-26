---
layout: with-sidebar
sidebar: documentation
type: format
title: XML-RDF Format
audience: documentation
versions:
- 2.0
extension: xml
mime-type: text/xml; charset=utf-8
format: XML
---

The [XML](https://en.wikipedia.org/wiki/XML) output format maps each entry to a `<row>` element, and each field to it's own XML entity within that row. For example, the following URL

{% highlight xml %}
    https://open.whitehouse.gov/resource/nmc8-q2u.xml?$limit=1
{% endhighlight %}

yields:

{% highlight xml %}
<response>
  <row>
    <row _id="554" _uuid="350CEBF4-DCDE-420C-A51A-F21BF541A843" _position="554" _address="http://open.whitehouse.gov/resource/nmc8-q2uj/554">
      <name>Aaron, Henry Jacob</name>
      <position_title>Member (Designated Chairman)</position_title>
      <agency_name>Social Security Advisory Board</agency_name>
      <agency_website description="SSAB" url="http://www.ssab.gov"/>
      <nomination_date>2014-01-06T00:00:00</nomination_date>
      <renomination>true</renomination>
      <confirmation_vote>2014-09-08T00:00:00</confirmation_vote>
      <confirmed>true</confirmed>
      <holdover>false</holdover>
    </row>
  </row>
</response>
{% endhighlight %}
