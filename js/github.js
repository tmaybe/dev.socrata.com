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

  // Generate a nice little D3 column chart
  d3.json("https://api.github.com/repos/" + org + "/" + repo_name + "/stats/participation", function(error, data) {
    if(error) return console.warn("Error loading participation history: " + error);

    // Fetch our data and figure out what the max on our chart will be
    var participation = data["all"];
    var max_commits = d3.max(participation, function(d) { return d });

    var x = d3.scale.ordinal()
      .domain(data)
      .rangeBands([0, 120]);

    var y = d3.scale.linear()
      .domain([0, max_commits])
      .range(["0px", "50px"]);

    var chart = d3.select($(repo).find(".chart").get(0))
      .append("svg")
      .attr("class", "chart")
      .selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("x", function(d, i) { return i * 20; })
      .attr("height", y)
      .attr("width", 20);
  });
});
