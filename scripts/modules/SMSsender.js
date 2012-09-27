/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */
/*global alert: false, define: false, navigatorPG: false, require: false */
define(function () {
	"use strict";
    function sendSMSAnode(number, body, callback, errorCallback) {
		require(["scripts/require_jquery"], function ($) {
			$.support.cors = true;
			$.ajax({
				url: "http://127.0.0.1:4444/dummy?action=sendSMS&number=" + number + "&body=" + body + "&callback=?",
				//url: "http://127.0.0.1:4444/vibracion", 
				dataType: 'json',
				timeout: 10000, //3 second timeout,
				success: function (data) {
					var obj = $.parseJSON(data);
					if (typeof callback === 'function') {
						callback(obj);
					}
				},
				error: function () {
					if (typeof errorCallback === 'function') {
						errorCallback("Without access to the SMS");
					}
				}
			});
		});
    }

    return {
        sendSMS: function (number, body, callback, errorCallback) {
            var ph = false;
            // Comprobación de que phonegap existe y esta operativo  (ph = true)
            document.addEventListener('deviceready', function () {
                ph = true;
            });


            if (navigator && navigator.device && navigator.device.sendMessage) {
                navigator.device.sendMessage("sms:" + number + "?body=" + body, null, function () {
                    if (typeof callback === 'function') {
						callback();
					}
                }, function () {
					if (typeof errorCallback === 'function') {
						errorCallback("Without access to the SMS");
					}
				});
            } else {
                require(["scripts/require_jquery"], function ($) {
                    //TODO meter esto en una función
					$.support.cors = true;
                    $.ajax({
                        url: "http://127.0.0.1:4444/dummy?action=ping&callback=?",
                        dataType: 'json',
                        success: function () {
                            sendSMSAnode(number, body, callback, errorCallback);
                        },
                        timeout: 3000, //3 second timeout, 
                        error: function () {
                            if (typeof errorCallback === 'function') {
								errorCallback("Without access to the SMS");
							}
                        }
                    });
                });
            }

        }
    };
});