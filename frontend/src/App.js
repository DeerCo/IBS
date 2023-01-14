import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import LoginPage from "./components/Page/General/LoginPage";
import ResetPasswordPage from "./components/Page/General/ResetPasswordPage";
import Home from "./components/Page/General/HomePage";

import StudentMarkPage from "./components/Page/Student/StudentMarkPage";
import StudentFilePage from "./components/Page/Student/StudentFilePage";
import StudentInterviewPage from "./components/Page/Student/StudentInterviewPage";
import StudentTaskPage from "./components/Page/Student/StudentTaskPage";

import TaTaskPage from "./components/Page/Ta/TaTaskPage";
import TaInterviewPage from "./components/Page/Ta/TaInterviewPage";

function App() {
	return (
		<div>
			<ToastContainer 
				limit={3}
				position="top-center"
			/>

			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<LoginPage />}></Route>
					<Route path="/reset" element={<ResetPasswordPage />}></Route>
					<Route path="/home" element={<Home />}></Route>

					<Route path="/course/:course_id/task" element={<StudentTaskPage />}></Route>
					<Route path="/course/:course_id/task/:task/mark" element={<StudentMarkPage />}></Route>
					<Route path="/course/:course_id/task/:task/file" element={<StudentFilePage />}></Route>
					<Route path="/course/:course_id/task/:task/interview" element={<StudentInterviewPage />}></Route>

					<Route path="/ta/course/:course_id/task" element={<TaTaskPage />}></Route>
					<Route path="/ta/course/:course_id/task/:task/interview" element={<TaInterviewPage />}></Route>

					<Route path="/" element={<LoginPage />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
