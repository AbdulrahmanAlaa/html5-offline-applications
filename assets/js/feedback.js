$(function () {
    var status = $('#status');
    var messages = [];

    function isOnline() {
        return window && window.navigator && window.navigator.onLine;
    }

    function onOnline() {
        // Update html text
        reportOnlineStatus();

        // Send cached data to the server 
        sendMessagesToServer();
    }

    function onOffline() {
        // Update html text
        reportOfflineStatus();
    }

    function sendMessagesToServer() {
        messages.map(function (item) {
            $.ajax(
                {
                    method: 'POST',
                    url: 'assets/db.json',
                    data: { id: Math.random() * 10, message: item }
                }
            );
        });
        messages = [];
    }

    function reportOnlineStatus() {
        status.text('Online');
    }

    function reportOfflineStatus() {
        status.text('Offline');
    }

    function onSendClick() {
        var val = $('#txtArea').val();
        if (isOnline()) {
            storeMessageRemote(val);
        } else {
            storeMessageLocal(val);
        }
        $('#txtArea').val('')
    }

    function storeMessageLocal(msg) {
        messages.push(msg);
    }

    function storeMessageRemote(msg) {
        $.ajax(
            {
                method: 'POST',
                url: 'assets/db.json',
                data: { id: Math.random() * 10, message: msg }
            }
        );
    }

    $('#btnSend').click(onSendClick);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline, true);
    reportOnlineStatus();
});