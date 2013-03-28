// LiveDocs
$('a[href*="/resource"]').prepend("<i class=\"icon-cog\"></i> ").wrap("<code>").addClass("exec");
$('a[href*="/resource"]').click(function(event) {
  event.preventDefault();

  // Pull apart the URL to extract the domain, resource, and query
  var mask = new RegExp("https?://([^/]+)/resource/([^.]+).json(.*)$");
  var matches = mask.exec($(this).attr('href'));

  var url = 'http://live-docs.socrata.com/' + matches[1] + '/inline/' + matches[2] + matches[3];
  var tryit_block = '<div class="tryit"><a class="close-iframe" href="#"><i class="icon-remove-sign"></i> close</a><iframe border="0" class="live-docs" src="' + url + '" width="800" height="650" scrolling="no" seamless="yes"></iframe></div>';

  $(this).parent().after(tryit_block);
  $(".tryit .close-iframe").click(function(event) {
    $(this).parent().remove();
  });
});
