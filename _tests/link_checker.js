var common = require('./common');

// State
var visitedUrls = {}, pendingUrls = [];

// Spider from the given URL
function spider(url) {

  // If we've already visited this URL, return fast
  if(visitedUrls[url] != undefined)
    return;

  // We only need to do a HEAD request on external URLs
  var method = url.search(common.base) == 0 ? 'GET' : 'HEAD';

  // Open the URL
  casper.open(url, { method: method }).then(function() {
    // Set the status style based on server status code
    var status = this.status().currentHTTPStatus;

    // Mark this URL visited
    visitedUrls[url] = status;

    switch(status) {
      case 200: var statusStyle = { fg: 'green', bold: true }; break;
      case 404: var statusStyle = { fg: 'red', bold: true }; break;
      default: var statusStyle = { fg: 'magenta', bold: true }; break;
    }

    // Display the spidered URL and status
    casper.log(this.colorizer.format(status, statusStyle) + ' ' + method + ' ' + url, 'info');

    // Find links present on this page, but only if this page is on our domain
    if(method == 'GET') {
      var links = this.evaluate(function() {
        var links = [];
        Array.prototype.forEach.call(__utils__.findAll('a'), function(e) {
          links.push(e.getAttribute('href'));
        });
        return links;
      });

      // Add newly found URLs to the stack
      var baseUrl = this.getGlobal('location').origin;
      Array.prototype.forEach.call(links, function(link) {
        var newUrl = common.absoluteUri(baseUrl, link);
        if(pendingUrls.indexOf(newUrl) == -1 && visitedUrls[newUrl] == undefined) {
          casper.log(casper.colorizer.format('-> Pushed ' + newUrl + ' onto the stack', { fg: 'magenta' }), 'info');
          pendingUrls.push(newUrl);
        }
      });
    }

    // If there are URLs to be processed
    if(pendingUrls.length > 0) {
      var nextUrl = pendingUrls.shift();
      casper.log(this.colorizer.format('<- Popped ' + nextUrl + ' from the stack', { fg: 'blue' }), 'info');
      spider(nextUrl);
    }
  });
}

// Start spidering
casper.start(common.base, function() {
  spider(common.base);


});

// Start the run
casper.run();
