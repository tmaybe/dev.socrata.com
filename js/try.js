// LiveDocs
$('a[href*="/resource"]').prepend("<i class=\"icon-cog\"></i> ").wrap("<code>").addClass("exec");
// $('a[href*="/resource"]').click(function(event) {
//   event.preventDefault();

//   // Pull apart the URL to extract the domain, resource, and query
//   var mask = new RegExp("https?://([^/]+)/resource/([^.]+).json(.*)$");
//   var matches = mask.exec($(this).attr('href'));

//   var url = 'http://live-docs.socrata.com/' + matches[1] + '/inline/' + matches[2] + matches[3];
//   var tryit_block = '<div class="tryit"><a class="close-iframe" href="#"><i class="icon-remove-sign"></i> close</a><iframe border="0" class="live-docs" src="' + url + '" width="800" height="650" scrolling="no" seamless="yes"></iframe></div>';

//   $(this).parent().after(tryit_block);
//   $(".tryit .close-iframe").click(function(event) {
//     $(this).parent().remove();
//   });
// });

$('a[href*="/resource"]').click(function(event) {
  event.preventDefault();

  // JSONP the response for this bad boy
  var the_link = $(this).attr('href');
  $.ajax({
    url: $(this).attr('href'),
    jsonp: "$jsonp",
    dataType: "jsonp"
  }).done(function(data){
    // Create a results block after the link with the output
    tryit_block = '<div class="tryit-results"><a class="remove" href="#"><i class="icon-remove-sign"></i> close</a><code class="request"><span class="verb">GET</span> ' + the_link + '</code><pre class="response prettyprint">' + JSON.stringify(data, undefined, 2) + '</pre></div>';
    $("#tryit-target").empty().append(tryit_block);
    $("#tryit-visor").slideDown(400);

    // Set up the remove link
    $(".tryit-results .remove").click(function(event) {
      $("#tryit-visor").slideUp(400);
      $(".tryit-target").empty();
    });

    // Pretty print things to look nice
    $(".prettyprint").each(function(i, e) { hljs.highlightBlock(e); });
  }).fail(function(data){
    tryit_block = "<p class=\"error\">Something has gone wrong here... sorry about that!</p>";
  });
});
