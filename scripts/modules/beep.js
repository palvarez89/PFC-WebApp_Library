define(["scripts/require_jquery"],function($)
	{
		var toType = function(obj) {
		  return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
		};
		
		var acumulador;
		
		function beepAnode(times){	
			$.ajax({ 
				url: "http://127.0.0.1:4444/dummy?action=beep&times="+times+"&callback=?", 
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
  
		return {
			beep: function(times){
				var ph=false;
				// Comprobación de que phonegap existe y esta operativo  (ph = true)
				document.addEventListener('deviceready',  function(){ph=true});
				
				if(ph===true){
					if (navigatorPG && navigatorPG.notification){
						navigator.notification.beep(times);
					}
					else{
						alert('Reconoce Phonegap pero no perite acceso');
					}
				}
				else{
					//TODO meter esto en una función
					$.ajax({ 
						url: "http://127.0.0.1:4444/dummy?action=ping&callback=?", 
						dataType: 'json', 
						success: function(data){
							beepAnode(times);
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
		};   
	}
);
  