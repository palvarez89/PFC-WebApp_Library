define(function()
{
  
	
	function EventTarget(){
		this._listeners = {};
	}

	EventTarget.prototype = {

		constructor: EventTarget,

		addEventListener: function(type, listener){
			if (typeof this._listeners[type] == "undefined"){
				this._listeners[type] = [];
			}

			this._listeners[type].push(listener);
		},

		fire: function(event){
			if (typeof event == "string"){
				event = { type: event };
			}
			if (!event.target){
				event.target = this;
			}

			if (!event.type){  //falsy
				throw new Error("Event object missing 'type' property.");
			}

			if (this._listeners[event.type] instanceof Array){
				var listeners = this._listeners[event.type];
				for (var i=0, len=listeners.length; i < len; i++){
					listeners[i].call(this, event);
				}
			}
		},

		removeEventListener: function(type, listener){
			if (this._listeners[type] instanceof Array){
				var listeners = this._listeners[type];
				for (var i=0, len=listeners.length; i < len; i++){
					if (listeners[i] === listener){
						listeners.splice(i, 1);
						break;
					}
				}
			}
		}
	};
	
	var Acelerometer = new EventTarget();
	
	var fireAcelerometer = function(acel){
		Acelerometer.fire({ 	type: "devicemotion",
								x: acel.x,
								y: acel.y,
								z: acel.z}); 
	};
	
	var motionEvent = function(event){
		fireAcelerometer({	x: event.accelerationIncludingGravity.x,
							y: event.accelerationIncludingGravity.y,
							z: event.accelerationIncludingGravity.z});
	};
	

	var iniciated = false;
		return {
			getAcel: function(){	
				
				if(!iniciated){
					var ph=false;
					// Comprobación de que phonegap existe y esta operativo  (ph = true)
					document.addEventListener('deviceready',  function(){ph=true});

					if (window.DeviceMotionEvent){
						window.addEventListener('devicemotion', motionEvent,false);
						// alert('Soportado por w3c');
					}
					else{
						if(ph===true){
							if (navigatorPG && navigatorPG.accelerometer){
								var options = {};
								options.frequency = 100;
								var accelerationWatch = navigatorPG.accelerometer.watchAcceleration(
										fireAcelerometer, function(ex) {
											alert("accel fail (" + ex.name + ": " + ex.message + ")");
										}, options);
								alert('Soportado por phonegap ');
							}
							else{
								alert('Reconoce Phonegap pero no perite acceso');
							}
						}
						else{
							alert('Error: No se ha obtenido acceso');
						}
					}
					iniciated = true;
				}
				return Acelerometer;
			} 
		};   
}
);