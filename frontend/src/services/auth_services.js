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

// get all the booked interviews
let booked_interviews = (courseid, curr_task) => {
  // get the token
  let token = localStorage.getItem("token"); 
  // setting config
  let config = {
      headers: { Authorization: `Bearer ${token}` },
      params: {task: curr_task},
  };
  return axios
    .get(API_URL + "course/" + courseid + "/interview/check",  config)
    .then((response) => {
      // if (response.data.accessToken) {
      //   localStorage.setItem("user", JSON.stringify(response.data));
      // }
      return response.data;
    });
};

// book an interview
// time in formate of 2022-12-30 16:00:00
let book_interviews = (courseid, curr_task, time, location) => {
  // get the token
  let token = localStorage.getItem("token"); 
  console.log(curr_task, time, location);
  
  return axios
    .post(API_URL + "course/" + courseid + "/interview/book", {curr_task, time, location}, { headers: {Authorization: `Bearer ${token}` }})
    .then((response) => {
      return response.data;
    });
};

// cancel a currently booked interview
// this is a delete request
let cancel_interviews = (courseid, curr_task) => {
  // get the token
  let token = localStorage.getItem("token"); 
  // setting config

  return axios
    .delete(API_URL + "course/" + courseid + "/interview/cancel", {data: {task: curr_task},  headers: {Authorization: `Bearer ${token}` }} )
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
    booked_interviews,
    book_interviews,
    cancel_interviews,
  };
  
  export default AuthService;