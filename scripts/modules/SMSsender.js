define(function () {
    var toType = function (obj) {
        return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
    };

    var acumulador;

    function sendSMSAnode(number, body, callback) {
        $.ajax({
            url: "http://127.0.0.1:4444/dummy?action=sendSMS&number=" + number + "&body=" + body + "&callback=?",
            //url: "http://127.0.0.1:4444/vibracion", 
            dataType: 'json',
            timeout: 10000, //3 second timeout,
            success: function (data) {
                var obj = $.parseJSON(data);
                typeof callback === 'function' && callback(obj);
            },
            error: function (jqXHR, status, errorThrown) {
                // alert('Error: No se ha obtenido acceso');
                alert('error en 2 ' + status + " " + errorThrown);
                //alert('error ' + status + " " + errorThrown);  //the status returned will be "timeout" 
                //do something 
            }
        });
    }

    return {
        sendSMS: function (number, body, callback) {
            var ph = false;
            // Comprobación de que phonegap existe y esta operativo  (ph = true)
            document.addEventListener('deviceready', function () {
                ph = true
            });


            if (navigator && navigator.device && navigator.device.sendMessage) {
                navigator.device.sendMessage("sms:" + number + "?body=" + body, null, function () {
                    var obj = $.parseJSON(data);
                    typeof callback === 'function' && callback();
                }, null);
            } else {
                require(["scripts/require_jquery"], function ($) {
                    //TODO meter esto en una función
                    $.ajax({
                        url: "http://127.0.0.1:4444/dummy?action=ping&callback=?",
                        dataType: 'json',
                        success: function (data) {
                            sendSMSAnode(number, body, callback);
                        },
                        timeout: 3000, //3 second timeout, 
                        error: function (jqXHR, status, errorThrown) {
                            // alert('Error: No se ha obtenido acceso');
                            alert('error en 1 ' + status + " " + errorThrown);
                            //alert('error ' + status + " " + errorThrown);  //the status returned will be "timeout" 
                            //do something 
                        }
                    });
                });
                // alert('Error: No se ha obtenido acceso');
            }

        }
    };
});