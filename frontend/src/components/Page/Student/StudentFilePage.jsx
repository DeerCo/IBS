import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthService from "../../../services/auth_services";
import NavBar from "../../Module/Navigation/NavBar";
import '../../../styles/style.css';

let StudentFilePage = () => {
	let { course_id, task } = useParams();

	let [files, setFiles] = useState([]);
	let [checkboxes, setCheckboxes] = useState([]);

	useEffect(() => {
		AuthService.all_files(course_id, task).then(
			(result) => {
				setFiles(result["files"]);
			},
			(error) => {
				console.log(error);
			})
	}, []);

	// download the file
	let download = (file_id, file_name) => {
		// call the service function
		AuthService.download_file(course_id, task, file_id, file_name).then(
			(result) => {
				
			}
		);
	};

	// download all of the selected files
	let download_all = () => {
		checkboxes.map(checkbox => {
			download(checkbox.file_id, checkbox.file_name);
		})
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
							<button type="button" onClick={download_all} className="btn mt-2 btn-sm btn-outline-secondary">Download</button>
						</ol>
					</div>
				</div>
			</div>
		</div>
	);
};


export default StudentFilePage;