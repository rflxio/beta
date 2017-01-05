$(window).scroll(function() {		
	var w = $(window).scrollTop(),
			e1 = $("#e1").offset().top;
	
	if (w < e1) {
		$("#code-box-1").show().siblings().hide();;
	}	else if (w > e1) {
		$("#code-box-2").show().siblings().hide();;
	}
});