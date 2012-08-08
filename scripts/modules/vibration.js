define(function()
	{
		
		var toType = function(obj) {
		  return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
		};
		
		var acumulador;
  
		return {
			vibrate: function(tiempo){
				var ph=false;
				// Comprobación de que phonegap existe y esta operativo  (ph = true)
				document.addEventListener('deviceready',  function(){ph=true});
				
				if (navigator && navigator.vibrate){
					navigator.vibrate(tiempo);
					alert('Soportado por w3c');
				}
				else{
					if(ph===true){
						if (navigatorPG && navigatorPG.notification){
							if(toType(tiempo) === "array"){ 
								// La variable de entrada es un array
								acumulador = 0;
								for (i=0;i<tiempo.length;i++){
									if (i % 2 == 0){
										setTimeout('navigatorPG.notification.vibrate('+tiempo[i]+')',	acumulador);
										acumulador = acumulador + tiempo[i];
									}
									else{
										 acumulador = acumulador + tiempo[i];
									}
								} 
							}
							else if(toType(tiempo) === "number") {
								// La variable de entrada es un numero
								navigator.notification.vibrate(tiempo);
							}
							// alert('Soportado por phonegap');
						}
						else{
							alert('Reconoce Phonegap pero no perite acceso');
						}
					}
					else{
						alert('Error: No se ha obtenido acceso');
					}
				} 
			}
		};   
	}
);
  