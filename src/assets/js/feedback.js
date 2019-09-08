'use strict';

import toastr from 'toastr';
import { logEvent } from './util';
import * as $ from 'jquery';

export const load = () => {
  const status = $('#status');
  const messages = [];

  const isOnline = () => {
    return window && window.navigator && window.navigator.onLine;
  };

  const onOnline = () => {
    // Update html text
    reportOnlineStatus();

    // Send cached data to the server
    sendMessagesToServer();
  };

  const onOffline = () => {
    // Update html text
    reportOfflineStatus();
  };

  const sendMessagesToServer = () => {
    var item = null;
    while (messages.length > 0) {
      item = messages.shift();
      storeMessageRemote(item);
    }
  };

  const reportOnlineStatus = () => {
    status.text('Online');
  };

  const reportOfflineStatus = () => {
    status.text('Offline');
  };

  const onSendClick = () => {
    const val = $('#txtArea').val();
    if (isOnline()) {
      storeMessageRemote(val);
    } else {
      storeMessageLocal(val);
    }
    $('#txtArea').val('');
  };

  const storeMessageLocal = msg => {
    messages.push(msg);
    logEvent(msg + ' Stored to Local');
    toastr.warning(msg + '  Stored to Local');
  };

  const getMessageRemote = msg => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/feedbacks',
      data: { id: Math.random() * 10, message: msg },
      success: data => {
        toastr.success(msg + ' GET to Remote Server');
        logEvent(msg + ' Posted to Remote Server');
      },
      error: error => {
        console.log(error);
        toastr.error('Failed to Send: ' + msg);
        logEvent('Failed to Send: ' + msg);
      }
    });
  };
  const storeMessageRemote = msg => {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/feedbacks',
      data: { id: Math.random() * 10, message: msg },
      success: data => {
        toastr.success(msg + ' Posted to Remote Server');
        logEvent(msg + ' Posted to Remote Server');
      },
      error: error => {
        console.log(error);
        toastr.error('Failed to Send: ' + msg);
        logEvent('Failed to Send: ' + msg);
      }
    });
  };

  $('#btnSend').click(onSendClick);
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline, true);
  reportOnlineStatus();
  getMessageRemote();
};
