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

function extractCriteriaNames(data) {
    const criteria = [];

    for (const studentData of Object.values(data)) {
        for (const key of Object.keys(studentData)) {
            if (criteria.includes(key)) continue;
            criteria.push({ criteriaName: key, outOf: studentData[key].out_of });
        }
    }

    return criteria;
}

function extractMarkData(data) {
    return Object.keys(data).map((studentName) => {
        return { name: studentName, ...data[studentName] };
    });
}

const TaskMarkTable = ({ courseId, taskId }) => {
    const [criteriaNames, setCriteriaNames] = useState([]);
    const [taskMarkData, setTaskMarkData] = useState([]);

    const markFetcher = (key) => StaffApi.getMarksForTask(courseId, taskId);
    const { data, isLoading, error, mutate } = useSWR('/getMarksForTask', markFetcher, {
        refreshInterval: 60000
    });

    useEffect(() => {
        if (isLoading || error) return;

        const criteriaNamesTemp = extractCriteriaNames(data);
        setCriteriaNames(criteriaNamesTemp);

        const markDataTemp = extractMarkData(data);
        setTaskMarkData(markDataTemp);
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
            <>
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
            </>
        );
    };

    return (
        <DashboardCard title={`Marks for ${taskId}`}>
            <Stack spacing={2}>
                <GetMarkCSVButton task={taskId} course_id={courseId} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    <Typography>Student</Typography>
                                </TableCell>
                                {criteriaNames.map((crit) => (
                                    <TableCell align="center" key={`${crit.criteriaName}`}>
                                        <Typography>
                                            {crit.criteriaName} (/{crit.outOf})
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                {taskMarkData.map((entry) => (
                                    <TaskMarkEntry key={`${entry.name}`} row={entry} />
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </DashboardCard>
    );
};

export default TaskMarkTable;
