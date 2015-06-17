---
layout: with-sidebar
title: R Forecasting with RSocrata
sidebar: consumer
type: example
audience: consumer
author: stuagano
---

Ever since the City of Chicago team built the [RSocrata Connector](https://github.com/Chicago/RSocrata) I have been dying to put together this simple tutorial for showing the ability for forecasting data in R on top of Socrata datasets. 

This example is pulling a dataset in from the [City of Austin Open Data Portal](http://data.austintexas.gov) containing [EMS Incidents by Month](https://data.austintexas.gov/Public-Safety/EMS-Incidents-by-Month/gjtj-jt2d) and forecasting the next two years of EMS Incidents. 

Two dependencies you will need are:

{% highlight R %}
install(RSocrata)
library(forecast)
{% endhighlight %}

The first step is to import the dataset as an R dataframe. 

{% highlight R %}
# API Endpoint for EMS-Ambulence Responses by Month
read.socrata("https://data.austintexas.gov/resource/bptg-ndvw.json") 
{% endhighlight %}

The next step is to create a time series variable based off of the response column in the dataset. 

{% highlight R %}
# Create time series variable based off of "count_responses_all"
myts <- ts(EMSIncidents$count_responses_all, start=c(2010, 1), end=c(2015,2), frequency=12)
plot(myts)
{% endhighlight %}

![Time Series  Plot](/img/r_forecasting_1.png)


The next component is to control for seasonality that exists within the data. 

{% highlight R %}
# Seasonal Decomposition#
fit <- stl(myts, s.window = "period")
plot(fit)
{% endhighlight %}

![Seasonality](/img/r_forecasting_2.png)

Finaly we can forecast the dataset out a number of periods. 

{% highlight R %}
# Projected Forecast
forecast(fit)
plot(forecast(fit))
{% endhighlight %}

![Projected Forecast](/img/r_forecasting_3.png)

You can also export your predicted values as a `.csv` file so that you can perform further analysis upon them.

There you have it. You have now taken a dataset and loaded it into R and began to forecast values based on the data.  

