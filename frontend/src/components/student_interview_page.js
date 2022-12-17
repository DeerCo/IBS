import React, { useState, useRef } from "react";
import { useNavigate, Link, useLocation} from 'react-router-dom';
import Form from "react-validation/build/form";
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
            if (interviews[loc][time] == 1){
                let string = time.split(" - ");
                // set the defualt date for calender display
                if (first == ""){
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


    console.log(first);

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


                <div class="tabset">
                    <input type="radio" name="tabset" id="tab1" aria-controls="marzen" checked/>
                    <label for="tab1">Book Interview</label>

                    <input type="radio" name="tabset" id="tab2" aria-controls="rauchbier"/>
                    <label for="tab2">View Interview</label>


                    <div className="tab-panels">
                        <section id="marzen" className="tab-panel">
                            <div className="row card-box-special">
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

                                    // [{start: "2022-12-31T16:00:00", end: "2022-12-31T16:30:00", extendedProps: {location: "Zoom"}},
                                    //  {start: "2022-12-31T16:30:00", end: "2022-12-31T17:00:00", extendedProps: {location: "UTM"}}, 
                                    //  {start: "2022-12-31T17:30:00", end: "2022-12-31T18:00:00", extendedProps: {location: "UTM"}}]

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
                
                                    <div class="col-12 bg-white rounded">
                                        <div className="col-12">
                                            <p>Assignment </p>
                                            <p>{task}</p>
                                            
                                        </div>

                                        <div className="col-12">
                                            <p>Start Time </p>
                                            <p>{moment(start).format('MM/DD/YYYY, h:mm:ss a')}</p>
                                        </div>

                                        <div className="col-12">
                                            <p>End Time </p>
                                            <p>{moment(end).format('MM/DD/YYYY, h:mm:ss a')}</p>
                                        </div>

                                        <div className="col-12">
                                            <p>Location </p>
                                            <p>{location}</p>
                                            
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <button className="btn btn-secondary mt-3" onClick={() => setOpen(!open)} type="submit">Cancel</button>
                                            <button className="btn btn-secondary mt-3" type="submit">Confirm</button>
                                        </div>

                                    </div>
                                )}
                                    
                                </div>
                            </div>
                        </section>


                        <section id="rauchbier" className="tab-panel">
                            <div className="row card-box-special interview-2">
                                <div className="col-7" id='calendar2'></div>
                                <div className="col-1"></div>
                                <div className="col-3 mt-5">
                                    <h5 className="border-bottom pb-2 mb-2">Information</h5>
                                    <div className="d-flex text-muted pt-3">
                                        <p className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                            <strong className="d-block text-gray-dark">Date and Time</strong>
                                            Friday, November 17, 2022, 12:30:00 PM EST
                                        </p>
                                    </div>
                                    <div className="d-flex text-muted pt-3">
                                        <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                            <strong className="d-block text-gray-dark">Location</strong>
                                            <ul className="list-unstyled my-1">
                                                <li >Zoom Meeting</li>
                                                <li><a href="https://zoom.us">https://utoronto.zoom.us/j/88160719150 (Passcode: 608000)</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="d-flex text-muted pt-3">
                                        <p className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                            <strong className="d-block text-gray-dark">Notes</strong>
                                            You are in charge of your own learning and progress in this course, and the instructors will provide a push in the right direction as needed
                                        </p>
                                    </div>
                                    <div className="d-flex text-muted pt-3">
                                        <p className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                            <strong className="d-block text-gray-dark">Additional</strong>
                                            You must arrive at the zoom meeting on time
                                        </p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <button type="button" className="btn btn-primary mt-4 col-5" data-mdb-toggle="modal" data-mdb-target="#exampleModal1">
                                            Cancel
                                        </button>
                                        <button type="button" className="btn btn-primary mt-4 col-5" data-mdb-toggle="modal" data-mdb-target="#exampleModal2">
                                            Modify
                                        </button>

                                        <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel2">Modal title</h5>
                                                        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body row">
                                                        <label for="time" className="form-label col-6">New Interview Time: </label>
                                                        <label>
                                                            <input type="text" className="form-control h-50 col-6" id="time" placeholder="eg: 2022/12/2"/>
                                                        </label>
                                                        <label for="notes" className="form-label col-6">Additional Notes: </label>
                                                        <label>
                                                            <input type="text" className="form-control h-50 col-6" id="notes" placeholder="eg: via zoom"/>
                                                        </label>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                                                        <button type="button" clclassNameass="btn btn-primary">Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* {open && (
                <div class="position-absolute top-0 w-100 bg-black curtain "></div>
                )} */}


                

        </div>
        </>


      );
};

  
export default Interview;