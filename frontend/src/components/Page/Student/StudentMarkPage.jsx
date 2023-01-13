import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentApi from "../../../api/student_api";
import NavBar from "../../Module/Navigation/NavBar";
import MarkSummary from "../../Module/Mark/MarkSummary";


let StudentMarkPage = () => {
	let navigate = useNavigate();

	let { course_id, task } = useParams();

	let [marks, setMarks] = useState({});

	useEffect(() => {
		let username = localStorage.getItem("username");

		StudentApi.get_mark(course_id, task).then(
			(response) => {
				if (!response || !("status" in response)){
					toast.error("Unknown error", {theme: "colored"});
					navigate("/login");
				} else if (response["status"] === 200 && username){
					setMarks(response["data"]["marks"][username] || response["data"]["marks"]);
				} else if (response["status"] === 401 || response["status"] === 403){
					toast.warn("You need to login again", {theme: "colored"});
					navigate("/login");
				} else{
					toast.error("Unknown error", {theme: "colored"});
					navigate("/login");
				}
			})
	}, [course_id, task, navigate]);

	return (
		<div>
			<NavBar page="Mark"/>

			<main>
				<MarkSummary marks={marks} />
			</main>
		</div>
	);
};


export default StudentMarkPage;