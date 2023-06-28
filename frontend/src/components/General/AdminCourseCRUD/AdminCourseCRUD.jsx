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
import CustomTextField from '../../FlexyMainComponents/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../FlexyMainComponents/forms/custom-elements/CustomFormLabel';
import CustomSelect from '../../FlexyMainComponents/forms/custom-elements/CustomSelect';

const AdminCourseCRUD = (props) => {
    const { onSubmitFunctions } = props;
    const { AddRole, UploadRoles, DeleteRole } = onSubmitFunctions;

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
        formState: formStateUploads
    } = useForm();
    const {
        control: controlDelete,
        handleSubmit: handleSubmitDelete,
        register: registerDelete,
        formState: formStateDelete
    } = useForm();

    // Determine if current user to be added is a new user
    const [isNewUser, setIsNewUser] = React.useState(true);

    const [deleteAllUsers, setDeleteAllUsers] = React.useState(false);

    React.useEffect(() => {
        if (
            Object.keys(formStateAdd.errors).length > 0 ||
            Object.keys(formStateUploads.errors).length > 0 ||
            Object.keys(formStateDelete.errors).length > 0
        ) {
            console.log('[-] Form State (Add):');
            console.log(formStateAdd.errors);
            console.log('[-] Form State (Uploads):');
            console.log(formStateUploads.errors);
            console.log('[-] Form State (Delete): ');
            console.log(formStateDelete.errors);
        }
    }, [formStateAdd, formStateUploads, formStateDelete]);

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
                        maxWidth={300}
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
                                            size="medium"
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
                                            size="medium"
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
        return <></>;
    };

    const DeleteRoleComponent = () => {
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
                        maxWidth={300}
                    >
                        <Box
                            component="form"
                            onSubmit={handleSubmitDelete(DeleteRole)}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <Controller
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { invalid, isTouched, isDirty, error }
                                }) => (
                                    <>
                                        <Typography variant="body1">
                                            Do you want to delete all users' roles?
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
                                rules={{ required: true }}
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
                                                size="medium"
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
                                    rules={{ required: true }}
                                />
                            )}
                            <Button
                                type="submit"
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
                                Deleting all users' roles will delete every role assigned to each
                                user in the database.
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
