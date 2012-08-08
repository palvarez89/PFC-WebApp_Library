
define(['scripts/modules/vibration',
		'scripts/modules/aceleration',
		'scripts/modules/geolocation',
		'scripts/modules/orientation' ],

function (Vibration, Aceleration, Geolocation, Orientation)
	{

	var geolocalizer;
	var compass;
		return {
			getAcelerometer: function(){
					var Acelerometer = Aceleration.getAcel();
					return Acelerometer;	
			},
			
			vibrate: function(tiempo){
				Vibration.vibrate(tiempo);
			},
			
			geolocation: {
				getCurrentPosition: function(callback){
	
					Geolocation.getCurrentPosition(function(pos){
														geolocalizer = pos;
														typeof callback === 'function' && callback(geolocalizer);
													});
				}
			},
			compass: {
				getCurrentOrientation: function(callback){
	
					Orientation.getCurrentOrientation(function(comp){
														compass = comp;
														typeof callback === 'function' && callback(compass);
													});
				}
			}
		};   
});


