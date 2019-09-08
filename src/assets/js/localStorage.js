import * as $ from 'jquery';
import toastr from 'toastr';

('use strict');
export const load = () => {
  // Initial loads
  if (window.localStorage) {
    var tasks = window.localStorage.getItem('tasks');
    $('#taskListTextArea').val(tasks);
    if (tasks) {
      toastr.info('Tasks are loaded');
    }
  }

  const onSaveHandler = () => {
    if (window.localStorage) {
      window.localStorage.setItem('tasks', $('#taskListTextArea').val());
      toastr.success('Tasks saved successfully');
    }
  };
  const onDeleteHandler = () => {
    if (window.localStorage) {
      window.localStorage.removeItem('tasks');
    }
    $('#taskListTextArea').val('');
    toastr.error('Tasks removed successfully');
  };
  $('#btnSave').click(onSaveHandler);
  $('#btnDelete').click(onDeleteHandler);
};
