import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import CustomFormLabel from '../../FlexyMainComponents/forms/custom-elements/CustomFormLabel';
import CustomTextField from '../../FlexyMainComponents/forms/custom-elements/CustomTextField';

/**
 * Component for adding new courses via admin panel
 * @param props useForm object with register, handleSubmit, control, formState props,
 *              as well as apiCall function to request backend with data
 * @returns {JSX.Element}
 * @constructor
 */
const AdminAddCourse = (props) => {
    const { useFormObject, apiCall } = props;

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
                        {/* TODO: Add controllers like in AdminCourseCRUD component */}
                        <Controller
                            name="hidden"
                            control={useFormObject.control}
                            defaultValue="false"
                            rules={{ required: true }}
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                                fieldState: { invalid, isTouched, isDirty, error }
                            }) => (
                                <>
                                    <Typography variant="body1" fontSize={17}>
                                        Set course as hidden?
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
                        />
                        <Controller
                            name="course_code"
                            control={useFormObject.control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                                fieldState: { invalid, isTouched, isDirty, error }
                            }) => (
                                <>
                                    <CustomFormLabel
                                        htmlFor="add-course-course-code"
                                        sx={{ mb: 0 }}
                                    >
                                        Course Code *
                                    </CustomFormLabel>
                                    <CustomTextField
                                        id="add-course-course-code"
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
                        />
                        <Controller
                            name="course_session"
                            control={useFormObject.control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                                fieldState: { invalid, isTouched, isDirty, error }
                            }) => (
                                <>
                                    <CustomFormLabel
                                        htmlFor="add-course-course-session"
                                        sx={{ mb: 0 }}
                                    >
                                        Course Session *
                                    </CustomFormLabel>
                                    <CustomTextField
                                        id="add-course-course-session"
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
                        />
                        <Controller
                            name="gitlab_group_id"
                            control={useFormObject.control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                                fieldState: { invalid, isTouched, isDirty, error }
                            }) => (
                                <>
                                    <CustomFormLabel
                                        htmlFor="add-course-gitlab-group-id"
                                        sx={{ mb: 0 }}
                                    >
                                        GitLab Group ID *
                                    </CustomFormLabel>
                                    <CustomTextField
                                        id="add-course-gitlab-group-id"
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
                        />
                        <Controller
                            name="default_token_count"
                            control={useFormObject.control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                                fieldState: { invalid, isTouched, isDirty, error }
                            }) => (
                                <>
                                    <CustomFormLabel
                                        htmlFor="add-course-default-token-count"
                                        sx={{ mb: 0 }}
                                    >
                                        Default Token Count *
                                    </CustomFormLabel>
                                    <CustomTextField
                                        id="add-course-default-token-count"
                                        margin="normal"
                                        type="number"
                                        InputProps={{
                                            inputProps: { min: 0 }
                                        }}
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
                        <Controller
                            name="token_length"
                            control={useFormObject.control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                                fieldState: { invalid, isTouched, isDirty, error }
                            }) => (
                                <>
                                    <CustomFormLabel
                                        htmlFor="add-course-token-length"
                                        sx={{ mb: 0 }}
                                    >
                                        Token Length *
                                    </CustomFormLabel>
                                    <CustomTextField
                                        id="add-course-token-length"
                                        margin="normal"
                                        type="number"
                                        InputProps={{
                                            inputProps: { min: 0 }
                                        }}
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
                            Add Course
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} sx={{ maxWidth: 500 }}>
                <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
                    Notes:
                </Typography>
            </Grid>
        </Grid>
    );
};

AdminAddCourse.propTypes = {
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
    apiCall: PropTypes.func.isRequired
};

export default AdminAddCourse;
