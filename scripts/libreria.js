/*global alert: false, define: false, navigatorPG: false, require: false, document: false, unescape: false, setCookie: false, confirm: false, escape: false*/
define(function () {
    "use strict";
    var geolocalizer, compass, image, permissions;
	permissions = [];
    function getCookie(c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i = i + 1) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x === c_name) {
                return unescape(y);
            }
        }
        return null;
    }

    function checkPermission(type) {
        var ret, value;
		if (permissions[type] === true) {
			ret = true;
		} else {
			value = getCookie(type);
			if (value !== null && value !== "" && value === "granted") {
				ret = true;
			} else {
				ret = false;
			}
		}
        return ret;
    }

    function setCookie(c_name, value, exdays) {
        var c_value, exdate;
		exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        c_value = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    }

    function askPermission(type) {
		var typeFix = type.toUpperCase();
        if (checkPermission(typeFix)) {
            permissions[typeFix] = true;
        } else {
            if (confirm('grant permission to access "' + typeFix + '"?')) {
                permissions[typeFix] = true;
                if (confirm('grant permission always? ("' + typeFix + '")')) {
                    setCookie(typeFix, "granted", 365);
                }
            } else {
                permissions[typeFix] = false;

            }
        }
    }

	function resetPermission(type) {
		var typeFix = type.toUpperCase();
		setCookie(typeFix, "", -1);
		permissions[typeFix] = false;
	}

    return {
		resetPermission: resetPermission,

		askPermission: askPermission,

        getAcelerometer: function (callback) {
            require(["scripts/modules/aceleration"], function (Aceleration) {
                Aceleration.getAcel(function (acel) {
                    if (typeof callback === 'function') {
                        callback(acel);
                    }
                });
            });
        },

        vibrate: function (tiempo) {
            require(["scripts/modules/vibration"], function (Vibration) {
                Vibration.vibrate(tiempo);
            });
        },
        notificate: function (title, text) {
            require(["scripts/modules/notification"], function (Notification) {
                Notification.notificate(title, text);
            });
        },

        beep: function (veces) {
            require(["scripts/modules/beep"], function (Beep) {
                Beep.beep(veces);
            });
        },

        geolocation: {
            getCurrentPosition: function (callback) {
                require(["scripts/modules/geolocation"], function (Geolocation) {
                    Geolocation.getCurrentPosition(function (pos) {
                        geolocalizer = pos;
                        if (typeof callback === 'function') {
                            callback(geolocalizer);
                        }
                    });
                });
            }

        },
        compass: {
            getCurrentOrientation: function (callback) {
                require(["scripts/modules/orientation"], function (Orientation) {
                    Orientation.getCurrentOrientation(function (comp) {
                        compass = comp;
                        if (typeof callback === 'function') {
                            callback(compass);
                        }
                    });
                });
            }
        },
        device: {
            capture: {
                captureImage: function (callback, errorCallback) {
					if (checkPermission("CAMERA")) {
						require(["scripts/modules/camera"], function (Camera) {
							Camera.captureImage(function (dat) {
								image = dat;
								if (typeof callback === 'function') {
									callback(image);
								}
							});
						});
					} else {
						if (typeof errorCallback === 'function') {
							errorCallback("Without permission to access 'camera'");
						}
					}
                }
            },
            sendMessage: function (number, body, callback, errorCallback) {
				if (checkPermission("SMS")) {
					require(["scripts/modules/SMSsender"], function (SMSsender) {
						SMSsender.sendSMS(number, body, function () {
							if (typeof callback === 'function') {
								callback();
							}
						});
					});
				} else {
					if (typeof errorCallback === 'function') {
						errorCallback("Without permission to access 'SMS'");
					}
				}
            }
        },
        contacts: function (callback, errorCallback) {
			if (checkPermission("CONTACTS")) {
				require(["scripts/modules/contacts"], function (Contacts) {
					Contacts.contacts(function (dat) {
						if (typeof callback === 'function') {
							callback(dat);
						}
					});
				});
			} else {
				if (typeof errorCallback === 'function') {
					errorCallback("Without permission to access 'contacts'");
				}
			}
        }

    };
});