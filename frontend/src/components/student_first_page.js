import React, { useState, useRef } from "react";
import { useNavigate, Link, useLocation} from 'react-router-dom';
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

const Frist = () => {
    const location = useLocation();
    const roles = location.state.roles;
    const token = location.token;

      return (
        <>
        

        <div>

            <nav id="navbar">
            <div id="inner">

                <a href="#">
                    <p className="logo2">IBS</p>
                </a>

                <Link className="button" to="/Login"> Logout </Link>

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
                                            <a href="student_file_page.html"><button type="button" className="btn btn-sm btn-outline-secondary">Files</button></a>
                                            <Link to="/gradePage"><button type="button" className="btn btn-sm btn-outline-secondary">Grades</button></Link>
                                            <a href="student_interview_page.html"><button type="button" className="btn btn-sm btn-outline-secondary">Interview</button></a>
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