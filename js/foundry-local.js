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
    console.log("Redirecting back to the homepage");
    window.location.replace("/");
    window.location.reload();
  }
});
