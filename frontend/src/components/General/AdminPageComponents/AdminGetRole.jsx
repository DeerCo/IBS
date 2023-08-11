import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, InputAdornment, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import CustomFormLabel from '../../FlexyMainComponents/forms/custom-elements/CustomFormLabel';
import CustomOutlinedInput from './CustomOutlinedInput';

/**
 * Component for getting role type based on given username
 * @param props useForm object with register, handleSubmit, control, formState props,
 *              as well as apiCall function to request backend with data
 * @returns {JSX.Element}
 * @constructor
 */
const AdminGetRole = (props) => {
    const { useFormObject, apiCall, rolesResponse } = props;

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
                        onSubmit={useFormObject.handleSubmit(apiCall)}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <Controller
                            name="username"
                            control={useFormObject.control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                                fieldState: { invalid, isTouched, isDirty, error }
                            }) => (
                                <>
                                    <CustomFormLabel
                                        htmlFor="get-roles-username"
                                        sx={{ mb: 0, mt: 0 }}
                                    >
                                        Username *
                                    </CustomFormLabel>
                                    <CustomOutlinedInput
                                        id="get-roles-username"
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
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Get Role
                        </Button>
                        {rolesResponse.length > 0 && (
                            <Grid container spacing={2} sx={{ mt: 3 }}>
                                <Grid xs={12}>
                                    <Typography align="center" variant="h3">
                                        Retrieved Response
                                    </Typography>
                                    <Grid xs={12}>
                                        <Typography variant="body1">
                                            Retrieved: <code>{rolesResponse[0].username}</code>
                                        </Typography>
                                        <ul>
                                            {rolesResponse.map((obj, index) => {
                                                return (
                                                    <li key={`roles-response-${index}`}>
                                                        Course ID: {obj.course_id}, Role:{' '}
                                                        {obj.role.charAt(0).toUpperCase() +
                                                            obj.role.slice(1)}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} sx={{ maxWidth: 500 }}>
                <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
                    Notes:
                </Typography>
                <ul>
                    <li>
                        This form retrieves all courses that the user belongs to as well as their
                        role in the respective courses.
                    </li>
                </ul>
            </Grid>
        </Grid>
    );
};

AdminGetRole.propTypes = {
    useFormObject: PropTypes.shape({
        // https://react-hook-form.com/docs/useform/register
        register: PropTypes.func,
        // https://react-hook-form.com/docs/useform/handlesubmit
        handleSubmit: PropTypes.func,
        // https://react-hook-form.com/docs/useform/control
        control: PropTypes.object,
        // https://react-hook-form.com/docs/useform/formstate
        formState: PropTypes.object
    }).isRequired,
    apiCall: PropTypes.func.isRequired,
    // State for the roles response from backend API
    rolesResponse: PropTypes.arrayOf(
        PropTypes.shape({
            username: PropTypes.string,
            course_id: PropTypes.number,
            role: PropTypes.string
        })
    ).isRequired
};

export default AdminGetRole;
