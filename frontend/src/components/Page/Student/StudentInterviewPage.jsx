import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from "moment";
import AuthService from "../../../services/auth_services";
import NavBar from "../../Module/Navigation/NavBar";


let StudentInterviewPage = () => {
	let navigate = useNavigate();

	let { course_id, task } = useParams();

	let [calendarData, setCalendarData] = useState([]);

	let [bookedStart, setBookedStart] = useState("");
	let [bookedEnd, setBookedEnd] = useState("");
	let [bookedLocation, setBookedLocation] = useState("");

	let [selectedStart, setSelectedStart] = useState("");
	let [selectedEnd, setSelectedEnd] = useState("");
	let [selectedLocation, setSelectedLocation] = useState("");

	let [open, setOpen] = useState(false);
	let [booked, setBooked] = useState(false);
	let [selected, setSelect] = useState(false);
	let [version, setVersion] = useState(0);

	useEffect(() => {
		AuthService.check_interview(course_id, task).then(
			(response_1) => {
				AuthService.available_interviews(course_id, task).then(
					(response_2) => {
						if (!response_1 || !("status" in response_1) || !response_2 || !("status" in response_2)){
							toast.error("Unknown error", {theme: "colored"});
							navigate("/login");
						} else if (response_1["status"] === 200 && response_2["status"] === 200){
							
						} else if (response_1["status"] === 401 || response_2["status"] === 403){
							toast.warn("You need to login again", {theme: "colored"});
							navigate("/login");
						} else if (response_1["status"] === 400){
							toast.info("You need to join a group before booking an interview", {theme: "colored"});
						} else {
							toast.warn("Unknown error", {theme: "colored"});
							navigate("/login");
						}

						let response_1_data = response_1["data"];
						let temp_data = [];
						let availability = response_2["data"]["availability"];

						if (response_1_data["booked"]) {
							setBookedStart(response_1_data["start_time"]);
							setBookedEnd(response_1_data["end_time"]);
							setBookedLocation(response_1_data["location"]);
							setBooked(true);
							
							let curr = {
								start: response_1_data["start_time"].replace(" ", "T"),
								end: response_1_data["end_time"].replace(" ", "T"),
								extendedProps: {
									location: response_1_data["location"]
								},
								backgroundColor: 'red'
							};

							temp_data.push(curr);
						} else {
							setBooked(false);
						}

						for (let location in availability) {
							for (let time in availability[location]) {
								let curr = {
									start: '',
									end: '',
									extendedProps: {
										location: location
									},
									backgroundColor: 'green'
								};
								let string = time.split(" - ");
								let start = string[0].replace(" ", "T");
								let end = string[1].replace(" ", "T");
								curr.start = start;
								curr.end = end;
								temp_data.push(curr);
							}
						}

						if (temp_data.length === 0){
							toast.info("No interview can be booked at this time", {theme: "colored"});
						}

						setCalendarData(temp_data);
					}
				)
			})
	}, [course_id, task, version, navigate]);

	// the book interview function
	let book_interview = (task, time, location) => {
		let parse = moment(time).format('YYYY-MM-DD HH:mm:ss');

		AuthService.book_interview(course_id, task, parse, location).then(
			(response) => {
				if (!response || !("status" in response)){
					toast.error("Unknown error", {theme: "colored"});
					navigate("/login");
				} else if (response["status"] === 200){
					setOpen(false);
					setVersion(version + 1);
					toast.success("You have booked the interview successfully", {theme: "colored"});
				} else if (response["status"] === 400 || response["status"] === 409){
					toast.error(response["data"]["message"], {theme: "colored"});
				} else if (response["status"] === 401 || response["status"] === 403){
					toast.warn("You need to login again", {theme: "colored"});
					navigate("/login");
				} else{
					toast.error("Unknown error", {theme: "colored"});
					navigate("/login");
				}
			}
		);
	};

	// the cancel interview function 
	let cancel_interview = (task) => {
		AuthService.cancel_interview(course_id, task).then(
			(response) => {
				if (!response || !("status" in response)){
					toast.error("Unknown error", {theme: "colored"});
					navigate("/login");
				} else if (response["status"] === 200){
					setOpen(false);
					setVersion(version + 1);
					toast.success("You have cancelled your interview", {theme: "colored"});
				} else if (response["status"] === 400 || response["status"] === 409){
					toast.error(response["data"]["message"], {theme: "colored"});
				} else if (response["status"] === 401 || response["status"] === 403){
					toast.warn("You need to login again", {theme: "colored"});
					navigate("/login");
				} else{
					toast.error("Unknown error", {theme: "colored"});
					navigate("/login");
				}
			}
		);
	};


	return (
		<div>
			<div>
				<NavBar />

				<div className="divider"> </div>

				<div className="row card-box mt-3">
					<div className="col-7" id='calendar'>
						<FullCalendar
							plugins={[dayGridPlugin, interactionPlugin]}
							initialView="dayGridMonth"
							headerToolbar={{
								left: 'prev,next',
								center: 'title',
								right: 'dayGridWeek,dayGridMonth'
							}}
							events={calendarData}

							eventTimeFormat={{// like '14:30:00'
								hour: '2-digit',
								minute: '2-digit',
								meridiem: true
							}}
							eventClick={function (info) {
								// when click, update the value
								setSelectedStart(info.event.start);
								setSelectedEnd(info.event.end);
								setSelectedLocation(info.event.extendedProps.location);

								// open the popup
								setOpen(!open);
								if (info.event.backgroundColor === 'red') {
									setSelect(true);
								} else {
									setSelect(false);
								}
							}}
						/>
					</div>

					<div className="col-1"></div>
					<div className="col-3 row">
						{booked && (
							<p className="pb-3 mb-3 mt-2 border-bottom w-100">
								<strong className="d-block text-gray-dark"> You have booked an interview </strong>
								<strong className="d-block text-gray-dark"> Start time: {bookedStart} </strong>
								<strong className="d-block text-gray-dark"> End time: {bookedEnd} </strong>
								<strong className="d-block text-gray-dark"> Location: {bookedLocation} </strong>
							</p>
						)}


						{open && (
							<div className="col-12 rounded  mt-2 ">
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
											{moment(selectedStart).format('MM/DD/YYYY, h:mm:ss a')}
										</p>
									</div>
									<div className="d-flex text-muted pt-3">
										<p className="pb-3 mb-0 small lh-sm border-bottom w-100">
											<strong className="d-block text-gray-dark">End Time</strong>
											{moment(selectedEnd).format('MM/DD/YYYY, h:mm:ss a')}
										</p>
									</div>
									<div className="d-flex text-muted pt-3">
										<div className="pb-3 mb-0 small lh-sm border-bottom w-100">
											<strong className="d-block text-gray-dark">Location</strong>
											<ul className="list-unstyled my-1">
												<li>{selectedLocation}</li>
											</ul>
										</div>
									</div>
									<div className="d-flex">
										{!selected && (
											<button type="button" className="btn btn-secondary mt-4 col-12" onClick={() => { book_interview(task, selectedStart, selectedLocation) }}>
												Book
											</button>
										)}

										{selected && (
											<button type="button" className="btn btn-secondary mt-4 col-12" onClick={() => { cancel_interview(task) }}>
												Cancel
											</button>
										)}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};


export default StudentInterviewPage;