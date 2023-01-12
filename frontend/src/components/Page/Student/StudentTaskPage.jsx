import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from "../../../services/auth_services";
import NavBar from "../../Module/Navigation/NavBar";
import '../../../styles/style.css';


let StudentTaskPage = () => {
	let navigate = useNavigate();

	let { course_id } = useParams();
	let [tasks, setTasks] = useState([]);

	useEffect(() => {
		AuthService.get_task(course_id).then(
			(result) => {
				setTasks(result["task"]);
			},
			(error) => {
				console.log(error);
			})
	}, []);

	// navigate to new page when student select a assignment
	let mark = (task) => {
		navigate("/course/" + course_id + "/task/" + task + "/mark");
	};

	// navigate to new page to get all the available file
	let file = (task) => {
		navigate("/course/" + course_id + "/task/" + task + "/file");

	};

	// navigate to new page to get all the available interview
	let interview = (task) => {
		navigate("/course/" + course_id + "/task/" + task + "/interview");
	};

	return (
		<div>
			<div>

				<NavBar />

				<div className="album py-5 bg-white">
					<div className="container mt-5">

						<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

							{tasks.map(data => (
								<div className="col" key={data.task}>
									<div className="card shadow-sm m-3">
										<div className="card-body">
											<h3 className="card-text mb-3">{data.task}</h3>
											<p className="card-text">Original due date: {data.due_date}</p>
											<p className="card-text">Group Size: {data.min_member} {data.min_member === data.max_member ? "": " -- " + data.max_member}</p>
											<div className="d-flex justify-content-between align-items-center">
												<div className="btn-group">
													<button type="button" onClick={() => { file(data.task) }} className="btn btn-sm btn-outline-secondary">File</button>
													<button type="button" onClick={() => { mark(data.task) }} className="btn btn-sm btn-outline-secondary">Mark</button>
													<button type="button" onClick={() => { interview(data.task) }} className="btn btn-sm btn-outline-secondary">Interview</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}

						</div>
					</div>
				</div>
			</div>
		</div>

	);
};


export default StudentTaskPage;