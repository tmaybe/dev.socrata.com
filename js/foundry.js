$(document).ready(function(){
  // Split up our hash components
  var components = window.location.hash.split("/");
  if(components.length <= 1) {
    $("#docs").html("<p>No parameters passed!</p>");
    return;
  } else if(components.length == 2) {
    // Catalog
    $('#docs').html("<p>Loading results for " + components[1] + "...</p>");
    $.when(
      $.getJSON("https://" + components[1] + "/api/search/views.json?limitTo=TABLES")
    )
    .done(function(results) {
      //  Load our docs from our metadata
      $.get("/foundry/catalog.mst", function(template) {
        $('#docs').html(Mustache.render(template, {
          domain: components[1],
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
      $.getJSON("https://" + components[1] + "/api/views/" + components[2] + ".json"),
      $.getJSON("https://" + components[1] + "/resource/" + components[2] + ".json?$limit=1")
    )
    .done(function(metadata, data) {
      //  Load our docs from our metadata
      //{% capture full_url %}https://{{ include.domain }}{{ include.path }}?{{ include.args }}{% endcapture %}
      $.get("/foundry/template.mst", function(template) {
        $('#docs').html(Mustache.render(template, {
          domain: components[1],
          metadata: metadata[0],
          row: data[0][0],
          full_url: function() { return "https://" + components[1] + "/resource/" + components[2] + ".json"; }
        }));
      });
    })
    .fail(function() {
      console.log("Something went wrong...");
    });
  }
});

