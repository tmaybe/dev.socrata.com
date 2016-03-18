---
layout: with-sidebar
title: Using a SSIS to write to a Socrata Dataset
sidebar: publisher
type: example
audience: publisher
author: aliciatb
---

Sample SSIS package that -

1. Read from SQL view 
2. Creates flat csv file
3. Executes datasync

## Screenshots

### SQL Server

#### View that joins RevenueBudget to Fund for Fund Name and Type
![SQL View](/img/SQLView.PNG)

### SSIS Package

#### Dataflow that -
* Selects all records from a view
* Creates a Count column and defaults value to 1
* Creates CSV with quotes around text fields (to handle any values that may contain commas)
![SSIS screenshot dataflow](/img/DataFlowTransformationTasks.PNG)

#### Control Flow that calls the Dataflow and then executes Datasync command
![SSIS screenshot workflow](/img/ControlFlowTasks.PNG)

#### Package Deployment to SQL Server
![SSIS screenshot of package deployment](/img/DeployPackageStep.PNG)

### SQL Server Agent

#### Package Execution Report after execution
![SSIS screenshot dataflow](/img/SQLPackageReport.PNG)

## Resources
* [SQL Server Integration Services](https://msdn.microsoft.com/en-us/library/ms141026(v=sql.120).aspx)
* [Deployment of SSIS Packages](https://msdn.microsoft.com/en-us/library/ms137592(v=sql.120))
  * [Create Integration Services Catalog](https://msdn.microsoft.com/en-us/library/gg471509(v=sql.120).aspx)
  * [Schedule a Package by using SQL Server Agent](https://msdn.microsoft.com/en-us/library/gg471507(v=sql.120).aspx)
  * [Access Control for Sensitive Data in Packages](https://msdn.microsoft.com/en-us/library/ms141747(v=sql.120).aspx)

* [Datasync](http://socrata.github.io/datasync/)
  * [Executing in Command Prompt/Process Task](http://socrata.github.io/datasync/guides/setup-standard-job-headless.html)

  ## Downloads
* [SQL Server 2014 trial](https://www.microsoft.com/en-us/evalcenter/evaluate-sql-server-2014) - need full SQL license
* [Visual Studio Shell](https://www.microsoft.com/en-us/download/details.aspx?id=40777) - the shell is how you create packages
* [SQL Server Data Tools](https://www.microsoft.com/download/details.aspx?id=42313) - needs to be installed after SQL server in order to schedule SSIS packages via SQL Server Agent