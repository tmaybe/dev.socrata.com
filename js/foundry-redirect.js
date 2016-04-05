require(["jquery", "jquery.redirect"], function($, Redirect) {
  if(window.location.hash != null) {
    $.redirect("/foundry" + window.location.hash.replace("#", ""));
  } else {
    $.redirect("/");
  }
});
