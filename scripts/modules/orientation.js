define (function()
	{
	
	var orient;
		return {
			getCurrentOrientation: function(callback) {
				var ph=false;
				
				//Comprobación de que phonegap existe y esta operativo  (ph = true)
				document.addEventListener('deviceready',  function(){ph=true});
				if (navigator.compas && navigator.compass.getCurrentOrientation) {
					alert("Reconocido por W3C");
					navigator.compass.getCurrentOrientation(function(or){
																orient = or;
																typeof callback === 'function' && callback(orient);
															}, function(){
																alert("Without permission");
															});
				}
				else {
					if (ph === true) {
						if (navigatorPG && navigatorPG.compass && navigatorPG.compass.getCurrentHeading) {
						alert("Reconocido por PHG");
							navigatorPG.compass.getCurrentHeading(function(or){
																		orient = or;
																		typeof callback === 'function' && callback(orient);
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