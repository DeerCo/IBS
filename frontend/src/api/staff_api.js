import axios from 'axios';

// Accessible to any of TA/Instructor/Admin

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

const StaffApi = {
    get_students_in_course
};

export default StaffApi;
