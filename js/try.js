// LiveDocs

// Make it a tryit link and add the gear
$('a[href*="/resource"]').replaceWith(function() {
  var target_link = decodeURI(this.href).replace(/&amp;/, "&");
  // Parse our URL and create the query string for hurl.it
  var url = $.url(target_link);
  var params = {};
  $.each(url.param(), function(k, v) {
    params[k] = [v]; 
  });
  var query = $.param({
    "method" : "GET",
    "url" : url.attr("protocol") + "://" + url.attr("host") + url.attr("path"),
    "headers" : JSON.stringify({
      "X-App-Token" : ["bjp8KrRvAPtuf809u1UXnI0Z8"]
    }),
    "args" : JSON.stringify(params)
  });

  return '<code class="tryit-link">'
            + '<i class="fa fa-cog"></i> '
            + '<a class="exec has-tooltip" data-toggle="tooltip" title="View the output of this query" href="' + target_link + '">' 
              + target_link
            + '</a> '
            + '<a class="has-tooltip" data-toggle="tooltip" title="Edit this request on Hurl.it" target="_blank" href="http://hurl.it/?' + query + '"><i class="fa fa-pencil"></i></a>'
          + '</code>';
});

$('a[href*="/resource"]').click(function(event) {
  event.preventDefault();

  var the_href = $(this).attr('href');
  var the_link = $(this).closest('.tryit-link');
  $.ajax({
    url: $(this).attr('href')
  }).done(function(data){
    // Create a results block after the link with the output
    tryit_block = '<div class="results"><a class="remove" href="#"><i class="fa fa-times"></i> close</a><code class="request"><span class="verb">GET</span> ' + the_href + '</code><pre class="response prettyprint">' + JSON.stringify(data, undefined, 2) + '</pre></div>';


    // Hide any existing code blocks on the page
    $('.results').remove();

    // We either stick it after the link directly, or the larger paragraph/list element if it has one
    if(the_link.closest('p,ul,ol').size()) {
      the_link.closest('p,ul,ol').after(tryit_block);
    } else {
      the_link.after(tryit_block);
      the_link.hide();
    }

    // Set up the remove link
    $(".results .remove").click(function(event) {
      $('.results').remove();
      $('.tryit-link').show();
    });

    // Pretty print things to look nice
    // $(".prettyprint").each(function(i, e) { hljs.highlightBlock(e); });
  }).fail(function(data){
    alert("Something went wrong with your query... Please try again later.");
  });
});
