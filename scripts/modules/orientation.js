/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */
/*global alert: false, define: false, navigatorPG: false, require: false */
define(function () {
	"use strict";
    var orient;
    return {
        getCurrentOrientation: function (callback, errorCallback) {
            var ph = false;

            //Comprobación de que phonegap existe y esta operativo  (ph = true)
            document.addEventListener('deviceready', function () {
                ph = true;
            });
			if (ph === true) {
				if (navigatorPG && navigatorPG.compass && navigatorPG.compass.getCurrentHeading) {
					navigatorPG.compass.getCurrentHeading(function (or) {
						orient = or;
						if (typeof callback === 'function') {
							callback(orient);
						}
					}, function () {
						if (typeof errorCallback === 'function') {
							errorCallback("No permision of navigator");
						}
					});
				} else {
					if (typeof errorCallback === 'function') {
						errorCallback("Without access to the orientation");
					}
				}
			} else {
				if (typeof errorCallback === 'function') {
					errorCallback("Without access to the orientation");
				}
			}
        }
    };
});