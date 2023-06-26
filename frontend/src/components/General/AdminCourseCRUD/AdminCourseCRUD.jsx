import PropTypes from 'prop-types';
import React from 'react';
import FlexyTabs from '../FlexyTabs/FlexyTabs';
import Grid from '@mui/material/Unstable_Grid2';
import {
    Box,
    Button,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

const AdminCourseCRUD = (props) => {
    const { onSubmitFunctions } = props;
    const { AddRole, UploadRoles, DeleteRole } = onSubmitFunctions;

    const { control: controlAdd, handleSubmit: handleSubmitAdd, register: registerAdd } = useForm();
    const {
        control: controlUploads,
        handleSubmit: handleSubmitUploads,
        register: registerUploads
    } = useForm();
    const {
        control: controlDelete,
        handleSubmit: handleSubmitDelete,
        register: registerDelete
    } = useForm();
    // TODO: Taking pieces from AdminCoursePage, complete the below components
    // Form handling should be done within each components below
    const AddRoleComponent = () => {
        return (
            <Grid container>
                <Grid xs>
                    <Box
                        sx={{
                            margin: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        maxWidth={300}
                    >
                        <Box component="form" onSubmit={AddRole} noValidate sx={{ mt: 1 }}>
                            <Controller
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { invalid, isTouched, isDirty, error }
                                }) => (
                                    <>
                                        <Typography variant="body1">
                                            Add existing user into this course?
                                        </Typography>
                                        <RadioGroup row value={value} onChange={onChange}>
                                            <FormControlLabel
                                                control={<Radio />}
                                                label="True"
                                                value={true}
                                            />
                                            <FormControlLabel
                                                control={<Radio />}
                                                label="False"
                                                value={false}
                                            />
                                        </RadioGroup>
                                    </>
                                )}
                                name="update_user_info"
                                control={controlAdd}
                                defaultValue={false}
                                rules={{ required: true }}
                            />
                            <Controller
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { invalid, isTouched, isDirty, error }
                                }) => (
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Username"
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        inputRef={ref}
                                    />
                                )}
                                name="username"
                                control={controlAdd}
                                rules={{ required: true }}
                            />
                            <Controller
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { invalid, isTouched, isDirty, error }
                                }) => (
                                    <>
                                        <InputLabel id="select-role" sx={{ mt: 1, mb: 0.5 }}>
                                            Select Role for User *
                                        </InputLabel>
                                        <Select
                                            labelId="select-role"
                                            onChange={onChange}
                                            value={value}
                                            sx={{ width: 300, maxWidth: 300 }}
                                        >
                                            <MenuItem key="admin" value="admin">
                                                Admin
                                            </MenuItem>
                                            <MenuItem key="instructor" value="instructor">
                                                Instructor
                                            </MenuItem>
                                            <MenuItem key="ta" value="ta">
                                                TA
                                            </MenuItem>
                                        </Select>
                                    </>
                                )}
                                name="role"
                                control={controlAdd}
                                rules={{ required: true }}
                            />
                            {/*<Controller*/}
                            {/*    render={({*/}
                            {/*        field: { onChange, onBlur, value, name, ref },*/}
                            {/*        fieldState: { invalid, isTouched, isDirty, error }*/}
                            {/*    }) => (*/}
                            {/*        <TextField*/}
                            {/*            margin="normal"*/}
                            {/*            required*/}
                            {/*            fullWidth*/}
                            {/*            label="Email"*/}
                            {/*            value={value}*/}
                            {/*            onChange={onChange}*/}
                            {/*            onBlur={onBlur}*/}
                            {/*            inputRef={ref}*/}
                            {/*        />*/}
                            {/*    )}*/}
                            {/*    name="email"*/}
                            {/*    control={controlAdd}*/}
                            {/*    rules={{ required: true }}*/}
                            {/*/>*/}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        );
    };

    const UpdateRoleComponent = () => {
        return <></>;
    };

    const UploadRolesComponent = () => {
        return <></>;
    };

    const DeleteRoleComponent = () => {
        return <></>;
    };

    const tabs = [
        {
            tabName: 'Assign Roles',
            tabId: 0,
            tabSubheading: 'Assign Roles for Users',
            tabContent: <AddRoleComponent />
        },
        {
            tabName: 'Update/Change Role',
            tabId: 1,
            tabSubheading: 'Update/Modify Roles from Course',
            tabContent: <UpdateRoleComponent />
        },
        {
            tabName: 'Upload Roles',
            tabId: 2,
            tabSubheading: 'Upload Roles from File',
            tabContent: <UploadRolesComponent />
        },
        {
            tabName: 'Delete Role',
            tabId: 3,
            tabSubheading: 'Remove Roles from Course',
            tabContent: <DeleteRoleComponent />
        }
    ];
    return (
        <>
            <FlexyTabs tabs={tabs} width={1500} height={800} />
        </>
    );
};

AdminCourseCRUD.propTypes = {
    // Should be { AddRole, UploadRoles, DeleteRole }
    onSubmitFunctions: PropTypes.objectOf(PropTypes.func).isRequired
};

export default AdminCourseCRUD;
