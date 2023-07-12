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
import AdminGetRole from '../../General/AdminPageComponents/AdminGetRole';
import { Box, Typography } from '@mui/material';

const AdminPage = () => {
    const [courses, setCourses] = useState({});
    const [role, setRole] = useState({});

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
    const {
        register: registerGetRole,
        formState: formStateGetRole,
        control: controlGetRole,
        handleSubmit: handleGetRole
    } = useForm();

    const [checked, setChecked] = useState(true);

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

    const getRole = (data) => {
        console.log(data);
        AdminApi.get_role(data.username).then((response) => {
            console.log(response);
            if (response.status !== 200) {
                toast.error(response.data.message, { theme: 'colored' });
            } else {
                toast.success('Retrieved role', { theme: 'colored' });
                toast.success(response.data.message, { theme: 'colored' });
            }
            setRole(response.data);
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
        if (Object.keys(formStateGetRole.errors).length > 0) {
            console.log('[-] Form State (Get Role):');
            console.log(formStateGetRole.errors);
        }
    }, [formStateAdd, formStateChange, formStateGetRole]);

    const oldComponent = (
        <div style={{ margin: '0.5ch', justifyContent: 'left', textAlign: 'left' }}>
            <h1>Admin Page</h1>
            <Grid container spacing={2}>
                {courses?.map?.((data, index) => (
                    <Grid item key={index}>
                        <Homecard data={{ ...data, ['role']: 'admin' }} />
                    </Grid>
                ))}
            </Grid>
            {/*<div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, 15em)"}}>*/}

            {/*</div>*/}
            <div>
                <h2>Change/Add Course</h2>
                <input
                    type={'checkbox'}
                    checked={checked}
                    onChange={() => setChecked((c) => !c)}
                ></input>
                <p>{checked ? 'add course' : 'change course'}</p>
                {checked ? (
                    <form onSubmit={handleAdd(addCourse)}>
                        <p>course_code</p>
                        <input {...registerAdd('course_code')} />
                        <p>course_session</p>
                        <input {...registerAdd('course_session')} />
                        <p>gitlab_group_id</p>
                        <input {...registerAdd('gitlab_group_id')} />
                        <p>default_token_count</p>
                        <input {...registerAdd('default_token_count')} />
                        <p>token_length</p>
                        <input {...registerAdd('token_length')} />
                        <p>hidden</p>
                        <input {...registerAdd('hidden')} />
                        <p></p>
                        <input type="submit" />
                    </form>
                ) : (
                    <form onSubmit={handleChange(changeCourse)}>
                        <p>course_id</p>
                        <input {...registerChange('course_id')} />
                        <p>course_code</p>
                        <input {...registerChange('course_code')} />
                        <p>course_session</p>
                        <input {...registerChange('course_session')} />
                        <p>gitlab_group_id</p>
                        <input {...registerChange('gitlab_group_id')} />
                        <p>default_token_count</p>
                        <input {...registerChange('default_token_count')} />
                        <p>token_length</p>
                        <input {...registerChange('token_length')} />
                        <p>hidden</p>
                        <input {...registerChange('hidden')} />
                        <p></p>
                        <input type="submit" />
                    </form>
                )}
            </div>
            <div>
                <h2>Get role</h2>
                <form onSubmit={handleGetRole(getRole)}>
                    <input {...registerGetRole('username')} />
                    <p style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(role, null, 2)}</p>
                    <input type={'submit'} />
                </form>
            </div>
        </div>
    );

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
            tabName: 'Change Course',
            tabId: 2,
            tabSubheading: 'Change existing course details',
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
        },
        {
            tabName: 'Get Role',
            tabId: 3,
            tabSubheading: 'Get role from username',
            tabContent: (
                <AdminGetRole
                    useFormObject={{
                        register: registerGetRole,
                        handleSubmit: handleGetRole,
                        control: controlGetRole,
                        formState: formStateGetRole
                    }}
                    apiCall={getRole}
                />
            )
        }
    ];

    return (
        <Grid container>
            <Grid xs={12}>
                <NavBar page="Admin Panel" role="admin" />
            </Grid>
            <Grid xs={12} sx={{ mt: 3 }}>
                <Grid container justifyContent="center" direction="column" alignItems="center">
                    <Grid xs={12}>
                        <FlexyTabs tabs={tabs} width={1600} height="auto" />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AdminPage;
