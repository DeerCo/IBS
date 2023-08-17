import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AdminApi from '../../../api/admin_api';
import { toast } from 'react-toastify';
import NavBar from '../../Module/Navigation/NavBar';
import { useParams } from 'react-router-dom';
import AdminCourseCRUD from '../../General/AdminCourseCRUD/AdminCourseCRUD';
import Grid from '@mui/material/Unstable_Grid2';
import PageContainer from '../../FlexyMainComponents/container/PageContainer';
import PreviousPageButton from '../../General/PreviousPageButton/PreviousPageButton';

const AdminCoursePage = () => {
    const { register: register4, handleSubmit: handleSubmit4, control: control4 } = useForm();
    const { register: register5, handleSubmit: handleSubmit5, control: control5 } = useForm();
    const { register: register6, handleSubmit: handleSubmit6, control: control6 } = useForm();

    let { course_id } = useParams();

    const [getRoleResponse, setGetRoleResponse] = useState([]);

    const addRole = (data) => {
        AdminApi.add_role({ ...data, course_id: course_id }).then((response) => {
            console.log(response);
            if (response.status === 200)
                toast.success('The role has been assigned and/or user has been created', {
                    theme: 'colored'
                });
            else {
                if (response.status === 401) {
                    toast.warning(response.data.message, { theme: 'colored' });
                    return;
                }
                toast.error(response.data.message, { theme: 'colored' });
            }
        });
    };

    const getRole = (data) => {
        AdminApi.get_role(data.username).then((response) => {
            console.log(response);
            if (response.status !== 200) {
                if (response.status === 401) {
                    toast.warning(response.data.message, { theme: 'colored' });
                }
                toast.error(response.data.message, { theme: 'colored' });
            } else {
                if (response.data.role.length === 0) {
                    toast.warning('No roles associated to given username', { theme: 'colored' });
                    return;
                } else {
                    toast.success('Retrieved role', { theme: 'colored' });
                    setGetRoleResponse(response.data.role);
                }
            }
        });
    };

    const uploadRole = (data) => {
        // Create FormData object to send to endpoint
        const formData = new FormData();
        if (data['file'][0] !== undefined) {
            formData.append('file', data['file'][0]);
        }
        if (data['role'] !== undefined) {
            formData.append('role', data['role']);
        }
        formData.append('course_id', course_id);

        // Note: Even if no email is supplied for (>= 1) user,
        //       they will be added to DB with email set to null.
        formData.append('update_user_info', true);

        AdminApi.upload_role(formData).then((response) => {
            console.log(response);
            if (response.status === 200)
                toast.success(response.data.message, {
                    theme: 'colored'
                });
            else {
                if (response.status === 401) {
                    toast.warning(response.data.message, { theme: 'colored' });
                    return;
                }
                toast.error(response.data.message, { theme: 'colored' });
            }
        });
    };

    const deleteRole = (data) => {
        AdminApi.delete_role({ ...data, course_id: course_id }).then((response) => {
            console.log(response);
            const numRolesRemoved = response.data.count;
            if (numRolesRemoved > 0) {
                const msg =
                    numRolesRemoved === 1
                        ? 'The specified user has been deleted'
                        : `${numRolesRemoved} roles deleted`;
                toast.success(msg, { theme: 'colored' });
            } else {
                if (response.status === 401) {
                    toast.warning(response.data.message, { theme: 'colored' });
                    return;
                }
                toast.error('No roles have been deleted', { theme: 'colored' });
            }
        });
    };

    return (
        <PageContainer title="Roles" description="Assign/Upload/Delete/Retrieve roles for users">
            <Grid container>
                <Grid xs={12}>
                    <NavBar page="Course" role="admin" />
                </Grid>
                <Grid xs={12} sx={{ mt: 3 }}>
                    <Grid container justifyContent="center" direction="column" alignItems="center">
                        <Grid xs={12}>
                            <AdminCourseCRUD
                                onSubmitFunctions={{
                                    AddRole: addRole,
                                    UploadRoles: uploadRole,
                                    DeleteRole: deleteRole,
                                    GetRole: getRole
                                }}
                                getRoleResponse={getRoleResponse}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default AdminCoursePage;
