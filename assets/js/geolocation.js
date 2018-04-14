'use strict';
$(function () {
    var watchId = null;
    $('#alertPosition').hide();

    function onGetPosition() {
        if (navigator.geolocation) {
            var options = {
                enableHighAccuracy: true, // Default false
                timeout: 4000, // Default is no limit
                maximumAge: 1000 // Default for caching time is 0
            }
            navigator.geolocation.getCurrentPosition(showPositionHandler, positionErrorHandler, options);
        }
    }

    function showPositionHandler(position) {
        $('#alertPosition').hide();
        $('#longitude').val(position.coords.longitude);
        $('#latitude').val(position.coords.latitude);
        $('#altitude').val(position.coords.altitude);
        $('#accuracy').val(position.coords.accuracy);
        $('#altitudeAcc').val(position.coords.altitudeAccuracy);
        $('#heading').val(position.coords.heading);
        $('#speed').val(position.coords.speed);
        $('#time').val(position.coords.timestamp);
        console.log(position.coords);
    }

    function positionErrorHandler(e) {
        switch (e.code) {
            case 0:
                logMessage('application encountered unknown error ');
                break;

            case 1:
                logMessage('You Choose not to allow this application to access your location');
                break;

            case 2:
                logMessage('The application was unable to determine your location');
                break;

            case 3:
                logMessage('location request time out !');
                break;
        }
        $('#alertPosition').show();
    }

    function logMessage(message) {
        $('#alertPosition #errorMessage').text(message);
    }

    function onWatchPosition() {
        if (navigator.geolocation) {
            var options = {
                enableHighAccuracy: true, // Default false
                timeout: 2000, // Default is no limit
                maximumAge: 1000 // Default for caching time is 0
            }
            navigator.geolocation.clearWatch(watchId);
            watchId = navigator.geolocation.watchPosition(showPositionHandler, positionErrorHandler, options);
        }
    }

    function onStopPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.clearWatch(watchId);

        }
    }
    $('#btnGetPosition').click(onGetPosition);
    $('#btnWatch').click(onWatchPosition);
    $('#btnStop').click(onStopPosition);
})