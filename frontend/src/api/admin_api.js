import axios from "axios";

let all_courses = async () => {
  let token = sessionStorage.getItem("token");

  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    return await axios.get(process.env.REACT_APP_API_URL + "/admin/course/all", config);
  } catch (err) {
    return err.response;
  }
}

let add_course = async (course_code, course_session, gitlab_group_id, default_token_count, token_length, hidden) => {
  let token = sessionStorage.getItem("token");

  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  let data = {
    course_code: course_code,
    course_session: course_session,
    gitlab_group_id: gitlab_group_id,
    default_token_count: default_token_count,
    token_length: token_length,
    hidden: hidden
  }

  try {
    return await axios.post(process.env.REACT_APP_API_URL + "/admin/course/add", data, config);
  } catch (err) {
    return err.response;
  }
}

let change_course = async (course_id, course_code, course_session, gitlab_group_id, default_token_count, token_length, hidden) => {
  let token = sessionStorage.getItem("token");

  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  let data = {
    course_id: course_id,
    course_code: course_code,
    course_session: course_session,
    gitlab_group_id: gitlab_group_id,
    default_token_count: default_token_count,
    token_length: token_length,
    hidden: hidden
  }

  try {
    return await axios.put(process.env.REACT_APP_API_URL + "/admin/course/change", data, config);
  } catch (err) {
    return err.response;
  }
}

let AdminApi = {
  all_courses,
  add_course,
  change_course
}

export default AdminApi;