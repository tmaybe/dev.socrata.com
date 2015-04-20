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
    $.getJSON("https://" + domain + "/api/views.json?method=getByResourceName&name=" + uid), // Metadata
    $.getJSON("https://" + domain + "/api/migrations/" + uid + ".json"), // Migrations API
    $.getJSON("https://" + domain + "/resource/" + uid + ".json?$limit=1"), // Sample data row
    $.getJSON("https://" + domain + "/resource/" + uid + ".json?$select=count(*)") // Count
  ).done(function(metadata, migration, data, count) {
    // We got migration details, let's parse the mapping too
    var migration_mapping = null;
    var nbe_uid = null;
    var obe_uid = null;
    var last_synced = 0;
    var is_obe = true;

    if(migration[1] == "success") {
      migration_mapping = JSON.parse(migration[0].controlMapping);
      nbe_uid = migration[0].nbeId;
      obe_uid = migration[0].obeId;
      last_synced = (new Date(migration[0].syncedAt*1000).toLocaleString());
      is_obe = (obe_uid == uid);
    }

    // Modify column metadata
    $.each(metadata[0].columns, function(idx, col) {
      // Include trial URLs
      var val = data[0][0][col.fieldName];

      // Custom trial URLs for rich datatypes
      switch(col.dataTypeName) {
        case "text":
          col.filter = col.fieldName + "=" + val;
          break;

        case "number":
          col.filter = col.fieldName + "=" + val;
          col.query = col.fieldName + " > " + val;
          break;

        case "money":
          col.filter = col.fieldName + "=" + val;
          col.query = col.fieldName + " < " + val;
          break;

        case "calendar_date":
          col.filter = col.fieldName + "=" + val;
          col.query = col.fieldName + " <= '" + val + "'";
          break;

        case "checkbox":
          col.filter = col.fieldName + "=" + val;
          break;

        case "point":
          col.query = "within_circle("
            + col.fieldName + ", "
            + Math.round(val.coordinates[1]*100)/100 + ", "
            + Math.round(val.coordinates[0]*100)/100 + ", 1000)";
          break;

        case "location":
          col.query = "within_circle("
            + col.fieldName + ", "
            + Math.round(val.latitude*100)/100 + ", "
            + Math.round(val.longitude*100)/100 + ", 1000)";
          break;

        case "document":
          // Nom nom nom
          break;

        case "photo":
          // Nom nom nom
          break;

        case "email":
          // Nom nom nom
          break;

        case "url":
          // Nom nom nom
          break;

        default:
          col.filter = col.fieldName + "=" + val;
          break;

      };

      if(migration_mapping) {
        // Column mapping
        col.equivalent = migration_mapping.nameShortening[col.fieldName];
        col.flattening = migration_mapping.flatten[col.fieldName];
      }
    });

    // Roll up our changes so we can use them in our mustache template
    var splits = _.collect(migration_mapping.flatten, function(mapping, key) {
      return {
        from_col: key,
        to_cols: _.collect(mapping, function(val, key) {
          return "<code>" + val.fieldname + "</code>";
        }).join(", ")
      };
    });
    var renames = _.chain(migration_mapping.nameShortening)
      .collect(function(to, from) {
        return { from: from, to: to };
      })
      .filter(function(obj) {
        return obj.from != obj.to;
      }).value();

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
        nbe_uid: nbe_uid,
        obe_uid: obe_uid,
        migration_mapping: migration_mapping,
        is_obe: is_obe,
        show_migration: flags.show_migration && is_obe,
        has_structural_changes: splits.length > 0,
        splits: splits,
        has_renames: renames.length > 0,
        renames: renames,
        last_synced: last_synced,
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

var load = function() {
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
}

// Initial load
$(document).ready(function() {
  load();
  window.onhashchange = load();
});

