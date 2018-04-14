'use strict';

function logEvent(text) {
    $('#log').append($('<li>' + text + '</li>'))
}
$(function () {

    function onload() {
        logEvent('Window Load');
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