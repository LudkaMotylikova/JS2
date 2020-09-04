String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

(function($) {

	$('.gallery a').lightbox({
		speed: 300,
		hideEffect: 'slideUp',
		complete: function() {

		}
	});

	// -----

	// gallery element
	var gallery  = $('.gallery'),
		selected = $('.menu').find('.selected');

	// click
	$('.menu a').on('click', function(event) {

		// no redirect
		event.preventDefault();

		// ajax
		var a      = $(this),
			href   = a.attr('href'),
			parent = a.parent('li');


		if ( selected.is( parent ) ) return;

		// parent
		selected = parent;

		// selected link
		parent.addClass('selected')
			  .siblings().removeClass('selected');

		// recent gallery
		gallery.find('.gallery-set').fadeOut();

		// ajax request, .gallery-set
		$.ajax({
			url: href,
			type: 'GET',
			dataType: 'html',
			success: function(data) {

				// new gallery set
				var newGallery = $(data).find('.gallery-set');
					gallery.html( newGallery );

				// fadeIn
				newGallery.addClass('fadeIn' + selected.data('from').capitalize());

			}
		});
	});

})(jQuery);
