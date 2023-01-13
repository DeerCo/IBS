import axios from "axios";
let API_URL = "/api";

let login = async (username, password) => {
	try {
		return await axios.post(API_URL + "/auth/login", { username: username, password: password });
	} catch (err) {
		return err.response;
	}
};

let reset_password = async (username, password, code) => {
	try {
		return await axios.post(API_URL + "/auth/change_password", { username: username, password: password, code: code });
	} catch (err) {
		return err.response;
	}
};

let send_code = async (username) => {
	try {
		return await axios.post(API_URL + "/auth/verify", { username: username });
	} catch (err) {
		return err.response;
	}
};

let get_task = async (courseid) => {
	let token = localStorage.getItem("token");

	let config = {
		headers: { Authorization: `Bearer ${token}` }
	};

	try {
		return await axios.get(API_URL + "/course/" + courseid + "/task/all", config);
	} catch (err) {
		return err.response;
	}
};

let get_mark = async (course_id, task) => {
	let token = localStorage.getItem("token");

	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: task },
	};

	try {
		return await axios.get(API_URL + "/course/" + course_id + "/mark", config);
	} catch (err) {
		return err.response;
	}
};

let all_files = async (courseid, curr_task) => {
	let token = localStorage.getItem("token");

	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: curr_task },
	};

	try {
		return await axios.get(API_URL + "/course/" + courseid + "/file/all", config);
	} catch (err) {
		return err.response;
	}
};

let available_interviews = async (courseid, curr_task) => {
	let token = localStorage.getItem("token");

	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: curr_task },
	};

	try {
		return await axios.get(API_URL + "/course/" + courseid + "/interview/available", config);
	} catch (err) {
		return err.response;
	}
};

// get all the booked interviews
let check_interview = async (courseid, curr_task) => {
	let token = localStorage.getItem("token");

	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: curr_task },
	};

	try {
		return await axios.get(API_URL + "/course/" + courseid + "/interview/check", config);
	} catch (err) {
		return err.response;
	}
};

// book an interview
let book_interview = async (courseid, curr_task, time, location) => {
	let token = localStorage.getItem("token");

	const data = {
		task: curr_task,
		time: time,
		location: location
	}

	try {
		return await axios.post(API_URL + "/course/" + courseid + "/interview/book", data, { headers: { Authorization: `Bearer ${token}` } });
	} catch (err) {
		return err.response;
	}
};

// cancel a currently booked interview
// this is a delete request
let cancel_interview = async (courseid, curr_task) => {
	let token = localStorage.getItem("token");

	try {
		return await axios.delete(API_URL + "/course/" + courseid + "/interview/cancel", { data: { task: curr_task }, headers: { Authorization: `Bearer ${token}` } });
	} catch (err) {
		return err.response;
	}
};

let download_file = async (courseid, task, file_id, file_name) => {
	let token = localStorage.getItem("token");

	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: task, file_id: file_id },
	};

	try {
		let response = await axios.get(API_URL + "/course/" + courseid + "/file/retrieve", config);
		let temp_url = window.URL.createObjectURL(new Blob([response.data]));
		let link = document.createElement('a');
		link.href = temp_url;
		link.setAttribute('download', file_name); //or any other extension
		document.body.appendChild(link);
		link.click();
		return response;
	} catch (err) {
		return err.response;
	}
};

// print out all the interview for ta
let all_interviews = async (courseid, curr_task) => {
	let token = localStorage.getItem("token");

	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: curr_task },
	};

	try {
		return await axios.get(API_URL + "/instructor/course/" + courseid + "/interview/all", config);
	} catch (err) {
		return err.response;
	}
};

//delete a interveiw
let delete_interview = async (courseid, curr_task, id) => {
	let token = localStorage.getItem("ta_token");

	let config = {
		data: { task: curr_task, interview_id: id.toString() },
		headers: { Authorization: `Bearer ${token}` },
	};

	try {
		return await axios.delete(API_URL + "/instructor/course/" + courseid + "/interview/delete", config);
	} catch (err) {
		return err.response;
	}
};

//schedule a interveiw
let schedule_interview = async (courseid, curr_task, length, time) => {
	let token = localStorage.getItem("ta_token");

	const data = {
		task: curr_task,
		length: length.toString(),
		time: time.toString()
	}

	try {
		return await axios.post(API_URL + "/instructor/course/" + courseid + "/interview/schedule", data, { headers: { Authorization: `Bearer ${token}` } });
	} catch (err) {
		return err.response;
	}
};


let AuthService = {
	login,
	reset_password,
	send_code,

	// Student
	get_task,
	get_mark,
	all_files,
	download_file,
	available_interviews,
	check_interview,
	book_interview,
	cancel_interview,

	// Ta
	all_interviews,
	schedule_interview,
	delete_interview,
};

export default AuthService;