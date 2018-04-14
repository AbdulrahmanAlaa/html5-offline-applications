'use strict';
$(function () {
    var watchId = null;
    $('#alertPosition').hide();

    function onGetPosition() {
        if (navigator.geolocation) {
            var options = {
                enableHighAccuracy: true, // Default false
                timeout: 2000, // Default is no limit
                maximumAge: 1000 // Default for caching time is 0
            }
            navigator.geolocation.getCurrentPosition(showPositionHandler, positionErrorHandler, options);
        }
    }

    function showPositionHandler(position) {
        $('#longitude').text(position.coords.longitude);
        $('#latitude').text(position.coords.latitude);
        $('#altitude').text(position.coords.altitude);
        $('#accuracy').text(position.coords.accuracy);
        $('#altitudeAcc').text(position.coords.altitudeAccuracy);
        $('#heading').text(position.coords.heading);
        $('#speed').text(position.coords.speed);
        $('#time').text(position.coords.timestamp);
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