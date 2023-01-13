import axios from "axios";

let login = async (username, password) => {
	try {
		return await axios.post(process.env.REACT_APP_API_URL + "/auth/login", { username: username, password: password });
	} catch (err) {
		return err.response;
	}
};

let reset_password = async (username, password, code) => {
	try {
		return await axios.post(process.env.REACT_APP_API_URL + "/auth/change_password", { username: username, password: password, code: code });
	} catch (err) {
		return err.response;
	}
};

let send_code = async (username) => {
	try {
		return await axios.post(process.env.REACT_APP_API_URL + "/auth/verify", { username: username });
	} catch (err) {
		return err.response;
	}
};

let GeneralApi = {
	login,
	reset_password,
	send_code,
};

export default GeneralApi;