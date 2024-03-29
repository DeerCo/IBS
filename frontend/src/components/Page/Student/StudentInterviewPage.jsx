import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from "moment";
import StudentApi from "../../../api/student_api";
import NavBar from "../../Module/Navigation/NavBar";


let StudentInterviewPage = () => {
	let navigate = useNavigate();

	let { course_id, task } = useParams();

	let [calendarData, setCalendarData] = useState([]);

	let [bookedStart, setBookedStart] = useState("");
	let [bookedEnd, setBookedEnd] = useState("");
	let [bookedLocation, setBookedLocation] = useState("");
	let [bookedNote, setBookedNote] = useState("");

	let [selectedStart, setSelectedStart] = useState("");
	let [selectedEnd, setSelectedEnd] = useState("");
	let [selectedLocation, setSelectedLocation] = useState("");

	let [open, setOpen] = useState(false);
	let [booked, setBooked] = useState(false);
	let [version, setVersion] = useState(0); // data is refreshed if version is changed

	useEffect(() => {
		StudentApi.check_interview(course_id, task).then(
			(response_1) => {
				StudentApi.available_interviews(course_id, task).then(
					(response_2) => {
						if (!response_1 || !("status" in response_1) || !response_2 || !("status" in response_2)) {
							toast.error("Unknown error", { theme: "colored" });
							navigate("/login");
							return;
						} else if (response_1["status"] === 200 && response_2["status"] === 200) {

						} else if (response_1["status"] === 401 || response_1["status"] === 403 || response_2["status"] === 401 || response_2["status"] === 403) {
							toast.warn("You need to login again", { theme: "colored" });
							navigate("/login");
							return;
						} else if (response_1["status"] === 400) {
							toast.info(response_1["data"]["message"], { theme: "colored" });
							return;
						} else if (response_2["status"] === 400) {
							toast.info(response_2["data"]["message"], { theme: "colored" });
							return;
						} else {
							toast.warn("Unknown error", { theme: "colored" });
							navigate("/login");
							return;
						}

						let response_1_data = response_1["data"];
						let temp_data = [];
						let availability = response_2["data"]["availability"];

						if (response_1_data["booked"]) {
							setBookedStart(response_1_data["start_time"]);
							setBookedEnd(response_1_data["end_time"]);
							setBookedLocation(response_1_data["location"]);
							setBookedNote(response_1_data["note"]);
							setBooked(true);

							let location_lower = response_1_data["location"].toLowerCase();
							let title = "";
							if (location_lower === "zoom" || location_lower === "online" || location_lower.startsWith("http")) {
								title = "💻";
							} else {
								title = "🏫";
							}

							let curr = {
								title: title,
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
								let location_lower = location.toLowerCase();
								let title = "";
								if (location_lower === "zoom" || location_lower === "online" || location_lower.startsWith("http")) {
									title = "💻";
								} else {
									title = "🏫";
								}
								let data = time.split(" - ");
								let curr = {
									title: title,
									start: data[0].replace(" ", "T"),
									end: data[1].replace(" ", "T"),
									extendedProps: {
										location: location
									},
									backgroundColor: "green",
								};
								temp_data.push(curr);
							}
						}

						if (temp_data.length === 0) {
							toast.info("No interview can be booked at this time", { theme: "colored" });
						}

						setCalendarData(temp_data);
					}
				)
			})
	}, [course_id, task, version, navigate]);

	// the book interview function
	let book_interview = (task, time, location) => {
		let formatted_time = moment(time).format('YYYY-MM-DD HH:mm:ss');

		StudentApi.book_interview(course_id, task, formatted_time, location).then(
			(response) => {
				if (!response || !("status" in response)) {
					toast.error("Unknown error", { theme: "colored" });
					navigate("/login");
				} else if (response["status"] === 200) {
					setOpen(false);
					setVersion(version + 1);
					toast.success("You have booked the interview successfully", { theme: "colored" });
				} else if (response["status"] === 400 || response["status"] === 409) {
					toast.error(response["data"]["message"], { theme: "colored" });
				} else if (response["status"] === 401 || response["status"] === 403) {
					toast.warn("You need to login again", { theme: "colored" });
					navigate("/login");
				} else if (response["status"] === 429) {
					toast.error("You've sent too many requests. Please try again in one hour.", { theme: "colored" });
				} else {
					toast.error("Unknown error", { theme: "colored" });
					navigate("/login");
				}
			}
		);
	};

	// the change interview function
	let change_interview = (task, time, location) => {
		let formatted_time = moment(time).format('YYYY-MM-DD HH:mm:ss');

		if (formatted_time === bookedStart && location === bookedLocation) {
			toast.warn("You have booked this interview", { theme: "colored" });
			return;
		}

		StudentApi.change_interview(course_id, task, formatted_time, location).then(
			(response) => {
				if (!response || !("status" in response)) {
					toast.error("Unknown error", { theme: "colored" });
					navigate("/login");
				} else if (response["status"] === 200) {
					setOpen(false);
					setVersion(version + 1);
					toast.success("You have cancelled your old interview and booked the new interview successfully", { theme: "colored" });
				} else if (response["status"] === 400 || response["status"] === 409) {
					toast.error(response["data"]["message"], { theme: "colored" });
				} else if (response["status"] === 401 || response["status"] === 403) {
					toast.warn("You need to login again", { theme: "colored" });
					navigate("/login");
				} else if (response["status"] === 429) {
					toast.error("You've sent too many requests. Please try again in one hour.", { theme: "colored" });
				} else {
					toast.error("Unknown error", { theme: "colored" });
					navigate("/login");
				}
			}
		);
	};

	// the cancel interview function 
	let cancel_interview = (task) => {
		StudentApi.cancel_interview(course_id, task).then(
			(response) => {
				if (!response || !("status" in response)) {
					toast.error("Unknown error", { theme: "colored" });
					navigate("/login");
				} else if (response["status"] === 200) {
					setOpen(false);
					setVersion(version + 1);
					toast.success("You have cancelled your interview", { theme: "colored" });
				} else if (response["status"] === 400 || response["status"] === 409) {
					toast.error(response["data"]["message"], { theme: "colored" });
				} else if (response["status"] === 401 || response["status"] === 403) {
					toast.warn("You need to login again", { theme: "colored" });
					navigate("/login");
				} else if (response["status"] === 429) {
					toast.error("You've sent too many requests. Please try again in one hour.", { theme: "colored" });
				} else {
					toast.error("Unknown error", { theme: "colored" });
					navigate("/login");
				}
			}
		);
	};


	return (
		<div>
			<div>
				<NavBar page="Interview" />

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
								hour12: false
							}}
							eventClick={function (info) {
								// when click, update the value
								setSelectedStart(info.event.start);
								setSelectedEnd(info.event.end);
								setSelectedLocation(info.event.extendedProps.location);

								// open the popup
								setOpen(true);
							}}
						/>
					</div>

					<div className="col-1"></div>

					<div className="col-3 row">
						{booked && (
							<div>
								<h4 className="border-bottom pb-2 mb-2">Your Booked Interview</h4>
								<strong className="d-block text-gray-dark"> Start time: {moment(bookedStart).format('MM/DD/YYYY, h:mm:ss a')} </strong>
								<strong className="d-block text-gray-dark"> End time: {moment(bookedEnd).format('MM/DD/YYYY, h:mm:ss a')} </strong>
								<strong className="d-block text-gray-dark"> Location: {bookedLocation.startsWith("http") ? <a href={bookedLocation}>Link ✈</a> : bookedLocation} </strong>
								{bookedNote !== null && <strong className="d-block text-gray-dark"> Note: {bookedNote} </strong>}
								<button type="button" className="btn btn-secondary mt-4 col-12" onClick={() => { cancel_interview(task) }}>
									Cancel
								</button>
							</div>
						)}

						{open && !booked && (
							<div>
								<h4 className="border-bottom pb-2 mb-2">Selected Interview</h4>
								<strong className="d-block text-gray-dark"> Start time: {moment(selectedStart).format('MM/DD/YYYY, h:mm:ss a')} </strong>
								<strong className="d-block text-gray-dark"> End time: {moment(selectedEnd).format('MM/DD/YYYY, h:mm:ss a')} </strong>
								<strong className="d-block text-gray-dark"> Location: {selectedLocation} </strong>
								<button type="button" className="btn btn-secondary mt-4 col-12" onClick={() => { book_interview(task, selectedStart, selectedLocation) }}>
									Book
								</button>
							</div>
						)}

						{open && booked && (
							<div>
								<h4 className="border-bottom pb-2 mb-2">Selected Interview</h4>
								<strong className="d-block text-gray-dark"> Start time: {moment(selectedStart).format('MM/DD/YYYY, h:mm:ss a')} </strong>
								<strong className="d-block text-gray-dark"> End time: {moment(selectedEnd).format('MM/DD/YYYY, h:mm:ss a')} </strong>
								<strong className="d-block text-gray-dark"> Location: {selectedLocation} </strong>
								<button type="button" className="btn btn-secondary mt-4 col-12" onClick={() => { change_interview(task, selectedStart, selectedLocation) }}>
									Cancel Existing Interview & Book
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};


export default StudentInterviewPage;