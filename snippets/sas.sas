---
type: snippet
title: SAS
language: SAS
description: "SAS is a tried and true application suite for data analysis and visualization. The following snippet brings Socrata data into a SAS."
see_also:
- name: "Analyzing Open Data with SAS"
  url: "/blog/2015/11/10/analyzing-open-data-with-sas.html"
---
filename datain url 'http://%%domain%%/resource/%%uid%%.csv?$limit=5000&$$app_token=YOURAPPTOKENHERE';
proc import datafile=datain out=dataout dbms=csv replace;
  getnames=yes;
run;
