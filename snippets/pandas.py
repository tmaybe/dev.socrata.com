---
type: snippet
title: Python Pandas
language: Python
description: "Python package using Pandas to easily work with JSON data"
see_also:
- name: soda-py on GitHub
  url: https://github.com/xmunoz/sodapy 
- name: Upsert via soda-py
  url: https://github.com/xmunoz/sodapy
---
#!/usr/bin/env python

# make sure to install these packages before running:
# pip install pandas
# pip install bokeh

import numpy as np
import pandas as pd
import datetime
import urllib
 
from bokeh.plotting import *
from bokeh.models import HoverTool
from collections import OrderedDict

query = ("https://%%domain%%/resource/%%uid%%.json")
raw_data = pd.read_json(query)	
