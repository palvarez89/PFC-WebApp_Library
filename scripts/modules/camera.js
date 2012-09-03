define(function () {

    var imag;

    function cameraAnode(callback) {
        $.ajax({
            url: "http://127.0.0.1:4444/dummy?action=camera&callback=?",
            //url: "http://127.0.0.1:4444/vibracion", 
            dataType: 'json',
            timeout: 3000, //3 second timeout,
            success: function (data) {
                var obj = $.parseJSON(data);
                alert(obj.fullPath);
                typeof callback === 'function' && callback([obj]);
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
        captureImage: function (callback) {
            var ph = false;

            //Comprobación de que phonegap existe y esta operativo  (ph = true)
            document.addEventListener('deviceready', function () {
                ph = true;
            });

            if (navigator && navigator.device) {
                alert('Soportado por w3c');
                navigator.device.captureImage(function (dat) {
                    imag = dat;
                    typeof callback === 'function' && callback(imag);
                }, function () {
                    alert("Without permission");
                });

            } else {
                if (ph === true) {
                    if (navigatorPG && navigatorPG.device && navigatorPG.device.capture) {
                        alert('Soportado por phonegap');
                        navigatorPG.device.capture.captureImage(function (dat) {
                            var path = dat[0].fullPath;

                            alert('path ' + path);
                            imag = dat;
                            typeof callback === 'function' && callback(imag);
                        }, function () {
                            alert("Without permission");
                        }, {
                            limit: 1
                        });
                    } else {
                        alert('Reconoce Phonegap pero no permite acceso');
                    }
                } else {
                    require(["scripts/require_jquery"], function ($) {
                        //TODO meter esto en una función
                        $.ajax({
                            url: "http://127.0.0.1:4444/dummy?action=ping&callback=?",
                            //url: "http://127.0.0.1:4444/vibracion", 
                            dataType: 'json',
                            success: function (data) {
                                cameraAnode(callback);
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

        }
    };
});