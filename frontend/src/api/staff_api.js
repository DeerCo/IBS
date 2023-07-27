import axios from 'axios';
import http from './client';
import { INSTRUCTOR, TA } from '../Constants/roles';

// Accessible to any of TA/Instructor/Admin

let downloadSubmissions = async (courseId, task) => {
    const role = findRoleInCourse(courseId);

    try {
        return await http.get(`/${role}/course/${courseId}/submission/download?task=${task}`);
    } catch (err) {
        return err.response;
    }
};

let collectAllSubmissionsForTask = async (courseId, task, overwrite = false) => {
    const role = findRoleInCourse(courseId);
    try {
        return await http.post(`/${role}/course/${courseId}/submission/collect/all`, {
            task,
            overwrite
        });
    } catch (err) {
        return err.response;
    }
};

let collectOneSubmission = async (courseId, groupId, overwrite = false) => {
    const role = findRoleInCourse(courseId);
    try {
        return await http.post(`/${role}/course/${courseId}/submission/collect/one`, {
            group_id: groupId,
            overwrite
        });
    } catch (err) {
        return err.response;
    }
};

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

let getMarksForTask = async (courseId, taskId) => {
    const role = findRoleInCourse(courseId);
    if (role === INSTRUCTOR || role === TA) {
        try {
            const res = await http.get(`${role}/course/${courseId}/mark/all?task=${taskId}`);
            const { marks } = res.data;
            return marks;
        } catch (err) {
            return err.response;
        }
    } else {
        return null;
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

// Copies ALL groups from one task to another
let copyGroups = async (courseId, fromTask, toTask) => {
    let token = sessionStorage.getItem('token');

    const data = {
        courseId,
        fromTask,
        toTask
    };

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        return await axios.post(
            process.env.REACT_APP_API_URL + '/instructor/course/' + courseId + '/group/copy',
            data,
            config
        );
    } catch (err) {
        return err.response;
    }
};

let updateGroupExtension = async (courseId, groupId, extension) => {
    let token = sessionStorage.getItem('token');

    const data = {
        groupId,
        extension
    };

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        return await axios.put(
            process.env.REACT_APP_API_URL + '/instructor/course/' + courseId + '/group/extension',
            data,
            config
        );
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
 * Get current course's details for Admins and Instructors' use only.
 * @param courseId string
 * @returns {Promise<axios.AxiosResponse<any>|*|null>}
 */
const getCourseContent = async (courseId) => {
    let token = sessionStorage.getItem('token');

    const role = findRoleInCourse(courseId);

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let url = '';
    if (role === 'admin') {
        url = `${process.env.REACT_APP_API_URL}/admin/course/get?course_id=${courseId}`;
    } else if (role === 'instructor') {
        url = `${process.env.REACT_APP_API_URL}/instructor/course/${courseId}/get`;
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

const checkGroup = async (courseId, groupId) => {
    const token = sessionStorage.getItem('token');
    const role = findRoleInCourse(courseId);

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    if (role === 'instructor' || role === 'ta') {
        const url = `${process.env.REACT_APP_API_URL}/${role}/course/${courseId}/group/check?group_id=${groupId}`;
        try {
            return await axios.get(url, config);
        } catch (err) {
            return err.response;
        }
    } else return null;
};

/**
 * Get array of interview objects for staff
 * @param courseId current course ID
 * @param taskId current task ID
 * @returns {Promise<axios.AxiosResponse<any>|*|null>}
 */
const getAllInterviews = async (courseId, taskId) => {
    const token = sessionStorage.getItem('token');
    const role = findRoleInCourse(courseId);

    const axiosConfig = {
        headers: { Authorization: `Bearer ${token}` }
    };

    if (role === 'instructor' || role === 'ta') {
        const url = `${process.env.REACT_APP_API_URL}/${role}/course/${courseId}/interview/all?task=${taskId}`;
        try {
            return await axios.get(url, axiosConfig);
        } catch (err) {
            return err.response;
        }
    } else {
        // insufficient access
        return null;
    }
};

/**
 * Schedule an interview
 * @param course_id current course ID
 * @param curr_task current task ID
 * @param length length specified in minutes
 * @param time starting time
 * @param location location: "Online" or room
 * @returns {Promise<axios.AxiosResponse<any>|*>}
 */
let scheduleInterview = async (course_id, curr_task, length, time, location) => {
    let token = sessionStorage.getItem('token');
    const role = findRoleInCourse(course_id);

    const data = {
        task: curr_task,
        length: length.toString(),
        time: time.toString(),
        location: location
    };

    if (role === 'instructor' || role === 'ta') {
        const url = `${process.env.REACT_APP_API_URL}/${role}/course/${course_id}/interview/schedule`;
        try {
            return await axios.post(url, data, { headers: { Authorization: `Bearer ${token}` } });
        } catch (err) {
            return err.response;
        }
    } else return null;
};

/**
 * Delete interview from course/task
 * @param course_id current course ID
 * @param curr_task current task ID
 * @param id interview ID
 * @returns {Promise<axios.AxiosResponse<any>|*|null>}
 */
let deleteInterview = async (course_id, curr_task, id) => {
    let token = sessionStorage.getItem('token');
    const role = findRoleInCourse(course_id);

    let config = {
        data: { task: curr_task, interview_id: id.toString() },
        headers: { Authorization: `Bearer ${token}` }
    };

    if (role === 'instructor' || role === 'ta') {
        const url = `${process.env.REACT_APP_API_URL}/${role}/course/${course_id}/interview/delete`;
        try {
            return await axios.delete(url, config);
        } catch (err) {
            return err.response;
        }
    } else return null;
};

/**
 * Given the arguments (3rd and 4th have optional fields... i.e. can have null/undefined values),
 * call backend API to change interviews from corresponding "old" fields to "new" (set_) fields.
 * @param courseId current course id
 * @param task current task id
 * @param set_time new time for interview
 * @param set_group_id new group id for interview
 * @param set_length new length for interview
 * @param set_location new location for interview
 * @param set_note new note for interview
 * @param set_cancelled new cancelled field for interview
 * @param interview_id old interview id
 * @param booked old booked field for interview
 * @param time old (starting) time for interview
 * @param date old (starting) date for interview
 * @param group_id old group id for interview
 * @param length old interview length
 * @param location old location for interview
 * @param note old note for interview
 * @param cancelled old cancelled field for interview
 * @returns {Promise<axios.AxiosResponse<any>|*>}
 */
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

    const role = findRoleInCourse(courseId);
    if (role === 'instructor' || role === 'ta') {
        const url = `${process.env.REACT_APP_API_URL}/${role}/course/${courseId}/interview/change`;
        try {
            return await axios.put(url, config);
        } catch (err) {
            return err.response;
        }
    } else return null;
};


const StaffApi = {
    get_students_in_course,
    getAllMarks,
    getMarksForTask,

    getAllTaskGroups,
    addTaskGroup,
    changeTaskGroup,
    deleteTaskGroup,

    getCriteriaForTask,
    all_tasks,
    copyGroups,
    getCourseContent,

    collectAllSubmissionsForTask,
    collectOneSubmission,
    downloadSubmissions,

    checkGroup,

    getAllInterviews,
    scheduleInterview,
    deleteInterview,
    changeInterview
};

export default StaffApi;
