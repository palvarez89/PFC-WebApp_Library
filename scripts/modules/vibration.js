define(["scripts/require_jquery"],function($)
	{
		var toType = function(obj) {
		  return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
		};
		
		var acumulador;
		
		function vibrateAnode(tiempo){	
			if(toType(tiempo) === "array"){ 
				$.ajax({ 
					url: "http://127.0.0.1:4444/dummy?action=vibrate&pattern="+tiempo+"&callback=?", 
					//url: "http://127.0.0.1:4444/vibracion", 
					dataType: 'json', 
					timeout: 3000, //3 second timeout, 
					error: function(jqXHR, status, errorThrown){
						// alert('Error: No se ha obtenido acceso');
						alert('error en 2 ' + status + " " + errorThrown);
						//alert('error ' + status + " " + errorThrown);  //the status returned will be "timeout" 
					 //do something 
					} 
				});
			}
			else{
				$.ajax({ 
					url: "http://127.0.0.1:4444/dummy?action=vibrate&time="+tiempo+"&callback=?", 
					//url: "http://127.0.0.1:4444/vibracion", 
					dataType: 'json', 
					timeout: 3000, //3 second timeout, 
					error: function(jqXHR, status, errorThrown){
						// alert('Error: No se ha obtenido acceso');
						alert('error en 3 ' + status + " " + errorThrown);
						//alert('error ' + status + " " + errorThrown);  //the status returned will be "timeout" 
					 //do something 
					} 
				});
			}
		}
  
		return {
			vibrate: function(tiempo){
				var ph=false;
				// Comprobaci�n de que phonegap existe y esta operativo  (ph = true)
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
						//TODO meter esto en una funci�n
						$.ajax({ 
							url: "http://127.0.0.1:4444/dummy?action=ping&callback=?", 
							//url: "http://127.0.0.1:4444/vibracion", 
							dataType: 'json', 
							success: function(data){
								vibrateAnode(tiempo);
							}, 
							timeout: 3000, //3 second timeout, 
							error: function(jqXHR, status, errorThrown){
								// alert('Error: No se ha obtenido acceso');
								alert('error en 1 ' + status + " " + errorThrown);
								//alert('error ' + status + " " + errorThrown);  //the status returned will be "timeout" 
							 //do something 
							} 
						}); 
						
						// alert('Error: No se ha obtenido acceso');
					}
				} 
			}
		};   
	}
);
  