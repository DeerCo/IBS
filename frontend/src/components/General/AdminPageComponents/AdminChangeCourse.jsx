import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
    Box,
    Button,
    FormControlLabel,
    InputAdornment,
    Link,
    MenuItem,
    Radio,
    RadioGroup,
    Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import CustomFormLabel from '../../FlexyMainComponents/forms/custom-elements/CustomFormLabel';
import CustomTextField from '../../FlexyMainComponents/forms/custom-elements/CustomTextField';
import CustomOutlinedInput from './CustomOutlinedInput';
import AdminApi from '../../../api/admin_api';
import CustomSelect from '../../FlexyMainComponents/forms/custom-elements/CustomSelect';

/**
 * Component for changing existing courses via admin panel
 * @param props useForm object with register, handleSubmit, control, formState props,
 *              as well as apiCall function to request backend with data
 * @returns {JSX.Element}
 * @constructor
 */
const AdminChangeCourse = (props) => {
    const { useFormObject, apiCall } = props;
    const { setValue } = useFormObject;

    const [allCourses, setAllCourses] = React.useState([]);
    const [currentCourseSelected, setCurrentCourseSelected] = React.useState({});

    React.useEffect(() => {
        AdminApi.all_courses().then((res) => {
            console.log(res);
            setAllCourses(res.data.course);
        });
    }, []);

    React.useEffect(() => {
        if (currentCourseSelected) {
            setValue('hidden', currentCourseSelected.hidden || false);
            setValue('course_code', currentCourseSelected['course_code'] || '');
            setValue('course_session', currentCourseSelected['course_session'] || '');
            setValue('gitlab_group_id', currentCourseSelected['gitlab_group_id'] || '');
            setValue('default_token_count', currentCourseSelected['default_token_count'] || '');
            setValue('token_length', currentCourseSelected['token_length'] / 60 || '');
        }
    }, [currentCourseSelected, setValue]);

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
                            name="course_id"
                            control={useFormObject.control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                                fieldState: { invalid, isTouched, isDirty, error }
                            }) => (
                                <>
                                    <CustomFormLabel
                                        htmlFor="change-course-course-id"
                                        sx={{ mb: 0 }}
                                    >
                                        Course ID *
                                    </CustomFormLabel>
                                    <CustomSelect
                                        labelId="change-course-course-id"
                                        onChange={(event) => {
                                            onChange(event);
                                            const selectedCourse = allCourses.find(
                                                (course) =>
                                                    course['course_id'] === event.target.value
                                            );
                                            setCurrentCourseSelected(selectedCourse);
                                            console.log(selectedCourse);
                                        }}
                                        value={value}
                                        size="small"
                                        variant="outlined"
                                        sx={{ mt: 1, mb: 2, width: 300 }}
                                    >
                                        {allCourses !== [] &&
                                            allCourses.map((course, index) => {
                                                return (
                                                    <MenuItem
                                                        key={`menu-course-${index}`}
                                                        value={course['course_id']}
                                                    >
                                                        {course['course_code']}
                                                    </MenuItem>
                                                );
                                            })}
                                    </CustomSelect>
                                </>
                            )}
                        />
                        <Controller
                            name="hidden"
                            control={useFormObject.control}
                            defaultValue=""
                            rules={{ required: false }}
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
                                        sx={{
                                            mb: 0
                                        }}
                                        htmlFor="change-course-course-code"
                                    >
                                        Course Code *
                                    </CustomFormLabel>
                                    <CustomTextField
                                        id="change-course-course-code"
                                        variant="outlined"
                                        onChange={onChange}
                                        value={value}
                                        size="small"
                                        disabled
                                        sx={{
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: (theme) =>
                                                    `${
                                                        theme.palette.mode === 'dark'
                                                            ? 'rgba(255, 255, 255, 0.12) !important'
                                                            : '#dee3e9 !important'
                                                    }`
                                            },
                                            mt: 1,
                                            width: 300
                                        }}
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
                                        htmlFor="change-course-course-session"
                                        sx={{ mb: 0 }}
                                    >
                                        Course Session *
                                    </CustomFormLabel>
                                    <CustomTextField
                                        id="change-course-course-session"
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
                                        htmlFor="change-course-gitlab-group-id"
                                        sx={{ mb: 0 }}
                                    >
                                        GitLab Group ID *
                                    </CustomFormLabel>
                                    <CustomTextField
                                        id="change-course-gitlab-group-id"
                                        margin="normal"
                                        type="number"
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
                                        htmlFor="change-course-default-token-count"
                                        sx={{ mb: 0 }}
                                    >
                                        Default Token Count *
                                    </CustomFormLabel>
                                    <CustomOutlinedInput
                                        id="change-course-default-token-count"
                                        type="number"
                                        inputProps={{ min: 0 }}
                                        endAdornment={
                                            <InputAdornment position="end">tokens</InputAdornment>
                                        }
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
                                        htmlFor="change-course-token-length"
                                        sx={{ mb: 0 }}
                                    >
                                        Token Length (of 1 Token) *
                                    </CustomFormLabel>
                                    <CustomOutlinedInput
                                        id="change-course-token-length"
                                        type="number"
                                        inputProps={{ min: 0 }}
                                        endAdornment={
                                            <InputAdornment position="end">hrs</InputAdornment>
                                        }
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
                <ul>
                    <li>
                        The <code>Course ID *</code> drop-down automatically sends the corresponding
                        course ID to backend.
                    </li>
                    <li>
                        Once the selected course to edit is selected, their default values (right
                        now) are filled out.
                    </li>
                </ul>
                <Typography variant="body1" fontWeight={400} sx={{ mb: 1 }}>
                    Details of each input:
                </Typography>
                <ul>
                    <li>
                        <strong>Hidden</strong>:
                        <br />
                        Enabling this option allows you to hide the course from students. e.g. in
                        most cases, you might not want to show the course in the beginning when
                        you're still setting up the course.
                    </li>
                    <li>
                        <strong>Course Code</strong> (Course Name): Self-Explanatory
                    </li>
                    <li>
                        <strong>Course Session</strong>:
                        <br />
                        The term that the course is being offered in.
                    </li>
                    <li>
                        <strong>GitLab Group ID</strong>: Self-Explanatory
                    </li>
                    <li>
                        <strong>Default Token Count</strong>:
                        <br />
                        Number of tokens that's available (by default) to all students.
                        <br />
                        Later on, for extraordinary circumstances, you can manage specific groups of
                        students' maximum number of tokens by putting them into "task groups".
                    </li>
                    <li>
                        <strong>Token Length (of 1 Token)</strong>:
                        <br />
                        Number of hours assigned to each (grace) token. Note that the backend
                        handles this in minutes. However, the frontend handles conversion of hours
                        to minutes so the input takes in number of hours per token.
                    </li>
                </ul>
                <Typography variant="body1" fontWeight={400} sx={{ mb: 1 }}>
                    Further details:
                </Typography>
                <ul>
                    <li>
                        If <code>tokenCount == 4 && tokenLength == 4</code>, then each student gets
                        at max 16 hours worth of grace tokens.
                    </li>
                    <li>
                        Note: The purpose of GitLab groups are to easily control the access of
                        students. e.g. Let all students who use <code>IBS</code> be part of group 1.
                        Let all students in <code>CSC309</code> be part of group 2. Let 3 students
                        who are working on <code>Assignment 1 (A1)</code> be part of group 3.
                        Moreover, say that there is a project which includes the repository where
                        the 3 students can work on their code. Then, group 2 is a sub-group of group
                        1 and group 3 is a sub-group of group 2. This way, everything in{' '}
                        <code>CSC309</code> is a sub-group of group 2. Refer to{' '}
                        <Link href="https://docs.gitlab.com/ee/user/group/">GitLab Groups</Link> for
                        more information.
                    </li>
                </ul>
            </Grid>
        </Grid>
    );
};

AdminChangeCourse.propTypes = {
    useFormObject: PropTypes.shape({
        // https://react-hook-form.com/docs/useform/register
        register: PropTypes.func,
        // https://react-hook-form.com/docs/useform/handlesubmit
        handleSubmit: PropTypes.func,
        // https://react-hook-form.com/docs/useform/control
        control: PropTypes.object,
        // https://react-hook-form.com/docs/useform/formstate
        formState: PropTypes.object,
        // https://www.react-hook-form.com/api/useform/setvalue/
        setValue: PropTypes.func
    }).isRequired,
    apiCall: PropTypes.func.isRequired
};

export default AdminChangeCourse;
