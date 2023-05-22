import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import InviteMember from '../../Module/Group/InviteMember';
import NavBar from '../../Module/Navigation/NavBar';
import StudentApi from '../../../api/student_api';
import '../../../styles/style.css';
import { Button, Container, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import PageContainer from '../../FlexyMainComponents/container/PageContainer';
import DashboardCard from '../../FlexyMainComponents/base-card/DashboardCard';

let StudentDetailsPage = () => {
    let navigate = useNavigate();

    let { course_id, task } = useParams();

    let [version, setVersion] = useState(0);

    // Task data
    let [min_member, setMinMember] = useState(0);
    let [max_member, setMaxMember] = useState(0);
    let [changeGroup, setChangeGroup] = useState(true);

    // Group data
    let [status, setStatus] = useState('not_joined');
    let [group_id, setGroupId] = useState('');
    let [members, setMembers] = useState([]);
    let [git, setGit] = useState(null);

    // Submission data
    let [due, setDue] = useState('');
    let [dueEx, setDueEx] = useState('');
    let [dueExTo, setDueExTo] = useState('');
    let [tokenLen, setTokenLen] = useState('');
    let [commit, setCommit] = useState('');
    let [commitMsg, setCommitMsg] = useState('');
    let [tokenUsed, setTokenUsed] = useState('');
    let [commitTime, setCommitTime] = useState('');
    let [pushTime, setPushTime] = useState('');
    let [maxToken, setMaxToken] = useState('');
    let [collectCommit, setCollectCommit] = useState(null);
    let [collectTokenUsed, setCollectTokenUsed] = useState(null);

    useEffect(() => {
        StudentApi.get_task(course_id, task).then((task_response) => {
            if (!task_response || !('status' in task_response)) {
                toast.error('Unknown error', { theme: 'colored' });
                navigate('/login');
                return;
            } else if (task_response['status'] === 200) {
                let task_data = task_response['data']['task'];
                setMinMember(task_data['min_member']);
                setMaxMember(task_data['max_member']);
                setChangeGroup(task_data['change_group']);
            } else if (task_response['status'] === 401 || task_response['status'] === 403) {
                toast.warn('You need to login again', { theme: 'colored' });
                navigate('/login');
                return;
            } else {
                toast.error('Unknown error', { theme: 'colored' });
                navigate('/login');
                return;
            }

            StudentApi.check_group(course_id, task).then((group_response) => {
                if (!group_response || !('status' in group_response)) {
                    toast.error('Unknown error', { theme: 'colored' });
                    navigate('/login');
                    return;
                } else if (group_response['status'] === 200) {
                } else if (group_response['status'] === 401 || group_response['status'] === 403) {
                    toast.warn('You need to login again', { theme: 'colored' });
                    navigate('/login');
                    return;
                } else {
                    toast.error('Unknown error', { theme: 'colored' });
                    navigate('/login');
                    return;
                }

                // For testing, gitlab_url can be null and backend problems occur at check_submission endpoint
                if (group_response['data']['gitlab_url'] === null) {
                    setStatus('joined'); // Change this to not_joined or joined for testing purposes
                    setGroupId('');
                    setMembers([]);
                    setGit(null);
                    return;
                }

                if (group_response['data']['message'] === 'You have joined a group.') {
                    setStatus('joined');
                    setGroupId(group_response['data']['group_id']);
                    setMembers(group_response['data']['members']);
                    setGit(group_response['data']['gitlab_url']);

                    StudentApi.check_submission(course_id, task).then((submission_response) => {
                        if (!submission_response || !('status' in submission_response)) {
                            toast.error('Unknown error', { theme: 'colored' });
                            navigate('/login');
                        } else if (submission_response['status'] === 200) {
                            let submission_data = submission_response['data'];

                            let before_due_date = submission_data['before_due_date'];
                            setDue(before_due_date['due_date']);
                            setDueEx(before_due_date['due_date_with_extension']);
                            setDueExTo(before_due_date['due_date_with_extension_and_token']);
                            setMaxToken(before_due_date['max_token']);
                            setTokenLen(before_due_date['token_length']);
                            setCommit(before_due_date['commit_id']);
                            setCommitTime(before_due_date['commit_time']);
                            setPushTime(before_due_date['push_time']);
                            setCommitMsg(before_due_date['commit_message']);
                            setTokenUsed(before_due_date['token_used']);

                            if ('collected' in submission_data) {
                                let collected = submission_data['collected'];
                                setCollectCommit(collected['commit_id']);
                                setCollectTokenUsed(collected['token_used']);
                            }
                        } else if (
                            submission_response['status'] === 401 ||
                            submission_response['status'] === 403
                        ) {
                            toast.warn('You need to login again', { theme: 'colored' });
                            navigate('/login');
                        } else {
                            toast.error('Unknown error', { theme: 'colored' });
                            navigate('/login');
                        }
                    });
                } else if (group_response['data']['message'] === 'You are not in a group.') {
                    setStatus('not_joined');
                    setGroupId('');
                    setMembers('');
                    setGit(null);
                } else if (
                    group_response['data']['message'] === 'You have been invited to join a group.'
                ) {
                    setStatus('invited');
                    setGroupId(group_response['data']['group_id']);
                    setMembers(group_response['data']['members']);
                    setGit(null);
                }
            });
        });
    }, [course_id, task, status, group_id, version, navigate]);

    let create_group = (course_id, task) => {
        document.getElementById('create_group_button').disabled = true;
        toast.info('Creating a new group...', { theme: 'colored' });

        StudentApi.create_group(course_id, task).then((response) => {
            document.getElementById('create_group_button').disabled = false;

            if (!response || !('status' in response)) {
                toast.error('Unknown error', { theme: 'colored' });
                navigate('/login');
            } else if (response['status'] === 200) {
                setVersion(version + 1);
                toast.success('You have created a group', { theme: 'colored' });
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

    let accept_invitation = (course_id, task) => {
        StudentApi.accept_invitation(course_id, task).then((response) => {
            if (!response || !('status' in response)) {
                toast.error('Unknown error', { theme: 'colored' });
                navigate('/login');
            } else if (response['status'] === 200) {
                setVersion(version + 1);
                toast.success('You have accepted the invitation', { theme: 'colored' });
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

    let reject_invitation = (course_id, task) => {
        StudentApi.reject_invitation(course_id, task).then((response) => {
            if (!response || !('status' in response)) {
                toast.error('Unknown error', { theme: 'colored' });
                navigate('/login');
            } else if (response['status'] === 200) {
                setVersion(version + 1);
                toast.success('You have rejected the invitation', { theme: 'colored' });
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

    let uninvite_member = (course_id, task, username) => {
        StudentApi.uninvite_member(course_id, task, username).then((response) => {
            if (!response || !('status' in response)) {
                toast.error('Unknown error', { theme: 'colored' });
                navigate('/login');
            } else if (response['status'] === 200) {
                setVersion(version + 1);
                toast.success('The invitation has been cancelled', { theme: 'colored' });
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

    const TaskDetails = () => {
        return (
            <DashboardCard title={`${task} Details`}>
                {status === 'joined' && (
                    <div>
                        <Typography variant="h4"> Due Date </Typography>

                        <Typography variant="body1" gutterBottom>
                            {' '}
                            Original Due Date: <b>{due}</b>
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            {' '}
                            Due Date after Extension: <b>{dueEx}</b>
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            {' '}
                            Due Date after Extension and Token: <b>{dueExTo}</b>
                        </Typography>

                        <hr />

                        <Typography variant="h4"> Token </Typography>

                        <Typography variant="body1" gutterBottom>
                            {' '}
                            At most <b>{maxToken}</b> token(s) can be used for this task
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            {' '}
                            Each token can extend the due date by <b>{tokenLen}</b> minutes
                        </Typography>

                        <hr />

                        <Typography variant="h4"> GitLab URL </Typography>

                        <Typography variant="body1" gutterBottom>
                            <Link href={git}>{git}</Link>
                        </Typography>

                        <hr />

                        <Typography variant="h4"> Last Commit Before Due Date </Typography>

                        {commit && (
                            <div>
                                <Typography variant="body1" gutterBottom>
                                    The commit id is: <b>{commit}</b>
                                </Typography>

                                <Typography variant="body1" gutterBottom>
                                    The commit time is: <b>{commitTime}</b>
                                </Typography>

                                {pushTime === null ? (
                                    <Typography variant="body1" gutterBottom>
                                        The push time is: <b>Not Applicable</b>
                                    </Typography>
                                ) : (
                                    <Typography variant="body1" gutterBottom>
                                        The push time is: <b>{pushTime}</b>
                                    </Typography>
                                )}

                                <Typography variant="body1" gutterBottom>
                                    The commit message is: <b>{commitMsg}</b>
                                </Typography>

                                <Typography variant="body1" gutterBottom>
                                    This commit uses {tokenUsed} token(s)
                                </Typography>
                            </div>
                        )}

                        {!commit && (
                            <Typography variant="body1" gutterBottom>
                                No commit before due date is found
                            </Typography>
                        )}

                        <hr />

                        <Typography variant="h4"> Collected Commit </Typography>

                        {!collectCommit && 'No commit has been collected yet'}
                        {collectCommit && (
                            <div>
                                <Typography variant="body1" gutterBottom>
                                    The commit id is: <b>{collectCommit}</b>
                                </Typography>

                                <Typography variant="body1" gutterBottom>
                                    This commit uses {collectTokenUsed} token(s)
                                </Typography>

                                <Typography variant="body1" gutterBottom>
                                    This commit is for marking purposes
                                </Typography>
                            </div>
                        )}
                    </div>
                )}

                {status !== 'joined' && (
                    <Typography variant="h4">
                        Please join a group to view the task details
                    </Typography>
                )}
            </DashboardCard>
        );
    };

    const GroupDetails = () => {
        return (
            <DashboardCard title={'Group Details'}>
                {status === 'joined' && (
                    <div>
                        <Typography variant="h4">You have joined group {group_id}</Typography>

                        <hr />

                        <Typography variant="h5">
                            Group Size: {min_member}{' '}
                            {min_member === max_member ? '' : ' -- ' + max_member}
                        </Typography>
                        <Typography variant="h5">Leaving group has been disabled</Typography>

                        <hr />

                        <ul>
                            {members.map((member) => (
                                <li key={member.username + member.status} className="align-left">
                                    <strong>{member.username}</strong> ({member.status})
                                    {member.status === 'pending' && (
                                        <button
                                            onClick={() => {
                                                uninvite_member(course_id, task, member.username);
                                            }}
                                            className="btn"
                                            title="Cancel the invitation"
                                        >
                                            ❌
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {members.length < max_member && (
                            <InviteMember
                                course_id={course_id}
                                task={task}
                                version={version}
                                setVersion={setVersion}
                            />
                        )}
                    </div>
                )}

                {status === 'not_joined' && (
                    <div>
                        <Typography variant="h4">You are not in a group</Typography>

                        <hr />

                        <Typography variant="h5">
                            Group Size: {min_member}{' '}
                            {min_member === max_member ? '' : ' -- ' + max_member}
                        </Typography>
                        {changeGroup && max_member > 1 && (
                            <Typography variant="h5">
                                Ask a group member to invite you if you want to join an existing
                                group
                            </Typography>
                        )}
                        {changeGroup && (
                            <Typography variant="h5">
                                You cannot switch to another group once you create a new group
                            </Typography>
                        )}
                        {!changeGroup && (
                            <Typography variant="h5">Modifying group has been disabled</Typography>
                        )}

                        <hr />
                        <Button
                            onClick={() => {
                                create_group(course_id, task);
                            }}
                            variant="contained"
                            size="large"
                            className="btn btn-primary btn-lg m-2"
                            id="create_group_button"
                        >
                            Create a New Group
                        </Button>
                    </div>
                )}

                {status === 'invited' && (
                    <div>
                        <Typography variant="h4">
                            You have been invited to join group {group_id}
                        </Typography>

                        <hr />

                        <Typography variant="h5">
                            Group Size: {min_member}{' '}
                            {min_member === max_member ? '' : ' -- ' + max_member}
                        </Typography>
                        <Typography variant="h5">
                            Reject the invitation to create a new group
                        </Typography>

                        <hr />

                        <ul>
                            {members.map((member) => (
                                <li key={member.username + member.status} className="align-left">
                                    <strong>{member.username}</strong> ({member.status})
                                </li>
                            ))}
                        </ul>

                        <hr />

                        <button
                            onClick={() => {
                                accept_invitation(course_id, task);
                            }}
                            className="btn btn-primary btn-lg m-2"
                        >
                            Accept the invitation
                        </button>

                        <button
                            onClick={() => {
                                reject_invitation(course_id, task);
                            }}
                            className="btn btn-primary btn-lg m-2"
                        >
                            Reject the invitation
                        </button>
                    </div>
                )}
            </DashboardCard>
        );
    };

    return (
        <PageContainer
            title={`${task} Details`}
            description={`Contains due date, grace tokens, gitlab URL and submitted commit for task '${task}'`}
        >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <NavBar page="Details" />
                </Grid>

                <Grid item xs={12}>
                    <Container id="details_page" maxWidth="xl">
                        <Grid container spacing={3}>
                            <Grid item xs={7}>
                                <TaskDetails />
                            </Grid>
                            <Grid item xs={5}>
                                <GroupDetails />
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default StudentDetailsPage;
