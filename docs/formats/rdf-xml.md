---
layout: with-sidebar
sidebar: documentation
type: format
title: XML-RDF Format
audience: documentation
redirect_from:
  - /docs/formats/rdf
  - /docs/formats/xml
versions:
- 2.0
extension: rdf
mime-type: application/rdf+xml; charset=utf-8
format: RDF-XML
---

The RDF ([Resource Description Framework](http://www.w3.org/TR/REC-rdf-syntax/)) format is a little different the other formats, because that dataset (or view) owners are able
to map the output to different semantic web schemas through changing either the metadata on the dataset itself or metadata on the columns of the dataset.

For example, the following URL

<!-- {% include tryit.html domain='open.whitehouse.gov' path='/resource/nominations.rdf' args='$limit=1' %} -->

{% highlight xml %}
    https://open.whitehouse.gov/resource/nominations.rdf?$limit=1
{% endhighlight %}

yields:

{% highlight xml %}
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:socrata="http://www.socrata.com/rdf/terms#" xmlns:dcat="http://www.w3.org/ns/dcat#" xmlns:ods="http://open-data-standards.github.com/2012/01/open-data-standards#" xmlns:dcterm="http://purl.org/dc/terms/" xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#" xmlns:skos="http://www.w3.org/2004/02/skos/core#" xmlns:foaf="http://xmlns.com/foaf/0.1/" xmlns:dsbase="http://open.whitehouse.gov/resource/" xmlns:ds="http://open.whitehouse.gov/resource/nominations/">
    <dsbase:fkvb-uru3 rdf:about="http://open.whitehouse.gov/resource/nominations/Aaron, Henry Jacob">
        <socrata:rowID>1</socrata:rowID>
        <rdfs:member rdf:resource="http://open.whitehouse.gov/resource/nominations"/>
        <ds:name>Aaron, Henry Jacob</ds:name>
        <ds:position_title>Member (Upon Appointment to be Designated Chairman)</ds:position_title>
        <ds:agency_name>Social Security Advisory Board</ds:agency_name>
        <foaf:document rdf:resource="http://www.ssab.gov"/>
        <ds:nomination_date>2013-04-18T00:00:00</ds:nomination_date>
        <ds:confirmed>false</ds:confirmed>
        <ds:holdover>false</ds:holdover>
    </dsbase:fkvb-uru3>
</rdf:RDF>
{% endhighlight %}

You can modify the returned format by changing the values in the metadata for the column.

