import axios from 'axios';
import http from './client';

let get_marks_csv = async (course_id, task) => {
    try {
        return await http.get(`/instructor/course/${course_id}/mark/all_csv?task=${task}`);
    } catch (err) {
        return err.response;
    }
};

let all_tasks = async (course_id) => {
    let token = sessionStorage.getItem('token');

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        return await axios.get(
            process.env.REACT_APP_API_URL + '/instructor/course/' + course_id + '/task/all',
            config
        );
    } catch (err) {
        return err.response;
    }
};

let impersonate = async (course_id, username) => {
    let token = sessionStorage.getItem('token');

    const data = {
        username: username
    };

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        return await axios.post(
            process.env.REACT_APP_API_URL + '/instructor/course/' + course_id + '/impersonate',
            data,
            config
        );
    } catch (err) {
        return err.response;
    }
};

let submitMark = async (courseId, task, criteria, username, mark) => {
    let token = sessionStorage.getItem('token');

    const data = {
        username,
        task,
        mark,
        criteria,
        overwrite: true
    };

    try {
        return await http.post(`/instructor/course/${courseId}/mark/submit`, data);
    } catch (err) {
        return err.response;
    }
};

// let check_group = async (course_id, group_id) => {
// 	let token = sessionStorage.getItem("token");
//
// 	let config = {
// 		headers: { Authorization: `Bearer ${token}` }
// 	};
//
// 	try {
// 		return await axios.get(process.env.REACT_APP_API_URL + "/ta/course/" + course_id + "/group/check?group_id=" + group_id, config);
// 	} catch (err) {
// 		return err.response;
// 	}
// };
//
// let all_interviews = async (course_id, curr_task) => {
// 	let token = sessionStorage.getItem("token");
//
// 	let config = {
// 		headers: { Authorization: `Bearer ${token}` },
// 		params: { task: curr_task },
// 	};
//
// 	try {
// 		return await axios.get(process.env.REACT_APP_API_URL + "/ta/course/" + course_id + "/interview/all", config);
// 	} catch (err) {
// 		return err.response;
// 	}
// };
//
// //schedule a interveiw
// let schedule_interview = async (course_id, curr_task, length, time, location) => {
// 	let token = sessionStorage.getItem("token");
//
// 	const data = {
// 		task: curr_task,
// 		length: length.toString(),
// 		time: time.toString(),
// 		location: location,
// 	}
//
// 	try {
// 		return await axios.post(process.env.REACT_APP_API_URL + "/ta/course/" + course_id + "/interview/schedule", data, { headers: { Authorization: `Bearer ${token}` } });
// 	} catch (err) {
// 		return err.response;
// 	}
// };
//
// let delete_interview = async (course_id, curr_task, id) => {
// 	let token = sessionStorage.getItem("token");
//
// 	let config = {
// 		data: { task: curr_task, interview_id: id.toString() },
// 		headers: { Authorization: `Bearer ${token}` },
// 	};
//
// 	try {
// 		return await axios.delete(process.env.REACT_APP_API_URL + "/ta/course/" + course_id + "/interview/delete", config);
// 	} catch (err) {
// 		return err.response;
// 	}
// };

let allGroups = async (course_id, task) => {
    let token = sessionStorage.getItem('token');

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        return await axios.get(
            process.env.REACT_APP_API_URL +
                '/instructor/course/' +
                course_id +
                '/group/all?task=' +
                task,
            config
        );
    } catch (err) {
        return err.response;
    }
};

let taskGroups = async (course_id, task) => {
    /**
     * Gets all groups for a particular task within a course.
     */
    let token = sessionStorage.getItem('token');

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        return await axios.get(
            process.env.REACT_APP_API_URL +
                '/instructor/course/' +
                course_id +
                '/group/all?task=' +
                task,
            config
        );
    } catch (err) {
        return err.response;
    }
};

let InstructorApi = {
    //Course related
    all_tasks,
    // Task related
    impersonate,
    taskGroups,
    //
    // // Group related
    // check_group,
    allGroups,
    //
    // // Interview related
    // all_interviews,
    // schedule_interview,
    // delete_interview,

    // Mark related
    get_marks_csv,
    submitMark
};

export default InstructorApi;
