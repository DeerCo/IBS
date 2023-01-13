import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from "../../../services/auth_services";
import '../../../styles/style.css'

const ResetPasswordPage = () => {
	let navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");

	const onChangeUsername = (e) => {
		const username = e.target.value;
		setUsername(username);
	};

	const onChangePassword = (e) => {
		const password = e.target.value;
		setPassword(password);
	};

	const onChangeCode = (e) => {
		const code = e.target.value;
		setCode(code);
	};

	const handleLogin = (e) => {
		e.preventDefault();

		if (username === "") {
			toast.error("The username cannot be empty", { theme: "colored" });
		} else if (code === "") {
			toast.error("The verification code cannot be empty", { theme: "colored" });
		} else if (password.length < 8) {
			toast.error("The password should contain at least 8 characters", { theme: "colored" });
		} else {
			AuthService.reset_password(username, password, code).then(
				(response) => {
					if (!response || !("status" in response)) {
						toast.error("Unknown error", { theme: "colored" });
					} else if (response["status"] === 200) {
						toast.success("Your password has been changed", { theme: "colored" });
						navigate("/login");
					} else if (response["status"] === 400) {
						toast.error("The username or verification code is not valid", { theme: "colored" });
					} else if (response["status"] === 429) {
						toast.error("You've sent too many requests. Please try again in one hour.", { theme: "colored" });
					} else {
						toast.error("Unknown error", { theme: "colored" });
					}
				}
			);
		}
	};

	const handleCode = (e) => {
		e.preventDefault();

		if (username === "") {
			toast.error("Username cannot be empty", { theme: "colored" });
		} else{
			AuthService.send_code(username).then(
				(response) => {
					if (!response || !("status" in response)) {
						toast.error("Unknown error", { theme: "colored" });
					} else if (response["status"] === 200) {
						toast.success("A code has been sent to your email", { theme: "colored" });
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

						<div className="d-flex justify-content-between m-4 fadeIn fourth">
							<input type="text"
								id="code"
								className="w-75 fadeIn third"
								name="code"
								placeholder="code"
								value={code}
								onChange={onChangeCode}
							/>

							<input type="button" onClick={handleCode} className=" m-2" value="send code" />
						</div>


						<input type="password"
							id="password"
							className="mt-3 fadeIn fourth"
							name="password"
							placeholder="password"
							value={password}
							onChange={onChangePassword}
						/>

						<input type="submit" className="m-4 fadeIn fourth" value="reset password" />
					</form>

					<div id="formFooter">

						<Link className="underlineHover" to="/login"> Login </Link>
					</div>

				</div>
			</div>
		</div>
	);
};


export default ResetPasswordPage;