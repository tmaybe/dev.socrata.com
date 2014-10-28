---
layout: with-sidebar
title: Using the FME Socrata Writer
sidebar: publisher
type: example
audience: publisher
author: alaurenz
---

This guide describes how to use FME Desktop to setup a basic workspace to publish data to a Socrata dataset from a Microsoft Excel (.xlsx/.xls) file.

## Prerequisites

Before you begin this tutorial, you should have the following:

- An installed copy of FME Desktop 2015 (Windows, Mac, or Linux)
 - You can download [FME 2015 Beta](http://www.safe.com/support/support-resources/fme-downloads/beta/)
 - If you are using FME 2013 or FME 2014, we strongly recommend updating to the latest version of FME to make use of the newest Socrata Writer.
- Socrata account with a Publisher role or Owner rights to at least one *existing* dataset

If you do not have a license of FME, you can [apply for a free trial license](http://www.safe.com/fme/fme-desktop/trial-download/) that will last for 14 days.
 
## Contents

1. [Setting up the workflow in FME Desktop](#setting-up-the-workflow-in-fme-desktop)
2. [Example FME workflow to download](#example-fme-workflow-to-download)
3. [Proxy configuration](#proxy-configuration)
4. [Scheduling FME transformations](#scheduling-fme-transformations)

## Setting up the workflow in FME Desktop

![FME Diagram](/img/fme/fme_diagram.png)

### Step 1: Open FME and create a new blank workspace

Open up FME Workbench and create new blank workspace (File -> New and select Blank Workspace on the right).

### Step 2: Add a Reader for the .xlsx/.xls file

Data readers are used to read data from some data source into FME. Add a new Reader by clicking the button on the toolbar or going to Readers -> Add Reader... In the dialog box that appears click the [...] button to the right of the Dataset field and select the .xlsx/.xls file on your computer. After clicking open FME should automatically detect that the format is Microsoft Excel. Now click OK and you should see a Reader Object appear in the workspace area.

![Add XLSX Reader](/img/fme/add_reader.png)

### Step 3a: Add a Writer

Now add a writer by clicking the Add new writer button in the toolbar or going to Writers -> Add Writer... In the dialog box that appears type "Socrata" as the format (it should come up as you are typing). Next click the Parameters button and in the dialog box that appears enter the domain of your datasite (i.e. data.cityofchicago.org) and your Socrata username and password. 

![Add Socrata Writer](/img/fme/add_writer.png)

Click OK which will bring up a new window (if it asks you if you would like to "add a new feature type to the writer" click Yes). In the "Dataset Name" field enter the dataset ID of your Socrata dataset. Refer to Step 3b below if you do not know how to obtain the dataset ID. After entering the dataset ID press OK and you should see the Writer Object appear in the workspace area.

![Set feature type](/img/fme/set_feature_type.png)



### Step 3b: Obtain the Dataset ID

You will need the dataset ID of the Socrata dataset you wish to publish to using FME. To obtain the dataset ID, navigate to the dataset in your web browser. In the address bar the dataset ID is the code at the end of the URL in the form `xxxx-xxxx`. For example, for the dataset <https://data.seattle.gov/Public-Safety/Fire-911/m985-ywaw>, it's identifier would be `m985-ywaw`.

### Step 4: Configure the update method

By default the Socrata Writer will perform an [UPSERT](http://dev.socrata.com/publishers/upsert.html) on the dataset. However, you can also configure it to perform [REPLACE](http://dev.socrata.com/publishers/replace.html) or DELETE using the "Format Parameters" tab within the Feature Type Properties of the Socrata Writer Object. 

- `UPSERT`: Select "UPSERT" from the "Writer Mode" dropdown and set "Truncate Dataset First" to "No"
- `REPLACE`: Select "UPSERT" from the "Writer Mode" dropdown and set "Truncate Dataset First" to "Yes"
- `DELETE`: Select "DELETE" from the "Writer Mode" dropdown and set "Truncate Dataset First" to "No"

<div class="well">
<em>Important Note</em>: For updating with `UPSERT` or `DELETE` to work properly you must set a "Row Identifier" for the dataset. If a Row Identifier is not set, all records being published will be appended to the dataset. Learn more about <a href="http://dev.socrata.com/docs/row-identifiers.html">Row Identifiers and how to establish them</a>.
</div>

![Configure update method](/img/fme/format_parameters.png)

### Step 5: Complete workflow and run translation

Now drag the yellow arrowhead on the Reader Object over to the Writer Object.The two Objects should connect and the arrowheads should turn green. Be sure the column names of your .xlsx/.xls file (which are read into FME as Attribute Name) exactly match those of your Socrata dataset. NOTE: the attribute names are *case-sensitive*.

Click the Run Translation button in the toolbar or go to "File" -> "Run Translation". The log will display messages on the status of the translation. After the translation completes the last line output in the log should say "Translation was SUCCESSFUL".

## Example FME workflow to download

You can download an example .fmw file of [this workflow here](/data/excel2socrata.fmw). To get it to work make the following changes in the "Navigator" panel to the left of the workspace:

- Point the "Source Microsoft Excel File" under the XLSX reader to the .xlsx file you can [download here](/data/Food_Inspections_small.xlsx). You can use this file to create the dataset to publish to in FME.
- Update the "Host", "User", and "Password" fields with your credentials under the Socrata Writer feature

![FME Navigator](/img/fme/navigator.png)

## Proxy configuration

If your organization routes web traffic through a proxy server, you can configure an FME workflow to connect via that proxy. Read how to configure FME to [use the proxy server here](http://fmepedia.safe.com/articles/How_To/Configure-FME-Desktop-to-connect-through-your-proxy-server). The FME Socrata Writer supports the proxy authentication using Basic Authentication.

![FME Proxy config](/img/fme/proxy.png)

## Scheduling FME transformations

In general there are two approaches you can take to schedule an FME Workflow:

1. If you already have a scheduling tool available to use (e.g. Windows Task Scheduler) you can run an FME Workflow in "batch" or "command-line" mode using the scheduling tool. Information on how to [run FME in batch mode is here](http://fmepedia.safe.com/articles/How_To/Batch-Processing-Method-1-Command-Line-or-Batch-File).

2. If you want an enterprise-level scheduling tool that includes monitoring, logging, auto-emailing, etc. tools you should consider using [FME Server](http://www.safe.com/fme/fme-server/) or [FME Cloud](http://www.safe.com/fme/fme-cloud/). Documentation on how to [schedule using FME Server is here](http://docs.safe.com/fme/html/FME_Server_Documentation/Default.htm#Web_UI/AdminWebHelp/schedules.htm%3FTocPath%3DFME%20Server%20Web%20User%20Interface%7CUsing%20the%20Interface%7CSchedules%7C_____0).

## Related Pages

- [Getting Started with FME](http://www.safe.com/fme/getting-started/)
- [FMEpedia](http://fmepedia.safe.com)
- [FME write-up on Socrata Writer](http://www.safe.com/solutions/for-applications/socrata)


