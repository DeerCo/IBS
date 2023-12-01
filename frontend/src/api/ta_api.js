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

let TaApi = {
    // Task related
    all_tasks,

    // Group related
    allGroups
};

export default TaApi;
