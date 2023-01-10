import React, { useState, useRef, useEffect} from "react";
import { Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';
import '../styles/tab.css';

import FullCalendar, { identity } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from "moment";

import AuthService from "../services/auth_services";




let Interview_TA = () => {
    
    // get username from localstorage
    let username = localStorage.getItem("username");

     // get task from localstorage
     let curr_task = localStorage.getItem("task");

     // get course_id form localstorage
     let course_id = localStorage.getItem("courseid");


    // call the service function
    //let result=await AuthService.booked_interviews(course_id, curr_task);

    let [message, setMessage] = useState("");
    let [message2, setMessage2] = useState("");
    let [selected, setSelect] = useState(false);

    let [fetch, setFetch] = useState("");


	useEffect(() => {
		AuthService.all_interviews(course_id, curr_task).then(
			(result) => {
                setFetch(result.interviews);
			},
			(error) => {
			})

	}, []);



    // the book interview function
    // add task later into the ta input
    let schedule_interviews = (length, time) => {  

        // get course_id form localstorage
        let course_id = localStorage.getItem("courseid");

         // get task from localstorage
        let curr_task = localStorage.getItem("task");

       // call the service function
       AuthService.schedule_interviews(course_id, curr_task, length, time).then(
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
  
           setMessage2(resMessage);
         }
       );
     
     };  



    // the cancel interview function 
    let delete_interviews = (task, id) => {  
  
        // call the service function
        AuthService.delete_interviews(course_id, task, id).then(
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


    // get all data
    //console.log(fetch);

    // create the json array
    let times = [];

    for (let item in fetch){
        let now = fetch[item];
        let curr = { 
            start: '', 
            end: '', 
            extendedProps: {
                assignment: now.task,
                location: now.location,
                host: now.host,
                group_id: now.group_id,
                note: now.note,
                id: now.interview_id,
            },
            backgroundColor: 'green'
        };
        let start = now.toronto_time;
        start = start.replace(" ", "T");
        // let end = string[1].replace(" ", "T");
        curr.start = start;
        curr.end = start;
        times.push(curr);
    }

   

    // track the time, location and task being selected.
    let [start, setStart] = useState("");
    let [end, setEnd] = useState("");
    let [location, setLocation] = useState("");
    let [task, setTask] = useState("");
    let [host, setHost] = useState("");
    let [note, setNote] = useState("");
    let [id, setId] = useState("");

    // the popup state
    let [open, setOpen] = useState(false);

    // track the schedule time and date
    let [length, setLength] = useState("30");
    let [time, setTime] = useState("2023-01-18 16:00:00");

    let onChangeLength = (e) => {
        let length = e.target.value;
        setLength(length);
      };
    
      let onChangeTime = (e) => {
        let Time = e.target.value;
        setTime(Time);
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

                <div className="wrapper px-5 mx-3 w-75">

                    <div className="input-group">
                        <input type="text" 
                        id="time" 
                        className="m-2 w-25 h-25" 
                        name="time" 
                        placeholder="time eg.2023-01-18 16:00:00"
                        value={time}
                        onChange={onChangeTime} />

                        <input type="text" 
                        id="length" 
                        className="m-2 w-25 h-25" 
                        name="length" 
                        placeholder="length eg.30"
                        value={length}
                        onChange={onChangeLength} />

                        <input type="submit" className="m-2" value="Schedule" onClick={() => schedule_interviews(length, time)}/>

                    </div>
                </div>

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
                            setTask(info.event.extendedProps.assignment);
                            setHost(info.event.extendedProps.host);
                            setNote(info.event.extendedProps.note);
                            setId(info.event.extendedProps.id);
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
                    <p  className="pb-3 mt-3 mb-0 small lh-sm w-100">
                            {message2}
                    </p>
                     
                        
                    {open && (
    
                        <div class="col-12 rounded  mt-2 ">
                            
                            <div>
                                <h5 className="border-bottom pb-2 mb-2">Information</h5>
                                <div className="d-flex text-muted pt-3">
                                    <p className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                        <strong className="d-block text-gray-dark">Assignment</strong>
                                        {task}
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
                                        </ul>
                                    </div>
                                </div>
                                <div className="d-flex text-muted pt-3">
                                    <p className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                        <strong className="d-block text-gray-dark">Host</strong>
                                        {host}
                                    </p>
                                </div>
                                <div className="d-flex text-muted pt-3">
                                    <p className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                        <strong className="d-block text-gray-dark">Notes</strong>
                                        {note}
                                    </p>
                                </div>
                                
                                <div className="d-flex">
                                    {!selected && (
                                    <button type="button" className="btn btn-secondary mt-4 col-12" onClick={() => {delete_interviews(task, id)}}>
                                        Delete
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

  
export default Interview_TA;