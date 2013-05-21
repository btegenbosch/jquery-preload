jquery.preload
==============

This plugin gives you the ability to only handle images when their source is fully loaded.


## Installation

Include this script *after* jQuery is loaded:

    <script src="/path/to/jquery.preload.js"></script>

## Options

 - interval `500`: The amount of milliseconds between checks. Set it to a higher value when you have a lot of images to preload.
 - notifyErrors `false`: By default the plugin notifies only when a source is fully loaded ignoring
 all errors. If this options is set to `true` errors will be notified as progress as well.

## Usage

    $.preload(sources, options);
    
*`sources` can be an array of strings or just a single string.*

Append images to a container when all sources are loaded.

    $.preload(['1.jpg', '2.jpg']).done(function (images) {
        $('#image-container').append(images);
    });
    
By notified when a single image is loaded.

    $.preload(['1.jpg', '2.jpg']).progress(function (image) {
        alert('Loaded image: ' + image.src);
    });
    
By notified when a image failed to load.

    $.preload(['1.jpg', '2.jpg']).progress(function (image, isError) {
    	if (isError) {
            alert('Failed to load image: ' + image.src);
        }
    });