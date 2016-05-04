---
layout: post
title: "Help Your Community Prepare for Flu Season by Deploying a Flu Shot Finder App"
categories: blog
date: 2014-11-13
original_url: "https://www.socrata.com/developer-blog-article/help-community-prepare-flu-season-deploying-flu-shot-finder-app/"
author: "chrismetcalf"
---

<p>Have you gotten your flu shot yet? If not, you should. Every year, <a href="https://en.wikipedia.org/wiki/Influenza#Epidemic_and_pandemic_spread">influenza causes approximately 36,000 deaths and 200,000 hospitalizations</a> in the United States, many of which could be prevented if individuals were vaccinated against the flu virus.</p>
<p>So how can you help more people in your community find convenient and affordable flu vaccinations? We&#8217;ve improved upon <a href="https://github.com/tkompare">Tom Kompare</a>&#8217;s awesome foundation with the <a href="https://github.com/tkompare/flushots2013">Chicago Flu Shot Finder</a> and created an easy-to-deploy application CfA Brigades, civic hackers and governments can deploy with ease to Github without writing any custom code, using the power of the <a href="http://dev.socrata.com">Socrata Open Data API</a>.</p>
<p><a href="http://www.socrata.com/wp-content/uploads/screenshot.png"><img src="https://github.com/socrata/flushots/raw/gh-pages/screenshot.png" alt="screenshot" class="alignnone size-medium wp-image-24893" /></a></p>
<p>Deploying a new <a href="https://github.com/socrata/flushots">flu shot finder</a> is very straightforward:</p>
<ol>
<li>Find or obtain a dataset with information about the location and timing of when different providers are offering vaccinations. If your data matches the <a href="https://github.com/socrata/flushots#data-schema">standard schema for the app</a>, you won&#8217;t need to make any code modifications.</li>
<li>Fork the <a href="https://github.com/socrata/flushots">flu shot finder repo</a> on Github into your own account.</li>
<li>Modify the <code>_config.yml</code> to specify where to find your dataset and to provide some details about your community. You can even edit it through your web browser using Github&#8217;s <a href="https://help.github.com/articles/editing-files-in-your-repository/">built-in code editor</a>.</li>
</ol>
<p>That&#8217;s it! Once you commit and push your changes, <a href="http://pages.github.com">Github Pages</a> takes care of the rest, and you&#8217;ll have a flu-shot finder online under your account, like <a href="http://socrata.github.io/flushots/">the one we partnered with at Code for Raleigh, NC</a>. </p>
<p>To learn more about the flu shot finder, check out its <a href="http://socrata.github.io/flushots/">repository on Github</a>. The project is open sourced under the <a href="https://github.com/socrata/flushots/blob/gh-pages/LICENSE.TXT">MIT License</a>, and we welcome pull requests! Code for America Brigades are also welcome request space on the <a href="https://brigades.opendatanetwork.com/">Brigade Open Data Sharing Platform</a> to host their data.</p>
