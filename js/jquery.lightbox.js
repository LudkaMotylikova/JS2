;(function($, window, document, undefined) {
	
	var Lightbox = {

		image:    null,
		overlay:  null,
		element:  null,
		settings: null,

		init: function( element, settings ) {
			
			this.element  = element;
			this.settings = settings;
			this.overlay  = $('#overlay');

			if ( this.overlay.length )
				this.image = this.overlay.find('img');
			else
				this.createOverlay();

			this.attachHandlers();

		},

		createOverlay: function() {
			
			this.overlay = $('<div/>', { id: 'overlay' }).hide();
			this.image   = $('<img/>', { src: '', alt: '' }).appendTo( this.overlay );
			
			this.overlay.appendTo('body');

		},

		attachHandlers: function() {

			// hide lightbox on click
			this.overlay.on('click', function() {
				Lightbox.hide();
			});

			// hide lightbox on escape
			$(document).on('keyup', function(event) {
				if ( event.which === 27 ) Lightbox.hide();
			});

			// show lightbox when clicked on element
			this.element.on('click', function(event) {
				event.preventDefault();
				Lightbox.setImage( $(this).attr('href') );
				Lightbox.show();
			});

		},

		setImage: function( url ) {
			this.image.attr('src', url);
		},

		show: function() {
			this.overlay[ this.settings.showEffect ]( this.settings.speed );
		},

		hide: function() {
			var config = this.settings;

			this.overlay[ config.hideEffect ]( config.speed, function() {

				if ( $.isFunction( config.complete ) ) {
     				config.complete.call( this );
    			}

			});
		}

	}

	$.fn.lightbox = function( options ) {

		// default settins
		var settings = $.extend({
				speed 	   : 250,
				showEffect : 'fadeIn',
				hideEffect : 'slideUp',
				complete   : null
			}, options);	

		// return object for chaining 
		return this.each( function() {
			Lightbox.init( $(this), settings );
		});

	}

})(jQuery, window, document);