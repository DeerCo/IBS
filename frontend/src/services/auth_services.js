import axios from "axios";
let API_URL = "http://localhost:3000/";

let register = (username, password, email) => {
    return axios.post(API_URL + "auth/register", {
      username,
      password,
      email,
    });
  };

let login = (username, password) => {
  return axios
    .post(API_URL + "auth/login", {
      username,
      password,
    })
    .then((response) => {
      // if (response.data.accessToken) {
      //   localStorage.setItem("user", JSON.stringify(response.data));
      // }
      console.log(response.data);
      return response.data;
    });
};

let tasks = (courseid) => {
  // get the token
  let token = localStorage.getItem("token"); 
  // setting config
  let config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  return axios
    .get(API_URL + "course/" + courseid + "/task/all", config)
    .then((response) => {
      // if (response.data.accessToken) {
      //   localStorage.setItem("user", JSON.stringify(response.data));
      // }
      return response.data;
    });
};

let grades = (courseid, curr_task) => {
  // get the token
  let token = localStorage.getItem("token"); 
  // setting config
  let config = {
      headers: { Authorization: `Bearer ${token}` },
      params: {task: curr_task},
  };
  return axios
    .get(API_URL + "course/" + courseid + "/mark",  config)
    .then((response) => {
      // if (response.data.accessToken) {
      //   localStorage.setItem("user", JSON.stringify(response.data));
      // }
      return response.data;
    });
};

let files = (courseid, curr_task) => {
  // get the token
  let token = localStorage.getItem("token"); 
  // setting config
  let config = {
      headers: { Authorization: `Bearer ${token}` },
      params: {task: curr_task},
  };
  return axios
    .get(API_URL + "course/" + courseid + "/file/all",  config)
    .then((response) => {
      // if (response.data.accessToken) {
      //   localStorage.setItem("user", JSON.stringify(response.data));
      // }
      return response.data;
    });
};

let interviews = (courseid, curr_task) => {
  // get the token
  let token = localStorage.getItem("token"); 
  // setting config
  let config = {
      headers: { Authorization: `Bearer ${token}` },
      params: {task: curr_task},
  };
  return axios
    .get(API_URL + "course/" + courseid + "/interview/all",  config)
    .then((response) => {
      // if (response.data.accessToken) {
      //   localStorage.setItem("user", JSON.stringify(response.data));
      // }
      return response.data;
    });
};



let download = (courseid, task, file_id, file_name) => {
  // get the token
  let token = localStorage.getItem("token"); 
  // setting config
  let config = {
      headers: { Authorization: `Bearer ${token}` },
      params: {task: task, file_id: file_id},
  };
  return axios.
  get(API_URL + "course/" + courseid + "/file/retrieve", config).then(response => {
    let url = window.URL.createObjectURL(new Blob([response.data]));
    let link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file_name); //or any other extension
    document.body.appendChild(link);
    link.click();
});
};



let AuthService = {
    register,
    login,
    tasks,
    grades,
    files,
    download,
    interviews,
  };
  
  export default AuthService;