import axios from 'axios';

let all_tasks = async (course_id) => {
    let token = sessionStorage.getItem('token');

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        return await axios.get(
            process.env.REACT_APP_API_URL + '/ta/course/' + course_id + '/task/all',
            config
        );
    } catch (err) {
        return err.response;
    }
};

let check_group = async (course_id, group_id) => {
    let token = sessionStorage.getItem('token');

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        return await axios.get(
            process.env.REACT_APP_API_URL +
                '/ta/course/' +
                course_id +
                '/group/check?group_id=' +
                group_id,
            config
        );
    } catch (err) {
        return err.response;
    }
};

let allGroups = async (course_id, task) => {
    let token = sessionStorage.getItem('token');

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        return await axios.get(
            process.env.REACT_APP_API_URL + '/ta/course/' + course_id + '/group/all?task=' + task,
            config
        );
    } catch (err) {
        return err.response;
    }
};

let all_interviews = async (course_id, curr_task) => {
    let token = sessionStorage.getItem('token');

    let config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { task: curr_task }
    };

    try {
        return await axios.get(
            process.env.REACT_APP_API_URL + '/ta/course/' + course_id + '/interview/all',
            config
        );
    } catch (err) {
        return err.response;
    }
};

//schedule a interveiw
let schedule_interview = async (course_id, curr_task, length, time, location) => {
    let token = sessionStorage.getItem('token');

    const data = {
        task: curr_task,
        length: length.toString(),
        time: time.toString(),
        location: location
    };

    try {
        return await axios.post(
            process.env.REACT_APP_API_URL + '/ta/course/' + course_id + '/interview/schedule',
            data,
            { headers: { Authorization: `Bearer ${token}` } }
        );
    } catch (err) {
        return err.response;
    }
};

let delete_interview = async (course_id, curr_task, id) => {
    let token = sessionStorage.getItem('token');

    let config = {
        data: { task: curr_task, interview_id: id.toString() },
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        return await axios.delete(
            process.env.REACT_APP_API_URL + '/ta/course/' + course_id + '/interview/delete',
            config
        );
    } catch (err) {
        return err.response;
    }
};

const changeInterview = async (
    courseId,
    task,
    { set_time, set_group_id, set_length, set_location, set_note, set_cancelled },
    { interview_id, booked, time, date, group_id, length, location, note, cancelled }
) => {
    let token = sessionStorage.getItem('token');

    let config = {
        data: {
            task,
            set_time,
            set_group_id,
            set_length,
            set_location,
            set_note,
            set_cancelled,
            interview_id,
            booked,
            time,
            date,
            group_id,
            length,
            location,
            note,
            cancelled
        },
        headers: { Authorization: `Bearer ${token}` }
    };

    // delete all undefined/null fields from config.data
    config.data = Object.fromEntries(
        Object.entries(config.data).filter(([key, value]) => value != null)
    );

    try {
        return await axios.put(
            process.env.REACT_APP_API_URL + '/ta/course/' + courseId + '/interview/change',
            config
        );
    } catch (err) {
        return err.response;
    }
};

let TaApi = {
    // Task related
    all_tasks,

    // Group related
    check_group,
    allGroups,

    // Interview related
    all_interviews,
    schedule_interview,
    delete_interview,
    changeInterview
};

export default TaApi;
