import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Login from "./components/login";
import Register from "./components/register";
import Frist from "./components/student_first_page";
import Tasks from "./components/student_tasks_page";
import Files from "./components/student_file_page";
import Interview from "./components/student_interview_page";
import reportWebVitals from './reportWebVitals';
import {createRoot} from 'react-dom/client';

import MarkPage from "./components/Page/MarkPage";

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/frontPage" element={<Frist />}></Route>
      <Route path="/taskPage" element={<Tasks />}></Route>
      <Route path="/mark" element={<MarkPage />}></Route>
      <Route path="/filePage" element={<Files />}></Route>
      <Route path="/interviewPage" element={<Interview />}></Route>
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
