/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */
/*global alert: false, define: false, navigatorPG: false, require: false */
define(function () {
	"use strict";
    var orient;
    return {
        getCurrentOrientation: function (callback) {
            var ph = false;

            //Comprobación de que phonegap existe y esta operativo  (ph = true)
            document.addEventListener('deviceready', function () {
                ph = true;
            });
            if (navigator.compas && navigator.compass.getCurrentOrientation) {
                alert("Reconocido por W3C");
                navigator.compass.getCurrentOrientation(function (or) {
                    orient = or;
                    if (typeof callback === 'function') {
						callback(orient);
					}
                }, function () {
                    alert("Without permission");
                });
            } else {
                if (ph === true) {
                    if (navigatorPG && navigatorPG.compass && navigatorPG.compass.getCurrentHeading) {
                        alert("Reconocido por PHG");
                        navigatorPG.compass.getCurrentHeading(function (or) {
                            orient = or;
                            if (typeof callback === 'function') {
								callback(orient);
							}
                        }, function () {
                            alert("Without permission");
                        });
                    } else {
                        alert('Reconoce Phonegap pero no permite acceso');
                    }
                } else {
					alert('Error: No se ha obtenido acceso');
				}
            }

        }
    };
});