
define (function()
	{
	
	var imag;

		return {
			captureImage: function(callback) {
				var ph=false;
				
				//Comprobación de que phonegap existe y esta operativo  (ph = true)
				document.addEventListener('deviceready',  function(){ph=true});
				
				if (navigator && navigator.device) {
					alert('Soportado por w3c');
					navigator.device.captureImage(function(dat){
																imag = dat;
																typeof callback === 'function' && callback(imag);
															}, function(){
																alert("Without permission");
															});
					
				}
				else {
					if (ph === true) {
						if (navigatorPG && navigatorPG.device && navigatorPG.device.capture) {
							alert('Soportado por phonegap');
							navigatorPG.device.capture.captureImage(function(dat){
																		var path = dat[0].fullPath;

																		alert('path '+path);
																		imag = dat;
																		typeof callback === 'function' && callback(imag);
																	}, function(){
																		alert("Without permission");
																	},
																	{limit:1});
						}
						else{
							alert('Reconoce Phonegap pero no permite acceso');
						}
					}
					else
						//MAS FALLBACKS
						alert('Error: No se ha obtenido acceso');
				}	
				
			}
		};
	}
);


