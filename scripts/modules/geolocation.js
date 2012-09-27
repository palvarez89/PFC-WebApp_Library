/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */
/*global alert: false, define: false, navigatorPG: false, require: false */
define(function () {
	"use strict";
    var geoloc;

    return {
        getCurrentPosition: function (callback, errorCallback) {
            var ph = false;

            //Comprobación de que phonegap existe y esta operativo  (ph = true)
            document.addEventListener('deviceready', function () {
                ph = true;
            });
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (pos) {
                    geoloc = pos;
                    if (typeof callback === 'function') {
						callback(geoloc);
					}
                }, function () {
                    if (typeof errorCallback === 'function') {
						errorCallback("No permision of navigator");
					}
                });
            } else {
                if (ph === true) {
                    if (navigatorPG && navigatorPG.geolocation) {
                        navigatorPG.geolocation.getCurrentPosition(function (pos) {
                            geoloc = pos;
                            if (typeof callback === 'function') {
								callback(geoloc);
							}
                        }, function () {
							if (typeof errorCallback === 'function') {
								errorCallback("No permision of navigator");
							}
                        });
                    } else {
                        if (typeof errorCallback === 'function') {
							errorCallback("Without access to the geolocation");
						}
                    }
                } else {
                    errorCallback("Without access to the geolocation");
                }
            }

        }
    };
});