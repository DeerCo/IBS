import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import TaApi from '../../../api/ta_api';
import '../../../styles/style.css';
import NavBar from '../../Module/Navigation/NavBar';
import Grid from '@mui/material/Unstable_Grid2';
import InterviewCalendar from '../../General/InterviewCalendar/InterviewCalendar';
import { Box, Button, Card, CardContent, Container, Divider, Typography } from '@mui/material';
import CustomFormLabel from '../../FlexyMainComponents/forms/custom-elements/CustomFormLabel';
import CustomTextField from '../../FlexyMainComponents/forms/custom-elements/CustomTextField';

let TaInterviewPage = () => {
    let navigate = useNavigate();

    let { course_id, task } = useParams();

    let [calendarData, setCalendarData] = useState([]);

    // track data of the interview being selected
    let [selectedId, setSelectedId] = useState('');
    let [selectedStart, setSelectedStart] = useState('');
    let [selectedEnd, setSelectedEnd] = useState('');
    let [selectedLocation, setSelectedLocation] = useState('');
    let [selectedGroupId, setSelectedGroupId] = useState('');
    let [selectedUsername, setSelectedUsername] = useState('');
    let [selectedHost, setSelectedHost] = useState('');
    let [selectedLength, setSelectedLength] = useState('');
    let [selectedNote, setSelectedNote] = useState('');
    let [selectedCancelled, setSelectedCancelled] = useState('');

    // track the entered
    let [enteredTime, setEnteredTime] = useState('');
    let [enteredLength, setEnteredLength] = useState('');
    let [enteredLocation, setEnteredLocation] = useState('');

    let [open, setOpen] = useState(false);
    let [version, setVersion] = useState(0); // data is refreshed if version is changed

    useEffect(() => {
        TaApi.all_interviews(course_id, task).then((response) => {
            if (!response || !('status' in response)) {
                toast.error('Unknown error', { theme: 'colored' });
                navigate('/login');
                return;
            } else if (response['status'] === 200) {
            } else if (response['status'] === 401 || response['status'] === 403) {
                toast.warn('You need to login again', { theme: 'colored' });
                navigate('/login');
                return;
            } else {
                toast.warn('Unknown error', { theme: 'colored' });
                navigate('/login');
                return;
            }

            let temp_data = [];
            let interviews = response['data']['interviews'];

            for (let interview of interviews) {
                let location_lower = interview.location.toLowerCase();
                let title = '';
                if (
                    location_lower === 'zoom' ||
                    location_lower === 'online' ||
                    location_lower.startsWith('http')
                ) {
                    title = '💻';
                } else {
                    title = '🏫';
                }

                console.log(interview);

                let colour = interview.group_id === null ? 'green' : 'red';
                let curr = {
                    title: title,
                    start: interview.start_time.replace(' ', 'T'),
                    end: interview.end_time.replace(' ', 'T'),
                    extendedProps: {
                        id: interview.interview_id,
                        task: interview.task,
                        host: interview.host,
                        group_id: interview.group_id,
                        length: interview.length,
                        location: interview.location,
                        note: interview.note,
                        cancelled: interview.cancelled
                    },
                    color: colour
                };
                temp_data.push(curr);
            }

            if (temp_data.length === 0) {
                toast.info("You haven't scheduled any interview", { theme: 'colored' });
            }

            setCalendarData(temp_data);
        });
    }, [course_id, task, version, navigate]);

    // the book interview function
    // add task later into the ta input
    let schedule_interview = (time, length, location) => {
        if (time === '') {
            toast.error('The time cannot be empty', { theme: 'colored' });
        } else if (length === '') {
            toast.error('The length cannot be empty', { theme: 'colored' });
        } else if (location === '') {
            toast.error('The location cannot be empty', { theme: 'colored' });
        } else {
            TaApi.schedule_interview(course_id, task, length, time, location).then((response) => {
                if (!response || !('status' in response)) {
                    toast.error('Unknown error', { theme: 'colored' });
                    navigate('/login');
                } else if (response['status'] === 200) {
                    setOpen(false);
                    setVersion(version + 1);
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
            });
        }
    };

    // the cancel interview function
    let delete_interview = (task, id) => {
        TaApi.delete_interview(course_id, task, id).then((response) => {
            if (!response || !('status' in response)) {
                toast.error('Unknown error', { theme: 'colored' });
                navigate('/login');
            } else if (response['status'] === 200) {
                setOpen(false);
                setVersion(version + 1);
                toast.success('You have deleted the interview successfully', { theme: 'colored' });
            } else if (response['status'] === 400 || response['status'] === 409) {
                toast.error(response['data']['message'], { theme: 'colored' });
            } else if (response['status'] === 401 || response['status'] === 403) {
                toast.warn('You need to login again', { theme: 'colored' });
                navigate('/login');
            } else {
                toast.error('Unknown error', { theme: 'colored' });
                navigate('/login');
            }
        });
    };

    let check_group = (group_id) => {
        if (group_id === null) {
            return;
        }

        TaApi.check_group(course_id, group_id).then((response) => {
            if (!response || !('status' in response)) {
                toast.error('Unknown error', { theme: 'colored' });
                navigate('/login');
            } else if (response['status'] === 200) {
                let members = '';
                for (let member of response['data']['members']) {
                    members += member['username'] + '(' + member['status'] + ')\n';
                }
                setSelectedUsername(members);
            } else if (response['status'] === 400 || response['status'] === 409) {
                toast.error(response['data']['message'], { theme: 'colored' });
            } else if (response['status'] === 401 || response['status'] === 403) {
                toast.warn('You need to login again', { theme: 'colored' });
                navigate('/login');
            } else {
                toast.error('Unknown error', { theme: 'colored' });
                navigate('/login');
            }
        });
    };

    let onChangeTime = (e) => {
        let time = e.target.value;
        setEnteredTime(time);
    };

    let onChangeLength = (e) => {
        let length = e.target.value;
        setEnteredLength(length);
    };

    let onChangeLocation = (e) => {
        let location = e.target.value;
        setEnteredLocation(location);
    };

    return (
        <Grid container>
            <Grid xs={12}>
                <NavBar page="Interview" role={'ta'} />
            </Grid>
            <Grid xs={12} sx={{ mt: 3, marginX: 10 }}>
                <Container disableGutters>
                    <Card sx={{ p: 0 }}>
                        <Box sx={{ padding: '15px 30px' }} display="flex" alignItems="center">
                            <Box flexGrow={1}>
                                <Typography fontWeight="500" variant="h4">
                                    Schedule Interview
                                </Typography>
                            </Box>
                        </Box>
                    </Card>
                    <Divider />
                    <CardContent sx={{ padding: '30px' }}>
                        <Grid container spacing={2} direction="row">
                            <Grid xs>
                                <CustomFormLabel sx={{ mt: 0 }} htmlFor="interview-time">
                                    Time
                                </CustomFormLabel>
                                <CustomTextField
                                    id="interview-time"
                                    variant="outlined"
                                    helperText="Time (YYYY-MM-DD HH:mm:ss)"
                                    size="small"
                                    value={enteredTime}
                                    onChange={onChangeTime}
                                />
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
                                    value={enteredLength}
                                    onChange={onChangeLength}
                                />
                            </Grid>
                            <Grid xs>
                                <CustomFormLabel sx={{ mt: 0 }} htmlFor="interview-location">
                                    Location
                                </CustomFormLabel>
                                <CustomTextField
                                    id="interview-location"
                                    variant="outlined"
                                    size="small"
                                    value={enteredLocation}
                                    onChange={onChangeLocation}
                                />
                            </Grid>
                            <Grid xs>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    sx={{ mt: 3 }}
                                    size="large"
                                    onClick={() => {
                                        schedule_interview(
                                            enteredTime,
                                            enteredLength,
                                            enteredLocation
                                        );
                                    }}
                                >
                                    Schedule
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Container>
                <div className="row card-box mt-3">
                    <Grid container spacing={2} direction="row" sx={{ m: 'auto' }}>
                        <Grid xs={6}>
                            <InterviewCalendar
                                events={calendarData}
                                eventClickHandler={(event) => {
                                    setSelectedId(event.extendedProps.id);
                                    setSelectedStart(event.start);
                                    setSelectedEnd(event.end);
                                    setSelectedLocation(event.extendedProps.location);
                                    setSelectedGroupId(event.extendedProps.group_id);
                                    setSelectedHost(event.extendedProps.host);
                                    setSelectedLength(event.extendedProps.length);
                                    setSelectedNote(event.extendedProps.note);
                                    setSelectedCancelled(event.extendedProps.cancelled);
                                    check_group(event.extendedProps.group_id);

                                    setOpen(true);
                                }}
                                selectSlotHandler={(slotInfo) => setOpen(false)}
                                width={1000}
                            />
                        </Grid>
                        <Grid xs>
                            {open && (
                                <div>
                                    <h4 className="border-bottom pb-2 mb-2">Selected Interview</h4>
                                    <span className="d-block text-gray-dark">
                                        {' '}
                                        Start time:{' '}
                                        {moment(selectedStart).format('MM/DD/YYYY, h:mm:ss a')}{' '}
                                    </span>
                                    <span className="d-block text-gray-dark">
                                        {' '}
                                        End time:{' '}
                                        {moment(selectedEnd).format('MM/DD/YYYY, h:mm:ss a')}{' '}
                                    </span>
                                    <span className="d-block text-gray-dark">
                                        {' '}
                                        Interview ID: {selectedId}{' '}
                                    </span>
                                    <span className="d-block text-gray-dark">
                                        {' '}
                                        Host: {selectedHost}{' '}
                                    </span>
                                    <span className="d-block text-gray-dark">
                                        {' '}
                                        Length: {selectedLength.toString()}{' '}
                                    </span>
                                    <span className="d-block text-gray-dark">
                                        {' '}
                                        Note: {selectedNote === null ? 'null' : selectedNote}{' '}
                                    </span>
                                    <span className="d-block text-gray-dark">
                                        {' '}
                                        Cancelled: {selectedCancelled.toString()}{' '}
                                    </span>
                                    <strong className="d-block text-gray-dark">
                                        {' '}
                                        Location:{' '}
                                        {selectedLocation.startsWith('http') ? (
                                            <a href={selectedLocation}>Link ✈</a>
                                        ) : (
                                            selectedLocation
                                        )}{' '}
                                    </strong>
                                    <strong className="d-block text-gray-dark">
                                        {' '}
                                        Group ID:{' '}
                                        {selectedGroupId === null ? 'null' : selectedGroupId}{' '}
                                    </strong>
                                    <strong className="d-block text-gray-dark">
                                        {' '}
                                        Group Members:{' '}
                                    </strong>{' '}
                                    {selectedGroupId === null ? (
                                        'null'
                                    ) : (
                                        <pre>{selectedUsername}</pre>
                                    )}
                                    <button
                                        type="button"
                                        className="btn btn-secondary mt-4 col-12"
                                        onClick={() => {
                                            delete_interview(task, selectedId);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
};

export default TaInterviewPage;
