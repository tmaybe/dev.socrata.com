---
layout: post
categories: blog
tags:
- QGIS
- geospatial
- Analysis
- publishers
title: "Geospatial Analysis with Socrata and QGIS"
date: 2016-05-24
author: PeterAustinMoore
icon: fa-flag
---

There is something intrinsically appealing about maps. They allow us incredible insight into the world around us in a way that only the earth viewed from above can.  We can relate to maps because we can identify with the space they represent. They answer that burning question: “where am I?” I think more than any other data visualization medium, geospatial data represented on a map means more to us.

With that in mind - let's journey to the edge of the rabbit hole that is GIS, all without downloading a single shapefile!

First things first, if you haven't already done so install [QGIS](https://www.qgis.org/en/site/forusers/download.html).

- Once that is complete, check out Plugins > Manage and Install Plugins...

- Search for `Socrata` and you will quickly discover the plugin, which you can then install.

After that is completed, we are ready to begin!

- In the Web menu, select Socrata > Socrata Plugin.

This will pull up a dialog box:

- Select the settings tab and enter in the URL of your friendly local  open data portal. For our purposes let's use `data.chattlibrary.org`. 

![settings](/img/Geospatial/settings.png)

- Go back to the Download tab and you can select `Get Maps` which will pull up a list of the geospatial datasets available on the domain you have selected!

Let's pull up the Chattanooga item. 

![chattadata](/img/Geospatial/chattadata.png)

This gives us the unique ID for the dataset so if we so desired, we can check out the data as it lives [online](https://data.chattlibrary.org/d/4gat-rdif). Click OK and voila, it is added to your map.

![basemap](/img/Geospatial/basemap.png)

Now that we have a good sense of the area, let's grab some interesting data. Reselect Web > Socrata > Socrata Plugin. The settings you had entered are already saved, so you can go straight back to Get Data.

Select the Hamilton County E911 Active Calls item. Click ok - this may take a moment to load as there are many points.

![datamap](/img/Geospatial/datamap.png)

## Creating a Heat Map

Now that we have our point data we can immediately do some analysis. Right click on the Hamilton County E911 layer and select Properties. In the Style tab, click on the drop down that says Single Symbol and select Heatmap. 

![heatmap_settings](/img/Geospatial/heatmap_settings.png)

Select your preferred color schemes and click the edit button to the right of the color schema to make the base color transparent. 

![heatmap](/img/Geospatial/heatmap.png)

## Merging Layers Based on Location

Heat maps are cool and all, but say you want to merge the points with the underlying area - doing that with QGIS is easy. 

Begin by:

- Selecting Vector > Data Management Tools > Join Attributes by Location...

![join](/img/Geospatial/)

- Set Hamilton County E911 as the Join Vector Layer

![setjoin](/img/Geospatial/)

- Select "Take summary of intersecting features" and choose Sum

- Create the file that you want to save it as, run the script and when prompted add it to your map

## Making a chloropleth map

Now when you Open Attribute Table and scroll all the way to last column, you will notice the 




