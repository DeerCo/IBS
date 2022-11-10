import React, { useState, useRef } from "react";
import { useNavigate, Link} from 'react-router-dom';
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

const Register = () => {
    let navigate = useNavigate();
  
    const form = useRef();
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
  
    const onChangeUsername = (e) => {
      const username = e.target.value;
      setUsername(username);
    };
  
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const handleLogin = (e) => {
        e.preventDefault();
    
        setMessage("");
    
        form.current.validateAll();
        AuthService.register(username, password, email).then(
          () => {
            navigate("/login");
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

                     <input type="text" 
                     id="email" 
                     className="mt-3 fadeIn third" 
                     name="email" 
                     placeholder="email"
                     value={email}
                     onChange={onChangeEmail}
                     validations={[required]}
                     />

                      <input type="submit" className="m-4 fadeIn fourth" value="Register"/>

                      {message && (
                      <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                      {message}
                      </div>
                      </div>
                      )}

                  </Form>

                  <div id="formFooter">
                      
                      <a className="underlineHover"><Link to="/login"> Log In </Link></a>
                  </div>

              </div>
          </div>
        </div>
      );
};

  
export default Register;