$(document).ready(function(){
  // Split up our hash components
  var components = window.location.hash.split("/");
  if(components.length <= 1) {
    $("#foundry-docs").html("<p>No parameters passed!</p>");
    return;
  }
  var domain = components[1];

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
      $.getJSON("https://" + domain + "/resource/" + components[2] + ".json?$limit=1"),
      $.getJSON("https://" + domain + "/resource/" + components[2] + ".json?$select=count(*)")
    ).done(function(metadata, data, count) {
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
      $("h1.title").html(metadata[0].name);

      //  Load our docs from our metadata
      $.when(
        $.ajax("/foundry/template.mst"),
        $.ajax("/foundry/tryit.mst")
      ).done(function(template, tryit) {
        $('#foundry-docs').html(Mustache.render(template[0], {
          domain: domain,
          metadata: metadata[0],
          row: data[0][0],
          count: count[0][0].count.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
          full_url: function() { return "https://" + domain + "/resource/" + components[2] + ".json"; },
        }, {
          tryit: tryit[0]
        }));

        // Set up our livedocs links
        setup_livedocs();

        // Set up our clipboard buttons
        $.each($("pre"), clipbutton);
      }).fail(function() {
        console.log("Something went wrong fetching templates...");
      });
    }).fail(function() {
      console.log("Something went wrong retrieving metadata...");
    });
  }
});

