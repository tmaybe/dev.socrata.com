require(["jquery", "jquery.redirect"], function($, Redirect) {
  if(window.location.hash != null && window.location.hash.length) {
    $.redirect("/foundry" + window.location.hash.replace("#", ""));
  } else {
    $.redirect("/");
  }
});
