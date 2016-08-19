---
layout: post
categories: blog
date: 2016-08-19
tags: examples, publishers
redirect_from:
- /publishers/examples/ssis-socrata-datasync.html
title: Using Open Source to read from Salesforce and write to Socrata
sidebar: post
type: example
audience: publisher
author: dkuttner
icon: fa-upload
---

This example shows how to use Pentaho Kettle Data Integration to read data from multiple Salesforce objects related to volunteer tracking, and update one Socrata dataset, and then automate this process.

### Pentaho Kettle Data Integration

#### Open source ETL tool

[Pentaho Kettle Data Integation](http://community.pentaho.com/projects/data-integration/) is a free, open source ETL software. The tool's abilities can be separated into 4 types of funtionality: Extract, Transform, Load data (ETL), and job Automation.

###### 1. Extract
The user can connect directly through a myriad of source systems. Some examples are: SQL Server; Microsoft Access, SAP, and Salesforce. When the data in these source systems update, so does the data that Pentaho extracts.

###### 2. Transform
Often times the raw data directly from the source is not in the desired format for presentation. For example any Personally identifiable information (PII) would need to be masked before publishing. In this example we will cover how to create an attribute that the [Socrata platform can geocode](https://support.socrata.com/hc/en-us/articles/202950508-Location-Information-Data-which-can-be-geocoded).

###### 3. Load
Next the data is ready for publishing! In this example we will cover how to utilize the [Socrata Output plugin](https://github.com/socrata/socrata-kettle) and publish the data directly to the platform from the workflow.

The plugin uses Datasync under the hood to update the dataset. Users familiar with this tool will be ahead of the curve whith this plugin.

*Before continuing on please follow the link, download, and configure the plugin within your Pentaho Kettle instance.*

#### Extract Data, Salesforce Input
![Salesforce Input](/img/pentaho-salesForce-input.png)

* Open a new Transform file (.ktr)
* Go to Design > Input > Salesforce Input
* For the credentials the password = <password><securitytoken>
    * For example: "mypassword12343mysecuritytoken45678"
    * To generate a salesforce security token go [here](https://help.salesforce.com/apex/HTViewHelpDoc?id=user_security_token.htm&language=en_US) or search for Salesforce Security Token
* Don't know which Salesforce objects you need to connect to? Try using the Salesforce Schema Builder to see which objects house the desired attributes.
* _Gotcha_: the default date formatter can sometimes incur errors. Try pressing play on the workflow after connecting to the salesforce object. If the log file mentions a date error, try adjusting the format in the Input.

![SSIS screenshot dataflow](/img/DataFlowTransformationTasks.PNG)

#### Join, Transform, Hide PII, Geocode
In this example I have connected to 3 different objects. Now I need to rename fields, filter out others, join the objects, and create a field for the Socrata platform to geocode.

* "Select Rename Values" step, labeled here as Remove Unnecessary Fields, renames fields and removes others I will not need on my Socrata dataset.
* Join Salesforce objects:
  * Use the "Sort Rows" step to sort by the key you will be joining on.
  * Then use the "Merge Join" step to join two objects together.
* Hide PII:
  * The Volunteer Job object has addresses for volunteer meeting locations, some of these locations are private residences.
  * In the Socrata dataset I wish to publish the addresses for only the locations in public places
  * Using the step "Filter Rows" I filter out all attributes where Location Name = "Private Residence"
  * The next step "Set Field Values to a Constant" entitled "set private address info to blank" I set the address attributes to null.
* Create a new Location attribute that will geocode:
  * Latitude and longitude are in two different columns
  * Concatenate these together using the "Concat Fields" step

![workflow](pentaho-salesForce.png)

#### Load to Socrata
Now that you have downloaded and configured the Socrata plugin (link provided above) you should see the Socrata Output in the list of Outputs.

###### Settings Tab
The Settings tab is where you configure your credentials. You must be a user on your domain with [publishing rights](https://support.socrata.com/hc/en-us/articles/202950278-Understanding-user-roles) to this dataset.

Update options:
* Replace: Replaces the entire dataset with this data extract.
* Upsert: Updates any rows that already exist and inserts rows which do not.

Use Socrata geocoding: check yes if one or more columns are type Location

###### Fields Tab
* Field names should match the Socrata dataset
* Can remove attributes that are not on the dataset, not necessary.
* Make sure to click the button 'Minimum Width' so the fields do not get accidentally truncated.

![Socrata-Output](pentaho-salesForce-output1.png)

#### Automate
* Open a new job .kjb file
* To kick off workflow use the "Start" step
* To run the ETL job created above connect the "Transformation" step to Start.
* Additionally you can add as many other .ktr files to be run from here.
* Configure this file to be from a Windows Task Scheduler.

![Runner](pentaho-salesForce-automate.png)

#### Resources
* [Pentaho Steps Documentation](http://wiki.pentaho.com/display/EAI/Latest+Pentaho+Data+Integration+%28aka+Kettle%29+Documentation)
* [Salesforce Schema Builder](https://help.salesforce.com/HTViewHelpDoc?id=schema_builder.htm)
* [Pentaho Salesforce Input Documentation](http://wiki.pentaho.com/display/EAI/SalesForce+Input)

#### Downloads
* [Pentaho Data Integration Download](http://community.pentaho.com/projects/data-integration/)
* [Socrata Pentaho Plugin](https://github.com/socrata/socrata-kettle)
