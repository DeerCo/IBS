import React, { useState, useRef, useEffect} from "react";
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


    // call the service function
    //let result=await AuthService.booked_interviews(course_id, curr_task);

    let [s, sets] = useState({});
    let [e, sete] = useState({});
    let [l, setl] = useState({});
    let [message, setMessage] = useState("");
    let [booked, setb] = useState(false);
    let [selected, setSelect] = useState(false);

    let [fetch, setFetch] = useState("");


	useEffect(() => {
		AuthService.booked_interviews(course_id, curr_task).then(
			(result) => {

                AuthService.interviews(course_id, curr_task).then(
                    (result2) => {
                        if (result.message !== "You don't have a booked interview for a1 yet."){
                            sets(result.start_time);
                            sete(result.end_time);
                            setl(result.location);
                            setb(true);
                        }else{
                            setb(false);
                        }

                        
                        
                        if (result2.message !== "No interview is available."){
                            setFetch(result2);
                        }
                    }
                )
			},
			(error) => {
			})

	}, []);



    // the book interview function
    let book_interviews = (task, time, location) => {  

        // some issue with the time parsing since it converts it into 12 hours
        
        let parse = moment(time).format('YYYY-MM-DD HH:mm:ss');
  
       // call the service function
       AuthService.book_interviews(course_id, task, parse, location).then(
         (result) => {
             // print out book sucessful message on the screen
           console.log(result);
           window.location.reload(false);
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



    // the cancel interview function 
    let cancel_interviews = (task) => {  
  
        // call the service function
        AuthService.cancel_interviews(course_id, task).then(
            (result) => {
                // print out cancel sucessful message on the screen
                console.log(result);
                window.location.reload(false);
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


    // get all the json from localstorage
    let interviews = fetch.availability;
    console.log(interviews);

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
                },
                backgroundColor: 'green'
            };
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

    // push the booked interview in to the times array with a different color
    if (booked){
        let b_start = s.replace(" ", "T");
        let b_end = e.replace(" ", "T");
        let curr = { 
            start: b_start, 
            end: b_end, 
            extendedProps: {
                location: l
            },
            backgroundColor: 'red'
        };
    
        times.push(curr);
    }
   

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
                        initialView="dayGridMonth"
                        // comment this back when the interview is there
                        // initialDate={first}
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
                            setMessage("");
                            setOpen(!open);
                            if (info.event.backgroundColor == 'red'){
                                setSelect(true);
                            }else{
                                setSelect(false);
                            }
                            
                        }
                        }
                            />
                    </div>
                    <div className="col-1"></div>
                    <div className="col-3 row">   

                    {booked && (
                        <p className="pb-3 mb-3 mt-2 small lh-sm border-bottom w-100">
                        <strong className="d-block text-gray-dark">You Already Booked an Interview at </strong>
                        {s} at {l}
                        </p>
                    )}
                     
                        
                    {open && (
    
                        <div class="col-12 rounded  mt-2 ">
                            
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
                                <div className="d-flex">
                                    {!selected && (
                                    <button type="button" className="btn btn-secondary mt-4 col-12" onClick={() => {book_interviews(curr_task, start, location)}}>
                                        Book
                                    </button>
                                    )}

                                    {selected && (
                                    <button type="button" className="btn btn-secondary mt-4 col-12" onClick={() => {cancel_interviews(curr_task)}}>
                                        Cancel
                                    </button>
                                    )}
                                </div>
                                <p  className="pb-3 mt-3 mb-0 small lh-sm border-bottom w-100">
                                {message}
                                </p>
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