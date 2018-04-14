'use strict';
$(function () {

    // Initial loads 
    if (window.localStorage) {
        var tasks = window.localStorage.getItem('tasks');
        $('#taskListTextArea').val(tasks);
        if (tasks) {
            toastr.info('Tasks are loaded');
        }
    }

    function onSaveHandler() {
        if (window.localStorage) {
            window.localStorage.setItem('tasks', $('#taskListTextArea').val());
            toastr.success('Tasks saved successfully');
        }
    }
    function onDeleteHandler() {

        if (window.localStorage) {
            window.localStorage.removeItem('tasks');
        }
        $('#taskListTextArea').val('');
        toastr.error('Tasks removed successfully');
        
    }
    $('#btnSave').click(onSaveHandler);
    $('#btnDelete').click(onDeleteHandler);
});