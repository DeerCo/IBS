import StaffApi from '../../../api/staff_api';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import {
    TableContainer,
    Typography,
    Paper,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    TextField,
    Button,
    Stack
} from '@mui/material';
import { useEffect, useState } from 'react';
import DashboardCard from '../../FlexyMainComponents/base-card/DashboardCard';
import SaveIcon from '@mui/icons-material/Save';
import InstructorApi from '../../../api/instructor_api';
import GetMarkCSVButton from './GetMarkCSVButton';
import UploadMarksButton from "./UploadMarks/UploadMarksButton";

function extractMarkData(data) {
    return Object.keys(data).map((studentName) => {
        return { name: studentName, ...data[studentName] };
    });
}

const TaskMarkTable = ({ courseId, taskId }) => {
    const [criteria, setCriteria] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [taskMarkData, setTaskMarkData] = useState([]);

    const markFetcher = (key) => StaffApi.getMarksForTask(courseId, taskId);
    const { data, isLoading, error, mutate } = useSWR('/getMarksForTask', markFetcher, {
        refreshInterval: 60000
    });

    useEffect(() => {
        if (isLoading || error) return;

        StaffApi.getCriteriaForTask(courseId, taskId).then((res) => {
            const critObjList = res.data.criteria;
            setCriteria(critObjList);

            StaffApi.get_students_in_course(courseId).then((response) => {
                const tempStudentList = response.data.role
                    .filter((role) => role.role === 'student')
                    .map((role) => {
                        return {
                            username: role.username,
                            email: role.email,
                            id: `${role.username}/${role.email}`
                        };
                    });

                setStudentList(tempStudentList);

                const markDataTemp = extractMarkData(data);

                const markDataTemp2 = tempStudentList.map((studObj) => {
                    const result = { name: studObj.username }
                    critObjList.forEach((critObj) => {
                        result[critObj.criteria] = {
                            mark: 0,
                            out_of: critObj.total
                        }
                    });

                    return result;
                })

                markDataTemp2.forEach(markDataObj => {
                    if (!markDataTemp.find(el => el.name === markDataObj.name)) {
                        markDataTemp.push(markDataObj);
                    }
                })

                setTaskMarkData(markDataTemp);
            });
        })
    }, [isLoading, error, data]);

    if (isLoading) return <Typography variant="h1">Loading...</Typography>;
    if (error) return <Typography variant="h1">Unknown error...Try again</Typography>;

    const TaskMarkEntry = ({ row }) => {
        const name = row.name;

        const handleChange = (event, criteriaId) => {
            const tempTaskMarkData = taskMarkData.map((studentTaskData) => {
                if (studentTaskData.name !== name) return studentTaskData;

                const newStudentTaskData = {
                    ...studentTaskData
                };

                newStudentTaskData[criteriaId] = {
                    mark: event.target.valueAsNumber,
                    out_of: newStudentTaskData[criteriaId].out_of
                };

                return newStudentTaskData;
            });
            setTaskMarkData(tempTaskMarkData);
        };

        const handleSave = () => {
            let studentTaskData = taskMarkData.filter((data) => data.name === name);
            if (studentTaskData.length === 0) return;

            studentTaskData = studentTaskData[0];
            Object.keys(studentTaskData).map((key) => {
                if (key === 'name') return;

                // in this case key is a criteria id
                InstructorApi.submitMark(
                    courseId,
                    taskId,
                    key,
                    name,
                    studentTaskData[key].mark
                ).catch((err) => {
                    toast.error(`Something went wrong. Refresh and Try again`, {
                        theme: 'colored'
                    });
                });
            });

            toast.success('Marks updated...', {
                theme: 'colored'
            });

            mutate();
        };

        return (
            <TableRow>
                {Object.keys(row).map((col) => {
                    if (col === 'name')
                        return (
                            <TableCell align="center" key={name}>
                                <Typography>{row.name}</Typography>
                            </TableCell>
                        );

                    return (
                        <TableCell
                            align="center"
                            key={`${name}-${col}-${row[col].mark}}-${row[col].out_of}`}
                        >
                            <TextField
                                id="outlined-number"
                                type="number"
                                size="small"
                                max={row[col].out_of}
                                min={0}
                                onChange={(event) => handleChange(event, col)}
                                defaultValue={row[col].mark}
                            />
                        </TableCell>
                    );
                })}
                <TableCell>
                    <Button variant="contained" onClick={handleSave} startIcon={<SaveIcon />}>
                        Save
                    </Button>
                </TableCell>
            </TableRow>
        );
    };

    if (studentList.length === 0) {
        return (
            <DashboardCard title={`Marks for ${taskId}`}>
                <h5>No students in this course</h5>
            </DashboardCard>
        );
    }

    return (
        <DashboardCard title={`Marks for ${taskId}`}>
            <Stack spacing={2}>
                <GetMarkCSVButton task={taskId} course_id={courseId} />
                <UploadMarksButton courseId={courseId} taskId={taskId}/>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    <Typography>Student</Typography>
                                </TableCell>
                                {criteria.map((critObj) => (
                                    <TableCell align="center" key={`${critObj.criteria}`}>
                                        <Typography>
                                            {critObj.criteria} (/{critObj.total})
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {taskMarkData.map((entry) => (
                                <TaskMarkEntry key={`${entry.name}`} row={entry} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </DashboardCard>
    );
};

export default TaskMarkTable;
