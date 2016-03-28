var common = require('./lib/common');
var _ = require('underscore');

// State
var testedUrls = {}, pendingUrls = [], urlSources = {}, errors = 0;

function push(url, from) {
  if(testedUrls[url] == undefined) {
    pendingUrls.push(url);
    casper.log(casper.colorizer.format('-> Pushed ' + url + ' onto the stack', { fg: 'magenta' }), 'debug');
  }

  if(urlSources[url] === undefined) {
    urlSources[url] = [];
  }
  urlSources[url].push(from);
}

// Spider from the given URL
function spider(url, from) {
  // Pull off our next URL
  var url = pendingUrls.shift();
  if(url == undefined) {
    return;
  }

  // If we've already crawled this one, we can skip it
  if(testedUrls[url] != undefined) {
    spider();
  }

  // We only need to do a HEAD request on external URLs. This makes things faster and prevents crawling the world
  // var method = (url.search(common.base) == 0 || url.search("/resource/") != -1) ? 'GET' : 'HEAD';
  var method = 'GET';

  // Open the URL
  casper.open(url, { method: method }).then(function() {
    // Set the status style based on server status code
    var status = this.status().currentHTTPStatus;

    // Mark this URL visited
    testedUrls[url] = status;

    // Depending on status, take different actions
    switch(status) {
      case 200:
        var statusStyle = { fg: 'green', bold: true };
        break;
      case 301:
        var statusStyle = { fg: 'yellow', bold: true };
        push(this.currentResponse.headers['Location'], url);
        break;
      case 302:
        var statusStyle = { fg: 'yellow', bold: true };
        push(this.currentResponse.headers['Location'], url);
        break;
      case 303:
        var statusStyle = { fg: 'yellow', bold: true };
        push(this.currentResponse.headers['Location'], url);
        break;
      case 304:
        var statusStyle = { fg: 'yellow', bold: true };
        break;
      default:
        var statusStyle = { fg: 'red', bold: true };
        errors += 1;
        break;
    }

    // Display the spidered URL and status
    if(status >= 400) {
      casper.echo(this.colorizer.format(status, statusStyle) + ' ' + method + ' ' + url);
    } else {
      // Only show successes in debug mode
      casper.log(this.colorizer.format(status, statusStyle) + ' ' + method + ' ' + url, 'debug');
    }

    // Find links present on this page, but only if this page is on our domain
    if(method == 'GET' && url.search(common.base) == 0) {
      var links = this.evaluate(function() {
        var links = [];

        // Fetch anchors
        Array.prototype.forEach.call(__utils__.findAll('a'), function(e) {
          links.push(e.getAttribute('href'));
        });

        // Fetch images
        Array.prototype.forEach.call(__utils__.findAll('img'), function(e) {
          links.push(e.getAttribute('src'));
        });

        return links;
      });

      // Add newly found URLs to the stack
      var baseUrl = this.getGlobal('location').origin;
      Array.prototype.forEach.call(links, function(link) {
        push(common.absoluteUri(baseUrl, link), url);
      });
    }

    // If there are URLs to be processed
    casper.log(this.colorizer.format('We\'ve seen ' + errors + ' errors, but we still have ' + pendingUrls.length + ' URLs on the queue', {fg: 'yellow'}), 'debug');
    spider();
  });
}

// Start spidering
casper.start(common.base, function() {
  push(common.base, common.base);
  spider();
});

// Start the run
casper.run(function() {
  casper.echo(casper.colorizer.format('DONE!', { fg: 'blue', bold: true }) + ' Tested ' + Object.keys(testedUrls).length + ' total URLs.');
  if(errors) {
    casper.echo(casper.colorizer.format('FAIL!', { fg: 'red', bold: true }) + ' Encountered ' + errors + ' fatal errors.');

    // Dump out our bad URLs
    _.each(testedUrls, function(code, url) {
      if(code >= 400) {
        casper.echo(casper.colorizer.format(code, { fg: 'red', bold: true }) + ': ' + url);
        _.each(urlSources[url], function(source) {
          casper.echo(casper.colorizer.format('--> ', { fg: 'yellow' }) + source);
        })
      }
    });

    this.exit(1);
  } else {
    casper.echo(this.colorizer.format('SUCCESS!', { fg: 'green', bold: true }) + ' No fatal errors encountered!');
    this.exit();
  }
});

