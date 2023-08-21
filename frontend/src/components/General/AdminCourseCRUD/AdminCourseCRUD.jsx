import PropTypes from 'prop-types';
import React from 'react';
import FlexyTabs from '../FlexyTabs/FlexyTabs';
import Grid from '@mui/material/Unstable_Grid2';
import {
    Box,
    Button,
    FormControlLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Typography
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import CustomTextField from '../../FlexyMainComponents/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../FlexyMainComponents/forms/custom-elements/CustomFormLabel';
import CustomSelect from '../../FlexyMainComponents/forms/custom-elements/CustomSelect';
import AdminGetRole from '../AdminPageComponents/AdminGetRole';
import ConfirmDialog from '../DeleteConfirmationDialog/DeleteConfirmation';

// Globally change maxWidth for each tab-list component
const MAX_WIDTH = 300;

const AdminCourseCRUD = (props) => {
    const { onSubmitFunctions, getRoleResponse } = props;
    const { AddRole, UploadRoles, DeleteRole, GetRole } = onSubmitFunctions;

    const {
        control: controlAdd,
        handleSubmit: handleSubmitAdd,
        register: registerAdd,
        formState: formStateAdd
    } = useForm();
    const {
        control: controlUploads,
        handleSubmit: handleSubmitUploads,
        register: registerUploads,
        formState: formStateUploads,
        watch: watchUploads
    } = useForm();
    const {
        control: controlDelete,
        handleSubmit: handleSubmitDelete,
        register: registerDelete,
        formState: formStateDelete
    } = useForm();
    const {
        register: registerGetRole,
        formState: formStateGetRole,
        control: controlGetRole,
        handleSubmit: handleGetRole
    } = useForm();

    // Determine if current user to be added is a new user
    const [isNewUser, setIsNewUser] = React.useState(true);

    // Determine whether to delete all users from DB
    const [deleteAllUsers, setDeleteAllUsers] = React.useState(false);

    // For updating filename on uploading file
    const [filename, setFilename] = React.useState('');

    // Watch for filename within 'file' property
    const selectedFile = watchUploads('file', '');
    React.useEffect(() => {
        if (selectedFile.length > 0) setFilename(selectedFile[0].name);
    }, [selectedFile]);

    React.useEffect(() => {
        if (
            Object.keys(formStateAdd.errors).length > 0 ||
            Object.keys(formStateUploads.errors).length > 0 ||
            Object.keys(formStateDelete.errors).length > 0 ||
            Object.keys(formStateGetRole.errors).length > 0
        ) {
            console.log('[-] Form State (Add):');
            console.log(formStateAdd.errors);
            console.log('[-] Form State (Uploads):');
            console.log(formStateUploads.errors);
            console.log('[-] Form State (Delete): ');
            console.log(formStateDelete.errors);
            console.log('[-] Form State (Get):');
            console.log(formStateGetRole.errors);
        }
    }, [formStateAdd, formStateUploads, formStateDelete, formStateGetRole]);

    const AddRoleComponent = () => {
        return (
            <Grid container columns={12}>
                <Grid xs={6}>
                    <Box
                        sx={{
                            margin: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        maxWidth={MAX_WIDTH}
                    >
                        <Box
                            component="form"
                            onSubmit={handleSubmitAdd(AddRole)}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <>
                                <Typography variant="body1">Does the user exist?</Typography>
                                <RadioGroup
                                    row
                                    value={isNewUser}
                                    onChange={(event, value) => setIsNewUser(value === 'true')}
                                >
                                    <FormControlLabel
                                        control={<Radio />}
                                        label="Yes"
                                        value={true}
                                    />
                                    <FormControlLabel
                                        control={<Radio />}
                                        label="No"
                                        value={false}
                                    />
                                </RadioGroup>
                            </>
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
                                defaultValue="false"
                                rules={{ required: false }}
                            />
                            <Controller
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { invalid, isTouched, isDirty, error }
                                }) => (
                                    <>
                                        <CustomFormLabel htmlFor="username-add-role" sx={{ mb: 0 }}>
                                            Username *
                                        </CustomFormLabel>
                                        <CustomTextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            id="username-add-role"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            inputRef={ref}
                                            sx={{ mt: 1 }}
                                        />
                                    </>
                                )}
                                name="username"
                                control={controlAdd}
                                defaultValue=""
                                rules={{ required: true }}
                            />
                            <Controller
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { invalid, isTouched, isDirty, error }
                                }) => (
                                    <>
                                        <CustomFormLabel id="select-role" sx={{ mt: 1, mb: 0 }}>
                                            Select Role for User *
                                        </CustomFormLabel>
                                        <CustomSelect
                                            labelId="select-role"
                                            onChange={onChange}
                                            value={value}
                                            size="small"
                                            variant="outlined"
                                            sx={{ width: 300, maxWidth: 300, mt: 1 }}
                                        >
                                            <MenuItem key="instructor" value="instructor">
                                                Instructor
                                            </MenuItem>
                                            <MenuItem key="ta" value="ta">
                                                TA
                                            </MenuItem>
                                            <MenuItem key="student" value="student">
                                                Student
                                            </MenuItem>
                                        </CustomSelect>
                                    </>
                                )}
                                name="role"
                                control={controlAdd}
                                defaultValue=""
                                rules={{ required: true }}
                            />
                            {!isNewUser && (
                                <Controller
                                    render={({
                                        field: { onChange, onBlur, value, name, ref },
                                        fieldState: { invalid, isTouched, isDirty, error }
                                    }) => (
                                        <>
                                            <CustomFormLabel
                                                htmlFor="add-role-email"
                                                sx={{ mb: 0 }}
                                            >
                                                Email *
                                            </CustomFormLabel>
                                            <CustomTextField
                                                margin="normal"
                                                id="add-role-email"
                                                required
                                                fullWidth
                                                value={value}
                                                type="email"
                                                variant="outlined"
                                                size="medium"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                inputRef={ref}
                                                sx={{ mt: 1 }}
                                            />
                                        </>
                                    )}
                                    name="email"
                                    control={controlAdd}
                                    defaultValue=""
                                    rules={{ required: true }}
                                />
                            )}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Assign Role
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid xs={6} sx={{ maxWidth: 500 }}>
                    <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
                        Notes:
                    </Typography>
                    <ul>
                        <li>
                            <Typography variant="body1">
                                Adding (or assigning) a new role for a user doesn't necessarily need
                                a user to already exist in the database. If a user doesn't exist in
                                the database, a new user will be created and will be assigned the
                                role. Otherwise, the intended role will be assigned to an
                                already-existing user.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                It is the responsibility of the new user to set their "new" password
                                on account/user creation.
                            </Typography>
                        </li>
                    </ul>
                </Grid>
            </Grid>
        );
    };

    const UploadRolesComponent = () => {
        return (
            <Grid container columns={12}>
                <Grid xs={6}>
                    <Box
                        sx={{
                            margin: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        maxWidth={MAX_WIDTH + 100}
                    >
                        <Box
                            component="form"
                            onSubmit={handleSubmitUploads(UploadRoles)}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <Typography variant="body1" sx={{ mb: 1.5 }}>
                                Acceptable File Extensions: <strong>*.csv</strong>
                                <br />
                                Refer to the "Notes" section for the format of file.
                            </Typography>
                            <Box display="flex" alignItems="center" gap={4}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    sx={{ mb: 3, width: 200, height: 50 }}
                                >
                                    Upload File
                                    <input
                                        hidden
                                        multiple={false}
                                        type="file"
                                        accept=".csv"
                                        {...registerUploads('file')}
                                    />
                                </Button>
                                <Typography variant="body1" sx={{ mb: 3 }}>
                                    File Uploaded: {filename}
                                </Typography>
                            </Box>
                            <Controller
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { invalid, isTouched, isDirty, error }
                                }) => (
                                    <>
                                        <CustomFormLabel id="select-role" sx={{ mt: 1, mb: 0 }}>
                                            Select Role for Users in File *
                                        </CustomFormLabel>
                                        <CustomSelect
                                            labelId="select-role"
                                            onChange={onChange}
                                            value={value}
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                width: MAX_WIDTH + 100,
                                                maxWidth: MAX_WIDTH + 100,
                                                mt: 1
                                            }}
                                        >
                                            <MenuItem key="instructor" value="instructor">
                                                Instructor
                                            </MenuItem>
                                            <MenuItem key="ta" value="ta">
                                                TA
                                            </MenuItem>
                                            <MenuItem key="student" value="student">
                                                Student
                                            </MenuItem>
                                        </CustomSelect>
                                    </>
                                )}
                                name="role"
                                control={controlUploads}
                                defaultValue=""
                                rules={{ required: true }}
                            />
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
                <Grid xs={6} sx={{ maxWidth: 500 }}>
                    <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
                        Notes:
                    </Typography>
                    <ul>
                        <li>
                            <Typography variant="body1">
                                If users do not exist in DB, they will be created with{' '}
                                <code>email</code> set to <code>initial</code>.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1">
                                The format of the csv file being uploaded should be as follows:
                                <br />
                                <code>
                                    username,email
                                    <br />
                                    user1,user1@example.com
                                    <br />
                                    user2,user2@example.com
                                    <br />
                                    ...
                                </code>
                                <br />
                                Note that the email field may be left blank and is optional. i.e.
                                the csv file format can be
                                <br />
                                <code>
                                    username,email
                                    <br />
                                    user1,user1@example.com
                                    <br />
                                    user2,
                                    <br />
                                    user3,user3@example.com
                                    <br />
                                    ...
                                </code>
                                <br />
                                If the emails are left blank, the default email in the DB will be
                                set to <code>null</code>.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1">
                                There is no requirement on the name of the file.
                            </Typography>
                        </li>
                    </ul>
                </Grid>
            </Grid>
        );
    };

    const DeleteRoleComponent = () => {
        const [confirmRemoveRole, setConfirmRemoveRole] = React.useState(false);

        return (
            <Grid container columns={12}>
                <Grid xs={6}>
                    <Box
                        sx={{
                            margin: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        maxWidth={MAX_WIDTH}
                    >
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <Controller
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { invalid, isTouched, isDirty, error }
                                }) => (
                                    <>
                                        <Typography variant="body1">
                                            Do you want to remove all users from course?
                                        </Typography>
                                        <RadioGroup
                                            row
                                            value={value}
                                            onChange={(event, value) => {
                                                onChange(event, value);
                                                setDeleteAllUsers(value === 'true');
                                            }}
                                        >
                                            <FormControlLabel
                                                control={<Radio />}
                                                label="Yes"
                                                value={true}
                                            />
                                            <FormControlLabel
                                                control={<Radio />}
                                                label="No"
                                                value={false}
                                            />
                                        </RadioGroup>
                                    </>
                                )}
                                name="delete_all"
                                control={controlDelete}
                                defaultValue={false}
                            />
                            {!deleteAllUsers && (
                                <Controller
                                    render={({
                                        field: { onChange, onBlur, value, name, ref },
                                        fieldState: { invalid, isTouched, isDirty, error }
                                    }) => (
                                        <>
                                            <CustomFormLabel
                                                htmlFor="username-delete-role"
                                                sx={{ mb: 0 }}
                                            >
                                                Username *
                                            </CustomFormLabel>
                                            <CustomTextField
                                                id="username-delete-role"
                                                margin="normal"
                                                variant="outlined"
                                                size="small"
                                                required
                                                fullWidth
                                                value={value}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                inputRef={ref}
                                                sx={{ mt: 1 }}
                                            />
                                        </>
                                    )}
                                    name="username"
                                    control={controlDelete}
                                    defaultValue=""
                                />
                            )}
                            <ConfirmDialog
                                open={confirmRemoveRole}
                                setOpen={setConfirmRemoveRole}
                                onConfirm={handleSubmitDelete(DeleteRole)}
                            >
                                Are you sure you want to delete ALL roles from course? Doing so will
                                remove all users' roles from the course.
                            </ConfirmDialog>
                            <Button
                                onClick={() => setConfirmRemoveRole(true)}
                                fullWidth
                                variant="contained"
                                color="error"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Remove Role
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid xs={6} sx={{ maxWidth: 500 }}>
                    <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
                        Notes:
                    </Typography>
                    <ul>
                        <li>
                            <Typography variant="body1">
                                Enter the username of the user you wish for the role to be deleted
                                from.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1">
                                Removing all users from course just removes users from this course.
                                It doesn't actually result in user account deletion.
                            </Typography>
                        </li>
                    </ul>
                </Grid>
            </Grid>
        );
    };

    const tabs = [
        {
            tabName: 'Assign Roles',
            tabId: 0,
            tabSubheading: 'Assign Roles for Users',
            tabContent: <AddRoleComponent />
        },
        {
            tabName: 'Upload Roles',
            tabId: 1,
            tabSubheading: 'Upload Roles from File',
            tabContent: <UploadRolesComponent />
        },
        {
            tabName: 'Delete Role',
            tabId: 2,
            tabSubheading: 'Remove Roles from Course',
            tabContent: <DeleteRoleComponent />
        },
        {
            tabName: 'Get Role',
            tabId: 3,
            tabSubheading: 'Get roles from username',
            tabContent: (
                <AdminGetRole
                    useFormObject={{
                        register: registerGetRole,
                        handleSubmit: handleGetRole,
                        control: controlGetRole,
                        formState: formStateGetRole
                    }}
                    apiCall={GetRole}
                    rolesResponse={getRoleResponse}
                />
            )
        }
    ];
    return (
        <>
            <FlexyTabs tabs={tabs} width='95vw' height={800} />
        </>
    );
};

AdminCourseCRUD.propTypes = {
    // Should be { AddRole, UploadRoles, DeleteRole, GetRole }
    onSubmitFunctions: PropTypes.objectOf(PropTypes.func).isRequired,
    // Response array from hitting GetRole endpoint
    getRoleResponse: PropTypes.arrayOf(
        PropTypes.shape({
            username: PropTypes.string,
            course_id: PropTypes.number,
            role: PropTypes.string
        })
    ).isRequired
};

export default AdminCourseCRUD;
