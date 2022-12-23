import React, { useState, useRef } from "react";
import { Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';
import '../styles/tab.css';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from "moment";

import AuthService from "../services/auth_services";




let Interview = () => {
    
    // get username from localstorage
    let username = localStorage.getItem("username");

     // get task from localstorage
     let curr_task = localStorage.getItem("task");

     // get course_id form localstorage
     let course_id = localStorage.getItem("courseid");

     // store the booked interview
     let booked = {};

    // call the service function
    //let result=await AuthService.booked_interviews(course_id, curr_task);

    AuthService.booked_interviews(course_id, curr_task).then(
        (result) => {
            // print out book sucessful message on the screen
          booked = result;
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



    // the book interview function
    let book_interviews = (task, time, location) => {  

        // some issue with the time parsing since it converts it into 12 hours
        
        let parse = moment(time).format('YYYY-MM-DD hh:mm:ss');
        console.log(parse);
  
       // call the service function
       AuthService.book_interviews(course_id, task, parse, location).then(
         (result) => {
             // print out book sucessful message on the screen
           console.log(result);
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


    // the cancel interview function 
    let cancel_interviews = (task) => {  
        console.log(booked);
  
        // call the service function
        AuthService.cancel_interviews(course_id, task).then(
            (result) => {
                // print out cancel sucessful message on the screen
                console.log(result);
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


    // get all the json from localstorage
    let fetch = JSON.parse(localStorage.getItem("interviews")); 
    let interviews = fetch.availability;
    //console.log(interviews);

    // create the json array
    let times = [];
    let first = "";

    for(var loc in interviews) {
        for (var time in interviews[loc]) {
            let curr = { 
                start: '', 
                end: '', 
                extendedProps: {
                    location: loc
                }
            };
            if (interviews[loc][time] === 1){
                let string = time.split(" - ");
                // set the defualt date for calender display
                if (first === ""){
                    first = string[0].split(" ")[0];
                }
                let start = string[0].replace(" ", "T");
                let end = string[1].replace(" ", "T");
                curr.start = start;
                curr.end = end;
                times.push(curr);
            }
        }
    }

    // push the booked interview in to the times array with a different color


    // track the time, location and task being selected.
    let [start, setStart] = useState("");
    let [end, setEnd] = useState("");
    let [location, setLocation] = useState("");
    let [task, setTask] = useState("");

    // the popup state
    let [open, setOpen] = useState(false);
  
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

                <div className="row card-box mt-3">
                    <div className="col-7" id='calendar'>
                        <FullCalendar
                        plugins={[ dayGridPlugin, interactionPlugin]}
                        initialView="dayGridWeek"
                        initialDate={first}
                        headerToolbar= {{
                            left: 'prev,next',
                            center: 'title',
                            right: 'dayGridWeek,dayGridMonth'
                            }}
                        events={times}

                        eventTimeFormat={{// like '14:30:00'
                            hour: '2-digit',
                            minute: '2-digit',
                            meridiem: true
                        }}
                        eventClick={function(info) {
                            // when click, update the value
                            setStart(info.event.start);
                            setEnd(info.event.end);
                            setLocation(info.event.extendedProps.location);
                            setTask(info.event.extendedProps.assignemnt);
                            // open the popup
                            setOpen(!open);
                            info.el.style.borderColor = 'red';
                            
                        }
                        }
                            />
                    </div>
                    <div className="col-1"></div>
                    <div className="col-3 mt-5 row">    
                        
                    {open && (
    
                        <div class="col-12 rounded">
                            
                            <div>
                                <h5 className="border-bottom pb-2 mb-2">Information</h5>
                                <div className="d-flex text-muted pt-3">
                                    <p className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                        <strong className="d-block text-gray-dark">Assignment</strong>
                                        {curr_task}
                                    </p>
                                </div>
                                <div className="d-flex text-muted pt-3">
                                    <p className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                        <strong className="d-block text-gray-dark">Start Time</strong>
                                        {moment(start).format('MM/DD/YYYY, h:mm:ss a')}
                                    </p>
                                </div>
                                <div className="d-flex text-muted pt-3">
                                    <p className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                        <strong className="d-block text-gray-dark">End Time</strong>
                                        {moment(end).format('MM/DD/YYYY, h:mm:ss a')}
                                    </p>
                                </div>
                                <div className="d-flex text-muted pt-3">
                                    <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                        <strong className="d-block text-gray-dark">Location</strong>
                                        <ul className="list-unstyled my-1">
                                            <li >{location}</li>
                                            <li><a href="https://zoom.us">https://utoronto.zoom.us/j/88160719150 (Passcode: 608000)</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="d-flex text-muted pt-3">
                                    <p className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                        <strong className="d-block text-gray-dark">Notes</strong>
                                        You must arrive at the zoom meeting on time
                                    </p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="button" className="btn btn-primary mt-4 col-5" onClick={() => {book_interviews(curr_task, start, location)}}>
                                        Book
                                    </button>
                                    <button type="button" className="btn btn-primary mt-4 col-5" onClick={() => {cancel_interviews(curr_task)}}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                        
                    </div>
                </div>
            </div>
        </>


      );
};

  
export default Interview;