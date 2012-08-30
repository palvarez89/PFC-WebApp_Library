
define(['scripts/modules/vibration',
		'scripts/modules/aceleration',
		'scripts/modules/geolocation',
		'scripts/modules/orientation',
		'scripts/modules/notification',
		'scripts/modules/beep',
		'scripts/modules/camera',
		'scripts/modules/contacts'],

function (Vibration, Aceleration, Geolocation, Orientation, Notification, Beep, Camera, Contacts)
	{

	var geolocalizer;
	var compass;
	var image;
		return { 
			getAcelerometer: function(){
					var Acelerometer = Aceleration.getAcel();
					return Acelerometer;	
			},
			
			vibrate: function(tiempo){
				Vibration.vibrate(tiempo);
			},
			notificate: function(title,text){
				Notification.notificate(title,text);
			},
			
			beep: function(veces){
				Beep.beep(veces);
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
			},
			device: {
				capture: {
					captureImage: function(callback){
						Camera.captureImage(function (dat){
												image = dat;
												typeof callback === 'function' && callback(image);
											});
					
					}				
				}
			},
			contacts: function (callback) {
				Contacts.contacts(function (dat){
												typeof callback === 'function' && callback(dat);
											});
			}
		};   
});


