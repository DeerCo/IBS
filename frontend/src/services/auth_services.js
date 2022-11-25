import axios from "axios";
const API_URL = "http://localhost:3000/";

const register = (username, password, email) => {
    return axios.post(API_URL + "register", {
      username,
      password,
      email,
    });
  };

const login = (username, password) => {
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

const tasks = (courseid) => {
  // get the token
  const token = localStorage.getItem("token"); 
  // setting config
  const config = {
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

const grades = (courseid, curr_task) => {
  // get the token
  const token = localStorage.getItem("token"); 
  // setting config
  const config = {
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

const files = (courseid, curr_task) => {
  // get the token
  const token = localStorage.getItem("token"); 
  // setting config
  const config = {
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



const download = (courseid, task, file_id, file_name) => {
  // get the token
  const token = localStorage.getItem("token"); 
  // setting config
  const config = {
      headers: { Authorization: `Bearer ${token}` },
      params: {task: task, file_id: file_id},
  };
  return axios.
  get(API_URL + "course/" + courseid + "/file/retrieve", config).then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file_name); //or any other extension
    document.body.appendChild(link);
    link.click();
});
};



const AuthService = {
    register,
    login,
    tasks,
    grades,
    files,
    download,
  };
  
  export default AuthService;