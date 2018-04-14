'use strict';
$(function () {

    function onload() {
        logEvent('Window Load');
    }

    function logEvent(text) {
        $('#log').append($('<li>' + text + '</li>'))
    }

    if (window.applicationCache) {
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
            window.location.reload();
        }
    }
    window.addEventListener('load', onload);


});