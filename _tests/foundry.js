// Tests various API Foundry use cases
var base = 'https://dev.socrata.com';

var timeout = function(delay) {
  casper.log('Timeout after ' + delay + ' milliseconds.', 'warning');
};

/// 2.1 API, no redirect
casper.test.begin("2.1 API, no redirect", 7, function(test) {
  casper.start(base + '/foundry/soda.demo.socrata.com/b6kv-3wgw');

  // Check page branding
  casper.waitForSelectorTextChange('#branding', function() {
    test.assertSelectorHasText('#branding h4.welcome', 
        'Socrata API, powered by Socrata', 
        'branding header is present and correct');
  }, timeout, 10000);

  // Check splash
  casper.waitForSelectorTextChange('#splash', function() {
    test.assertSelectorHasText('#splash .alert', 
        'You\'re already using the latest version of this dataset API',
        'splash states we\'re on the latest version');
  }, timeout, 10000);

  // Check title
  casper.waitForSelectorTextChange('h1#title', function() {
    test.assertSelectorHasText('h1#title',
        'Old Backend Dataset Name',
        'foundry is using old endpoint title');
  }, timeout, 10000);

  // Check Foundry itself
  casper.waitForSelectorTextChange('#foundry-docs', function() {
    test.assertUrlMatch(/\/foundry\/soda\.demo.socrata\.com\/b6kv-3wgw/,
        'url matches and we haven\'t been redirected');

    test.assertTitleMatch(/^Old Backend Dataset Name/,
        'page title matches old dataset name');

    test.assertSelectorHasText('#foundry-docs .description',
        'This is the old backend dataset description',
        'foundry is using old endpoint description');

    test.assertSelectorHasText('#foundry-docs .endpoint .target',
        '/resource/b6kv-3wgw.json',
        'resource endpoint is correct');
  }, timeout, 10000);

  casper.run(function() {
    test.done();
  });
});
