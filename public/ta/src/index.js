var BASE_URL = "https://csc309.teach.cs.toronto.edu";
var API_URL_PREFIX = '${BASE_URL}/ta/${localStorage.task}';

/**
 * 
 * Sets up the page so that buttons are mapped to their respective functions.
 * 
 */

function pageLoader() {
    $("#submit").click(initialize)
}

/**
 * 
 * Sets token and tasks.
 * Redirects user to request page.
 * 
 */
function initialize() {
    let username = $("#username").val().replace(/\s/g, "");
    let password = $("#password").val().replace(/\s/g, "");
    let token = $("#token").val().replace(/\s/g, "");
    let task = $("#task").val().replace(/\s/g, "");
    if (username != "") {
        var tempLocalStorage = localStorage;
        var tempWindow = window;
        $.ajax({
            url: "${API_URL_PREFIX}/login",
            method: "POST",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                username: username,
                password: password,
                task: task
            })
        }).done((data) => {
            tempLocalStorage.token = data.token;
            tempLocalStorage.task = task;
            tempWindow.location = "request.html"
        }).fail((data, textStatus, xhr) => {
            $("#errMessage").html(data.responseJSON.message)
        })
    } else if (token != "") {
        localStorage.token = token;
        localStorage.task = task;
        window.location = "request.html"
    } else {
        $("#errMessage").html("No credential is provided.")
    }
}