// Official URL: https://mcsapps.utm.utoronto.ca/csc309s22
// Testing URL: http://www.hanxianxuhuang.ca

let BASE_URL = 'https://mcsapps.utm.utoronto.ca/csc309s22';
let API_URL_PREFIX = `${BASE_URL}/interviews_ta/${localStorage.task}`;

/**
 * 
 * GET Request
 * all API Request
 * Displays a table upon completion
 * or prints errors if it fails.
 * 
 */
function getAll() {
	$.ajax({
		url: `${API_URL_PREFIX}/all`,
		method: 'GET',
		contentType: 'application/json;charset=UTF-8',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'Token ' + localStorage.token);
		},
	}).done((data) => {
		if (data.message) {
			$('#data').html(`<p> ${data.message} </p`)
		} else {
			$('#data').html(makeTable(data))
		}


	}).fail((data, textStatus, xhr) => {
		console.log(xhr.status);
		console.log(data);
		console.log(textStatus);
	})
}

/**
 * 
 * GET REQUEST
 * today API Request
 * Displays a table upon completion
 * or prints errors if it fails.
 * 
 */

function getToday() {
	$.ajax({
		url: `${API_URL_PREFIX}/today`,
		method: 'GET',
		contentType: 'application/json;charset=UTF-8',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'Token ' + localStorage.token);
		},

	}).done((data) => {
		if (data.message) {
			$('#data').html(`<p> ${data.message} </p`)
		} else {
			$('#data').html(makeTable(data))
		}
	}).fail((data, textStatus, xhr) => {
		console.log(xhr.status);
		console.log(data);
		console.log(textStatus);
	})
}

/**
 * POST REQUEST
 * @param {JSON FILE} payload 
 *  {
 *      'time': String,
 *      'length': String,
 *      'location': String
 *  }
 * 
 * schedule API Request
 * 
 */

function scheduleInterview(payload) {
	$.ajax({
		url: `${API_URL_PREFIX}/schedule`,
		method: 'POST',
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(payload),
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'Token ' + localStorage.token);
		},
	}).done((data) => {
		if (data.message) {
			$('#data').html(`<p> ${data.message} </p`)
		} else {
			$('#data').html('An error has occured.')
			console.log(data)
		}
	}).fail((data, textStatus, xhr) => {
		console.log(xhr.status);
		console.log(data);
		console.log(textStatus);
	})
}

/**
 * PUT REQUEST
 * @param {JSON FILE} payload 
 *  {
 *      'set_time': String,
 *      'set_length': String,
 *      'set_location': String,
 *      'set_cancelled': String,
 *      'set_note': String,
 *      'id': String,
 *      'time': String,
 *      'date': String,
 *      'student': String,
 *      'length': String,
 *      'location': String,
 *      'cancelled': String,
 *      'note': String
 * 		'force': String
 *  }
 * 
 * change API Request
 * 
 */

function changeInterview(payload) {
	$.ajax({
		url: `${API_URL_PREFIX}/change`,
		method: 'PUT',
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(payload),
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'Token ' + localStorage.token);
		},
	}).done((data) => {
		console.log(data)
		if (data.message) {
			$('#data').html(`<p> ${data.message} </p`)
		} else {
			$('#data').html('An error has occured.')
			console.log(data)
		}
	}).fail((data, textStatus, xhr) => {
		console.log(xhr.status);
		console.log(data);
		console.log(textStatus);
	})
}

/**
 * DELETE REQUEST
 * @param {JSON FILE} payload 
 *  {
 *      'id': String
 *  }
 * 
 * delete API Request
 * 
 */

function deleteInterview(payload) {
	$.ajax({
		url: `${API_URL_PREFIX}/delete`,
		method: 'DELETE',
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(payload),
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'Token ' + localStorage.token);
		},
	}).done((data) => {
		if (data.message) {
			$('#data').html(`<p> ${data.message} </p`)
		} else {
			$('#data').html('An error has occured.')
			console.log(data)
		}
	}).fail((data, textStatus, xhr) => {
		console.log(xhr.status);
		console.log(data);
		console.log(textStatus);
	})
}

/**
 * 
 * GET Request
 * backup API Request
 * Displays all scheduled interviews
 * 
 */

function backupAll() {
	$.ajax({
		url: `${BASE_URL}/interviews_ta/backup`,
		method: 'GET',
		contentType: 'application/json;charset=UTF-8',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'Token ' + localStorage.token);
		},
	}).done((data) => {
		if (data.message) {
			$('#data').html(`<p> ${data.message} </p`)
		} else {
			$('#data').html(`<textarea cols="100"> ${data} </textarea>`)
			$('#data').append(makeTable(data))
		}
	}).fail((data, textStatus, xhr) => {
		console.log(xhr.status);
		console.log(data);
		console.log(textStatus);
	})
}

/**
 * 
 * GET Request
 * backup API Request
 * Displays scheduled interviews for a specific task
 * 
 */

function backupTask() {
	$.ajax({
		url: `${API_URL_PREFIX}/backup`,
		method: 'GET',
		contentType: 'application/json;charset=UTF-8',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'Token ' + localStorage.token);
		},
	}).done((data) => {
		if (data.message) {
			$('#data').html(`<p> ${data.message} </p`)

		} else {
			$('#data').html(`<textarea cols="100"> ${data} </textarea>`)
			$('#data').append(makeTable(data))
		}
	}).fail((data, textStatus, xhr) => {
		console.log(xhr.status);
		console.log(data);
		console.log(textStatus);
	})
}

/**
 * 
 * GET Request
 * group information API Request
 * Displays student information by group.
 * 
 */

function groupInfo(payload) {
	$.ajax({
		url: `${API_URL_PREFIX}/group_information/?${payload}`,
		method: 'GET',
		contentType: 'application/json;charset=UTF-8',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'Token ' + localStorage.token);
		},
	}).done((data) => {
		if (data.message) {
			$('#data').html(`<p> ${data.message} </p`)
		} else {
			$('#data').html(makeGroupTable(data))
		}


	}).fail((data, textStatus, xhr) => {
		console.log(xhr.status);
		console.log(data);
		console.log(textStatus);
	})
}