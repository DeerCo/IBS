import axios from "axios";

let all_tasks = async (course_id) => {
	let token = localStorage.getItem("token");

	let config = {
		headers: { Authorization: `Bearer ${token}` }
	};

	try {
		return await axios.get(process.env.REACT_APP_API_URL + "/course/" + course_id + "/task/all", config);
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
		return await axios.get(process.env.REACT_APP_API_URL + "/course/" + course_id + "/mark", config);
	} catch (err) {
		return err.response;
	}
};

let all_files = async (course_id, curr_task) => {
	let token = localStorage.getItem("token");

	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: curr_task },
	};

	try {
		return await axios.get(process.env.REACT_APP_API_URL + "/course/" + course_id + "/file/all", config);
	} catch (err) {
		return err.response;
	}
};

let download_file = async (course_id, task, file_id, file_name) => {
	let token = localStorage.getItem("token");

	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: task, file_id: file_id },
		responseType: "blob"
	};

	try {
		let response = await axios.get(process.env.REACT_APP_API_URL + "/course/" + course_id + "/file/retrieve", config);
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

let available_interviews = async (course_id, curr_task) => {
	let token = localStorage.getItem("token");

	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: curr_task },
	};

	try {
		return await axios.get(process.env.REACT_APP_API_URL + "/course/" + course_id + "/interview/available", config);
	} catch (err) {
		return err.response;
	}
};

let check_interview = async (course_id, curr_task) => {
	let token = localStorage.getItem("token");

	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: curr_task },
	};

	try {
		return await axios.get(process.env.REACT_APP_API_URL + "/course/" + course_id + "/interview/check", config);
	} catch (err) {
		return err.response;
	}
};

let book_interview = async (course_id, curr_task, time, location) => {
	let token = localStorage.getItem("token");

	const data = {
		task: curr_task,
		time: time,
		location: location
	}

	try {
		return await axios.post(process.env.REACT_APP_API_URL + "/course/" + course_id + "/interview/book", data, { headers: { Authorization: `Bearer ${token}` } });
	} catch (err) {
		return err.response;
	}
};

let change_interview = async (course_id, curr_task, time, location) => {
	let token = localStorage.getItem("token");

	const data = {
		task: curr_task,
		time: time,
		location: location
	}

	try {
		return await axios.put(process.env.REACT_APP_API_URL + "/course/" + course_id + "/interview/change", data, { headers: { Authorization: `Bearer ${token}` } });
	} catch (err) {
		return err.response;
	}
};

let cancel_interview = async (course_id, curr_task) => {
	let token = localStorage.getItem("token");

	try {
		return await axios.delete(process.env.REACT_APP_API_URL + "/course/" + course_id + "/interview/cancel", { data: { task: curr_task }, headers: { Authorization: `Bearer ${token}` } });
	} catch (err) {
		return err.response;
	}
};


let StudentApi = {
	// Task related
	all_tasks,

	// Mark related
	get_mark,

	// File related
	all_files,
	download_file,

	// Interview related
	available_interviews,
	check_interview,
	book_interview,
	change_interview,
	cancel_interview,
};

export default StudentApi;