import axios from "axios";
let API_URL = "/api";

let login = async (username, password) => {
	const response = await axios
		.post(API_URL + "/auth/login", {
			username,
			password,
		});
	console.log(response.data);
	return response.data;
};

let reset_password = (username, password, code) => {
	return axios.post(API_URL + "/auth/change_password", {
		username,
		password,
		code,
	});
};

let send_code = (username) => {
	return axios.post(API_URL + "/auth/verify", {
		username,
	});
};

let get_task = async (courseid) => {
	// get the token
	let token = localStorage.getItem("token");
	// setting config
	let config = {
		headers: { Authorization: `Bearer ${token}` }
	};
	const response = await axios
		.get(API_URL + "/course/" + courseid + "/task/all", config);
	return response.data;
};

let get_mark = async (course_id, task) => {
	// get the token
	let token = localStorage.getItem("token");
	// setting config
	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: task },
	};
	const response = await axios
		.get(API_URL + "/course/" + course_id + "/mark", config);
	return response.data;
};

let all_files = async (courseid, curr_task) => {
	// get the token
	let token = localStorage.getItem("token");
	// setting config
	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: curr_task },
	};
	const response = await axios
		.get(API_URL + "/course/" + courseid + "/file/all", config);
	return response.data;
};

let available_interviews = async (courseid, curr_task) => {
	// get the token
	let token = localStorage.getItem("token");
	// setting config
	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: curr_task },
	};
	const response = await axios
		.get(API_URL + "/course/" + courseid + "/interview/available", config);
	return response.data;
};

// get all the booked interviews
let check_interview = async (courseid, curr_task) => {
	// get the token
	let token = localStorage.getItem("token");
	// setting config
	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: curr_task },
	};
	const response = await axios
		.get(API_URL + "/course/" + courseid + "/interview/check", config);
	return response.data;
};

// book an interview
// time in formate of 2022-12-30 16:00:00
let book_interview = async (courseid, curr_task, time, location) => {
	// get the token
	let token = localStorage.getItem("token");
	console.log(courseid, curr_task, time, location);

  const data ={
    task: curr_task, 
    time: time, 
    location: location
  }

	const response = await axios
		.post(API_URL + "/course/" + courseid + "/interview/book", data, { headers: { Authorization: `Bearer ${token}` } });
	return response.data;
};

// cancel a currently booked interview
// this is a delete request
let cancel_interview = async (courseid, curr_task) => {
	// get the token
	let token = localStorage.getItem("token");
	// setting config

	const response = await axios
		.delete(API_URL + "/course/" + courseid + "/interview/cancel", { data: { task: curr_task }, headers: { Authorization: `Bearer ${token}` } });
	return response.data;
};



let download_file = async (courseid, task, file_id, file_name) => {
	// get the token
	let token = localStorage.getItem("token");
	// setting config
	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: task, file_id: file_id },
	};
	const response = await axios.get(API_URL + "/course/" + courseid + "/file/retrieve", config);
	let url_2 = window.URL.createObjectURL(new Blob([response.data]));
	let link = document.createElement('a');
	link.href = url_2;
	link.setAttribute('download', file_name); //or any other extension
	document.body.appendChild(link);
	link.click();
};

// print out all the interview for ta
let all_interviews = async (courseid, curr_task) => {
	// get the token
	let token = localStorage.getItem("token");
	// setting config
	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: curr_task },
	};
	const response = await axios
		.get(API_URL + "/instructor/course/" + courseid + "/interview/all", config);
	return response.data;
};

//delete a interveiw
let delete_interview = async (courseid, curr_task, id) => {
	// get the token
	let token = localStorage.getItem("ta_token");
	// setting config
	let config = {
		data: {task: curr_task, interview_id: id.toString()},
		headers: { Authorization: `Bearer ${token}` },
	};

	const response = await axios
		.delete(API_URL + "/instructor/course/" + courseid + "/interview/delete", config);
	return response.data;
};

//schedule a interveiw
let schedule_interview = async (courseid, curr_task, length, time) => {
	// get the token
	let token = localStorage.getItem("ta_token");
	// setting config

	const data ={
		task: curr_task, 
		length: length.toString(), 
		time: time.toString()
	}

	const response = await axios
		.post(API_URL + "/instructor/course/" + courseid + "/interview/schedule", data, { headers: { Authorization: `Bearer ${token}` } });
	return response.data;
};


let AuthService = {
	login,
	reset_password,
	send_code,
	get_task,
	get_mark,
	all_files,
	download_file,
	available_interviews,

	check_interview,
	book_interview,
	cancel_interview,

	all_interviews,
	schedule_interview,
	delete_interview,
};

export default AuthService;