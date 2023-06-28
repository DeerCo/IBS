import axios from 'axios';

// Accessible to any of TA/Instructor/Admin

let all_tasks = async (course_id) => {
    let token = sessionStorage.getItem('token');

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const role = findRoleInCourse(course_id);
    let url;
    if (role === 'admin') {
        url = `${process.env.REACT_APP_API_URL}/admin/course/${course_id}/task/all`;
    } else if (role === 'instructor') {
        url = `${process.env.REACT_APP_API_URL}/instructor/course/${course_id}/task/all`;
    } else {
        // in this case role === 'ta'
        url = `${process.env.REACT_APP_API_URL}/ta/course/${course_id}/task/all`;
    }

    try {
        return await axios.get(url, config);
    } catch (err) {
        return err.response;
    }
};

/**
 *
 * @param courseId
 * @returns {Promise<axios.AxiosResponse<any>|*>}
 */
let get_students_in_course = async (courseId) => {
    let token = sessionStorage.getItem('token');

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const role = findRoleInCourse(courseId);
    let url;
    if (role === 'admin') {
        url = `${process.env.REACT_APP_API_URL}/admin/role/get?course_id=${courseId}`;
    } else if (role === 'instructor') {
        url = `${process.env.REACT_APP_API_URL}/instructor/course/${courseId}/role/get`;
    } else {
        // in this case role === 'ta'
        url = `${process.env.REACT_APP_API_URL}/ta/course/${courseId}/role/get`;
    }

    try {
        return await axios.get(url, config);
    } catch (err) {
        return err.response;
    }
};

// Accessible to any of Instructor/Admin

// Accessible to any of TA/Admin

// Accessible to TA/Instructor
let getCriteriaForTask = async (courseId, task) => {
    let token = sessionStorage.getItem('token');

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const role = findRoleInCourse(courseId);
    let url;
    if (role === 'instructor') {
        url = `${process.env.REACT_APP_API_URL}/instructor/course/${courseId}/criteria/all?task=${task}`;
    } else {
        // in this case role === 'ta'
        url = `${process.env.REACT_APP_API_URL}/ta/course/${courseId}/criteria/all?task=${task}`;
    }

    try {
        return await axios.get(url, config);
    } catch (err) {
        return err.response;
    }
};

// Helpers
export const findRoleInCourse = (courseId) => {
    const rolesStr = sessionStorage.getItem('roles');
    if (!rolesStr) return null;

    const roles = JSON.parse(rolesStr);

    for (const course of roles) {
        if (parseInt(course.course_id) === parseInt(courseId)) return course.role;
    }

    return null;
};

export const findCourseCodeInCourse = (courseId) => {
    const rolesStr = sessionStorage.getItem('roles');
    if (!rolesStr) return null;

    const roles = JSON.parse(rolesStr);

    for (const course of roles) {
        if (parseInt(course.course_id) === parseInt(courseId)) return course.course_code;
    }

    return null;
};

/**
 * Get all marks endpoint for Admins and Instructors' use only.
 * @param courseId string
 * @returns {Promise<axios.AxiosResponse<any>|*>}
 */
let getAllMarks = async (courseId) => {
    let token = sessionStorage.getItem('token');

    const role = findRoleInCourse(courseId);

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let url = '';
    if (role === 'admin') {
        url = `${process.env.REACT_APP_API_URL}/admin/course/${courseId}/mark/all`;
    } else if (role === 'instructor') {
        url = `${process.env.REACT_APP_API_URL}/instructor/course/${courseId}/mark/all`;
    } else {
        // insufficient access
        return null;
    }

    try {
        return await axios.get(url, config);
    } catch (err) {
        return err.response;
    }
};

/**
 * GET All task group (Instructors + Admins)
 * @param courseId string
 * @returns {Promise<axios.AxiosResponse<any>|*|null>}
 */
let getAllTaskGroups = async (courseId) => {
    const token = sessionStorage.getItem('token');

    const role = findRoleInCourse(courseId);

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let url = '';
    if (role === 'admin') {
        url = `${process.env.REACT_APP_API_URL}/admin/course/${courseId}/task_group/all`;
    } else if (role === 'instructor') {
        url = `${process.env.REACT_APP_API_URL}/instructor/course/${courseId}/task_group/all`;
    } else {
        // insufficient access
        return null;
    }

    try {
        return await axios.get(url, config);
    } catch (err) {
        return err.response;
    }
};

/**
 * POST Add task group (Instructors + Admins)
 * @param courseId string
 * @param maxTokens number
 * @returns {Promise<axios.AxiosResponse<any>|*|null>}
 */
let addTaskGroup = async (courseId, maxTokens) => {
    const token = sessionStorage.getItem('token');

    const role = findRoleInCourse(courseId);

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let url = '';
    if (role === 'admin') {
        url = `${process.env.REACT_APP_API_URL}/admin/course/${courseId}/task_group/add`;
    } else if (role === 'instructor') {
        url = `${process.env.REACT_APP_API_URL}/instructor/course/${courseId}/task_group/add`;
    } else {
        // insufficient access
        return null;
    }

    try {
        return await axios.post(url, { max_token: maxTokens }, config);
    } catch (err) {
        return err.response;
    }
};

/**
 * PUT Change task group (Instructors + Admins)
 * @param courseId string
 * @param taskGroupId string
 * @param newMaxTokens number
 * @returns {Promise<axios.AxiosResponse<any>|*|null>}
 */
let changeTaskGroup = async (courseId, taskGroupId, newMaxTokens) => {
    const token = sessionStorage.getItem('token');

    const role = findRoleInCourse(courseId);

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let url = '';
    if (role === 'admin') {
        url = `${process.env.REACT_APP_API_URL}/admin/course/${courseId}/task_group/change`;
    } else if (role === 'instructor') {
        url = `${process.env.REACT_APP_API_URL}/instructor/course/${courseId}/task_group/change`;
    } else {
        // insufficient access
        return null;
    }

    try {
        return await axios.put(
            url,
            { task_group_id: taskGroupId, max_token: newMaxTokens },
            config
        );
    } catch (err) {
        return err.response;
    }
};

/**
 * DELETE Delete task group (Instructors + Admins)
 * @param courseId string
 * @param taskGroupId string
 * @returns {Promise<axios.AxiosResponse<any>|*|null>}
 */
let deleteTaskGroup = async (courseId, taskGroupId) => {
    const token = sessionStorage.getItem('token');

    const role = findRoleInCourse(courseId);

    const config = {
        headers: { Authorization: `Bearer ${token}` },
        data: { task_group_id: taskGroupId }
    };

    let url = '';
    if (role === 'admin') {
        url = `${process.env.REACT_APP_API_URL}/admin/course/${courseId}/task_group/delete`;
    } else if (role === 'instructor') {
        url = `${process.env.REACT_APP_API_URL}/instructor/course/${courseId}/task_group/delete`;
    } else {
        // insufficient access
        return null;
    }

    try {
        return await axios.delete(url, config);
    } catch (err) {
        return err.response;
    }
};

const StaffApi = {
    get_students_in_course,
    getAllMarks,

    getAllTaskGroups,
    addTaskGroup,
    changeTaskGroup,
    deleteTaskGroup,

    getCriteriaForTask,
    all_tasks
};

export default StaffApi;
