$(function () {
    function onOnline() {
        reportOnlineStatus();
        sendMessagesToServer()
    }
    function onOffline() {
        reportOfflineStatus();
    }

    function sendMessagesToServer() {

    }

    function reportOnlineStatus() {

    }

    function reportOfflineStatus() {

    }
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline, true);
});