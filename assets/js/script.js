$(document).ready(function() {
	if (jQuery().slick) {
		$('.kulinichi').slick({
			dots: true
		});

		$('.green').slick({
			dots: true
		});

		$('.msk').slick({
			dots: true
		});

		$('.other').slick({
			dots: true,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						dots: false
					}
				}
			]
		});
	}

	$('.welcome .link').click(function(e) {
		e.preventDefault();

		$('html, body').animate(
			{
				scrollTop: $(window).height()
			},
			800
		);
	});
});

var animOffset = $(window).height() * 0.15;

var wow = new WOW({
	boxClass: 'wow',
	animateClass: 'animated',
	mobile: false,
	offset: animOffset
});

wow.init();

var Form = {
	action: 'assets/php/contact-form.php',
	form: {},
	save: function(data, form, params) {
		if (form.attr('action')) {
			action = form.attr('action');
		} else {
			action = this.action;
		}

		$.ajax({
			type: 'POST',
			url: action,
			data: data,
			dataType: 'json',
			success: function(data) {
				if (data['status']) {
					if (params.done) {
						params.done();
					}
					Form.formClear(form);
				} else {
				}
			}
		});
	},
	formClear: function(form) {
		form.find('input[type=text]').val('');
		form.find('input[type=email]').val('');
		form.find('textarea').val('');
	},
	init: function(frmaId, params) {
		$('form#' + frmaId).on('submit', function(event) {
			event.preventDefault();
			var form = $(this),
				data = form.serialize();
			Form.save(data, form, params);
		});
	}
};

var sendForm = function() {
	$('.modal').fadeIn('300');
	setTimeout(function() {
		$('.modal').fadeOut('500');
	}, 3000);
};

Form.init('contact-form', { done: sendForm });
