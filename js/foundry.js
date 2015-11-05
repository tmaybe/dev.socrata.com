define(['jquery', 'mustache', 'underscore', 'jquery.forgiving', 'readmore', 'js.cookie', 'tryit'], function($, Mustache, _, Forgiving, Readmore, Cookies, TryIt) {
  // Generates sample URLs for a given column and datatype
  var load_query_suggestions = function(base_url, display_url, field_name, datatype, div) {
    // Fetch sample data & template at the same time
    $.when(
      $.ajax({
        url: base_url,
        method: "GET",
        dataType: "json",
        data: {
          "$select": field_name,
          "$limit": 1,
          "$where": field_name + " IS NOT NULL"
        }
      }),
      $.ajax("/foundry/queries.mst")
    ).done(function(data, template) {
      try {
        var val = null;
        try {
          val = data[0][0][field_name];
        } catch(err) {
          console.log("Despite our best efforts, we didn't get a value back. Because: " + err);
        }
        var suggestions = {};

        // Custom trial URLs for rich datatypes
        switch(datatype) {
          case "text":
            suggestions.filter = field_name + "=" + (val || "FOO");
            break;

          case "number":
            val = val || 42;
            suggestions.filter = field_name + "=" + val;
            suggestions.query = field_name + " > " + val;
            break;

          case "money":
            val = val || 23.99;
            suggestions.filter = field_name + "=" + val;
            suggestions.query = field_name + " < " + val;
            break;

          case "calendar_date":
            val = val || "2012-09-22"
            suggestions.filter = field_name + "=" + val;
            suggestions.query = field_name + " <= '" + val + "'";
            break;

          case "checkbox":
            suggestions.filter = field_name + "=" + (val || false);
            break;

          case "point":
            var lat = 47.59;
            var lon = -122.33;

            try {
              lat = Math.round(val.coordinates[1]*100)/100;
              lon = Math.round(val.coordinates[0]*100)/100;
            } catch(err) { }

            suggestions.query = "within_circle("
              + field_name + ", "
              + lat + ", "
              + lon + ", 1000)";
            break;

          case "location":
            var lat = 47.59;
            var lon = -122.33;

            try {
              lat = Math.round(val.latitude*100)/100;
              lon = Math.round(val.longitude*100)/100;
            } catch(err) { }

            suggestions.query = "within_circle("
              + field_name + ", "
              + lat + ", "
              + lon + ", 1000)";
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
            suggestions.filter = field_name + "=" + val;
            break;
        };

        // Computed columns need a little more love, since they're hidden...
        if(field_name.match(/^:@/)) {
          suggestions.query += "&$select=*," + field_name;
        }

        // Update our block
        div.html(Mustache.render(template[0], {
          full_url: base_url,
          display_url: display_url,
          datatype: datatype,
          fieldName: field_name,
          suggestions: suggestions
        }));

        TryIt.setup_livedocs(div);
      } catch(err) {
        console.log("Error loading sample data: " + err);
      }
    });
  };

  var dataset = function(args) {
    var query_base = "https://" + args.domain;
    var endpoint_base = query_base;
    if(Cookies.get('dev_proxy_user') && Cookies.get('dev_proxy_domain') == args.domain) {
      // We're now in proxy mode!
      console.log("Proxying this domain's requests...");

      // If we're proxying through the dev proxy, we need to change our query_base
      query_base = "https://proxy." + window.location.hostname + "/socrata/" + args.domain;

      // Enable CORS when we're proxying
      $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        options.crossDomain ={
            crossDomain: true
          };
        options.xhrFields = {
            withCredentials: true
          };
      });
    }

    // Parallelize our data and metadata requests
    $.when(
      $.ajaxForgiving404({
        url: query_base + "/api/views.json",
        method: "GET",
        dataType: "json",
        data: {
          "method": "getDefaultView",
          "id": args.uid
        }
      }),
      $.ajax({
        url: query_base + "/api/views.json",
        method: "GET",
        dataType: "json",
        data: {
          "method": "getByResourceName",
          "name": args.uid
        }
      }), // Metadata
      $.ajaxForgiving404({
        url: query_base + "/api/migrations/" + args.uid + ".json",
        method: "GET",
        dataType: "json"
      }), // Migrations API
      $.ajax({
        url: query_base + "/resource/" + args.uid + ".json",
        method: "GET",
        dataType: "json",
        data: {
          "$select": "count(*) AS count"
        }
      }), // Count
      $.ajax("/foundry/template.mst")
    ).done(function(default_view, metadata, migration, count, template) {
      // First check to make sure we're viewing the default dataset
      if(default_view[1] == "success" && default_view[0]["id"] != args.uid) {
        console.log("Redirecting user to the API for the default dataset");
        $(args.target).html("<p>Redirecting you to the default dataset for this view...</p>").show();
        window.location = "/foundry/#/" + args.domain + "/" + default_view[0]["id"];
        window.location.reload();
        return false;
      }

      // We got migration details, let's parse the mapping too
      var flattenings = {};
      var name_shortenings = {}
      var nbe_uid = null;
      var obe_uid = null;
      var last_synced = 0;
      var is_obe = false;
      var redirected = (Cookies.get('foundry-redirected') == "true");

      if(migration != null && migration[1] == "success") {
        var mapping = JSON.parse(migration[0].controlMapping);
        flattenings = mapping.flatten;
        name_shortenings = mapping.nameShortening;
        nbe_uid = migration[0].nbeId;
        obe_uid = migration[0].obeId;
        last_synced = (new Date(migration[0].syncedAt*1000).toLocaleString());
        is_obe = (obe_uid == args.uid);
      }

      // If we're looking at an OBE dataset and we haven't forced these docs, redirect
      if(is_obe && !args.no_redirect) {
        Cookies.set('foundry-redirected', true, { expires: 1 });
        console.log("Redirecting user to the NBE API for this dataset");
        $(args.target).html("<p>Redirecting you to the new API endpoint for this datset...</p>").show();
        window.location = window.location.pathname + "#/" + args.domain + "/" + nbe_uid;
        window.location.reload();
      }

      // Clean up our columns a bit
      $.each(metadata[0].columns, function(idx, col) {
        // Some things unfortunately need to be hidden...
        if(col.fieldName.match(/^:@computed_region/)) {
          col.hidden = true;
        }

        if(col.dataTypeName == "calendar_date") {
          // calendar_dates were replaced by floating_timestamps in NBE
          col.dataTypeName = "floating_timestamp";
        }
      });

      // Roll up our changes so we can use them in our mustache template
      var splits = _.collect(flattenings, function(mapping, key) {
        return {
          from_col: key,
          to_cols: _.collect(mapping, function(val, key) {
            return "<code>" + val.fieldname + "</code>";
          }).join(", ")
        };
      });
      var renames = _.chain(name_shortenings)
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
      var full_url = query_base + "/resource/" + args.uid + ".json";
      var display_url = endpoint_base + "/resource/" + args.uid + ".json";
      $(args.target).html(Mustache.render(template[0], {
        uid: args.uid,
        domain: args.domain,
        metadata: metadata[0],
        nbe_uid: nbe_uid,
        obe_uid: obe_uid,
        is_obe: is_obe,
        is_nbe: !is_obe,
        version: is_obe ? '2.0' : '2.1',
        show_migration: flags.show_migration && is_obe,
        has_structural_changes: splits.length > 0,
        splits: splits,
        has_renames: renames.length > 0,
        renames: renames,
        last_synced: last_synced,
        count: count[0][0].count.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
        full_url: full_url,
        display_url: display_url,
        redirected: redirected,
        is_private: Cookies.get('dev_proxy_domain') == args.domain && metadata[0].flags["public"] == undefined,
        username: decodeURI((Cookies.get('dev_proxy_user') || '').replace(/\+/g, '%20')),
        logout_url: "https://proxy." + window.location.hostname + "/logout/"
      }));

      // Set up our livedocs links
      TryIt.setup_livedocs($(args.target));

      // Set up our clipboard buttons
      // TODO: Find a non-Flash clipbutton option
      // ClipBoard.clipbutton($('pre'));

      // Set up handlers for our collapse-o icons. Unfortunately events only seem
      // to fire on IDs, so we need to be a bit more long winded.
      $("#accordion .panel-collapse").each(function() {
        $(this).on("shown.bs.collapse", function() {
          $(this).parent().find(".collapse-icon")
            .removeClass("fa-plus-square-o")
            .addClass("fa-minus-square-o");

          // Drop in our examples
          load_query_suggestions(
            full_url,
            display_url,
            $(this).attr("data-fieldname"),
            $(this).attr("data-datatype"),
            $(this).find(".tryit"));
        });
        $(this).on("hidden.bs.collapse", function() {
          $(this).parent().find(".collapse-icon")
            .removeClass("fa-minus-square-o")
            .addClass("fa-plus-square-o");
        });
      });

      // Show ourselves!
      $("#loading").fadeOut();
      $(args.target).fadeIn();

      // Use readmore.js to shorten descriptions to something more reasonable.
      $(".metadata .description").readmore({
        moreLink: '<a href="#">Show more <i class="fa fa-angle-double-down"></i></a>',
        lessLink: '<a href="#">Show less <i class="fa fa-angle-double-up"></i></a>'
      });
    }).fail(function(xhr) {
      switch(xhr.status) {
        case 403:
          $("#loading").hide();
          var auth_url = "https://proxy." + window.location.hostname + "/login/" + args.domain + "?return=" + encodeURIComponent(window.location.href);
          $(args.target).append('<h1><i class="fa fa-lock"></i> Private Dataset</h1>');
          $(args.target).append('<p>This dataset is private, and you will need to authenticate before you can access it. When you authenticate, you\'ll be asked to log in and allow access to your private APIs before continuing</p>');
          $(args.target).append('<p>Curious to <a href="/changelog/2015/10/27/private-api-docs.html">learn more about how this works</a>?</p>');

          $(args.target).append('<a href="' + auth_url + '" type="button" class="btn btn-primary">Authenticate</a>');
          $(args.target).show();
          break;
        case 404:
          $("#loading").hide();
          $(args.target).html("<p>This dataset cannot be found or has been deleted.</p>").show();
          break;
        default:
          $("#loading").hide();
          $(args.target).html("<p>Something went wrong fetching metadata</p>").show();
          break;
      }
    });
  };

  return {
    dataset: dataset
  };
});
