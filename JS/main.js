$(document).ready(function() {
	$('.nav-trigger').click(function() {
		$('.side-nav').toggleClass('visible');
	});
});
function main() {
  $('.side-nav').hide();
  $('.side-nav').fadeIn(1000);
  
  $('#myUL').hide();
  
  $('.fa-book').on('click', function() {
		$('.side-nav').next().slideToggle(400);
    $(this).toggleClass('active');
    $(this).text('');
	});
}

$(document).ready(main);