/*!
 * jQuery Preload Plugin 1.0
 *
 * Copyright 2013 Bart Tegenbosch
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
 
(function ($) {
	'use strict';
	
	var defaults = {
		interval:500,
		notifyErrors:false
	};
	
	$.preload = function (sources, options) {
	
		if (!sources || sources.length === 0) {
			throw new Error('No sources to preload');
		}
		
		// if the sources argument is not an array convert it.
		if (sources && !sources.shift) {
			sources = [sources.toString()];
		}
			
		var opts = $.extend(defaults, options);
		var failed = []; // collection of failed sources
		var images = []; // collection of loaded images
		var deferred = $.Deferred();
		
		$.each(sources, function (index, source) {
			var image = new Image();
			image.src = source.toString();
			
			var interval = window.setInterval(function () {
				
				// the image is fully loaded
				if (image.complete) {
					deferred.notify(image, false);
					images.push(image);
					window.clearInterval(interval);
				}
				
				// all sources have been handled.
				if ((images.length + failed.length) == sources.length) {
					deferred.resolve(images, failed);
				}
				
			}, opts.interval);
			
			// handle error cases
			image.onerror = function () {
				if (opts.notifyErrors) {
					deferred.notify(image, true);
				}
				
				failed.push(source);
				window.clearInterval(interval);
			};
		});
		
		return deferred.promise();
	};
})(jQuery)