---
layout: with-sidebar
title: Build a physical "Traffic Light"
sidebar: consumer
type: example
audience: consumer
author: stuagano
---
Ever since the City of Chicago team built the [RSocrata Connector](https://github.com/Chicago/RSocrata) I have been dying to put together this simple tutorial for showing the ability for forecasting data in R on top of Socrata datasets. 

This example is pulling a dataset in from the [City of Austin Open Data Portal](http://data.austintexas.gov) containing [EMS Incidents by Month](https://data.austintexas.gov/Public-Safety/EMS-Incidents-by-Month/gjtj-jt2d) and forecasting the next two years of EMS Incidents. 

Two dependencies you will need are:

```
install(RSocrata)
library(forecast)
```

The first step is to import the dataset as an R dataframe. 

```
##API Endpoint for EMS-Ambulence Responses by Month
read.socrata("https://data.austintexas.gov/resource/bptg-ndvw.json") 
```

The next step is to create a time series variable based off of the response column in the dataset. 

```
##Create Time Series Variable based off of count_responses_all## 
myts <- ts(EMSIncidents$count_responses_all, start=c(2010, 1), end=c(2015,2), frequency=12)
plot(myts)
```

![timeseries](https://cloud.githubusercontent.com/assets/8115246/6975325/c20fe318-d94f-11e4-8404-378f113da721.png)


The next component is to control for seasonality that exists within the data. 

```
##Seasonal Decomposition##
fit <- stl(myts, s.window = "period")
plot(fit)
```

![seasonaly](https://cloud.githubusercontent.com/assets/8115246/6975328/cf2b8a84-d94f-11e4-9812-83d5ceee1a42.png)

Finaly we can forecast the dataset out a number of periods. 

```
##Projected Forecast##
forecast(fit)
plot(forecast(fit))

```

![forecast](https://cloud.githubusercontent.com/assets/8115246/6975316/ae494252-d94f-11e4-8059-7aaf34d99c07.png)


You can also export your predicted values as a .csv file so that you can perform further analysis upon them.  

