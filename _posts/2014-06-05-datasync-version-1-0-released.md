---
layout: post
title: "DataSync Version 1.0 Released"
categories: blog
date: 2014-05-06
original_url: "https://www.socrata.com/developer-blog-article/datasync-version-1-0-released/"
author: "alaurenz"
---

<p>We are excited to announce the release of DataSync 1.0!</p>
<p>One of the most important improvements in this release is that data publishers can now use the ‘replace’ operation as the default way to update essentially any dataset, even very large datasets (millions of rows). This is possible because the new ‘replace via FTP’ method in DataSync automatically detects which rows have been added, updated, or deleted and only publishes those changes to the dataset. For the vast majority of datasets, this will remove the need for data publishers to take on the rather complicated task of scripting a process to determine which rows have been added, updated, or deleted since the last dataset update. Publishers will no longer have to use the "upsert" method to update their datasets, a method which often requires significant developer resources. With DataSync 1.0, automating data publishing is as easy as extracting all the data into a CSV or TSV file and creating a simple DataSync job to publish the CSV or TSV to the Socrata dataset. The data publisher can then use Windows Task Scheduler or Cron to schedule the DataSync job to run automatically (i.e. every day).</p>
<p>If you are already using DataSync you just need to download the new JAR file below and replace your existing JAR file. If you are not using a previous version of DataSync you can simply download version 1.0 below. Note that DataSync 1.0 requires Java version 1.7. If you do not have version 1.7 (for example, if you are still using version 1.6) you can <a href="http://www.oracle.com/technetwork/java/javase/downloads/jre7-downloads-1880261.html" target="_blank">download Java 1.7 here</a>.</p>
<p>Download DataSync 1.0: <a href="https://github.com/socrata/datasync/releases/download/1.0/datasync_1.0.jar" target="_blank">https://github.com/socrata/datasync/releases/download/1.0/datasync_1.0.jar</a></p>
<p><a href="http://socrata.github.io/datasync/">DataSync documentation</a> has also been dramatically improved and expanded. There is now comprehensive <a href="http://socrata.github.io/datasync/guides/setup-standard-job-headless.html">documentation</a> for using DataSync exclusively as a command-line tool (headless mode).</p>
<p>We also invite you to contribute to the documentation using a <a href="https://help.github.com/articles/creating-a-pull-request">GitHub pull request</a> to the <a href="https://github.com/socrata/datasync/tree/gh-pages">gh-pages branch</a> of the DataSync repository.</p>
<p>DataSync 1.0 comes with additional enhancements and new features, many of which are based off of customer requests:</p>
<ul>
<li>
<p><strong>‘Replace via FTP’ update method:</strong> Enables simple and efficient replace operations on datasets of essentially any size</p>
</li>
<li>
<p><strong>Reduces complexity of updating datasets with Location datatype columns:</strong> You can now use the <a href="http://socrata.github.io/datasync/resources/ftp-control-config.html">Control file configuration</a> (available when using ‘replace via FTP’ method) to “pull” address, city, state, zip code, or latitude/longitude data within other [non-Location] columns into the Location column (to enable Map visualizations or geocoding)</p>
</li>
<li>
<p><strong>Update dataset metadata:</strong> You can now use DataSync to automate updating dataset metadata using a Metadata Job (go to File -> New.. -> Metadata Job). Many thanks to the generous open source code contribution to DataSync by <a href="https://github.com/bhwilliamson">Brian Williamson</a> for that new job type!</p>
</li>
<li>
<p><strong>Improved command-line interface: </strong>More user-friendly and fully-featured interface to configure and run Standard integration and Port jobs without the user interface</p>
</li>
<li>
<p><strong>Delete update operation: </strong>Now you can use the ‘delete’ method</p>
</li>
<li>
<p><strong>Improved logging for long-running jobs:</strong> When you run a job in a terminal or command prompt there is detailed logging information outputting the job’s progress toward completion</p>
</li>
<li>
<p><a href="http://socrata.github.io/datasync/guides/compiling-on-windows-eclipse.html">Developer documentation</a> for compiling with Eclipse (on Windows) which was generously contributed by <a href="https://github.com/jeffchamblee">Jeff Chamblee</a>.</p>
</li>
<li>
<p><strong>Other small features:</strong></p>
<ul>
<li>
<p>Support for importing data with any date format</p>
</li>
<li>
<p>Optional fine-grained control of other data importing parameters such as automatically trimming whitespace, setting the timezone of imported dates, text file encoding, null value handling, overriding the CSV header, etc.</p>
</li>
<li>
<p>Ability to set the name of the destination dataset when running a Port job headlessly</p>
</li>
<li>
<p>Get a list of column identifiers (API field names) for any dataset</p>
</li>
</ul>
</li>
</ul>
<p>View the full list of features added in version 1.0 here:<br /><a href="https://github.com/socrata/datasync/issues?milestone=3&amp;page=1&amp;state=closed">https://github.com/socrata/datasync/issues?milestone=3&amp;page=1&amp;state=closed</a></p>
<p>Want to leave a question, comment, suggestion, or bug report on DataSync? Submit these to the DataSync Github repository issue tracker - all you need is a free GitHub account:</p>
<p><a href="https://github.com/socrata/datasync/issues">https://github.com/socrata/datasync/issues</a></p>
<p>Watch the GitHub repository to remain up to speed with new features on the roadmap and deploy schedules for future versions.</p>
<p><strong>Related Links:</strong></p>
<ul>
<li>
<p><a href="http://socrata.github.io/datasync/">Getting Started Guide</a></p>
</li>
<li>
<p><a href="http://support.socrata.com/entries/24978167-Now-Available-Video-Replay-From-July-25th-2013-Introduction-to-Integration">Integration Class Webinar</a> - in which our integration experts go over a few of the integration options compatible with the Socrata platform, including DataSync. You can register for the next live webinar here: <a href="http://discover.socrata.com/socratauniversity.html">http://discover.socrata.com/socratauniversity.html</a></p>
</li>
</ul>
