/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */
/*global alert: false, define: false, navigatorPG: false, require: false */
require(["scripts/libreria.js"], function (Libreria) {
	Libreria.askPermission("SMS");
	Libreria.askPermission("CAMERA");
	Libreria.askPermission("CONTACTS");
	Libreria.askPermission("ACCELEROMETER");
	Libreria.askPermission("BEEP");
	Libreria.askPermission("VIBRATION");
	Libreria.askPermission("NOTIFICATION");
	Libreria.askPermission("GPS");
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


function geolocationSuccess(pos) {
    alert('Latitude: '+ pos.coords.latitude + '\n' +
          'Longitude: '+ pos.coords.longitude + '\n' +
          'Altitude: '+ pos.coords.altitude + '\n' +
          'Accuracy: '+ pos.coords.accuracy + '\n' +
          'Altitude Accuracy: ' + pos.coords.altitudeAccuracy + '\n' +
          'Heading: '+ pos.coords.heading + '\n' +
          'Speed: '+ pos.coords.speed + '\n');
}


require(["scripts/libreria.js"], function (Libreria) {
	Libreria.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
});




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
		
        Libreria.device.capture.captureImage(captureSuccess, captureError);
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