import React from 'react';
import PropTypes from 'prop-types';
import { Button, CardContent, Container, MenuItem, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CustomFormLabel from '../../FlexyMainComponents/forms/custom-elements/CustomFormLabel';
import { DesktopDateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from 'moment';
import { parseISO } from 'date-fns';
import CustomTextField from '../../FlexyMainComponents/forms/custom-elements/CustomTextField';
import CustomSelect from '../../FlexyMainComponents/forms/custom-elements/CustomSelect';
import { toast } from 'react-toastify';
import TaApi from '../../../api/ta_api';
import { useNavigate } from 'react-router-dom';
import StaffApi from '../../../api/staff_api';

const ScheduleInterview = (props) => {
    const { navigate } = useNavigate();

    // for select dropdown when scheduling interview
    const [isOnline, setIsOnline] = React.useState(false);
    const [selectVal, setSelectVal] = React.useState('In-Person');

    // track the entered
    const [enteredTime, setEnteredTime] = React.useState('');
    const [enteredLength, setEnteredLength] = React.useState('');
    const [enteredLocation, setEnteredLocation] = React.useState('');

    // the book interview function
    // add task later into the ta input
    const schedule_interview = (time, length, location) => {
        if (time === '') {
            toast.error('The time cannot be empty', { theme: 'colored' });
        } else if (length === '') {
            toast.error('The length cannot be empty', { theme: 'colored' });
        } else if (location === '') {
            toast.error('The location cannot be empty', { theme: 'colored' });
        } else {
            StaffApi.scheduleInterview(props.courseId, props.taskId, length, time, location).then(
                (response) => {
                    if (!response || !('status' in response)) {
                        toast.error('Unknown error', { theme: 'colored' });
                        navigate('/login');
                    } else if (response['status'] === 200) {
                        props.setOpen(false);
                        props.setVersion((prevState) => prevState + 1);
                        toast.success('You have scheduled the interview successfully', {
                            theme: 'colored'
                        });
                    } else if (response['status'] === 400 || response['status'] === 409) {
                        toast.error(response['data']['message'], { theme: 'colored' });
                    } else if (response['status'] === 401 || response['status'] === 403) {
                        toast.warn('You need to login again', { theme: 'colored' });
                        navigate('/login');
                    } else {
                        toast.error('Unknown error', { theme: 'colored' });
                        navigate('/login');
                    }
                }
            );
        }
    };

    const onChangeLength = (event) => {
        let length = event.target.value;
        setEnteredLength(length);
    };

    const onChangeLocation = (event) => {
        let location = event.target.value;
        setEnteredLocation(location);
    };

    return (
        <>
            <Container>
                <CardContent sx={{ padding: '30px' }}>
                    <Grid container spacing={2} direction="row">
                        <Grid xs>
                            <CustomFormLabel sx={{ mt: 0 }} htmlFor="interview-time">
                                Time
                            </CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDateTimePicker
                                    placeholder="Start date"
                                    onChange={(value) => {
                                        setEnteredTime(moment(value).format('YYYY-MM-DD HH:mm:ss'));
                                    }}
                                    // renderInput={(inputProps) => (
                                    //     <CustomTextField
                                    //         fullWidth
                                    //         variant="outlined"
                                    //         size="small"
                                    //         inputProps={{ 'aria-label': 'basic date picker' }}
                                    //         {...inputProps}
                                    //     />
                                    // )}
                                    slotProps={{
                                        textField: {
                                            variant: 'outlined',
                                            size: 'small'
                                        },
                                        actionBar: { actions: ['today'] }
                                    }}
                                    value={parseISO(enteredTime)}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid xs>
                            <CustomFormLabel sx={{ mt: 0 }} htmlFor="interview-length">
                                Length
                            </CustomFormLabel>
                            <CustomTextField
                                id="interview-length"
                                variant="outlined"
                                helperText="Length (in minutes)"
                                size="small"
                                type="number"
                                value={enteredLength}
                                onChange={onChangeLength}
                            />
                        </Grid>
                        <Grid xs>
                            <CustomFormLabel sx={{ mt: 0 }} htmlFor="location-select">
                                Location
                            </CustomFormLabel>
                            <CustomSelect
                                labelId="location-select-label"
                                id="location-select"
                                value={selectVal}
                                onChange={(event, newVal) => {
                                    setSelectVal(event.target.value);
                                    if (event.target.value === 'Online') {
                                        setIsOnline(true);
                                        setEnteredLocation(event.target.value);
                                    } else {
                                        setIsOnline(false);
                                    }
                                }}
                                fullWidth
                                size="small"
                            >
                                <MenuItem value="In-Person">In-Person</MenuItem>
                                <MenuItem value="Online">Online</MenuItem>
                            </CustomSelect>
                            {!isOnline && (
                                <div>
                                    <CustomFormLabel sx={{ mt: 1.5 }} htmlFor="inperson-location">
                                        Enter Room
                                    </CustomFormLabel>
                                    <CustomTextField
                                        id="inperson-location"
                                        variant="outlined"
                                        size="small"
                                        value={enteredLocation}
                                        onChange={onChangeLocation}
                                    />
                                </div>
                            )}
                        </Grid>
                        <Grid xs>
                            <Button
                                color="primary"
                                variant="contained"
                                sx={{ mt: 3 }}
                                size="large"
                                onClick={() => {
                                    schedule_interview(enteredTime, enteredLength, enteredLocation);
                                }}
                            >
                                Schedule
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Container>
        </>
    );
};

ScheduleInterview.propTypes = {
    // Current Course ID
    courseId: PropTypes.string.isRequired,
    // Current Task ID
    taskId: PropTypes.string.isRequired,
    // setOpen from useState
    setOpen: PropTypes.func.isRequired,
    // setVersion from useState
    setVersion: PropTypes.func.isRequired
};

export default ScheduleInterview;
