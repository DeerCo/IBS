import React, { useState } from "react";
import AuthService from "../../../services/auth_services";
import NavBar from "../../Module/Navigation/NavBar";
import '../../../styles/style.css';

let StudentFilePage = () => {
	// get all the json from localstorage
	let fetch = JSON.parse(localStorage.getItem("files"));
	let files = fetch.files;

	// download the file
	let download = (file_id, file_name) => {
		// get courseid from localstorage
		let courseid = localStorage.getItem("courseid");

		// get task from localstorage
		let task = localStorage.getItem("task");

		// call the service function
		AuthService.download(courseid, task, file_id, file_name).then(
			(result) => {
				console.log("downloaded");
			}
		);
	};

	// download all of the selected files
	let download_all = () => {
		check.map(check => {
			download(check.id, check.name);
		})
	}

	// state holder
	let initialState = [];
	let [check, setCheck] = useState(initialState);


	// handle click
	let handleClick = (id, name) => {
		// check if the value is stored already
		let isFound = check.some(check => {
			if (check.id === id) {
				return true;
			}
			return false;
		});
		// update the states
		if (!isFound) { // this click was to check the box
			setCheck(current => [...current, { id: id, name: name }]);
		} else {
			updateState(id);
		}
		console.log(check);

	};

	// update value
	let updateState = (id) => {
		setCheck((current) =>
			current.filter((curr) => curr.id !== id)
		);
	};

	return (
		<div>
			<div>
				<NavBar />

				<div className="divider"> </div>

				<div className="card-box row">
					<div className="col-5 tasks2">
						<ol className="list-group list-unstyled">
							<li className="d-flex justify-content-between flex-row mb-1">
								<div className="ms-2 me-auto">
									<div className="fw-bold">File name</div>
								</div>
								<span className="fw-bold">Download</span>
							</li>
							{files.map((e) => (
								<li className="list-group-item flex-row" key={e.file_id}>
									<div className=" d-flex justify-content-between">
										<span className="badge bg-success rounded-pill mt-1">{e.file_name.split("/")[2]}</span>
										<div className="form-check form-switch">
											<input className="form-check-input" type="checkbox" onChange={() => { handleClick(e.file_id, e.file_name) }} />
										</div>
									</div>
								</li>
							))}
							<button type="button" onClick={download_all} className="btn mt-2 btn-sm btn-outline-secondary">download</button>
						</ol>
					</div>
				</div>
			</div>
		</div>
	);
};


export default StudentFilePage;