import React from "react";
import { useNavigate } from 'react-router-dom';
import NavBar from "../../Module/Navigation/NavBar";
import '../../../styles/style.css';


let StudentTaskPage = () => {
	let navigate = useNavigate();

	// get all the json from localstorage
	let fetch = JSON.parse(localStorage.getItem("tasks"));
	let tasks = fetch.task;

	// navigate to new page when student select a assignment
	let grades = (task) => {
		// update task in localstorage
		localStorage.setItem('task', task);

		navigate("/mark");
	};

	// navigate to new page to get all the available files
	let files = (task) => {
		// update task in localstorage
		localStorage.setItem('task', task);

		navigate("/file");

	};

	// navigate to new page to get all the available interviews
	let interviews = (task) => {
		// update task in localstorage
		localStorage.setItem('task', task);

		navigate("/interview");
	};

	return (
		<>
			<div>

				<NavBar />

				<div className="album py-5 bg-white">
					<div className="container mt-5">

						<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

							{tasks.map(d => (
								<div className="col" key={d.task}>
									<div className="card shadow-sm m-3">

										<div className="card-body">
											<h3 className="card-text mb-3">{d.task}</h3>
											<p className="card-text">due date: </p>
											<p className="card-text">{d.due_date}</p>
											<div className="d-flex justify-content-between align-items-center">
												<div className="btn-group">
													<button type="button" onClick={() => { files(d.task) }} className="btn btn-sm btn-outline-secondary">Details</button>
													<button type="button" onClick={() => { grades(d.task) }} className="btn btn-sm btn-outline-secondary">Grades</button>
													<button type="button" onClick={() => { interviews(d.task) }} className="btn btn-sm btn-outline-secondary">Interviews</button>
												</div>
												<small className="text-muted">max group members:{d.max_member}</small>
											</div>
										</div>
									</div>
								</div>
							))}

						</div>
					</div>
				</div>
			</div>
		</>

	);
};


export default StudentTaskPage;