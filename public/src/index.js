/**
 * 
 * Sets up the page so that buttons are mapped to their respective functions.
 * 
 */

function pageLoader() {
	$('#submit').click(initialize)
}


/**
 * 
 * Sets token and tasks.
 * Redirects user to request page.
 * 
 */
function initialize() {
	localStorage.token = $('#token').val().replace(/\s/g, '');
	localStorage.task = $('#task').val().replace(/\s/g, '');
	window.location = 'request.html'

}