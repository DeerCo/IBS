import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Page/General/LoginPage";
import ResetPasswordPage from "./components/Page/General/ResetPasswordPage";
import Home from "./components/Page/General/HomePage";

import StudentMarkPage from "./components/Page/Student/StudentMarkPage";
import StudentFilePage from "./components/Page/Student/StudentFilePage";
import StudentInterviewPage from "./components/Page/Student/StudentInterviewPage";
import StudentTaskPage from "./components/Page/Student/StudentTaskPage";

import TaInterviewPage from "./components/Page/Ta/TaInterviewPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginPage />}></Route>
				<Route path="/reset" element={<ResetPasswordPage />}></Route>
				<Route path="/home" element={<Home />}></Route>

				<Route path="/task" element={<StudentTaskPage />}></Route>
				<Route path="/mark" element={<StudentMarkPage />}></Route>
				<Route path="/file" element={<StudentFilePage />}></Route>
				<Route path="/interview" element={<StudentInterviewPage />}></Route>

				<Route path="/ta/interview" element={<TaInterviewPage />}></Route>
				
				<Route path="/" element={<LoginPage />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
