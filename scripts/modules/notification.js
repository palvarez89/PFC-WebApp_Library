define(["scripts/require_jquery"],function($)
	{
		var toType = function(obj) {
		  return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
		};
		
		
		function notificateW3C(title,text){
			if (Notification.permissionLevel() === "granted") {
			  var notif = new Notification(title,{body: text, iconUrl: "http://www.art-and-home.net/catalog/LET-W.jpg"});
			  notif.show();
			} else if (Notification.permissionLevel() === "default") {
			  Notification.requestPermission(function () {
				notificateW3C(title,text);
			  });
			}
		
		}
		
		function notificateWebkit(title,text){
			if (!webkitNotifications.checkPermission()) {
			  var notif = webkitNotifications.createNotification("http://www.art-and-home.net/catalog/LET-W.jpg", title, text);
			  notif.show();
			} else {
			  webkitNotifications.requestPermission(function () {
				notificateWebkit(title,text);
			  });
			}
		}
		var acumulador;
		
		function notificateAnode(title,text){	
			$.ajax({ 
				url: "http://127.0.0.1:4444/dummy?action=notificate&title="+title+"&text="+text+"&ticker="+title+": "+text+"&callback=?", 
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
			notificate: function(title,text){
				var ph=false;
				// Comprobación de que phonegap existe y esta operativo  (ph = true)
				document.addEventListener('deviceready',  function(){ph=true});
				
				if (window && window.webkitNotifications){
					notificateWebkit(title,text);
				}
				
				else if (window.Notification) {
					notificateW3C(title,text);
				}
				else if(ph===true){
					if (navigatorPG && navigatorPG.notification){
						navigatorPG.notification.alert(text, null, title);
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
							notificateAnode(title,text);
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
  