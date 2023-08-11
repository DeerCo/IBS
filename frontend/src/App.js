import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from './views/authentication/Login';
import ResetPasswordPage from './views/authentication/ResetPassword';
import Error from './views/authentication/Error';
import Home from './components/Page/General/HomePage';
import StudentMarkPage from './components/Page/Student/StudentMarkPage';
import StudentFilePage from './components/Page/Student/StudentFilePage';
import StudentInterviewPage from './components/Page/Student/StudentInterviewPage';
import StudentTaskPage from './components/Page/Student/StudentTaskPage';
import StudentDetailsPage from './components/Page/Student/StudentDetailsPage';
import InstructorDetailsPage from './components/Page/Instructor/InstructorDetailsPage';
import TaTaskPage from './components/Page/Ta/TaTaskPage';
import InterviewPage from './components/Page/Staff/InterviewPage';
import AdminPage from './components/Page/Admin/AdminPage';
import { ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import InstructorTaskPage from './components/Page/Instructor/InstructorTaskPage';
import AdminCoursePage from './components/Page/Admin/AdminCoursePage';
import InstructorImpersonate from './components/Page/Instructor/InstructorImpersonate';
import AdminImpersonate from './components/Page/Admin/AdminImpersonate';
import AggregatedGrades from './components/Page/Instructor/AggregatedGrades';
import { CssBaseline } from '@mui/material';
import ThemeSettings from './layouts/full-layout/customizer/ThemeSettings';
import { useSelector } from 'react-redux';
import RTL from './layouts/full-layout/customizer/RTL';
import StudentListPage from './components/Page/Student/StudentListPage';
import TaskGroupListPage from './components/General/TaskGroupList/TaskGroupListPage';
import SubmitMarks from './components/Page/Instructor/SubmitMarks';
import Groups from './components/Page/Instructor/Groups';
import TaskGroupPage from './components/Page/Instructor/TaskGroupPage';
import AddTask from './components/Page/Instructor/AddTask';
import ModifyTask from './components/Page/Instructor/ModifyTask';
import InstructorTaskMarksPage from './components/Page/Instructor/InstructorTaskMarksPage';
import ProtectedRoute from './components/Module/Routes/ProtectedRoute';

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
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/reset" element={<ResetPasswordPage />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/course/:course_id/task" element={<StudentTaskPage />} />
                        <Route
                            path="/course/:course_id/student-list"
                            element={<StudentListPage />}
                        />
                        <Route
                            path="/course/:course_id/task/:task/details"
                            element={<StudentDetailsPage />}
                        />
                        <Route
                            path="/course/:course_id/task/:task/interview"
                            element={<StudentInterviewPage />}
                        />
                        <Route
                            path="/course/:course_id/task/:task/mark"
                            element={<StudentMarkPage />}
                        />
                        <Route
                            path="/course/:course_id/task/:task/file"
                            element={<StudentFilePage />}
                        />
                        <Route path="/ta/course/:course_id/task" element={<TaTaskPage />} />
                        <Route
                            path="/ta/course/:course_id/task/:task/interview"
                            element={<InterviewPage />}
                        />
                        <Route
                            path="/instructor/course/:course_id/task"
                            element={<InstructorTaskPage />}
                        />
                        <Route
                            path="/instructor/course/:courseId/task/:taskId/groups"
                            element={<TaskGroupListPage />}
                        />
                        <Route
                            path="/instructor/course/:courseId/task/:task/groups"
                            element={<Groups role="instructor" />}
                        />
                        <Route
                            path="/instructor/course/:course_id/impersonate"
                            element={<InstructorImpersonate />}
                        />
                        <Route
                            path="/instructor/course/:courseId/all-grades"
                            element={<AggregatedGrades role="instructor" />}
                        />
                        <Route
                            path="/instructor/course/:course_id/add-task"
                            element={<AddTask />}
                        />
                        <Route
                            path="/instructor/course/:course_id/task/:task/modify"
                            element={<ModifyTask />}
                        />
                        <Route
                            path="/instructor/course/:course_id/task/:task_id/mark"
                            element={<InstructorTaskMarksPage />}
                        />
                        <Route
                            path="/instructor/course/:course_id/task/:task/interview"
                            element={<InterviewPage />}
                        />
                        <Route
                            path="/instructor/course/:course_id/impersonate"
                            element={<InstructorImpersonate />}
                        />
                        <Route
                            path="/instructor/course/:courseId/task-group"
                            element={<TaskGroupPage role="instructor" />}
                        />
                        <Route
                            path="/instructor/course/:courseId/submit-marks"
                            element={<SubmitMarks />}
                        />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <AdminPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/course/:course_id/task"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <AdminCoursePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/admin/impersonate" element={<AdminImpersonate />} />
                        <Route
                            path="/admin/course/:courseId/all-grades"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <AggregatedGrades role="admin" />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/course/:courseId/task-group"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <TaskGroupPage role="admin" />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </BrowserRouter>
            </RTL>
        </ThemeProvider>
    );
}

export default App;
