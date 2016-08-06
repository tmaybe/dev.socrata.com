require(
    ["jquery", "/js/foundry.js", "/js/branding.js", "jquery.redirect", "mustache", "jquery.404"], 
    function($, Foundry, Branding, Redirect, Mustache, FourOhFour) {
  // Extract our parameters out of our URL
  var fullpath = window.location.pathname + window.location.hash;
  var params = fullpath.match(new RegExp('(/foundry/(?:embed.html#)?)([^/]+)/([^/]+)/?(.*)$'))

  if(params == null) {
    $.ajax("/js/404.mst")
      .done(function(template) {
        $('#foundry-docs')
          .html(Mustache.render(template, {}))
          .find('.search').search_link();
      });
  } else {
    var options = ("" || params[4]).split("/");
    Branding.header(params[2], $('#branding'));
    Foundry.dataset({
      target: $('#foundry-docs'),
      domain: params[2],
      uid: params[3],
      base: params[1],
      no_redirect: $.inArray("no-redirect", options) >= 0,
      proxy: $.inArray("proxy", options) >= 0
    })

    // If we've got a target, make all links open in new windows
    if($('#foundry-docs').attr('data-target')) {
      $('#foundry-docs').delegate('a[href]', 'click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.open(this.href, $('#foundry-docs').attr('data-target'));
      });
    }
  }
});
