import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import StudentApi from '../../../api/student_api';
import NavBar from '../../Module/Navigation/NavBar';
import InterviewBookingCard from '../../General/InterviewBookingCard/InterviewBookingCard';
import Grid from '@mui/material/Unstable_Grid2';
import InterviewCalendar from '../../General/InterviewCalendar/InterviewCalendar';

let StudentInterviewPage = () => {
    let navigate = useNavigate();

    let { course_id, task } = useParams();

    let [calendarData, setCalendarData] = useState([]);

    let [bookedStart, setBookedStart] = useState('');
    let [bookedEnd, setBookedEnd] = useState('');
    let [bookedLocation, setBookedLocation] = useState('');
    let [bookedNote, setBookedNote] = useState('');

    let [selectedStart, setSelectedStart] = useState('');
    let [selectedEnd, setSelectedEnd] = useState('');
    let [selectedLocation, setSelectedLocation] = useState('');

    let [open, setOpen] = useState(false);
    let [booked, setBooked] = useState(false);
    let [version, setVersion] = useState(0); // data is refreshed if version is changed

    useEffect(() => {
        StudentApi.check_interview(course_id, task).then((response_1) => {
            StudentApi.available_interviews(course_id, task).then((response_2) => {
                if (
                    !response_1 ||
                    !('status' in response_1) ||
                    !response_2 ||
                    !('status' in response_2)
                ) {
                    toast.error('Unknown error', { theme: 'colored' });
                    navigate('/login');
                    return;
                } else if (response_1['status'] === 200 && response_2['status'] === 200) {
                } else if (
                    response_1['status'] === 401 ||
                    response_1['status'] === 403 ||
                    response_2['status'] === 401 ||
                    response_2['status'] === 403
                ) {
                    toast.warn('You need to login again', { theme: 'colored' });
                    navigate('/login');
                    return;
                } else if (response_1['status'] === 400) {
                    toast.info(response_1['data']['message'], { theme: 'colored' });
                    return;
                } else if (response_2['status'] === 400) {
                    toast.info(response_2['data']['message'], { theme: 'colored' });
                    return;
                } else {
                    toast.warn('Unknown error', { theme: 'colored' });
                    navigate('/login');
                    return;
                }

                let response_1_data = response_1['data'];
                let temp_data = [];
                let availability = response_2['data']['availability'];

                if (response_1_data['booked']) {
                    setBookedStart(response_1_data['start_time']);
                    setBookedEnd(response_1_data['end_time']);
                    setBookedLocation(response_1_data['location']);
                    setBookedNote(response_1_data['note'] === null ? '' : response_1_data['note']);
                    setBooked(true);

                    let location_lower = response_1_data['location'].toLowerCase();
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

                    title += `  ${response_1_data['start_time'].split(' ')[1]}`;

                    let curr = {
                        title: title,
                        start: moment(response_1_data['start_time']).toDate(),
                        end: moment(response_1_data['end_time']).toDate(),
                        extendedProps: {
                            location: response_1_data['location']
                        },
                        color: 'red'
                    };

                    temp_data.push(curr);
                } else {
                    setBooked(false);
                }

                for (let location in availability) {
                    for (let time in availability[location]) {
                        let location_lower = location.toLowerCase();
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
                        let data = time.split(' - ');
                        title += `  ${data[0].split(' ')[1]}`;
                        let curr = {
                            title: title,
                            start: moment(data[0]).toDate(),
                            end: moment(data[1]).toDate(),
                            extendedProps: {
                                location: location
                            },
                            color: 'green'
                        };
                        temp_data.push(curr);
                    }
                }

                if (temp_data.length === 0) {
                    toast.info('No interview can be booked at this time', { theme: 'colored' });
                }

                setCalendarData(temp_data);
            });
        });
    }, [course_id, task, version, navigate]);

    // the book interview function
    let book_interview = (task, time, location) => {
        let formatted_time = moment(time).format('YYYY-MM-DD HH:mm:ss');

        StudentApi.book_interview(course_id, task, formatted_time, location).then((response) => {
            if (!response || !('status' in response)) {
                toast.error('Unknown error', { theme: 'colored' });
                navigate('/login');
            } else if (response['status'] === 200) {
                setOpen(false);
                setVersion(version + 1);
                toast.success('You have booked the interview successfully', { theme: 'colored' });
            } else if (response['status'] === 400 || response['status'] === 409) {
                toast.error(response['data']['message'], { theme: 'colored' });
            } else if (response['status'] === 401 || response['status'] === 403) {
                toast.warn('You need to login again', { theme: 'colored' });
                navigate('/login');
            } else if (response['status'] === 429) {
                toast.error("You've sent too many requests. Please try again in one hour.", {
                    theme: 'colored'
                });
            } else {
                toast.error('Unknown error', { theme: 'colored' });
                navigate('/login');
            }
        });
    };

    // the change interview function
    let change_interview = (task, time, location) => {
        let formatted_time = moment(time).format('YYYY-MM-DD HH:mm:ss');

        if (formatted_time === bookedStart && location === bookedLocation) {
            toast.warn('You have booked this interview', { theme: 'colored' });
            return;
        }

        StudentApi.change_interview(course_id, task, formatted_time, location).then((response) => {
            if (!response || !('status' in response)) {
                toast.error('Unknown error', { theme: 'colored' });
                navigate('/login');
            } else if (response['status'] === 200) {
                setOpen(false);
                setVersion(version + 1);
                toast.success(
                    'You have cancelled your old interview and booked the new interview successfully',
                    { theme: 'colored' }
                );
            } else if (response['status'] === 400 || response['status'] === 409) {
                toast.error(response['data']['message'], { theme: 'colored' });
            } else if (response['status'] === 401 || response['status'] === 403) {
                toast.warn('You need to login again', { theme: 'colored' });
                navigate('/login');
            } else if (response['status'] === 429) {
                toast.error("You've sent too many requests. Please try again in one hour.", {
                    theme: 'colored'
                });
            } else {
                toast.error('Unknown error', { theme: 'colored' });
                navigate('/login');
            }
        });
    };

    // the cancel interview function
    let cancel_interview = (task) => {
        StudentApi.cancel_interview(course_id, task).then((response) => {
            if (!response || !('status' in response)) {
                toast.error('Unknown error', { theme: 'colored' });
                navigate('/login');
            } else if (response['status'] === 200) {
                setOpen(false);
                setVersion(version + 1);
                toast.success('You have cancelled your interview', { theme: 'colored' });
            } else if (response['status'] === 400 || response['status'] === 409) {
                toast.error(response['data']['message'], { theme: 'colored' });
            } else if (response['status'] === 401 || response['status'] === 403) {
                toast.warn('You need to login again', { theme: 'colored' });
                navigate('/login');
            } else if (response['status'] === 429) {
                toast.error("You've sent too many requests. Please try again in one hour.", {
                    theme: 'colored'
                });
            } else {
                toast.error('Unknown error', { theme: 'colored' });
                navigate('/login');
            }
        });
    };

    return (
        <Grid container>
            <Grid xs={12}>
                <NavBar page="Interview" />
            </Grid>
            <Grid xs={12} sx={{ mt: 3, marginX: 10 }}>
                <Grid container spacing={2} direction="row" sx={{ m: 'auto' }}>
                    <Grid xs={6}>
                        <InterviewCalendar
                            events={calendarData}
                            eventClickHandler={(event) => {
                                setSelectedStart(event.start);
                                setSelectedEnd(event.end);
                                setSelectedLocation(event.extendedProps.location);

                                setOpen(true);
                            }}
                            selectSlotHandler={(slotInfo) => {
                                setOpen(false);
                            }}
                            width={1000}
                        />
                    </Grid>
                    <Grid xs>
                        {booked && (
                            <InterviewBookingCard
                                booked={booked}
                                openedPopup={open}
                                startTime={bookedStart}
                                endTime={bookedEnd}
                                location={bookedLocation}
                                eventHandler={cancel_interview}
                                bookedNote={bookedNote}
                                task={task}
                                width={-1}
                                testing={false}
                            />
                        )}

                        {open && !booked && (
                            <InterviewBookingCard
                                booked={booked}
                                openedPopup={open}
                                startTime={selectedStart}
                                endTime={selectedEnd}
                                location={selectedLocation}
                                eventHandler={book_interview}
                                bookedNote={''}
                                task={task}
                                width={-1}
                                testing={false}
                            />
                        )}

                        {open && booked && (
                            <InterviewBookingCard
                                booked={booked}
                                openedPopup={open}
                                startTime={selectedStart}
                                endTime={selectedEnd}
                                location={selectedLocation}
                                eventHandler={change_interview}
                                bookedNote={''}
                                task={task}
                                width={-1}
                                testing={false}
                            />
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default StudentInterviewPage;
