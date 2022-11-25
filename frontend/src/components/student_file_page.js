import React, { useState, useRef } from "react";
import { useNavigate, Link, useLocation} from 'react-router-dom';
import Form from "react-validation/build/form";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';
import '../styles/prism.css';
import Prism from "prismjs";
import { useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

import AuthService from "../services/auth_services";




const Files = () => {
    let navigate = useNavigate();

    // get username from localstorage
    const username = localStorage.getItem("username");
    
    // get all the json from localstorage
    const fetch = JSON.parse(localStorage.getItem("files")); 
    const files = fetch.files;

    // download the file
    const download = (file_id, file_name) => {  
        // get courseid from localstorage
        const courseid = localStorage.getItem("courseid");

        // get task from localstorage
        const task = localStorage.getItem("task");

        // call the service function
        AuthService.download(courseid, task, file_id, file_name).then(
          (result) => {
            console.log("downloaded");
            
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            // setMessage(resMessage);
          }
        );
      
      };

      // download all of the selected files
      const download_all = () => {
        console.log(check);
        check.map(check => {
            download(check.id, check.name);
        })
      }

      // storage for the cheked box

      // state holder
      const initialState = [];
      const [check, setCheck] = useState(initialState);


      // handle click
      const handleClick = (id, name) => {
        // check if the value is stored already
        const isFound = check.some(check => {
            if (check.id === id) {
              return true;
            }
            return false;
          });
        // update the states
        if (!isFound) { // this click was to check the box
            setCheck(current => [...current, {id:id, name: name}]);
        }else{
            updateState(id);
        }
        console.log(check);
            
      };

      // update value
      const updateState = (id) => {
        setCheck((current) =>
        current.filter((curr) => curr.id !== id)
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

              <div className="divider"> </div>

              <div className="card-box row">
                <div className= "col-5 tasks2">
                  <ol className="list-group list-unstyled">
                    <li className="d-flex justify-content-between flex-row mb-1">
                      <div className="ms-2 me-auto">
                          <div className="fw-bold">File name</div>
                      </div>
                      <span className="fw-bold">Download</span>
                     </li>
                  {files.map((e) => (
                      <li className="list-group-item flex-row" key={e.file_id}>
                        <div className=" d-flex justify-content-between">
                        <span className="badge bg-success rounded-pill mt-1">{e.file_name.split("/")[2]}</span>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" onChange={() =>{handleClick(e.file_id, e.file_name) }}/>
                        </div>
                        </div>
                      </li>
                  ))} 
                  <button type="button" onClick={download_all} className="btn mt-2 btn-sm btn-outline-secondary">download</button>
                  </ol>
                </div>
                </div>



            </div>
            
        </>

      );
};

  
export default Files;