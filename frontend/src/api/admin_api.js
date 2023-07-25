import axios from 'axios';

let all_courses = async () => {
    let token = sessionStorage.getItem('token');

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        return await axios.get(process.env.REACT_APP_API_URL + '/admin/course/all', config);
    } catch (err) {
        return err.response;
    }
};

let impersonate = async (username) => {
    let token = sessionStorage.getItem('token');

    const data = {
        username: username
    };

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };


    try {
        return await axios.post(process.env.REACT_APP_API_URL + '/admin/impersonate', data, config);
    } catch (err) {
        return err.response;
    }
};

let add_course = async (data) => {
    let token = sessionStorage.getItem('token');

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    // let data = {
    //   course_code: course_code,
    //   course_session: course_session,
    //   gitlab_group_id: gitlab_group_id,
    //   default_token_count: default_token_count,
    //   token_length: token_length,
    //   hidden: hidden
    // }

    try {
        return await axios.post(process.env.REACT_APP_API_URL + '/admin/course/add', data, config);
    } catch (err) {
        return err.response;
    }
};

let change_course = async (data) => {
    let token = sessionStorage.getItem('token');

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    // let data = {
    //   course_id: course_id,
    //   course_code: course_code,
    //   course_session: course_session,
    //   gitlab_group_id: gitlab_group_id,
    //   default_token_count: default_token_count,
    //   token_length: token_length,
    //   hidden: hidden
    // }

    try {
        return await axios.put(
            process.env.REACT_APP_API_URL + '/admin/course/change',
            data,
            config
        );
    } catch (err) {
        return err.response;
    }
};

let get_role = async (username) => {
    let token = sessionStorage.getItem('token');

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        return await axios.get(
            process.env.REACT_APP_API_URL + '/admin/role/get?username=' + username,
            config
        );
    } catch (err) {
        return err.response;
    }
};

let add_role = async (data) => {
    let token = sessionStorage.getItem('token');

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        return await axios.post(process.env.REACT_APP_API_URL + '/admin/role/add', data, config);
    } catch (err) {
        return err.response;
    }
};

let upload_role = async (formData) => {
    let token = sessionStorage.getItem('token');

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        return await axios.post(
            `${process.env.REACT_APP_API_URL}/admin/role/upload`,
            formData,
            config
        );
    } catch (err) {
        return err.response;
    }
};

let delete_role = async (data) => {
    let token = sessionStorage.getItem('token');

    let config = {
        headers: { Authorization: `Bearer ${token}` },
        data: data
    };

    try {
        return await axios.delete(process.env.REACT_APP_API_URL + '/admin/role/delete', config);
    } catch (err) {
        return err.response;
    }
};

let AdminApi = {
    all_courses,
    add_course,
    change_course,
    get_role,
    add_role,
    upload_role,
    delete_role,
    impersonate
};

export default AdminApi;
