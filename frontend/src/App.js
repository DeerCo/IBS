import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from './views/authentication/Login';
import ResetPasswordPage from './views/authentication/ResetPassword';
import Error from './views/authentication/Error';
import Home from './components/Page/General/HomePage';
import NotFoundPage from './components/Page/General/NotFoundPage';
import StudentMarkPage from './components/Page/Student/StudentMarkPage';
import StudentFilePage from './components/Page/Student/StudentFilePage';
import StudentInterviewPage from './components/Page/Student/StudentInterviewPage';
import StudentTaskPage from './components/Page/Student/StudentTaskPage';
import StudentDetailsPage from './components/Page/Student/StudentDetailsPage';
import TaTaskPage from './components/Page/Ta/TaTaskPage';
import TaInterviewPage from './components/Page/Ta/TaInterviewPage';
import Admin_page from './components/Page/Admin/Admin_page';
import { ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import InstructorTaskPage from './components/Page/Instructor/InstructorTaskPage';
import Admin_task from './components/Page/Admin/admin_task';
import InstructorImpersonate from './components/Page/Instructor/InstructorImpersonate';
import AdminImpersonate from './components/Page/Admin/AdminImpersonate';
import AggregatedGrades from './components/Page/Instructor/AggregatedGrades';
import { CssBaseline } from '@mui/material';
import ThemeSettings from './layouts/full-layout/customizer/ThemeSettings';
import { useSelector } from 'react-redux';
import RTL from './layouts/full-layout/customizer/RTL';
import StudentListPage from './components/Page/Student/StudentListPage';

function App() {
    const theme = ThemeSettings();
    const customizer = useSelector((state) => state.CustomizerReducer);
    return (
        <ThemeProvider theme={theme}>
            <RTL direction={customizer.activeDir}>
                <CssBaseline />
                <ToastContainer limit={3} position="top-center" />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage />}></Route>
                        <Route path="/login" element={<LoginPage />}></Route>
                        <Route path="/reset" element={<ResetPasswordPage />}></Route>
                        <Route path="/home" element={<Home />}></Route>

                        <Route path="/course/:course_id/task" element={<StudentTaskPage />}></Route>
                        <Route
                            path="/course/:course_id/student-list"
                            element={<StudentListPage />}
                        ></Route>
                        <Route
                            path="/course/:course_id/task/:task/details"
                            element={<StudentDetailsPage />}
                        ></Route>
                        <Route
                            path="/course/:course_id/task/:task/interview"
                            element={<StudentInterviewPage />}
                        ></Route>
                        <Route
                            path="/course/:course_id/task/:task/mark"
                            element={<StudentMarkPage />}
                        ></Route>
                        <Route
                            path="/course/:course_id/task/:task/file"
                            element={<StudentFilePage />}
                        ></Route>

                        <Route path="/ta/course/:course_id/task" element={<TaTaskPage />}></Route>
                        <Route
                            path="/ta/course/:course_id/task/:task/interview"
                            element={<TaInterviewPage />}
                        ></Route>

                        <Route
                            path="/instructor/course/:course_id/task"
                            element={<InstructorTaskPage />}
                        />
                        <Route
                            path="/instructor/course/:course_id/impersonate"
                            element={<InstructorImpersonate />}
                        />
                        <Route
                            path="/instructor/course/:courseId/all-grades"
                            element={<AggregatedGrades />}
                        />
                        <Route
                            path="/instructor/course/:course_id/impersonate"
                            element={<InstructorImpersonate />}
                        ></Route>

                        <Route path="/admin" element={<Admin_page />}></Route>
                        <Route path="/admin/course/:course_id/task" element={<Admin_task />} />
                        <Route path="/admin/impersonate" element={<AdminImpersonate />} />
                        <Route
                            path="/admin/course/:courseId/all-grades"
                            element={<AggregatedGrades />}
                        />
                        <Route
                            path="/admin/course/:course_id/task"
                            element={<Admin_task />}
                        ></Route>
                        <Route path="/admin/impersonate" element={<AdminImpersonate />}></Route>

                        <Route path="*" element={<Error />} />
                    </Routes>
                </BrowserRouter>
            </RTL>
        </ThemeProvider>
    );
}

export default App;
