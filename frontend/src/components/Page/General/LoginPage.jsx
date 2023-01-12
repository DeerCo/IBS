import React, { useState, useRef } from "react";
import { useNavigate, Link } from 'react-router-dom';
import AuthService from "../../../services/auth_services";

let required = (value) => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};

let LoginPage = () => {
	let navigate = useNavigate();

	let form = useRef();

	let [username, setUsername] = useState("");
	let [password, setPassword] = useState("");
	let [message, setMessage] = useState("");

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

		setMessage("");

		form.current.validateAll();
		AuthService.login(username, password).then(
			(result) => {
				// update the token, roles and username inside localstorage
				localStorage.setItem('username', username);
				localStorage.setItem('token', result.token);
				localStorage.setItem('roles', JSON.stringify(result));
				navigate("/home");
				window.location.reload();
			},
			(error) => {
				let resMessage =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();

				setMessage(resMessage);
			}
		);
	};

	return (
		<div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<div className="wrapper fadeInDown">
				<div id="formContent">

					<br />
					<div className="fadeIn first mt-2 logo">
						<p>IBS</p>
					</div>


					<form onSubmit={handleLogin} ref={form}>
						<input type="text"
							id="login"
							className="mt-1 fadeIn second"
							name="login"
							placeholder="username"
							value={username}
							onChange={onChangeUsername}
							validations={[required]} />

						<input type="password"
							id="password"
							className="mt-3 fadeIn third"
							name="password"
							placeholder="password"
							value={password}
							onChange={onChangePassword}
							validations={[required]}
						/>

						<input type="submit" className="m-4 fadeIn fourth" value="Log In" />

						{message && (
							<div className="form-group">
								<div className="alert alert-danger" role="alert">
									{message}
								</div>
							</div>
						)}

					</form>

					<div id="formFooter">
						<Link className="underlineHover" to="/reset"> Reset Password </Link>
					</div>

				</div>
			</div>
		</div>
	);
};


export default LoginPage;