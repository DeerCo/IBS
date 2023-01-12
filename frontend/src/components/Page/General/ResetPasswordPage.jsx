import React, { useState, useRef } from "react";
import { useNavigate, Link } from 'react-router-dom';
import AuthService from "../../../services/auth_services";
import '../../../styles/style.css'


const required = (value) => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};

const ResetPasswordPage = () => {
	let navigate = useNavigate();

	const form = useRef();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");
	const [message, setMessage] = useState("");

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

		setMessage("");

		form.current.validateAll();
		AuthService.reset_password(username, password, code).then(
			() => {
				navigate("/login");
			},
			(error) => {
				const resMessage =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();

				setMessage(resMessage);
			}
		);

	};

	const handleCode = (e) => {
		e.preventDefault();

		setMessage("");

		form.current.validateAll();
		AuthService.sendCode(username).then(
			() => {
				console.log("code sent");
				setMessage("code sent");
			},
			(error) => {
				const resMessage =
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

						<div className="d-flex justify-content-between m-4 fadeIn fourth">
							<input type="text"
								id="code"
								className="w-75 fadeIn third"
								name="code"
								placeholder="code"
								value={code}
								onChange={onChangeCode}
								validations={[required]}
							/>

							<input type="button" onClick={handleCode} className=" m-2" value="send code" />
						</div>


						<input type="password"
							id="password"
							className="mt-3 fadeIn third"
							name="password"
							placeholder="password"
							value={password}
							onChange={onChangePassword}
							validations={[required]}
						/>

						<input type="submit" className="m-4 fadeIn fourth" value="reset password" />

						{message && (
							<div className="form-group">
								<div className="alert alert-danger" role="alert">
									{message}
								</div>
							</div>
						)}

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