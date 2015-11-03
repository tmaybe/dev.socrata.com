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
  $(document).ready(TryIt.setup_livedocs($("body")));
});

// NY Times Emphasis
require(["emphasis"], function(emphasis) {
  console.log("NY Times Emphasis plugin loaded");
});

// Clipboard Links
// TODO: Find a non-Flash clipboard alternative
// require(['jquery', 'clipboard'], function($, ClipBoard) {
//   ClipBoard.clipbutton($('pre'));
// });
