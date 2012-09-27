/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */
/*global alert: false, define: false, navigatorPG: false, require: false */
define(function () {
	"use strict";
    var imag;

    function cameraAnode(callback, errorCallback) {
		require(["scripts/require_jquery"], function ($) {
			$.support.cors = true;
			$.ajax({
				url: "http://127.0.0.1:4444/dummy?action=camera&callback=?",
				//url: "http://127.0.0.1:4444/vibracion", 
				dataType: 'json',
				timeout: 3000, //3 second timeout,
				success: function (data) {
					var obj = $.parseJSON(data);
					if (typeof callback === 'function') {
						callback([obj]);
					}
				},
				error: function () {
					if (typeof errorCallback === 'function') {
						errorCallback("Without access to the camera");
					}
				}
			});
		});
    }

    return {
        captureImage: function (callback, errorCallback) {
            var ph = false;

            //Comprobación de que phonegap existe y esta operativo  (ph = true)
            document.addEventListener('deviceready', function () {
                ph = true;
            });

            if (navigator && navigator.device) {
                navigator.device.captureImage(function (dat) {
                    imag = dat;
                    if (typeof callback === 'function') {
						callback(imag);
					}
                }, function () {
                    if (typeof errorCallback === 'function') {
						errorCallback("Without access to the camera");
					}
                });
            } else {
                if (ph === true) {
                    if (navigatorPG && navigatorPG.device && navigatorPG.device.capture) {
                        navigatorPG.device.capture.captureImage(function (dat) {
                            imag = dat;
                            if (typeof callback === 'function') {
								callback(imag);
							}
                        }, function () {
                            if (typeof errorCallback === 'function') {
								errorCallback("Without access to the contacts");
							}
                        }, {
                            limit: 1
                        });
                    } else {
						require(["scripts/require_jquery"], function ($) {
							//TODO meter esto en una función
							$.support.cors = true;
							$.ajax({
								url: "http://127.0.0.1:4444/dummy?action=ping&callback=?",
								//url: "http://127.0.0.1:4444/vibracion", 
								dataType: 'json',
								success: function () {
									cameraAnode(callback, errorCallback);
								},
								timeout: 3000, //3 second timeout, 
								error: function () {
									if (typeof errorCallback === 'function') {
										errorCallback("Without access to the contacts");
									}
								}
							});
						});
                    }
                } else {
                    require(["scripts/require_jquery"], function ($) {
                        //TODO meter esto en una función
						$.support.cors = true;
                        $.ajax({
                            url: "http://127.0.0.1:4444/dummy?action=ping&callback=?",
                            //url: "http://127.0.0.1:4444/vibracion", 
                            dataType: 'json',
                            success: function () {
                                cameraAnode(callback, errorCallback);
                            },
                            timeout: 3000, //3 second timeout, 
                            error: function () {
                                if (typeof errorCallback === 'function') {
									errorCallback("Without access to the contacts");
								}
                            }
                        });
                    });
                }
            }

        }
    };
});