'use strict';
$(function () {

    // Initial loads 
    if (window.localStorage) {
        var tasks = window.localStorage.getItem('tasks');
        $('#taskListTextArea').val(tasks);
    }

    function onSaveHandler() {
        if (window.localStorage) {
            window.localStorage.setItem('tasks',$('#taskListTextArea').val());
        }
    }
    function onDeleteHandler() {
        
        if (window.localStorage) {
            window.localStorage.removeItem('tasks');
        }
        $('#taskListTextArea').val('');
    }
    $('#btnSave').click(onSaveHandler);
    $('#btnDelete').click(onDeleteHandler);
});