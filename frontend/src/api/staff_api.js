import axios from 'axios';

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

const StaffApi = {
    get_students_in_course
};

export default StaffApi;
