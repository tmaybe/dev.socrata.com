require(["jquery", "jquery.timeago", "mustache", "bootstrap"], function($, TimeAgo, Mustache, Bootstrap) {
  // ERMAHGERD!!! The dev site uses the Socrata API
  $.ajax("https://soda.demo.socrata.com/resource/etih-7ix2.json").done(function(data) {
    function update() {
      var pick = data[Math.floor(Math.random() * data.length)];
      $(".hello-dolly").html(pick["tagline"]).attr("style", "font-size: " + pick["size"] + "em");
    }
    update();
    window.setInterval(update, 8000);
  });

  // Bling.
  $(".trailhead h2").mouseenter(function(){
      $(this).find("i").addClass("fa-spin");
  });
  $(".trailhead h2").mouseleave(function(){
      $(this).find("i").removeClass("fa-spin");
  });

  // Fetch our build.json and see if we should update our footer
  $.when(
    $.ajax({
      url: "/build.json",
      dataType: "json",
      cache: false
    }),
    $.ajax("/js/build.mst")
  ).done(function(build, template) {
    // Append our build information to the footer
    $("footer").append(Mustache.render(template[0], {
      href: build[0].href,
      ago: $.timeago(new Date(build[0].date * 1000)),
      date: (new Date(build[0].date * 1000)).toString()
    }));
    $(".last-built").tooltip();
  }).fail(function(error) {
    console.log("Error fetching /build.json. If this isn't production, this isn't something to worry about.");
  });
});
