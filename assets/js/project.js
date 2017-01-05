$(window).scroll(function() {
	var logo = $(".logo");
	
	if($(window).scrollTop() !== 0) {
		logo.addClass("active");
	} else {
		logo.removeClass("active");
	}
	
	if ($(".landingMenu li a").hasClass("cur")) {
		$(".sub-menu").removeClass("active");
		$(".cur").closest("ul").addClass("active");
	}	
});

$(function() {
	$("#sticker").stick_in_parent({
		offset_top: 120
	});
  
  $('.landingMenu').liLanding({
		speedFactor: 0.5
	});
});

$(window).resize(function (){
	$("#main-box").height($(window).height());
}).resize();