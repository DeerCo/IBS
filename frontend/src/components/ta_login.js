import React, { useState, useRef } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Form from "react-validation/build/form";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css'


import AuthService from "../services/auth_services";

let required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
};

let Login_TA = () => {
  

    let navigate = useNavigate();
  
    let form = useRef();
  
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [message, setMessage] = useState("");
  
    let onChangeUsername = (e) => {
      let username = e.target.value;
      setUsername(username);
    };
  
    let onChangePassword = (e) => {
      let password = e.target.value;
      setPassword(password);
    };

    let handleLogin = (e) => {
        e.preventDefault();
    
        setMessage("");
    
        form.current.validateAll();
        AuthService.login(username, password).then(
          (result) => {
            // update the token, roles and username inside localstorage
            localStorage.setItem('username', username);
            localStorage.setItem('ta_token', result.token);
            localStorage.setItem('roles', JSON.stringify(result));
            navigate("/interviewPage_ta");
            window.location.reload();
          },
          (error) => {
            let resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setMessage(resMessage);
          }
        );
      
      };

      return (
        <div>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <div className="wrapper fadeInDown">
              <div id="formContent">

                  <br/>
                  <div className="fadeIn first mt-2 logo">
                      <p>ADMIN</p>
                  </div>


                  <Form onSubmit={handleLogin} ref={form}>
                      <input type="text" 
                      id="login" 
                      className="mt-1 fadeIn second" 
                      name="login" 
                      placeholder="username"
                      value={username}
                      onChange={onChangeUsername}
                      validations={[required]} />

                      <input type="password" 
                      id="password" 
                      className="mt-3 fadeIn third" 
                      name="password" 
                      placeholder="password"
                      value={password}
                      onChange={onChangePassword}
                      validations={[required]}
                      />

                      <input type="submit" className="m-4 fadeIn fourth" value="Log In"/>

                      {message && (
                      <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                      {message}
                      </div>
                      </div>
                      )}

                  </Form>

                  <div id="formFooter">
                    <Link className="underlineHover" to="/Register"> Reset Password </Link>
                  </div>

              </div>
          </div>
        </div>
      );
};

  
export default Login_TA;