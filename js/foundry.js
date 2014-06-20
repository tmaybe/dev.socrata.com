$(document).ready(function(){
  // Split up our hash components
  var components = window.location.hash.split("/");
  if(components.length <= 1) {
    $("#docs").html("<p>No parameters passed!</p>");
    return;
  }

  var domain = components[1];

  // We've got at least one parameter, so we know we've at least got a domain
  // Fetch config and do a little styling
  $.getJSON("http://" + domain + "/api/configurations.json?type=site_theme")
  .done(function(config) {
    console.log(config);
    var logo_slug = $.grep(config[0].properties, function(p, idx) { return p.name === "theme_v2b" })[0].value
      .images.logo_header.href;

    // If there's no logo configured for this domain
    if(!logo_slug) {
      console.log("No logo found for " + domain)
    }

    // Slap a logo in there
    if(logo_slug.indexOf("/") >= 0) {
      $("#branding").append('<img src="https://' + domain + logo_slug + '" alt="' + domain + '" />');
    } else {
      $("#branding").append('<img src="https://' + domain + '/api/assets/' + logo_slug + '" alt="' + domain + '" />');
    }
  })
  .fail(function() {
    console.log("Error getting configuration for domain " + domain);
    return;
  });


  // Deal with generating the docs or catalog
  if(components.length == 2) {
    // Catalog
    $('#docs').html("<p>Loading results for " + domain + "...</p>");
    $.when(
      $.getJSON("https://" + domain + "/api/search/views.json?limitTo=TABLES")
    )
    .done(function(results) {
      //  Load our docs from our metadata
      $.get("/foundry/catalog.mst", function(template) {
        $('#docs').html(Mustache.render(template, {
          domain: domain,
          count: results.count,
          datasets: results.results
        }));
      });
    })
    .fail(function() {
      console.log("Something went wrong...");
    });
  } else if(components.length == 3) {
    $('#docs').html("<p>Loading docs for " + components[2] + "...</p>");
    // API
    // Parallellize our data and metadata requests
    $.when(
      $.getJSON("https://" + domain + "/api/views/" + components[2] + ".json"),
      $.getJSON("https://" + domain + "/resource/" + components[2] + ".json?$limit=1")
    )
    .done(function(metadata, data) {
      //  Load our docs from our metadata
      //{% capture full_url %}https://{{ include.domain }}{{ include.path }}?{{ include.args }}{% endcapture %}
      $.get("/foundry/template.mst", function(template) {
        $('#docs').html(Mustache.render(template, {
          domain: domain,
          metadata: metadata[0],
          row: data[0][0],
          full_url: function() { return "https://" + domain + "/resource/" + components[2] + ".json"; }
        }));
      });
    })
    .fail(function() {
      console.log("Something went wrong...");
    });
  }
});

