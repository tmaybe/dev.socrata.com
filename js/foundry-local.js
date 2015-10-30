require(["jquery", "/js/foundry.js"], function($, Foundry) {
  // Split up our hash components
  var components = window.location.hash.split("/");

  // Load docs or catalog
  if(components.length >= 3) {
    ///Foundry.branding(components[1], $('#branding'));
    Foundry.dataset({
      target: $('#foundry-docs'),
      domain: components[1],
      uid: components[2],
      no_redirect: $.inArray("no-redirect", components) > 0,
      proxy: $.inArray("proxy", components) > 0
    });
  } else {
    $("#loading").hide();
    $('#foundry-docs').append('<h1><i class="fa fa-question-circle"></i> Looks like you might need to find a dataset!</h1>');
    $('#foundry-docs').append('<p>You\'ll need an open dataset to use API Foundry, maybe you should go check out the <a href="http://www.opendatanetwork.com">Open Data Network</a>!</p>');

    $('#foundry-docs').show();
  }
});
