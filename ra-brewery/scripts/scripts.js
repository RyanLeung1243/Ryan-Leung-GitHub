$('.hamburger').click(function() {
  $('.hamburger span').toggleClass('selected');
  $('nav').toggleClass('open');
  $('nav').toggleClass('close');
});

$('.scroll-link').click(function() {
  
  let el = $(this).attr('href');
  $('html, body').animate(
    {scrollTop: $(el).offset().top - 30}
  , 1000)
});

$('.back-to-top').click(function() {
  $('html, body').animate({
    scrollTop: 0
  }, 1000);
});

$(window).scroll(function() {
  if($('html, body').scrollTop() < parseInt($(window).height()/2)) {
    $('.back-to-top').css('opacity', '0');
  }
  else {
    $('.back-to-top').css('opacity', '1');
  }
  if($('.beer-content').length > 0) {
    $('.beer-content').get().forEach(function(el) {
      console.log($('html, body').scrollTop());
      if($('html, body').scrollTop() >= ($(el).offset().top - 200)) {
          $(el).addClass('fadeIn');
          $(el).removeClass('fadeOut');    
      }
      else {
        $(el).addClass('fadeOut');
        $(el).removeClass('fadeIn');
      }

   
    });
  }
});