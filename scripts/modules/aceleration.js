/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */
/*global alert: false, define: false, navigatorPG: false, require: false */
define(function () {
	"use strict";
	var iniciated, Acelerometer;

    function EventTarget() {
        this.TheListeners = {};
    }

    EventTarget.prototype = {

        constructor: EventTarget,

        addEventListener: function (type, listener) {
            if (typeof this.TheListeners[type] === "undefined") {
                this.TheListeners[type] = [];
            }

            this.TheListeners[type].push(listener);
        },

        fire: function (event) {
            if (typeof event === "string") {
                event = {
                    type: event
                };
            }
            if (!event.target) {
                event.target = this;
            }

            if (!event.type) { //falsy
                throw new Error("Event object missing 'type' property.");
            }

            if (this.TheListeners[event.type] instanceof Array) {
                var i, len, listeners = this.TheListeners[event.type];
                for (i = 0, len = listeners.length; i < len; i = i + 1) {
                    listeners[i].call(this, event);
                }
            }
        },

        removeEventListener: function (type, listener) {
            var i, len, listeners;
            if (this.TheListeners[type] instanceof Array) {
                listeners = this.TheListeners[type];
                for (i = 0, len = listeners.length; i < len; i = i + 1) {
                    if (listeners[i] === listener) {
                        listeners.splice(i, 1);
                        break;
                    }
                }
            }
        }
    };

	Acelerometer = new EventTarget();

    function fireAcelerometer(acel) {
        Acelerometer.fire({
            type: "devicemotion",
			accelerationIncludingGravity: {
				x: acel.x,
				y: acel.y,
				z: acel.z
			}
        });
    }

    function motionEvent(event) {
        fireAcelerometer({
            x: event.accelerationIncludingGravity.x,
            y: event.accelerationIncludingGravity.y,
            z: event.accelerationIncludingGravity.z
        });
    }

    function accelerometerAnode() {
		require(["scripts/require_jquery"], function ($) {
			$.support.cors = true;
			$.ajax({
				url: "http://127.0.0.1:4444/dummy?action=acceleration&callback=?",
				dataType: 'json',
				timeout: 10000,
				success: function (data) {
					var obj = $.parseJSON(data);
					fireAcelerometer(obj);
					setTimeout(accelerometerAnode, 100);
				},
				error: function () {
				}
			});
		});
    }

	function comprobarAnode(funcion, errorCallback) {
		require(["scripts/require_jquery"], function ($) {
			//TODO meter esto en una función
			$.support.cors = true;
			$.ajax({
				url: "http://127.0.0.1:4444/dummy?action=ping&callback=?",
				dataType: 'json',
				success: function () {
					funcion();
				},
				timeout: 3000, //3 second timeout, 
				error: function () {
					if (typeof errorCallback === 'function') {
						errorCallback("Without access to the accelerometer");
					}
				}
			});
		});
	}

    iniciated  = false;
    return {
        getAcel: function (callback, errorCallback) {

            if (!iniciated) {
                var options, accelerationWatch, ph = false;
                // Comprobación de que phonegap existe y esta operativo  (ph = true)
                document.addEventListener('deviceready', function () {
                    ph = true;
                });

                if (window.DeviceMotionEvent) {
				// if(false) {
                    window.addEventListener('devicemotion', motionEvent, false);
					if (typeof callback === 'function') {
						callback(Acelerometer);
					}
                } else {
                    if (ph === true) {
					// if(false) {
                        if (navigatorPG && navigatorPG.accelerometer) {
                            options = {};
                            options.frequency = 100;
                            accelerationWatch = navigatorPG.accelerometer.watchAcceleration(
								fireAcelerometer,
								null,
								options
							);
                            if (typeof callback === 'function') {
								callback(Acelerometer);
							}
                        } else {
                            comprobarAnode(accelerometerAnode, errorCallback);
							if (typeof callback === 'function') {
								callback(Acelerometer);
							}
                        }
                    } else {
						comprobarAnode(accelerometerAnode, errorCallback);
						if (typeof callback === 'function') {
							callback(Acelerometer);
						}
                    }
                }
                iniciated = true;
            } else {
                if (typeof callback === 'function') {
					callback(Acelerometer);
				}
            }
        }
    };
});