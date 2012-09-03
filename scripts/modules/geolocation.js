define(function () {

    var geoloc;

    return {
        getCurrentPosition: function (callback) {
            var ph = false;

            //Comprobación de que phonegap existe y esta operativo  (ph = true)
            document.addEventListener('deviceready', function () {
                ph = true;
            });
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (pos) {
                    geoloc = pos;
                    typeof callback === 'function' && callback(geoloc);
                }, function () {
                    alert("Without permission");
                });
            } else {
                if (ph === true) {
                    if (navigatorPG && navigatorPG.geolocation) {
                        navigatorPG.geolocation.getCurrentPosition(function (pos) {
                            geoloc = pos;
                            alert("recibido en geo");
                            typeof callback === 'function' && callback(geoloc);
                        }, function () {
                            alert("Without permission");
                        });
                    } else {
                        alert('Reconoce Phonegap pero no permite acceso');
                    }
                } else {
                    alert('Error: No se ha obtenido acceso');
                }
            }

        }
    };
});