import React, { useState, useEffect } from "react";
import AuthService from "../../../services/auth_services";
import NavBar from "../../Module/Navigation/NavBar";
import MarkSummary from "../../Module/Mark/MarkSummary";
import MarkGraph from "../../Module/Mark/MarkGraph";


let StudentMarkPage = () => {
	let username = localStorage.getItem("username");
	let course_id = localStorage.getItem("courseid"); // TODO: Get this from URL
	let task = localStorage.getItem("task"); // TODO: Get this from URL

	let [marks, setMarks] = useState({});

	useEffect(() => {
		AuthService.get_mark(course_id, task).then(
			(result) => {
				setMarks(result.marks[username] || result.marks)
			},
			(error) => {

			})
	}, []);

	return (
		<div>
			<NavBar />

			<MarkSummary marks={marks} />

		</div>

	);
};


export default StudentMarkPage;