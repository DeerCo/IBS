import axios from "axios";
const API_URL = "http://localhost:3000/auth/";

const register = (username, password, email) => {
    return axios.post(API_URL + "register", {
      username,
      password,
      email,
    });
  };

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
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

const AuthService = {
    register,
    login,
  };
  
  export default AuthService;