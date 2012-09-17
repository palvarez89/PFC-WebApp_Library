/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */
/*global alert: false, define: false, navigatorPG: false, require: false */
require(["scripts/libreria.js"], function (Libreria) {
	Libreria.askPermission("SMS");
	Libreria.askPermission("CAMERA");
	Libreria.askPermission("CONTACTS");
});

function quitarPermisos () {
	require(["scripts/libreria.js"], function (Libreria) {
		Libreria.resetPermission("SMS");
		Libreria.resetPermission("CAMERA");
		Libreria.resetPermission("CONTACTS");
	});
}
function roundNumber(num) {
	var dec, result;
    dec = 3;
    result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

function handleAcelerometer(accel) {

    document.getElementById('x').innerHTML = roundNumber(accel.accelerationIncludingGravity.x);
    document.getElementById('y').innerHTML = roundNumber(accel.accelerationIncludingGravity.y);
    document.getElementById('z').innerHTML = roundNumber(accel.accelerationIncludingGravity.z);
}


var acel = false;

var toggleAccel = function () {

    require(["scripts/libreria.js"], function (Libreria) {
        //var Acelerometer = Libreria.getAcelerometer();
        Libreria.getAcelerometer(function (objAcel) {
            if (acel === false) {
                objAcel.addEventListener("devicemotion", handleAcelerometer);
                acel = true;
            } else {
                objAcel.removeEventListener("devicemotion", handleAcelerometer);
                acel = false;
                handleAcelerometer({
					accelerationIncludingGravity: {
						x: "",
						y: "",
						z: ""
					}
                });
            }

        });
    });
};

var vibrate = function (tiempo) {
    require(["scripts/libreria.js"], function (Libreria) {
        Libreria.vibrate(tiempo);
    });
};

var beep = function (veces) {
    require(["scripts/libreria.js"], function (Libreria) {
        Libreria.beep(veces);
    });
};

var notificate = function (title, text) {
    require(["scripts/libreria.js"], function (Libreria) {
        Libreria.notificate(title, text);
    });
};


var geoloc;

var getLocation = function () {
    require(["scripts/libreria.js"], function (Libreria) {
        var completado = function (position) {
            alert(position.coords.latitude + " " + position.coords.longitude);
        };
        Libreria.geolocation.getCurrentPosition(completado);
    });
};



var orient;

function onError() {
    alert('onError!');
}

var toggleCompass = function () {
    require(["scripts/libreria.js"], function (Libreria) {
        var mostrarCompass = function (compass) {
            alert("cabeza: " + compass.magneticHeading);
        };
        Libreria.compass.getCurrentOrientation(mostrarCompass);
    });
};



function captureImage() {

    require(["scripts/libreria.js"], function (Libreria) {
		function captureError() {
            alert('Error obteniendo la imagen');
        }

        function uploadFile(mediaFile) {
            var path = mediaFile.fullPath,
                name = mediaFile.name;

            alert('path ' + path);
            alert('nombre ' + name);
        }
        function captureSuccess(mediaFiles) {
            var i, len;
            for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                uploadFile(mediaFiles[i]);
            }
        }

        // Called if something bad happens.
        //


        Libreria.device.capture.captureImage(captureSuccess, captureError, {
            limit: 1
        });
    });
}

function get_contacts() {

    require(["scripts/libreria.js"], function (Libreria) {
	
		function errorContact() {
            alert('Error obteniendo contactos');
        }

        Libreria.contacts(function (obj) {
            var ultimo = obj.contacts.length;
            alert("numero de contactos: " + ultimo);

            alert("Nombre ultimo: " + obj.contacts[ultimo - 1].name.givenName);
            alert("Numero ultimo: " + obj.contacts[ultimo - 1].phoneNumbers[0]);
        },errorContact);


    });
}


function sendSMS() {

    require(["scripts/libreria.js"], function (Libreria) {
		function errorSMS() {
            alert('Error permisos sms');
        }
        function sendSucess() {
            alert("Envio success");
        }

        // Called if something bad happens.
        // 

        Libreria.device.sendMessage("222", "CLAVE 123456", sendSucess, errorSMS);
    });
}