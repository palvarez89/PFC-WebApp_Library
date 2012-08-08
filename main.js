
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



// ------------------



/* 
var toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
}



var doit = function(time){
	navigator.notification.vibrate(time);
	// alert(time);

}


var vibrar = function(tiempo){
	// navigator.notification.vibrate(30);
	var acumulador=0;
	if(toType(tiempo) === "array"){ 
		// alert("array");
	
		for (i=0;i<tiempo.length;i++){ 
			// alert(tiempo[i]);
			if (i % 2 == 0){
				// alert("vibrar: "+tiempo[i]+" empezando en: "+acumulador);
				// setTimeout('function() {alert("en fun: "+'+tiempo[i]+'); doit(tiempo[i]);}',	acumulador);
				setTimeout('doit('+tiempo[i]+')',	acumulador);
				acumulador = acumulador + tiempo[i];
			
			}
			else{
				 acumulador = acumulador + tiempo[i];
			
			}
		} 
		
		// alert("wait");
	
	}
	else if(toType(tiempo) === "number") {
	
		// alert("number");
		navigator.notification.vibrate(tiempo);
	
	}
	

}



var get_contacts = function() {
	vibrar([1000,1001,1002,1003,1004]);
	

	
	

}
 */
