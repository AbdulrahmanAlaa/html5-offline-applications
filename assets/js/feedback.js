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
        var item = null;
        while(messages.length > 0){
            item  = messages.shift();
            storeMessageRemote(item);
        }
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
        logEvent(msg + ' Stored to Local');
        toastr.warning(msg + '  Stored to Local');

    }

    function storeMessageRemote(msg) {
        $.ajax(
            {
                method: 'POST',
                url: 'http://localhost:3000/feedbacks',
                data: { id: Math.random() * 10, message: msg },
                success: function (data) {
                    toastr.success(msg + ' Posted to Remote Server');
                    logEvent(msg + ' Posted to Remote Server');
                },
                error: function (error) {
                    console.log(error);
                    toastr.error('Failed to Send: ' + msg);
                    logEvent('Failed to Send: ' + msg);
                }
            }
        );
    }

    $('#btnSend').click(onSendClick);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline, true);
    reportOnlineStatus();
});