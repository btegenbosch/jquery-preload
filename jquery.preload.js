/*!
 * jQuery Preload Plugin 1.0
 *
 * Copyright 2013 Bart Tegenbosch <bart@onedott.nl>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
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
			
			var interval = window.setInterval(function updateProgress () {
				
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
