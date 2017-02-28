$(document).ready(function(){
	$(".dropdown-button").dropdown();
    $('.slider').slider({full_width: true});
	$('#4thpage').bind("mouseenter", function (event){
		$(".caro").css("-webkit-filter", "blur(5px)"); /* Safari */
		$(".caro").css("filter", "blur(5px)");
    });
	$('#4thpage').bind("mouseleave", function (event){
		$(".caro").css("-webkit-filter", "opacity(100%)"); /* Safari */
		$(".caro").css("filter", "opacity(100%)");
		$(".caro").css("-webkit-filter", "brightness(100%)"); /* Safari */
		$(".caro").css("filter", "brightness(50%)");
   	});
    $('.modal-trigger').leanModal();
    $('.parallax').parallax();
    $('.modal').modal();
})

