import InstructorApi from '../../../../api/instructor_api';
import { useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from '@mui/material';
import StaffApi from '../../../../api/staff_api';
import DashboardCard from '../../../FlexyMainComponents/base-card/DashboardCard';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

const SubmitMarksForm = ({ courseId }) => {
    const [taskNames, setTaskNames] = useState([]);
    const [usernames, setUsernames] = useState([]);
    const [criteria, setCriteria] = useState([]);

    const [username, setUsername] = useState('');
    const [task, setTask] = useState('');
    const [criterion, setCriterion] = useState({});
    const [criterionName, setCriterionName] = useState('');

    const [mark, setMark] = useState(0);

    const initialValues = {
        username,
        criteria: criterion,
        task,
        mark: 0
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            setSubmitting(true);
            const body = {
                username,
                criteria: criterion.criteria,
                task,
                mark
            };

            for (const key of Object.keys(body)) {
                if (body[key] === undefined) {
                    setFieldError(key, `Required`);
                }
            }

            InstructorApi.submitMark(courseId, body.task, body.criteria, body.username, body.mark)
                .then((res) => res.data)
                .then((data) => {
                    mutate('/mark/all');
                    toast.success('Mark submitted Successfully.', { theme: 'colored' });
                })
                .catch((err) =>
                    toast.error('Failed to submit mark. Try again.', {
                        theme: 'colored'
                    })
                );

            setSubmitting(false);
        }
    });

    const handleStudentChange = (event) => {
        setUsername(event.target.value);
    };
    const handleTaskChange = (event) => {
        setTask(event.target.value);
    };

    const handleMarkChange = (event) => {
        setMark(parseFloat(event.target.value));
    };

    const handleCriterionChange = (event) => {
        const newCrit = criteria.find((crit) => crit.criteria === event.target.value);
        setCriterionName(newCrit.criteria);
        setCriterion(newCrit);
    };

    useEffect(() => {
        StaffApi.get_students_in_course(courseId)
            .then((res) => res.data)
            .then((data) => {
                const tempStudentList = data.role
                    .filter((member) => member.role === 'student')
                    .map((student) => student.username);
                tempStudentList.sort();
                setUsernames(tempStudentList);
            })
            .catch((err) =>
                toast.error('Failed to fetch students in this course. Try again.', {
                    theme: 'colored'
                })
            );

        InstructorApi.all_tasks(courseId)
            .then((res) => res.data)
            .then((data) => {
                const tempTaskList = data.task.map((taskObj) => taskObj.task);
                tempTaskList.sort();
                setTaskNames(tempTaskList);
            })
            .catch((err) =>
                toast.error('Failed to fetch the tasks for this course. Try again.', {
                    theme: 'colored'
                })
            );
    }, []);

    useEffect(() => {
        if (!task) return;

        StaffApi.getCriteriaForTask(courseId, task)
            .then((res) => res.data)
            .then((data) => {
                setCriteria(data.criteria);
            })
            .catch((err) =>
                toast.error('Failed to fetch the tasks for this course. Try again.', {
                    theme: 'colored'
                })
            );
    }, [task]);

    return (
        <DashboardCard title={`Mark Submission`}>
            <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                    <Grid container rowSpacing={2}>
                        <Grid item xs={12}>
                            <InputLabel>Student</InputLabel>
                            <Select
                                key="username"
                                sx={{ width: '100%' }}
                                id="username"
                                label="Student"
                                value={username}
                                onChange={handleStudentChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                            >
                                {usernames.map((username) => (
                                    <MenuItem key={username} value={username}>
                                        {username}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel>Assignment</InputLabel>
                            <Select
                                sx={{ width: '100%' }}
                                key="task"
                                id="task"
                                label="Task"
                                value={task}
                                onChange={handleTaskChange}
                                error={formik.touched.task && Boolean(formik.errors.task)}
                            >
                                {taskNames.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        {task && (
                            <Grid item xs={12}>
                                <InputLabel>Criterion</InputLabel>
                                <Select
                                    sx={{ width: '100%' }}
                                    key="criteria"
                                    id="criteria"
                                    label="Criterion"
                                    value={criterionName}
                                    onChange={handleCriterionChange}
                                    error={
                                        formik.touched.criteria && Boolean(formik.errors.criteria)
                                    }
                                >
                                    {criteria.map((criterionObj) => (
                                        <MenuItem
                                            key={criterionObj.criteria_id}
                                            value={criterionObj.criteria}
                                        >
                                            {criterionObj.criteria}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{criterion.description}</FormHelperText>
                            </Grid>
                        )}

                        {Object.keys(criterion).length > 0 && (
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    id="mark"
                                    key="mark"
                                    label="Mark"
                                    type="number"
                                    value={mark}
                                    onChange={handleMarkChange}
                                    max={criterion.total}
                                    error={formik.touched.mark && Boolean(formik.errors.mark)}
                                    helperText={formik.touched.mark && formik.errors.mark}
                                />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button
                                sx={{ width: '100%' }}
                                type="submit"
                                disabled={
                                    formik.isSubmitting ||
                                    !username ||
                                    !criterionName ||
                                    mark > criterion.total ||
                                    !task
                                }
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </FormikProvider>
        </DashboardCard>
    );
};

export default SubmitMarksForm;
