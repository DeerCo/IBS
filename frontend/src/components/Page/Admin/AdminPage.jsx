import React, { useEffect, useState } from 'react';
import AdminApi from '../../../api/admin_api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Homecard from '../../Module/Course/Homecard';
import Grid from '@mui/material/Unstable_Grid2';
import NavBar from '../../Module/Navigation/NavBar';
import FlexyTabs from '../../General/FlexyTabs/FlexyTabs';
import AdminAddCourse from '../../General/AdminPageComponents/AdminAddCourse';
import AdminChangeCourse from '../../General/AdminPageComponents/AdminChangeCourse';
import PageContainer from '../../FlexyMainComponents/container/PageContainer';

const AdminPage = () => {
    const [courses, setCourses] = useState({});

    const {
        register: registerAdd,
        formState: formStateAdd,
        control: controlAdd,
        handleSubmit: handleAdd
    } = useForm();
    const {
        register: registerChange,
        formState: formStateChange,
        control: controlChange,
        handleSubmit: handleChange,
        setValue: setValueChange
    } = useForm();

    const addCourse = (data) => {
        // console.log(data);
        // Convert data.token_length from hours to minutes (for backend)
        let newData = structuredClone(data);
        if (newData['token_length'] !== undefined) {
            newData['token_length'] = newData['token_length'] * 60;
        }
        AdminApi.add_course(newData).then((response) => {
            console.log(response);
            if (response.status !== 200) {
                toast.error(response.data.message, { theme: 'colored' });
            } else {
                toast.success('The course has been created', { theme: 'colored' });
            }
            AdminApi.all_courses().then((response) => {
                setCourses(response.data.course);
            });
        });
    };

    const changeCourse = (data) => {
        // Convert data.token_length from hours to minutes (for backend)
        let newData = structuredClone(data);
        if (newData['token_length'] !== undefined) {
            newData['token_length'] = newData['token_length'] * 60;
        }
        AdminApi.change_course(newData).then((response) => {
            console.log(response);
            if (response.status !== 200) {
                toast.error(response.data.message, { theme: 'colored' });
            } else {
                toast.success('The course has been modified', { theme: 'colored' });
            }
            AdminApi.all_courses().then((response) => {
                setCourses(response.data.course);
            });
        });
    };

    const addRole = (data) => {
        AdminApi.add_role(data).then((response) => {
            console.log(response);
            toast(response.data.message);
        });
    };

    const uploadRole = (data) => {
        AdminApi.add_role(data).then((response) => {
            console.log(response);
            toast(response.data.message);
        });
    };

    const deleteRole = (data) => {
        AdminApi.delete_role(data).then((response) => {
            console.log(response);
            toast(response.data.message);
        });
    };

    useEffect(() => {
        AdminApi.all_courses().then((response) => {
            setCourses(response.data.course);
        });
    }, []);

    useEffect(() => {
        if (Object.keys(formStateAdd.errors).length > 0) {
            console.log('[-] Form State (Add Course):');
            console.log(formStateAdd.errors);
        }
        if (Object.keys(formStateChange.errors).length > 0) {
            console.log('[-] Form State (Change Course):');
            console.log(formStateChange.errors);
        }
    }, [formStateAdd, formStateChange]);

    const CurrentCoursesComponent = () => {
        return (
            <Grid container spacing={2}>
                {courses?.map?.((data, index) => (
                    <Grid key={index}>
                        <Homecard data={{ ...data, role: 'admin' }} />
                    </Grid>
                ))}
            </Grid>
        );
    };

    const tabs = [
        {
            tabName: 'List of Courses',
            tabId: 0,
            tabSubheading: 'Current Courses',
            tabContent: <CurrentCoursesComponent />
        },
        {
            tabName: 'Add Courses',
            tabId: 1,
            tabSubheading: 'Add new courses',
            tabContent: (
                <AdminAddCourse
                    useFormObject={{
                        register: registerAdd,
                        handleSubmit: handleAdd,
                        control: controlAdd,
                        formState: formStateAdd
                    }}
                    apiCall={addCourse}
                />
            )
        },
        {
            tabName: 'Modify Course',
            tabId: 2,
            tabSubheading: 'Modify existing course details',
            tabContent: (
                <AdminChangeCourse
                    useFormObject={{
                        register: registerChange,
                        handleSubmit: handleChange,
                        control: controlChange,
                        formState: formStateChange,
                        setValue: setValueChange
                    }}
                    apiCall={changeCourse}
                />
            )
        }
    ];

    return (
        <PageContainer title="Admin Home" description="Home page for admin view">
            <Grid container>
                <Grid xs={12}>
                    <NavBar page="Admin Panel" role="admin" />
                </Grid>
                <Grid xs={12} sx={{ mt: 3 }}>
                    <Grid container justifyContent="center" direction="column" alignItems="center">
                        <Grid xs={12}>
                            <FlexyTabs tabs={tabs} width='98vw' height="auto" />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default AdminPage;
