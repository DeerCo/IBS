import axios from "axios";

let all_tasks = async (course_id) => {
	let token = sessionStorage.getItem("token");

	let config = {
		headers: { Authorization: `Bearer ${token}` }
	};

	try {
		return await axios.get(process.env.REACT_APP_API_URL + "/ta/course/" + course_id + "/task/all", config);
	} catch (err) {
		return err.response;
	}
};

let all_interviews = async (course_id, curr_task) => {
	let token = sessionStorage.getItem("token");

	let config = {
		headers: { Authorization: `Bearer ${token}` },
		params: { task: curr_task },
	};

	try {
		return await axios.get(process.env.REACT_APP_API_URL + "/ta/course/" + course_id + "/interview/all", config);
	} catch (err) {
		return err.response;
	}
};

//schedule a interveiw
let schedule_interview = async (course_id, curr_task, length, time, location) => {
	let token = sessionStorage.getItem("token");

	const data = {
		task: curr_task,
		length: length.toString(),
		time: time.toString(),
		location: location,
	}

	try {
		return await axios.post(process.env.REACT_APP_API_URL + "/ta/course/" + course_id + "/interview/schedule", data, { headers: { Authorization: `Bearer ${token}` } });
	} catch (err) {
		return err.response;
	}
};

let delete_interview = async (course_id, curr_task, id) => {
	let token = sessionStorage.getItem("token");

	let config = {
		data: { task: curr_task, interview_id: id.toString() },
		headers: { Authorization: `Bearer ${token}` },
	};

	try {
		return await axios.delete(process.env.REACT_APP_API_URL + "/ta/course/" + course_id + "/interview/delete", config);
	} catch (err) {
		return err.response;
	}
};


let TaApi = {
	// Task related
	all_tasks,

	// Interview related
	all_interviews,
	schedule_interview,
	delete_interview,
};

export default TaApi;