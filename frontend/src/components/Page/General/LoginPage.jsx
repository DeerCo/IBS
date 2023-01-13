import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import GeneralApi from "../../../api/general_api";

let LoginPage = () => {
	let navigate = useNavigate();

	let [username, setUsername] = useState("");
	let [password, setPassword] = useState("");

	let onChangeUsername = (e) => {
		let username = e.target.value;
		setUsername(username);
	};

	let onChangePassword = (e) => {
		let password = e.target.value;
		setPassword(password);
	};

	let handleLogin = (e) => {
		e.preventDefault();

		if (username === "") {
			toast.error("The username cannot be empty", { theme: "colored" });
		} else if (password === "") {
			toast.error("The password cannot be empty", { theme: "colored" });
		} else {
			GeneralApi.login(username, password).then(
				(response) => {
					if (!response || !("status" in response)) {
						toast.error("Unknown error", { theme: "colored" });
					} else if (response["status"] === 200) {
						localStorage.setItem('username', username);
						localStorage.setItem('token', response["data"]["token"]);
						localStorage.setItem('roles', JSON.stringify(response["data"]["roles"]));
						toast("Hello, World!", {icon: "🚀"});
						navigate("/home");
					} else if (response["status"] === 401) {
						toast.error("Your username or password is incorrect", { theme: "colored" });
					} else {
						toast.error("Unknown error", { theme: "colored" });
					}
				}
			);
		}
	};

	return (
		<div>
			<div className="wrapper fadeInDown center">
				<div id="formContent">
					<div className="fadeIn first mt-2 logo">
						<p>IBS</p>
					</div>

					<form onSubmit={handleLogin}>
						<input type="text"
							id="login"
							className="mt-1 fadeIn second"
							name="login"
							placeholder="username"
							value={username}
							onChange={onChangeUsername}
						/>

						<input type="password"
							id="password"
							className="mt-3 fadeIn third"
							name="password"
							placeholder="password"
							value={password}
							onChange={onChangePassword}
						/>

						<input type="submit" className="m-4 fadeIn fourth" value="Log In" />
					</form>

					<div id="formFooter">
						<Link className="underlineHover" to="/reset"> First Time Login / Reset Password </Link>
					</div>

				</div>
			</div>
		</div>
	);
};


export default LoginPage;