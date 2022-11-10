import React, { useState, useRef } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Form from "react-validation/build/form";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css'


import AuthService from "../services/auth_services";

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
};

const Login = () => {
    let navigate = useNavigate();
  
    const form = useRef();
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
  
    const onChangeUsername = (e) => {
      const username = e.target.value;
      setUsername(username);
    };
  
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();
    
        setMessage("");
    
        form.current.validateAll();
        AuthService.login(username, password).then(
          () => {
            navigate("/register");
            window.location.reload();
          },
          (error) => {
            const resMessage =
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
                      <p>IBS</p>
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
                    <a className="underlineHover"><Link to="/Register"> Register </Link></a>
                  </div>

              </div>
          </div>
        </div>
      );
};

  
export default Login;