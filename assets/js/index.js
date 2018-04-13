'use strict';
$(function () {

    window.onload = function () {
        logEvent('Window Load');
    }

    window.applicationCache.onchecking = function () {
        logEvent('Checking Cache');
    }
    window.applicationCache.ondownloading = function () {
        logEvent('Downloading');
    }
    window.applicationCache.onnoupdate = function () {
        logEvent('No Update');        
    }
    window.applicationCache.onupdateready = function (e) {
        logEvent('Update Ready');
        logEvent('Swapping Cache');
        window.applicationCache.swapCache();
    }
    function logEvent(text) {
        $('#log').append($('<li>' + text + '</li>'))
    }
});