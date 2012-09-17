/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */
/*global alert: false, define: false, navigatorPG: false, require: false, webkitNotifications: false, Notification: false */
define(function () {
	"use strict";
    function contactsAnode(callback) {
		require(["scripts/require_jquery"], function ($) {
			$.support.cors = true;
			$.ajax({
				url: "http://127.0.0.1:4444/dummy?action=contacts&callback=?",
				dataType: 'json',
				timeout: 10000, //3 second timeout,
				success: function (data) {
					var obj = $.parseJSON(data);
					if (typeof callback === 'function') {
						callback(obj);
					}
				},
				error: function (jqXHR, status, errorThrown) {
					// alert('Error: No se ha obtenido acceso');
					alert('error en 2 ' + status + " " + errorThrown);
					//alert('error ' + status + " " + errorThrown);  //the status returned will be "timeout" 
					//do something 
				}
			});
		});
    }

	function comprobarAnode(funcion, callback) {
		require(["scripts/require_jquery"], function ($) {
			$.support.cors = true;
			$.ajax({
				url: "http://127.0.0.1:4444/dummy?action=ping&callback=?",
				dataType: 'json',
				success: function (data) {
					funcion(callback);
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
	}

    return {
        contacts: function (callback) {
            var ph = false;
            // Comprobación de que phonegap existe y esta operativo  (ph = true)
            document.addEventListener('deviceready', function () {
                ph = true;
            });

            if (ph === true) {
                //TODO añadir opcion phonegap
                if (navigatorPG && navigatorPG.connnntactos) {
                    navigator.notification.beep();
                } else {
					comprobarAnode(contactsAnode, callback);
                }
            } else {
                comprobarAnode(contactsAnode, callback);
                // alert('Error: No se ha obtenido acceso');
            }

        }
    };
});