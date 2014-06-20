$(document).ready(function(){
  // Split up our hash components
  var components = window.location.hash.split("/");
  if(components.length <= 1) {
    console.log("No parameters passed!");
    return;
  } else if(components.length == 2) {
    // Catalog
    $('#docs').html("<p>Put a catalog here...</p>");
  } else if(components.length == 3) {
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

