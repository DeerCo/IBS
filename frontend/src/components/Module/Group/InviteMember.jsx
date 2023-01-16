import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentApi from "../../../api/student_api";

let InviteMember = (props) => {
	let navigate = useNavigate();

	let [username, setUsername] = useState("");

	let handleSubmit = (event) => {
		event.preventDefault();

		if (username === ""){
			toast.error("The username cannot be empty", { theme: "colored" });
		} else if (username === sessionStorage.getItem("username")){
			toast.error("You cannot invite yourself :)", { theme: "colored" });
		} else{
			StudentApi.invite_member(props.course_id, props.group_id, username).then((response) => {
				if (!response || !("status" in response)) {
					toast.error("Unknown error", { theme: "colored" });
					navigate("/login");
				} else if (response["status"] === 200) {
					props.setVersion(props.version + 1);
					toast.success("The user has been invited", { theme: "colored" });
				} else if (response["status"] === 400 || response["status"] === 409) {
					toast.error(response["data"]["message"], { theme: "colored" });
				} else if (response["status"] === 401 || response["status"] === 403) {
					toast.warn("You need to login again", { theme: "colored" });
					navigate("/login");
				} else {
					toast.error("Unknown error", { theme: "colored" });
					navigate("/login");
				}
			})
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={username}
				placeholder="Username"
				onChange={(e) => {
					setUsername(e.target.value);
				}}
			/>

			<button type="submit" className="btn btn-primary btn-lg m-2">
				Invite a New Member
			</button>
		</form>
	);
};

export default InviteMember;
