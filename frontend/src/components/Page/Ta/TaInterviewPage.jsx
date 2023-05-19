import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import TaApi from '../../../api/ta_api';
import '../../../styles/style.css';
import NavBar from '../../Module/Navigation/NavBar';
import Grid from '@mui/material/Unstable_Grid2';
import InterviewCalendar from '../../General/InterviewCalendar/InterviewCalendar';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Link,
    MenuItem,
    Typography
} from '@mui/material';
import CustomFormLabel from '../../FlexyMainComponents/forms/custom-elements/CustomFormLabel';
import CustomTextField from '../../FlexyMainComponents/forms/custom-elements/CustomTextField';
import CustomSelect from '../../FlexyMainComponents/forms/custom-elements/CustomSelect';

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

    // for select dropdown when scheduling interview
    const [isOnline, setIsOnline] = useState(false);
    const [selectVal, setSelectVal] = useState('In-Person');

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
                    title = '💻  Online';
                } else {
                    title = `🏫  ${interview.location}`;
                }

                let colour = interview.group_id === null ? 'green' : 'red';
                let curr = {
                    title: title,
                    start: moment(interview.start_time).toDate(),
                    end: moment(interview.end_time).toDate(),
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

    const CardItem = ({ title, desc, ...props }) => {
        return (
            <Box key={desc} sx={{ pb: 2, pt: 2, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ ml: 2 }}>
                    <Typography color="textSecondary" variant="h5">
                        {title}:
                    </Typography>
                </Box>
                <Box sx={{ ml: 'auto' }}>
                    <Typography color="textSecondary" variant="h5" fontWeight="400">
                        {typeof desc === 'string' && desc.startsWith('http') ? (
                            <Link href={desc}>Link ✈</Link>
                        ) : (
                            <div>{desc}</div>
                        )}
                    </Typography>
                </Box>
            </Box>
        );
    };

    return (
        <Grid container>
            <Grid xs={12}>
                <NavBar page="Interview" role={'ta'} />
            </Grid>
            <Grid xs={12} sx={{ mt: 3, marginX: 2 }}>
                <Container>
                    <Typography fontWeight="500" variant="h2" sx={{ ml: 3 }}>
                        Schedule Interview
                    </Typography>
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
                                        <CustomFormLabel
                                            sx={{ mt: 1.5 }}
                                            htmlFor="inperson-location"
                                        >
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
                            <Card sx={{ pb: 0, mb: 4, width: 'auto' }}>
                                <CardContent sx={{ pb: 0 }}>
                                    <Box>
                                        <Typography variant="h4" sx={{ mb: 2 }}>
                                            Selected Interview
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mt: 0 }}>
                                        <CardItem
                                            title="Start time"
                                            desc={moment(selectedStart).format(
                                                'MM/DD/YYYY, h:mm:ss a'
                                            )}
                                        />
                                        <CardItem
                                            title="End time"
                                            desc={moment(selectedEnd).format(
                                                'MM/DD/YYYY, h:mm:ss a'
                                            )}
                                        />
                                        <CardItem title="Interview ID" desc={selectedId} />
                                        <CardItem title="Host" desc={selectedHost} />
                                        <CardItem title="Length" desc={selectedLength.toString()} />
                                        {selectedNote === null ? (
                                            <div></div>
                                        ) : (
                                            <CardItem title="Note" desc={selectedNote} />
                                        )}
                                        <CardItem
                                            title="Cancelled"
                                            desc={selectedCancelled === false ? 'No' : 'Yes'}
                                        />
                                        <CardItem
                                            title="Location"
                                            desc={
                                                selectedLocation === 'online'
                                                    ? 'Online'
                                                    : selectedLocation
                                            }
                                        />
                                        {selectedGroupId === null ? (
                                            <div></div>
                                        ) : (
                                            <CardItem title="Group ID" desc={selectedGroupId} />
                                        )}
                                        {selectedGroupId === null ? (
                                            <div></div>
                                        ) : (
                                            <CardItem
                                                title="Group Members"
                                                desc={<pre>{selectedUsername}</pre>}
                                            />
                                        )}
                                        <Button
                                            onClick={() => {
                                                delete_interview(task, selectedId);
                                            }}
                                            variant="contained"
                                            size="large"
                                            style={{ minWidth: 120, marginTop: 3 }}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TaInterviewPage;
