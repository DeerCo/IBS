import axios from "axios";

let all_tasks = async (course_id) => {
  let token = localStorage.getItem("token");

  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    return await axios.get(
      process.env.REACT_APP_API_URL + "/course/" + course_id + "/task/all",
      config
    );
  } catch (err) {
    return err.response;
  }
};

let get_mark = async (course_id, task) => {
  let token = localStorage.getItem("token");

  let config = {
    headers: { Authorization: `Bearer ${token}` },
    params: { task: task },
  };

  try {
    return await axios.get(
      process.env.REACT_APP_API_URL + "/course/" + course_id + "/mark",
      config
    );
  } catch (err) {
    return err.response;
  }
};

let all_files = async (course_id, curr_task) => {
  let token = localStorage.getItem("token");

  let config = {
    headers: { Authorization: `Bearer ${token}` },
    params: { task: curr_task },
  };

  try {
    return await axios.get(
      process.env.REACT_APP_API_URL + "/course/" + course_id + "/file/all",
      config
    );
  } catch (err) {
    return err.response;
  }
};

let download_file = async (course_id, task, file_id, file_name) => {
  let token = localStorage.getItem("token");

  let config = {
    headers: { Authorization: `Bearer ${token}` },
    params: { task: task, file_id: file_id },
  };

  try {
    let response = await axios.get(
      process.env.REACT_APP_API_URL + "/course/" + course_id + "/file/retrieve",
      config
    );
    let temp_url = window.URL.createObjectURL(new Blob([response.data]));
    let link = document.createElement("a");
    link.href = temp_url;
    link.setAttribute("download", file_name); //or any other extension
    document.body.appendChild(link);
    link.click();
    return response;
  } catch (err) {
    return err.response;
  }
};

let available_interviews = async (course_id, curr_task) => {
  let token = localStorage.getItem("token");

  let config = {
    headers: { Authorization: `Bearer ${token}` },
    params: { task: curr_task },
  };

  try {
    return await axios.get(
      process.env.REACT_APP_API_URL +
        "/course/" +
        course_id +
        "/interview/available",
      config
    );
  } catch (err) {
    return err.response;
  }
};

let check_interview = async (course_id, curr_task) => {
  let token = localStorage.getItem("token");

  let config = {
    headers: { Authorization: `Bearer ${token}` },
    params: { task: curr_task },
  };

  try {
    return await axios.get(
      process.env.REACT_APP_API_URL +
        "/course/" +
        course_id +
        "/interview/check",
      config
    );
  } catch (err) {
    return err.response;
  }
};

let book_interview = async (course_id, curr_task, time, location) => {
  let token = localStorage.getItem("token");

  const data = {
    task: curr_task,
    time: time,
    location: location,
  };

  try {
    return await axios.post(
      process.env.REACT_APP_API_URL +
        "/course/" +
        course_id +
        "/interview/book",
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    return err.response;
  }
};

let change_interview = async (course_id, curr_task, time, location) => {
  let token = localStorage.getItem("token");

  const data = {
    task: curr_task,
    time: time,
    location: location,
  };

  try {
    return await axios.put(
      process.env.REACT_APP_API_URL +
        "/course/" +
        course_id +
        "/interview/change",
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    return err.response;
  }
};

let cancel_interview = async (course_id, curr_task) => {
  let token = localStorage.getItem("token");

  try {
    return await axios.delete(
      process.env.REACT_APP_API_URL +
        "/course/" +
        course_id +
        "/interview/cancel",
      {
        data: { task: curr_task },
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    return err.response;
  }
};

let check_group = async (course_id, curr_task) => {
  let token = localStorage.getItem("token");
  try {
    return await axios.get(
      process.env.REACT_APP_API_URL +
        "/course/" +
        course_id +
        "/group/check?task=" +
        curr_task,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    return err.response;
  }
};

let details = async (course_id, curr_task) => {
  let token = localStorage.getItem("token");
  try {
    return await axios.get(
      process.env.REACT_APP_API_URL +
        "course/" +
        course_id +
        "/submission/check?task=" +
        curr_task,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    return err.response;
  }
};

let invite = async (course_id, group_id, username) => {
  let token = localStorage.getItem("token");
  try {
    return await axios.post(
      process.env.REACT_APP_API_URL + "/course/" + course_id + "/group/invite",
      { group_id: group_id, username: username },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    return err.response;
  }
};

let uninvite = async (course_id, group_id, username) => {
  let token = localStorage.getItem("token");
  try {
    return await axios.delete(
      process.env.REACT_APP_API_URL +
        "/course/" +
        course_id +
        "/group/disinvite",
      { group_id: group_id, username: username },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    return err.response;
  }
};

const handleCreate = async (course_id, curr_task) => {
  let token = localStorage.getItem("token");
  try {
    return await axios.post(
      process.env.REACT_APP_API_URL + "/course/" + course_id + "/group/create",
      { task: curr_task },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    return err.response;
  }
};

let accept = async (course_id, group_id) => {
  let token = localStorage.getItem("token");
  try {
    return await axios.put(
      process.env.REACT_APP_API_URL + "course/" + course_id + "/group/accept",
      {
        course_id: course_id,
        group_id: group_id,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    return err.response;
  }
};

let reject = async (course_id, group_id) => {
  let token = localStorage.getItem("token");
  try {
    return await axios.delete(
      process.env.REACT_APP_API_URL + "course/" + course_id + "/group/reject",
      {
        course_id: course_id,
        group_id: group_id,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    return err.response;
  }
};

// axios
//   .post(
//     API_URL + "course/" + course_id + "/group/create",
//     { task: "a1" },
//     config
//   )
//   .then((response) => {
//     axios
//       .get(
//         API_URL + "course/" + course_id + "/group/check?task=" + "a1",
//         config
//       )
//       .then((response) => {
//         changeGroup(response.data.group_id);
//       });
//   });

let StudentApi = {
  // Task related
  all_tasks,

  // Mark related
  get_mark,

  // File related
  all_files,
  download_file,

  // Interview related
  available_interviews,
  check_interview,
  book_interview,
  change_interview,
  cancel_interview,

  //Group related
  check_group,
  details,
  invite,
  uninvite,
  handleCreate,
  accept,
  reject,
};

export default StudentApi;
