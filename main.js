
function roundNumber(num) {
    var dec = 3;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
};

function handleAcelerometer(accel){
	 
	document.getElementById('x').innerHTML = roundNumber(accel.x);
    document.getElementById('y').innerHTML = roundNumber(accel.y);
    document.getElementById('z').innerHTML = roundNumber(accel.z);
}; 


var acel = false;

var toggleAccel = function() {

	require(["scripts/libreria.js"], function(Libreria) {
		var Acelerometer = Libreria.getAcelerometer();
		if(acel===false){
			Acelerometer.addEventListener("devicemotion", handleAcelerometer);
			acel = true;
		}
		else{
			Acelerometer.removeEventListener("devicemotion", handleAcelerometer);
			acel = false;
			handleAcelerometer({
				x : "",
				y : "",
				z : ""
			});
		}

	});
};

var vibrate = function(tiempo) {
	require(["scripts/libreria.js"], function(Libreria) {
			Libreria.vibrate(tiempo);
	});
};

var beep = function(veces) {
	require(["scripts/libreria.js"], function(Libreria) {
			Libreria.beep(veces);
	});
};

var notificate = function(title,text) {
	require(["scripts/libreria.js"], function(Libreria) {
			Libreria.notificate(title,text);
	});
};


var geoloc;

var getLocation = function() {
	require(["scripts/libreria.js"], function(Libreria) {
	
			var completado = function(position){
				alert(position.coords.longitude+" "+ position.coords.latitude);
			};
			Libreria.geolocation.getCurrentPosition(completado);
	});
};



var orient;

function onError() {
    alert('onError!');
};

var  toggleCompass = function() {
	require(["scripts/libreria.js"], function(Libreria) {
				var  mostrarCompass= function(compass){
					alert("cabeza: "+compass.magneticHeading);
				};
			Libreria.compass.getCurrentOrientation(mostrarCompass);
	});
};



function captureImage() {
  
	require(["scripts/libreria.js"], function(Libreria) {
		function captureSuccess(mediaFiles) {
			var i, len;
			for (i = 0, len = mediaFiles.length; i < len; i += 1) {
				uploadFile(mediaFiles[i]);
			}       
		}

		// Called if something bad happens.
		// 
		function captureError(error) {
			alert( 'Error obteniendo la imagen');
		}
		function uploadFile(mediaFile) {
				var path = mediaFile.fullPath,
				name = mediaFile.name;

				alert('path '+path);
				alert('nombre '+name);
		}
		
		
		Libreria.device.capture.captureImage(captureSuccess, captureError, {limit: 1});
	});
};

function get_contacts() {
	require(["scripts/libreria.js"], function(Libreria) {
		Libreria.contacts(function (obj){
								var ultimo = obj.contacts.length;
								alert("numero de contactos: " +ultimo);
								
								alert("Nombre ultimo: "+obj.contacts[ultimo-1].name.givenName);
								alert("Numero ultimo: "+obj.contacts[ultimo-1].phoneNumbers[0]);
						});
		
		
	});


}
	