/*
define(['scripts/modules/vibration',
		'scripts/modules/aceleration',
		'scripts/modules/geolocation',
		'scripts/modules/orientation',
		'scripts/modules/notification',
		'scripts/modules/beep',
		'scripts/modules/camera'],

function (Vibration, Aceleration, Geolocation, Orientation, Notification, Beep, Camera)
	{
*/
define(function () {

    var geolocalizer;
    var compass;
    var image;
    var Acelerometer;
    return {
        getAcelerometer: function (callback) {
            require(["scripts/modules/aceleration"], function (Aceleration) {
                Aceleration.getAcel(function (acel) {
                    typeof callback === 'function' && callback(acel);
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
                        typeof callback === 'function' && callback(geolocalizer);
                    });
                });
            }

        },
        compass: {
            getCurrentOrientation: function (callback) {
                require(["scripts/modules/orientation"], function (Orientation) {
                    Orientation.getCurrentOrientation(function (comp) {
                        compass = comp;
                        typeof callback === 'function' && callback(compass);
                    });
                });
            }
        },
        device: {
            capture: {
                captureImage: function (callback) {
                    require(["scripts/modules/camera"], function (Camera) {
                        Camera.captureImage(function (dat) {
                            image = dat;
                            typeof callback === 'function' && callback(image);
                        });
                    });

                }
            },
            sendMessage: function (number, body, callback) {
                require(["scripts/modules/SMSsender"], function (SMSsender) {
                    SMSsender.sendSMS(number, body, function () {
                        typeof callback === 'function' && callback();
                    });
                });

            }
        },
        contacts: function (callback) {
            require(["scripts/modules/contacts"], function (Contacts) {
                Contacts.contacts(function (dat) {
                    typeof callback === 'function' && callback(dat);
                });
            });
        }

    };
});