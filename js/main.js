// ##############################
// Common code used for all pages
// ##############################

// Bootstrap
require(["jquery", "bootstrap"], function($) {
  // Activate all our tooltips
  $(".has-tooltip").tooltip();

  // Upgrade all tables to look like nice Bootstrap tables
  $("table").addClass("table table-striped table-hover");
});

// TryIt Links
require(["jquery", "tryit"], function($, TryIt) {
  $(document).ready(TryIt.setup_livedocs($("a.tryit")));
});

// Load scripts which just inspect the DOM
require(["jquery", "emphasis", "featherlight"], function($, emphasis, featherlight) {
  // Bind Featherlight
  $('a[data-featherlight]').featherlight();
});
