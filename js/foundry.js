// Dataset
var dataset = function(domain, uid) {
  // Check to make sure we're on the right doc
  $.getJSON("https://" + domain + "/api/views.json?method=getDefaultView&id=" + uid)
    .done(function(data) {
      if(data["id"] != uid) {
        console.log("Redirecting user to the API for the default dataset");
        $('#foundry-docs').html("<p>Redirecting you to the default dataset for this view...</p>").show();
        window.location = "/foundry/#/" + domain + "/" + data["id"];
        window.location.reload();
      }
    })
    .fail(function(err) {
      console.log("Something went wrong checking the default view. Hopefully we didn't need that.");
    });

  // Parallelize our data and metadata requests
  $.when(
    $.getJSON("https://" + domain + "/api/views.json?method=getByResourceName&name=" + uid),
    $.getJSON("https://" + domain + "/resource/" + uid + ".json?$limit=1"),
    $.getJSON("https://" + domain + "/resource/" + uid + ".json?$select=count(*)")
  ).done(function(metadata, data, count) {
    // Modify metadata to include trial URLs
    $.each(metadata[0].columns, function(idx, col) {
      col.filter_url = "https://" + domain + "/resource/" + uid + ".json?"
        + col.fieldName + "=" + data[0][0][col.fieldName];
    });

    // Convert our timestamps into printable times
    $.each(["createdAt", "rowsUpdatedAt"], function(idx, name){
      metadata[0][name] = (new Date(metadata[0][name]*1000).toLocaleString());
    });

    // Update our page header
    $("h1.title").html(metadata[0].name);
    document.title = metadata[0].name + " | Socrata API Foundry";

    //  Load our docs from our metadata
    $.when(
      $.ajax("/foundry/template.mst"),
      $.ajax("/foundry/tryit.mst")
    ).done(function(template, tryit) {
      $('#foundry-docs').html(Mustache.render(template[0], {
        uid: uid,
        domain: domain,
        metadata: metadata[0],
        row: data[0][0],
        count: count[0][0].count.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
        full_url: function() { return "https://" + domain + "/resource/" + uid + ".json"; },
      }, {
        tryit: tryit[0]
      }));

      // Set up our livedocs links
      setup_livedocs();

      // Set up our clipboard buttons
      $.each($("pre"), clipbutton);

      // Set up handlers for our collapse-o icons. Unfortunately events only seem
      // to fire on IDs, so we need to be a bit more long winded.
      $("#accordion .panel-collapse").each(function() {
        $(this).on("shown.bs.collapse", function() {
          $(this).parent().find(".collapse-icon")
            .removeClass("fa-plus-square-o")
            .addClass("fa-minus-square-o");
        });
        $(this).on("hidden.bs.collapse", function() {
          $(this).parent().find(".collapse-icon")
            .removeClass("fa-minus-square-o")
            .addClass("fa-plus-square-o");
        });
      });


      // Show ourselves!
      $("#loading").fadeOut();
      $("#foundry-docs").fadeIn();

      // Use readmore.js to shorten descriptions to something more reasonable.
      $(".metadata .description").readmore({
        moreLink: '<a href="#">Show more <i class="fa fa-angle-double-down"></i></a>',
        lessLink: '<a href="#">Show less <i class="fa fa-angle-double-up"></i></a>'
      });
    }).fail(function() {
      $("#loading").hide();
      $('#foundry-docs').html("<p>Something went wrong fetching templates.</p>").show();
    });
  }).fail(function(xhr) {
    switch(xhr.status) {
      case 403:
        $("#loading").hide();
        $('#foundry-docs').html("<p>Unfortunately, this dataset is private, and API Foundry does not support private datasets at this time.</p>").show();
        break;
      case 404:
        $("#loading").hide();
        $('#foundry-docs').html("<p>This dataset cannot be found or has been deleted.</p>").show();
        break;
      default:
        $("#loading").hide();
        $('#foundry-docs').html("<p>Something went wrong fetching metadata</p>").show();
        break;
    }
  });;
};

$(document).ready(function(){
  // Throw up a loading screen while we work
  $('#branding').hide();
  $('#foundry-docs').hide();

  // Split up our hash components
  var components = window.location.hash.split("/");

  // Load branding
  if(components.length >= 2) {
    branding(components[1], $('#branding'));
  }

  // Load docs or catalog
  if(components.length == 3) {
    // Load for a particular dataset
    dataset(components[1], components[2]);
  } else {
    $("#foundry-docs").html("<p>No parameters passed!</p>");
    return;
  }
});
