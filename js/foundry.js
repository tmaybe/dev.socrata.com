$(document).ready(function(){
  // Split up our hash components
  var components = window.location.hash.split("/");
  if(components.length <= 1) {
    $("#foundry-docs").html("<p>No parameters passed!</p>");
    return;
  }

  var domain = components[1];

  // // We've got at least one parameter, so we know we've at least got a domain
  // // Fetch config and do a little styling
  // $.getJSON("http://" + domain + "/api/configurations.json?type=site_theme")
  // .done(function(config) {
  //   console.log(config);
  //   var logo_slug = $.grep(config[0].properties, function(p, idx) { return p.name === "theme_v2b" })[0].value
  //     .images.logo_header.href;

  //   // If there's no logo configured for this domain
  //   if(!logo_slug) {
  //     console.log("No logo found for " + domain)
  //   }

  //   // Slap a logo in there
  //   if(logo_slug.indexOf("/") >= 0) {
  //     $("#branding").append('<img src="https://' + domain + logo_slug + '" alt="' + domain + '" />');
  //   } else {
  //     $("#branding").append('<img src="https://' + domain + '/api/assets/' + logo_slug + '" alt="' + domain + '" />');
  //   }
  // })
  // .fail(function() {
  //   console.log("Error getting configuration for domain " + domain);
  //   return;
  // });

  // Deal with generating the docs or catalog
  if(components.length == 2) {
    // Catalog
    $('#foundry-docs').html("<p>Loading results for " + domain + "...</p>");
    $.when(
      $.getJSON("https://" + domain + "/api/search/views.json?limitTo=TABLES")
    )
    .done(function(results) {
      //  Load our docs from our metadata
      $.get("/foundry/catalog.mst", function(template) {
        $('#foundry-docs').html(Mustache.render(template, {
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
    $('#foundry-docs').html("<p>Loading docs for " + components[2] + "...</p>");
    // API
    // Parallellize our data and metadata requests
    $.when(
      $.getJSON("https://" + domain + "/api/views/" + components[2] + ".json"),
      $.getJSON("https://" + domain + "/resource/" + components[2] + ".json?$limit=1")
    ).done(function(metadata, data) {
      // Modify metadata to include trial URLs
      $.each(metadata[0].columns, function(idx, col) {
        col.filter_url = "https://" + domain + "/resource/" + metadata[0].id + ".json?"
          + col.fieldName + "=" + data[0][0][col.fieldName];
      });

      // Convert our timestamps into printable times
      $.each(["createdAt", "rowsUpdatedAt"], function(idx, name){
        metadata[0][name] = (new Date(metadata[0][name]*1000).toLocaleString());
      });

      // Update our page header
      $("h1#title").html(metadata[0].name)

      //  Load our docs from our metadata
      $.when(
        $.ajax("/foundry/template.mst"),
        $.ajax("/foundry/tryit.mst")
      ).done(function(template, tryit) {
        $('#foundry-docs').html(Mustache.render(template[0], {
          domain: domain,
          metadata: metadata[0],
          row: data[0][0],
          full_url: function() { return "https://" + domain + "/resource/" + components[2] + ".json"; },
        }, {
          tryit: tryit[0]
        }));

        // Reactivate our livedocs links
        setup_livedocs();
      }).fail(function() {
        console.log("Something went wrong fetching templates...");
      });
    }).fail(function() {
      console.log("Something wnet wrong retrieving metadata...");
    });
  }
});

