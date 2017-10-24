$(function () {
	var $navbar = $('.navbar')
	$(window).on('scroll', function () {
		if ($(this).scrollTop() >= $(this).height() - 70) {
			$navbar.css('backgroundColor', 'rgba(244, 244, 244, 1)');
		} else {
			$navbar.css('backgroundColor', 'rgba(244, 244, 244, 0.2)');
		}
	})

	$('body').scrollspy({
		target: '#scrollspy'
	})
	$('[data-spy="scroll"]').each(function () {
		var $spy = $(this).scrollspy('refresh')
	})
})