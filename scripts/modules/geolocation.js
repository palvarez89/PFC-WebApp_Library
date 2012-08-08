define (function()
	{
	
	var geoloc;

		return {
			getCurrentPosition: function(callback) {
				var ph=false;
				
				//Comprobación de que phonegap existe y esta operativo  (ph = true)
				document.addEventListener('deviceready',  function(){ph=true});
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function(pos){
																geoloc = pos;
																typeof callback === 'function' && callback(geoloc);
															}, function(){
																alert("Without permission");
															});
				}
				else {
					if (ph === true) {
						if (navigatorPG && navigatorPG.geolocation) {
							navigatorPG.geolocation.getCurrentPosition(function(pos){
																		geoloc = pos;
																		typeof callback === 'function' && callback(geoloc);
																	}, function(){
																		alert("Without permission");
																	});
						}
						else{
							alert('Reconoce Phonegap pero no permite acceso');
						}
					}
					else
						alert('Error: No se ha obtenido acceso');
				}	
				
			}
		};
	}
);

 /* 
 var geoloc;

var succesfull = function(position){
    geoloc = {    longitude: position.coords.longitude,
                  latitude: position.coords.latitude
             };
};



var getLocation2 = function(callback){
    navigator.geolocation.getCurrentPosition(function(pos){
        succesfull(pos);
        typeof callback === 'function' && callback(geoloc);
    }, function(){
        alert("fail");
    });
};

var getLocation = function() {
	getLocation2(function(pos){
		alert(pos.longitude, pos.latitude);
	});
};
  */
