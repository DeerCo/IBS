import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from "../../../services/auth_services";
import NavBar from "../../Module/Navigation/NavBar";
import '../../../styles/style.css';

let StudentFilePage = () => {
	let navigate = useNavigate();

	let { course_id, task } = useParams();

	let [files, setFiles] = useState([]);
	let [checkboxes, setCheckboxes] = useState([]);

	useEffect(() => {
		AuthService.all_files(course_id, task).then(
			(response) => {
				if (!response || !("status" in response)) {
					toast.error("Unknown error", { theme: "colored" });
					navigate("/login");
				} else if (response["status"] === 200) {
					setFiles(response["data"]["files"]);
				} else if (response["status"] === 401 || response["status"] === 403) {
					toast.warn("You need to login again", { theme: "colored" });
					navigate("/login");
				} else {
					toast.error("Unknown error", { theme: "colored" });
					navigate("/login");
				}
			})
	}, [course_id, task, navigate]);

	let download = (file_id, file_name) => {
		AuthService.download_file(course_id, task, file_id, file_name).then(
			(response) => {
				if (!response || !("status" in response)) {
					toast.error("Unknown error", { theme: "colored" });
					navigate("/login");
				} else if (response["status"] === 200) {
					toast.info("Your download should start shortly", { theme: "colored" });
				} else {
					toast.warn("The selected file cannot be downloaded", { theme: "colored" });
				}
			}
		);
	};

	// download all of the selected files
	let download_all = () => {
		if (checkboxes.length === 0){
			toast.warn("You need to select at least 1 file", { theme: "colored" });
		}
		for (let checkbox of checkboxes){
			download(checkbox.file_id, checkbox.file_name);
		}
	}

	// handle click
	let handleClick = (file_id, file_name) => {
		let last_slash = file_name.lastIndexOf('/');
		file_name = file_name.substring(last_slash + 1);

		// check if the value is stored already
		let isFound = checkboxes.some(checkbox => {
			if (checkbox.file_id === file_id) {
				return true;
			}
			return false;
		});

		// update the states
		if (!isFound) { // this click was to check the box
			setCheckboxes(current => [...current, { file_id: file_id, file_name: file_name }]);
		} else {
			updateState(file_id);
		}
	};

	// update value
	let updateState = (file_id) => {
		setCheckboxes((current) =>
			current.filter((curr) => curr.file_id !== file_id)
		);
	};

	if (files.length === 0) {
		return (
			<div>
				<div>
					<NavBar page="File" />

					<h1>No file is available</h1>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<div>
					<NavBar page="File" />

					<div className="divider"> </div>

					<div className="card-box row">
						<ol className="list-group list-unstyled">
							<li className="d-flex justify-content-between flex-row mb-1">
								<div className="ms-2 me-auto">
									<div className="fw-bold">File Name</div>
								</div>
								<span className="fw-bold">Select File</span>
							</li>
							{files.map((file) => (
								<li className="list-group-item flex-row" key={file.file_id}>
									<div className=" d-flex justify-content-between">
										<span className="badge bg-success rounded-pill mt-1">{file.file_name}</span>
										<div className="form-check form-switch">
											<input className="form-check-input" type="checkbox" onChange={() => { handleClick(file.file_id, file.file_name) }} />
										</div>
									</div>
								</li>
							))}
							<button type="button" onClick={download_all} className="btn btn-sm btn-outline-secondary">Download</button>
						</ol>
					</div>
				</div>
			</div>
		);
	}
};


export default StudentFilePage;