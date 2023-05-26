import axios from 'axios';

// Accessible to any of TA/Instructor/Admin

let get_students_in_course = async (course_id) => {
    let token = sessionStorage.getItem('token');

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        // TODO: Endpoint missing
        return await axios.get(
            process.env.REACT_APP_API_URL + 'TODO: FIGURE OUT THE ENDPOINT',
            config
        );
    } catch (err) {
        return err.response;
    }
};

// Accessible to any of Instructor/Admin

// Accessible to any of TA/Admin

const StaffApi = {
    get_students_in_course
};

export default StaffApi;
