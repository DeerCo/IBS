import axios from "axios";

let all_tasks = async (course_id) => {
	let token = sessionStorage.getItem("token");

	let config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	try {
		return await axios.get(process.env.REACT_APP_API_URL + "/course/" + course_id + "/task/all", config);
	} catch (err) {
		return err.response;
	}
};

let get_task = async (course_id, task) => {
	let token = sessionStorage.getItem("token");

	let config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	try {
		return await axios.get(process.env.REACT_APP_API_URL + "/course/" + course_id + "/task/get?task=" + task, config);
	} catch (err) {
		return err.response;
	}
};

let get_mark = async (course_id, task) => {
	let token = sessionStorage.getItem("token");

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

let all_files = async (course_id, task) => {
	let token = sessionStorage.getItem("token");

	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: task },
	};

	try {
		return await axios.get(process.env.REACT_APP_API_URL + "/course/" + course_id + "/file/all", config);
	} catch (err) {
		return err.response;
	}
};

let download_file = async (course_id, task, file_id, file_name) => {
	let token = sessionStorage.getItem("token");

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

let available_interviews = async (course_id, task) => {
	let token = sessionStorage.getItem("token");

	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: task },
	};

	try {
		return await axios.get(process.env.REACT_APP_API_URL + "/course/" + course_id + "/interview/available", config);
	} catch (err) {
		return err.response;
	}
};

let check_interview = async (course_id, task) => {
	let token = sessionStorage.getItem("token");

	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: task },
	};

	try {
		return await axios.get(process.env.REACT_APP_API_URL + "/course/" + course_id + "/interview/check", config);
	} catch (err) {
		return err.response;
	}
};

let book_interview = async (course_id, task, time, location) => {
	let token = sessionStorage.getItem("token");

	let headers = { headers: { Authorization: `Bearer ${token}` } };

	let data = {
		task: task,
		time: time,
		location: location,
	};

	try {
		return await axios.post(process.env.REACT_APP_API_URL + "/course/" + course_id + "/interview/book", data, headers);
	} catch (err) {
		return err.response;
	}
};

let change_interview = async (course_id, task, time, location) => {
	let token = sessionStorage.getItem("token");

	let headers = { headers: { Authorization: `Bearer ${token}` } };

	let data = {
		task: task,
		time: time,
		location: location,
	};

	try {
		return await axios.put(process.env.REACT_APP_API_URL + "/course/" + course_id + "/interview/change", data, headers);
	} catch (err) {
		return err.response;
	}
};

let cancel_interview = async (course_id, task) => {
	let token = sessionStorage.getItem("token");

	let config = {
		data: { task: task },
		headers: { Authorization: `Bearer ${token}` },
	};

	try {
		return await axios.delete(process.env.REACT_APP_API_URL + "/course/" + course_id + "/interview/cancel", config);
	} catch (err) {
		return err.response;
	}
};

let check_group = async (course_id, task) => {
	let token = sessionStorage.getItem("token");

	let headers = { headers: { Authorization: `Bearer ${token}` } };

	try {
		return await axios.get(process.env.REACT_APP_API_URL + "/course/" + course_id + "/group/check?task=" + task, headers);
	} catch (err) {
		return err.response;
	}
};

let check_submission = async (course_id, task) => {
	let token = sessionStorage.getItem("token");

	let headers = { headers: { Authorization: `Bearer ${token}` } };

	try {
		return await axios.get(process.env.REACT_APP_API_URL + "/course/" + course_id + "/submission/check?task=" + task, headers);
	} catch (err) {
		return err.response;
	}
};

let invite_member = async (course_id, task, username) => {
	let token = sessionStorage.getItem("token");

	let headers = { headers: { Authorization: `Bearer ${token}` } };

	let data = {
		task: task,
		username: username,
	};

	try {
		return await axios.post(process.env.REACT_APP_API_URL + "/course/" + course_id + "/group/invite", data, headers);
	} catch (err) {
		return err.response;
	}
};

let uninvite_member = async (course_id, task, username) => {
	let token = sessionStorage.getItem("token");

	let config = {
		data: { task: task, username: username },
		headers: { Authorization: `Bearer ${token}` },
	};

	try {
		return await axios.delete(process.env.REACT_APP_API_URL + "/course/" + course_id + "/group/disinvite", config);
	} catch (err) {
		return err.response;
	}
};

let create_group = async (course_id, task) => {
	let token = sessionStorage.getItem("token");

	let headers = { headers: { Authorization: `Bearer ${token}` } };

	let data = {
		task: task,
	};

	try {
		return await axios.post(
			process.env.REACT_APP_API_URL + "/course/" + course_id + "/group/create", data, headers);
	} catch (err) {
		return err.response;
	}
};

let accept_invitation = async (course_id, task) => {
	let token = sessionStorage.getItem("token");

	let headers = { headers: { Authorization: `Bearer ${token}` } };

	let data = {
		course_id: course_id,
		task: task
	};

	try {
		return await axios.put(process.env.REACT_APP_API_URL + "/course/" + course_id + "/group/accept", data, headers);
	} catch (err) {
		return err.response;
	}
};

let reject_invitation = async (course_id, task) => {
	let token = sessionStorage.getItem("token");

	let config = {
		data: {
			course_id: course_id,
			task: task,
		},
		headers: {
			Authorization: `Bearer ${token}`,
		}
	};

	try {
		return await axios.delete(process.env.REACT_APP_API_URL + "/course/" + course_id + "/group/reject", config);
	} catch (err) {
		return err.response;
	}
};

let StudentApi = {
	// Task related
	all_tasks,
	get_task,

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

	// Group related
	check_group,
	check_submission,
	invite_member,
	uninvite_member,
	create_group,
	accept_invitation,
	reject_invitation,
};

export default StudentApi;
