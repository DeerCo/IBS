import React, { useState, useRef } from "react";
import { useNavigate, Link, useLocation} from 'react-router-dom';
import Form from "react-validation/build/form";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';
import '../styles/prism.css';

import AuthService from "../services/auth_services";



let Tasks = () => {
    let navigate = useNavigate();
    
    // get all the json from localstorage
    let fetch = JSON.parse(localStorage.getItem("tasks")); 
    let tasks = fetch.task;
    
     // get username from localstorage
     let username = localStorage.getItem("username");

    // navigate to new page when student select a assignment
    let grades = (task) => {  
        // update task in localstorage
       localStorage.setItem('task', task);

        // get courseid from localstorage
        let courseid = localStorage.getItem("courseid");

        // call the service function
        AuthService.grades(courseid, task).then(
          (result) => {
            localStorage.setItem('grades', JSON.stringify(result));
            navigate("/gradePage");
            
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

    // navigate to new page to get all the available files
    let files = (task) => {  
       // update task in localstorage
       localStorage.setItem('task', task);

      // get courseid from localstorage
      let courseid = localStorage.getItem("courseid");

      // call the service function
      AuthService.files(courseid, task).then(
        (result) => {
          localStorage.setItem('files', JSON.stringify(result));
          navigate("/filePage");
          
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

    // navigate to new page to get all the available interviews
    let interviews = (task) => {  
      // update task in localstorage
      localStorage.setItem('task', task);

     // get courseid from localstorage
     let courseid = localStorage.getItem("courseid");

     // call the service function
     AuthService.interviews(courseid, task).then(
       (result) => {
         localStorage.setItem('interviews', JSON.stringify(result));
         navigate("/interviewPage");
         
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

                        {tasks.map(d => (
                            <div className="col" key={d.task}>
                                <div className="card shadow-sm m-3">
                                    
                                    <div className="card-body">
                                        <h3 className="card-text mb-3">{d.task}</h3>
                                        <p className="card-text">due date: </p>
                                        <p className="card-text">{d.due_date}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <button type="button" onClick={() => {files(d.task)}} className="btn btn-sm btn-outline-secondary">Details</button>
                                                <button type="button" onClick={() => {grades(d.task)}} className="btn btn-sm btn-outline-secondary">Grades</button>
                                                <button type="button" onClick={() => {interviews(d.task)}} className="btn btn-sm btn-outline-secondary">Interviews</button>
                                            </div>
                                            <small className="text-muted">max group members:{d.max_member}</small>
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

  
export default Tasks;