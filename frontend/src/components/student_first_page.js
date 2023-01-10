import React, { useState, useRef } from "react";
import { useNavigate, Link, useLocation} from 'react-router-dom';
import Form from "react-validation/build/form";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css'


import AuthService from "../services/auth_services";



let Frist = () => {
    let navigate = useNavigate();
    // let location = useLocation();
    // let roles = location.state.roles;

    // get all the json from localstorage
    let fetch = JSON.parse(localStorage.getItem("roles")); 
    let roles = fetch.roles;

    // get username from localstorage
    let username = localStorage.getItem("username");

    // handle redirect to pages

    let tasks = (courseid) => {

        // update courseid in localstorage
        localStorage.setItem('courseid', courseid);

    
        AuthService.tasks(courseid).then(
          (result) => {
            localStorage.setItem('tasks', JSON.stringify(result));
            navigate("/taskPage");
            
          },
          (error) => {
            let resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            // setMessage(resMessage);
          }
        );
      
      };

      return (
        <>
        

        <div>

            <nav id="navbar">
            <div id="inner">

                <a href="#">
                    <Link className="logo2" to="/frontPage">IBS</Link>
                </a>
                <div className="d-flex justify-content-end">
                    <Link className="button mx-5" to="/frontPage"> {username} </Link>
                    <Link className="button" to="/Login"> Logout </Link>
                </div>
                

            </div>
            </nav>

            <div className="album py-5 bg-white">
                <div className="container mt-5">

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                    {roles.map(d => (
                        <div className="col" key={d.course_id}>
                            <div className="card shadow-sm m-3">
                                <img src={require("../images/" + d.course_code + ".png")} alt={d.course_code}/>

                                <div className="card-body">
                                    <p className="card-text">{d.course_session} {d.course_code}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button type="button" onClick={() => {tasks(d.course_id)}} className="btn btn-sm btn-outline-secondary">Assignments</button>
                                        </div>
                                        <small className="text-muted">course number {d.course_id}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))} 

                    </div>
                </div>
            </div>



            </div>
        </>



        
      );
};

  
export default Frist;