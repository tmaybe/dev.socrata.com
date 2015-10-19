require(["jquery", "/js/foundry.js"], function($, Foundry) {
  // Split up our hash components
  var components = window.location.hash.split("/");

  // Load docs or catalog
  if(components.length >= 3) {
    ///Foundry.branding(components[1], $('#branding'));
    Foundry.dataset(components[1], components[2], (components[3] == "no-redirect"), '#foundry-docs');
  } else {
    console.log("Redirecting back to the homepage");
    window.location.replace("/");
    window.location.reload();
  }
});
