import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import StaffApi, { findRoleInCourse } from '../../../api/staff_api';
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
    IconButton,
    Link,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RescheduleInterview from '../../General/InterviewComponents/RescheduleInterview/RescheduleInterview';
import ScheduleInterview from '../../General/InterviewComponents/ScheduleInterview';
import FlexyTabs from '../../General/FlexyTabs/FlexyTabs';
import UpcomingInterviews from '../../General/UpcomingInterviews/UpcomingInterviews';
import {
    RefreshInterviewsContext,
    RefreshInterviewsProvider
} from '../../../contexts/RescheduleContexts/RefreshInterviewsContext';
import PreviousPageButton from '../../General/PreviousPageButton/PreviousPageButton';
import PageContainer from '../../FlexyMainComponents/container/PageContainer';

const InterviewPage = () => {
    return (
        <RefreshInterviewsProvider>
            <PageContainer title="Interviews" description="Staff view for interviews">
                <InterviewPageMain />
            </PageContainer>
        </RefreshInterviewsProvider>
    );
};

const InterviewPageMain = () => {
    const navigate = useNavigate();

    const { course_id, task } = useParams();

    const [calendarData, setCalendarData] = useState([]);

    // track data of the interview being selected
    const [selectedId, setSelectedId] = useState('');
    const [selectedStart, setSelectedStart] = useState('');
    const [selectedEnd, setSelectedEnd] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState('');
    const [selectedUsername, setSelectedUsername] = useState('');
    const [selectedHost, setSelectedHost] = useState('');
    const [selectedLength, setSelectedLength] = useState('');
    const [selectedNote, setSelectedNote] = useState('');
    const [selectedCancelled, setSelectedCancelled] = useState('');

    const [open, setOpen] = useState(false);
    const [version, setVersion] = useState(0); // data is refreshed if version is changed

    // Refresh interviews context
    const { refreshInterviews, setRefreshInterviews } = React.useContext(RefreshInterviewsContext);

    useEffect(() => {
        StaffApi.getAllInterviews(course_id, task).then((response) => {
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
            setRefreshInterviews(false);
        });
    }, [course_id, task, version, navigate, refreshInterviews]);

    // the cancel interview function
    const delete_interview = (task, id) => {
        StaffApi.deleteInterview(course_id, task, id).then((response) => {
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

    const check_group = (group_id) => {
        if (group_id === null) {
            return;
        }

        StaffApi.checkGroup(course_id, group_id).then((response) => {
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

    const CardItem = ({ title, desc }) => {
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

    const flexyTabs = [
        {
            tabName: 'Schedule/Delete Interviews',
            tabId: 0,
            tabSubheading: 'Schedule/Delete Interviews',
            tabContent: (
                <>
                    <ScheduleInterview
                        courseId={course_id}
                        taskId={task}
                        setOpen={setOpen}
                        setVersion={setVersion}
                    />
                    {/* Interview Calendar + Popup for Interview */}
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        columns={12}
                    >
                        <Grid xs={6}>
                            <Container>
                                <InterviewCalendar
                                    events={calendarData}
                                    eventClickHandler={(event) => {
                                        // For setting states of selected calendar event for display in new window.
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
                                    width={800}
                                />
                            </Container>
                        </Grid>
                        <Grid xs>
                            {open && (
                                <Container>
                                    <Card sx={{ pb: 0, mb: 4, width: '35vw' }}>
                                        <CardContent sx={{ pb: 0 }}>
                                            <Box>
                                                <Grid container spacing={0}>
                                                    <Grid xs={6}>
                                                        <Typography variant="h4" sx={{ mt: 0.9 }}>
                                                            Selected Interview
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={6}>
                                                        <IconButton
                                                            aria-label="close"
                                                            onClick={() => setOpen(false)}
                                                            style={{ float: 'right' }}
                                                            disableRipple
                                                        >
                                                            <CloseIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
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
                                                <CardItem
                                                    title="Length"
                                                    desc={selectedLength.toString() + ' min.'}
                                                />
                                                {selectedNote === null ? (
                                                    <div></div>
                                                ) : (
                                                    <CardItem title="Note" desc={selectedNote} />
                                                )}
                                                <CardItem
                                                    title="Cancelled"
                                                    desc={
                                                        selectedCancelled === false ? 'No' : 'Yes'
                                                    }
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
                                                    <CardItem
                                                        title="Group ID"
                                                        desc={selectedGroupId}
                                                    />
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
                                </Container>
                            )}
                        </Grid>
                    </Grid>
                </>
            )
        },
        {
            tabName: 'Re-schedule Interviews',
            tabId: 1,
            tabSubheading: 'Re-schedule Interview(s)',
            tabContent: <RescheduleInterview courseId={course_id} taskId={task} />
        },
        {
            tabName: 'Upcoming Interviews',
            tabId: 2,
            tabSubheading: `Upcoming Interviews for ${sessionStorage.getItem('username')}`,
            tabContent: <UpcomingInterviews courseId={course_id} taskId={task} />
        }
    ];

    const currRole = findRoleInCourse(course_id);

    return (
        <Grid container>
            <Grid xs={12}>
                <NavBar page="Interview" role={currRole} />
            </Grid>
            <Grid xs={12} sx={{ mt: 2 }}>
                <PreviousPageButton rightAlignOffset={6} />
            </Grid>
            <Grid xs={12} sx={{ mt: 1, marginX: 'auto' }}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    sx={{ minHeight: '100vh' }}
                >
                    <FlexyTabs tabs={flexyTabs} width="95vw" height="auto" />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default InterviewPage;
