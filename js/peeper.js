$(document).ready(function(){
  if(Cookies.get('hide-peeper')) {
    console.log("Peeper has been hidden"); 
    return;
  }

  var peeper = '<div id="peeper">'
    + '<a href="' + flags.peeper.link + '">'
    + '<img src="' + flags.peeper.img + '" alt="Need a hand?" />'
    + '</a>'
    + '<a href="#" class="dismiss"><i class="fa fa-times"></i> go away</a>'
    + '</div>';
  $("body").append(peeper);

  $('#peeper .dismiss').click(function() {
    $('#peeper').animate({
      right: "-270px"   
    }, 500);
    Cookies.set('hide-peeper', true, { expires: 3 });
  });

  setTimeout(function() {
    $("#peeper").animate({
      right: "-120px"
    }, 1000);
  }, flags.peeper.delay);
});

