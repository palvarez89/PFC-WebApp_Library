/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */
/*global alert: false, define: false, navigatorPG: false, require: false, webkitNotifications: false, Notification: false */
define(function () {
	"use strict";
    function beepAnode(times) {
		require(["scripts/require_jquery"], function ($) {
			$.support.cors = true;
			$.ajax({
				url: "http://127.0.0.1:4444/dummy?action=beep&times=" + times + "&callback=?",
				dataType: 'json',
				timeout: 3000,
				error: function () {
				}
			});
		});
    }

    return {
        beep: function (times) {
            var ph = false;
            // Comprobación de que phonegap existe y esta operativo  (ph = true)
            document.addEventListener('deviceready', function () {
                ph = true;
            });

            if (ph === true) {
                if (navigatorPG && navigatorPG.notification) {
                    navigatorPG.notification.beep(times);
                } else {
                    require(["scripts/require_jquery"], function ($) {
						$.support.cors = true;
						//TODO meter esto en una función
						$.ajax({
							url: "http://127.0.0.1:4444/dummy?action=ping&callback=?",
							dataType: 'json',
							success: function () {
								beepAnode(times);
							},
							timeout: 3000, //3 second timeout, 
							error: function () {
							}
						});
					});
                }
            } else {
                require(["scripts/require_jquery"], function ($) {
					$.support.cors = true;
                    //TODO meter esto en una función
                    $.ajax({
                        url: "http://127.0.0.1:4444/dummy?action=ping&callback=?",
                        dataType: 'json',
                        success: function () {
                            beepAnode(times);
                        },
                        timeout: 3000,
                        error: function () {
                        }
                    });
                });
            }

        }
    };
});