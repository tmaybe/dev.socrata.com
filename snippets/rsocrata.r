---
type: snippet
title: RSocrata
language: r
description: The City of Chicago and community maintains a great <a href="https://github.com/chicago/rsocrata" target="blank"><code>RSocrata</code> package on Github</a>.
see_also:
- name: RSocrata on GitHub
  url: "https://github.com/Chicago/RSocrata"
- name: Forecasting with RSocrata
  url: "/blog/2015/06/17/forecasting_with_rsocrata.html"
---
install.packages("RSocrata")

library("RSocrata")
df <- read.socrata("https://%%domain%%/resource/%%uid%%?$$app_token=YOURAPPTOKENHERE")
