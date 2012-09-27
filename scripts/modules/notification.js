/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */
/*global alert: false, define: false, navigatorPG: false, require: false, webkitNotifications: false, Notification: false */
define(function () {
	"use strict";
    function notificateW3C(title, text) {
        if (Notification.permissionLevel() === "granted") {
            var notif = new Notification(title, {
                body: text,
                iconUrl: "http://www.art-and-home.net/catalog/LET-W.jpg"
            });
            notif.show();
        } else if (Notification.permissionLevel() === "default") {
            Notification.requestPermission(function () {
                notificateW3C(title, text);
            });
        }

    }

    function notificateWebkit(title, text) {
        if (!webkitNotifications.checkPermission()) {
            var notif = webkitNotifications.createNotification("http://www.art-and-home.net/catalog/LET-W.jpg", title, text);
            notif.show();
        } else {
            webkitNotifications.requestPermission(function () {
                notificateWebkit(title, text);
            });
        }
    }

    function notificateAnode(title, text) {
		require(["scripts/require_jquery"], function ($) {
			$.support.cors = true;
			$.ajax({
				url: "http://127.0.0.1:4444/dummy?action=notificate&title=" + title + "&text=" + text + "&ticker=" + title + ": " + text + "&callback=?",
				//url: "http://127.0.0.1:4444/vibracion", 
				dataType: 'json',
				timeout: 3000, //3 second timeout, 
				error: function () {
				}
			});
		});
    }

    return {
        notificate: function (title, text) {
            var ph = false;
            // Comprobación de que phonegap existe y esta operativo  (ph = true)
            document.addEventListener('deviceready', function () {
                ph = true;
            });

            if (window && window.webkitNotifications) {
                notificateWebkit(title, text);
            } else if (window.Notification) {
                notificateW3C(title, text);
            } else if (ph === true) {
                if (navigatorPG && navigatorPG.notification) {
                    navigatorPG.notification.alert(text, null, title);
                } else {
					require(["scripts/require_jquery"], function ($) {
						$.support.cors = true;
						//TODO meter esto en una función
						$.ajax({
							url: "http://127.0.0.1:4444/dummy?action=ping&callback=?",
							dataType: 'json',
							success: function () {
								notificateAnode(title, text);
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
                            notificateAnode(title, text);
                        },
                        timeout: 3000, //3 second timeout, 
                        error: function () {
                        }
                    });
                });
            }

        }
    };
});