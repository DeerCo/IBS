import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from "moment";
import AuthService from "../../../services/auth_services";
import TaNavBar from "../../Module/Navigation/TaNavBar";
import '../../../styles/style.css';

let TaInterviewPage = () => {
	let navigate = useNavigate();

	let { course_id, task } = useParams();

	let [calendarData, setCalendarData] = useState([]);

	// track data of the interview being selected
	let [selectedId, setSelectedId] = useState("");
	let [selectedStart, setSelectedStart] = useState("");
	let [selectedEnd, setSelectedEnd] = useState("");
	let [selectedLocation, setSelectedLocation] = useState("");
	let [selectedGroupId, setSelectedGroupId] = useState("");
	let [selectedHost, setSelectedHost] = useState("");
	let [selectedLength, setSelectedLength] = useState("");
	let [selectedNote, setSelectedNote] = useState("");

	// track the entered
	let [enteredTime, setEnteredTime] = useState("");
	let [enteredLength, setEnteredLength] = useState("");
	let [enteredLocation, setEnteredLocation] = useState("");

	let [open, setOpen] = useState(false);
	let [version, setVersion] = useState(0); // data is refreshed if version is changed

	useEffect(() => {
		AuthService.all_interviews(course_id, task).then(
			(response) => {
				if (!response || !("status" in response)) {
					toast.error("Unknown error", { theme: "colored" });
					navigate("/login");
					return;
				} else if (response["status"] === 200) {

				} else if (response["status"] === 401 || response["status"] === 403) {
					toast.warn("You need to login again", { theme: "colored" });
					navigate("/login");
					return;
				} else {
					toast.warn("Unknown error", { theme: "colored" });
					navigate("/login");
					return;
				}

				let temp_data = [];
				let interviews = response["data"]["interviews"];

				for (let interview of interviews) {
					let colour = (interview.group_id === null ? "green" : "red");
					let curr = {
						start: '',
						end: '',
						extendedProps: {
							id: interview.interview_id,
							task: interview.task,
							host: interview.host,
							group_id: interview.group_id,
							length: interview.length,
							location: interview.location,
							note: interview.note
						},
						backgroundColor: colour
					};
					curr.start = interview.start_time.replace(" ", "T");
					curr.end = interview.end_time.replace(" ", "T");
					temp_data.push(curr);
				}

				if (temp_data.length === 0) {
					toast.info("You haven't scheduled any interview", { theme: "colored" });
				}

				setCalendarData(temp_data);
			}
		)
	}, [course_id, task, version, navigate]);

	// the book interview function
	// add task later into the ta input
	let schedule_interview = (time, length, location) => {
		if (time === "") {
			toast.error("The time cannot be empty", { theme: "colored" });
		} else if (length === "") {
			toast.error("The length cannot be empty", { theme: "colored" });
		} else if (location === "") {
			toast.error("The location cannot be empty", { theme: "colored" });
		} else {
			AuthService.schedule_interview(course_id, task, length, time).then(
				(response) => {
					if (!response || !("status" in response)) {
						toast.error("Unknown error", { theme: "colored" });
						navigate("/login");
					} else if (response["status"] === 200) {
						setOpen(false);
						setVersion(version + 1);
						toast.success("You have scheduled the interview successfully", { theme: "colored" });
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
		}
	};

	// the cancel interview function 
	let delete_interview = (task, id) => {
		AuthService.delete_interview(course_id, task, id).then(
			(response) => {
				if (!response || !("status" in response)) {
					toast.error("Unknown error", { theme: "colored" });
					navigate("/login");
				} else if (response["status"] === 200) {
					setOpen(false);
					setVersion(version + 1);
					toast.success("You have deleted the interview successfully", { theme: "colored" });
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

	let onChangeTime = (e) => {
		let time = e.target.value;
		setEnteredTime(time);
	};

	let onChangeLength = (e) => {
		let length = e.target.value;
		setEnteredLength(length);
	};

	let onChangeLocation = (e) => {
		let location = e.target.value;
		setEnteredLocation(location);
	};

	return (
		<div>
			<div>
				<TaNavBar page="Interview" />

				<div className="wrapper">
					<div className="input-group">
						<input type="text"
							id="time"
							className="m-2 w-25 h-25"
							name="time"
							placeholder="time (YYYY-MM-DD HH:mm:ss)"
							value={enteredTime}
							onChange={onChangeTime} 
						/>

						<input type="text"
							id="length"
							className="m-2 w-25 h-25"
							name="length"
							placeholder="length (minutes)"
							value={enteredLength}
							onChange={onChangeLength} 
						/>

						<input type="text"
							id="location"
							className="m-2 w-25 h-25"
							name="location"
							placeholder="location"
							value={enteredLocation}
							onChange={onChangeLocation} 
						/>

						<input type="submit" className="m-2" value="Schedule" onClick={() => schedule_interview(enteredTime, enteredLength, enteredLocation)} />
					</div>
				</div>

				<div className="row card-box mt-3">
					<div className="col-7" id='calendar'>
						<FullCalendar
							plugins={[dayGridPlugin, interactionPlugin]}
							initialView="dayGridMonth"
							// comment this back when the interview is there
							// initialDate={first}
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
								setSelectedId(info.event.extendedProps.id);
								setSelectedStart(info.event.start);
								setSelectedEnd(info.event.end);
								setSelectedLocation(info.event.extendedProps.location);
								setSelectedGroupId(info.event.extendedProps.group_id);
								setSelectedHost(info.event.extendedProps.host);
								setSelectedLength(info.event.extendedProps.length);
								setSelectedNote(info.event.extendedProps.note);

								setOpen(!open);
							}
							} />
					</div>

					<div className="col-1"></div>

					<div className="col-3 row">
						{open && (
							<div>
								<h4 className="border-bottom pb-2 mb-2">Selected Interview</h4>
								<strong className="d-block text-gray-dark"> Interview ID: {selectedId} </strong>
								<strong className="d-block text-gray-dark"> Start time: {moment(selectedStart).format('MM/DD/YYYY, h:mm:ss a')} </strong>
								<strong className="d-block text-gray-dark"> End time: {moment(selectedEnd).format('MM/DD/YYYY, h:mm:ss a')} </strong>
								<strong className="d-block text-gray-dark"> Location: {selectedLocation} </strong>
								<strong className="d-block text-gray-dark"> Group ID: {selectedGroupId === null ? "null" : selectedGroupId} </strong>
								<strong className="d-block text-gray-dark"> Host: {selectedHost} </strong>
								<strong className="d-block text-gray-dark"> Length: {selectedLength.toString()} </strong>
								<strong className="d-block text-gray-dark"> Note: {selectedNote === null ? "null" : selectedNote} </strong>
								<button type="button" className="btn btn-secondary mt-4 col-12" onClick={() => { delete_interview(task, selectedId) }}>
									Delete
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}


export default TaInterviewPage;