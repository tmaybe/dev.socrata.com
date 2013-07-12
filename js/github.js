$(".repo").each(function(index, repo) {
  var org = $(repo).attr("data-organization");
  var repo_name = $(repo).attr("data-repo");

  // Fetch its metadata
  $.getJSON("https://api.github.com/repos/" + org + "/" + repo_name, function(repo_details) {
    // Update repository details based on content from Github
    $.each(repo_details, function(prop, value) {
      $(repo).find(".github." + prop).text(value);
    });

    // Update date fields to pretty print them
    $(repo).find(".date").each(function(idx, date) {
      $(date).text(humaneDate($(date).text()));
    });
  }).fail(function(jqxhr, text_status, error) {
    // If the repo wasn't found, remove it from the page
    if(error == "Not Found") {
      $(repo).remove();
    }
  });

  $.getJSON("https://api.github.com/repos/" + org + "/" + repo_name + "/stats/contributors", function(contributors) {
    $.each(contributors, function(idx, contributor) { 
      var li = "<li>"
        + "<a href=\"" + contributor["author"]["html_url"] + "\" target=\"_blank\">"
        + "<img height=\"80\" width=\"80\" src=\"" + contributor["author"]["avatar_url"] + "\" alt=\"" + contributor["author"]["login"] + "\"/>"
        + "</a></li>";

      $(repo).find(".contributors").append(li);
    });
  }).fail(function(jqxhr, text_status, error) {
    if(error == "Not Found") {
      $(repo).find(".contributors").remove();
    }
  });
});
