import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from "moment";
import AuthService from "../../../services/auth_services";
import NavBar from "../../Module/Navigation/NavBar";


let StudentInterviewPage = () => {
	let { course_id, task } = useParams();

	let [calendarData, setCalendarData] = useState([]);

	let [bookedStart, setBookedStart] = useState("");
	let [bookedEnd, setBookedEnd] = useState("");
	let [bookedLocation, setBookedLocation] = useState("");

	let [selectedStart, setSelectedStart] = useState("");
	let [selectedEnd, setSelectedEnd] = useState("");
	let [selectedLocation, setSelectedLocation] = useState("");

	let [open, setOpen] = useState(false);
	let [message, setMessage] = useState("");
	let [booked, setBooked] = useState(false);
	let [selected, setSelect] = useState(false);
	let [version, setVersion] = useState(0);

	useEffect(() => {
		AuthService.check_interview(course_id, task).then(
			(result) => {
				AuthService.available_interviews(course_id, task).then(
					(result2) => {
						let temp_data = [];
						let interviews = result2.availability;

						if (result.booked) {
							setBookedStart(result.start_time);
							setBookedEnd(result.end_time);
							setBookedLocation(result.location);
							setBooked(true);

							let b_start = result.start_time.replace(" ", "T");
							let b_end = result.end_time.replace(" ", "T");
							
							let curr = {
								start: b_start,
								end: b_end,
								extendedProps: {
									location: result.location
								},
								backgroundColor: 'red'
							};

							temp_data.push(curr);
						} else {
							setBooked(false);
						}

						for (let location in interviews) {
							for (let time in interviews[location]) {
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

						setCalendarData(temp_data);
					}
				)
			})
	}, [course_id, task, version]);

	// the book interview function
	let book_interview = (task, time, location) => {
		let parse = moment(time).format('YYYY-MM-DD HH:mm:ss');

		AuthService.book_interview(course_id, task, parse, location).then(
			(result) => {
				setOpen(false);
				setVersion(version + 1);
			},
			(error) => {
				let resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
				setMessage(resMessage);
			}
		);

	};

	// the cancel interview function 
	let cancel_interview = (task) => {
		AuthService.cancel_interview(course_id, task).then(
			(result) => {
				setOpen(false);
				setVersion(version + 1);
			},
			(error) => {
				let resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
				setMessage(resMessage);
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
								setMessage("");
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
									<p className="pb-3 mt-3 mb-0 small lh-sm border-bottom w-100">
										{message}
									</p>
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