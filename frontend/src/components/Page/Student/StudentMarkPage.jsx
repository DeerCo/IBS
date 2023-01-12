import React, { useState, useEffect } from "react";
import Prism from "prismjs";
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
		AuthService.grades(course_id, task).then(
			(result) => {
				setMarks(result.marks[username])
			},
			(error) => {

			})

		Prism.highlightAll();
	}, []);

	return (
		<div>
			<NavBar />

			<MarkSummary marks={marks} />

			<MarkGraph marks={marks} />
		</div>

	);
};


export default StudentMarkPage;