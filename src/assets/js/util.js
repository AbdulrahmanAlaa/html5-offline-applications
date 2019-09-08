import * as $ from  'jquery';
export const logEvent = (text) => {
    $('#log').append($('<li>' + text + '</li>'))
}