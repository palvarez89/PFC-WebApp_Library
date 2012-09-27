/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */
/*global alert: false, define: false, navigatorPG: false, require: false */
define(function () {
	"use strict";
    function toType(obj) {
        return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
    }

	function comprobarAnode(funcion, tiempo) {
		require(["scripts/require_jquery"], function ($) {
			$.support.cors = true;
			$.ajax({
				url: "http://127.0.0.1:4444/dummy?action=ping&callback=?",
				dataType: 'json',
				success: function () {
					funcion(tiempo);
				},
				timeout: 3000
			});
		});
	}


    var acumulador;

    function vibrateAnode(tiempo) {
		require(["scripts/require_jquery"], function ($) {
			$.support.cors = true;
			if (toType(tiempo) === "array") {
				$.ajax({
					url: "http://127.0.0.1:4444/dummy?action=vibrate&pattern=" + tiempo + "&callback=?",
					//url: "http://127.0.0.1:4444/vibracion", 
					dataType: 'json',
					timeout: 3000, //3 second timeout, 
					error: function () {
					}
				});
			} else {
				$.ajax({
					url: "http://127.0.0.1:4444/dummy?action=vibrate&time=" + tiempo + "&callback=?",
					//url: "http://127.0.0.1:4444/vibracion", 
					dataType: 'json',
					timeout: 3000, //3 second timeout, 
					error: function () {
					}
				});
			}
		});
    }

    return {
        vibrate: function (tiempo) {
            var i, ph = false;
            // Comprobación de que phonegap existe y esta operativo  (ph = true)
            document.addEventListener('deviceready', function () {
                ph = true;
            });

            if (navigator && navigator.vibrate) {
                navigator.vibrate(tiempo);
            } else {
                if (ph === true) {
                    if (navigatorPG && navigatorPG.notification) {
                        if (toType(tiempo) === "array") {
                            // La variable de entrada es un array
                            acumulador = 0;
                            for (i = 0; i < tiempo.length; i = i + 1) {
                                if (i % 2 === 0) {
                                    setTimeout('navigatorPG.notification.vibrate(' + tiempo[i] + ')', acumulador);
                                    acumulador = acumulador + tiempo[i];
                                } else {
                                    acumulador = acumulador + tiempo[i];
                                }
                            }
                        } else if (toType(tiempo) === "number") {
                            // La variable de entrada es un numero
                            navigatorPG.notification.vibrate(tiempo);
                        }
                    } else {
						comprobarAnode(vibrateAnode, tiempo);
                    }
                } else {
                    comprobarAnode(vibrateAnode, tiempo);
                }
            }
        }
    };
});