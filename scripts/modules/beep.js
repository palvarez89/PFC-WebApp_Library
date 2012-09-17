/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */
/*global alert: false, define: false, navigatorPG: false, require: false, webkitNotifications: false, Notification: false */
define(function () {
	"use strict";
    function beepAnode(times) {
		require(["scripts/require_jquery"], function ($) {
			$.support.cors = true;
			$.ajax({
				url: "http://127.0.0.1:4444/dummy?action=beep&times=" + times + "&callback=?",
				//url: "http://127.0.0.1:4444/vibracion", 
				dataType: 'json',
				timeout: 3000, //3 second timeout, 
				error: function (jqXHR, status, errorThrown) {
					// alert('Error: No se ha obtenido acceso');
					alert('error en 2 ' + status + " " + errorThrown);
					//alert('error ' + status + " " + errorThrown);  //the status returned will be "timeout" 
					//do something 
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
                    alert('Reconoce Phonegap pero no permite acceso');
                }
            } else {
                require(["scripts/require_jquery"], function ($) {
					$.support.cors = true;
                    //TODO meter esto en una función
                    $.ajax({
                        url: "http://127.0.0.1:4444/dummy?action=ping&callback=?",
                        dataType: 'json',
                        success: function (data) {
                            beepAnode(times);
                        },
                        timeout: 3000, //3 second timeout, 
                        error: function (jqXHR, status, errorThrown) {
                            // alert('Error: No se ha obtenido acceso');
                            alert('error en 1 ' + status + " " + errorThrown);
                            //alert('error ' + status + " " + errorThrown);  //the status returned will be "timeout" 
                            //do something 
                        }
                    });
                });
                // alert('Error: No se ha obtenido acceso');
            }

        }
    };
});