define(["scripts/require_jquery"], function ($) {
    var acumulador;

    function contactsAnode(callback) {
        $.ajax({
            url: "http://127.0.0.1:4444/dummy?action=contacts&callback=?",
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
        contacts: function (callback) {
            var ph = false;
            // Comprobación de que phonegap existe y esta operativo  (ph = true)
            document.addEventListener('deviceready', function () {
                ph = true;
            });

            if (ph === true) {
                //TODO añadir opcion phonegap
                if (navigatorPG && navigatorPG.connnntactos) {
                    navigator.notification.beep(times);
                } else {
                    alert('Reconoce Phonegap pero no perite acceso');
                }
            } else {
                require(["scripts/require_jquery"], function ($) {
                    //TODO meter esto en una función
                    $.ajax({
                        url: "http://127.0.0.1:4444/dummy?action=ping&callback=?",
                        dataType: 'json',
                        success: function (data) {
                            contactsAnode(callback);
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