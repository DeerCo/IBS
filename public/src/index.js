/**
 * 
 * Sets up the page so that buttons are mapped to their respective functions.
 * 
 */

function pageLoader() {
    $('#submit').click(initialize)
}

let BASE_URL = 'https://mcsapps.utm.utoronto.ca/csc309s22';
let API_URL_PREFIX = `${BASE_URL}/interviews_ta/${localStorage.task}`;

/**
 * 
 * Sets token and tasks.
 * Redirects user to request page.
 * 
 */
function initialize() {
    let username = $('#username').val().replace(/\s/g, '');
    let password = $('#password').val().replace(/\s/g, '');
    let token = $('#token').val().replace(/\s/g, '');
    let task = $('#task').val().replace(/\s/g, '');
    if (username != "") {
        $.ajax({
            url: `${API_URL_PREFIX}/login`,
            method: 'POST',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
                username: username,
                password: password,
                task: task
            })
        }).done((data) => {
            localStorage.token = data.token;
            localStorage.task = task;
            window.location = 'request.html'
        }).fail((data, textStatus, xhr) => {
            $('#errMessage').html(data.responseJSON.message)
        })
    } else {
        localStorage.token = token;
        localStorage.task = task;
        window.location = 'request.html'
    }
}