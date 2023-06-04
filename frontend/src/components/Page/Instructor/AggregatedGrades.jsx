import AggregatedGradesTable from '../../General/AggregatedGradesTable/AggregatedGradesTable';
import Grid from '@mui/material/Unstable_Grid2';
import NavBar from '../../Module/Navigation/NavBar';
import { Container, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SubmitMarksForm from '../../Module/Mark/SubmitMarks/SubmitMarksForm';
import useSWR from 'swr';
import StaffApi, { findRoleInCourse } from '../../../api/staff_api';
import PropTypes from 'prop-types';

const sampleRows = [
    {
        id: '1',
        student: 'Sunil Joshi',
        grade: '28'
    },
    {
        id: '2',
        student: 'Andrew McDownland',
        grade: '90'
    },
    {
        id: '3',
        student: 'Christopher Jamil',
        grade: '74'
    },
    {
        id: '4',
        student: 'Nirav Joshi',
        grade: '92'
    },
    {
        id: '5',
        student: 'Micheal Doe',
        grade: '67'
    }
];

const sampleHeadCells = [
    {
        id: 'student',
        numeric: false,
        disablePadding: false,
        label: 'Students'
    },
    {
        id: 'grade',
        numeric: false,
        disablePadding: false,
        label: 'Grades'
    }
];

const AggregatedGrades = (props) => {
    const navigate = useNavigate();

    const { role } = props;

    const [rows, setRows] = useState([]);
    const [headCells, setHeadCells] = useState([
        {
            id: 'student',
            numeric: false,
            disablePadding: false,
            label: 'Students'
        }
    ]);

    const { courseId } = useParams();

    const { data, isLoading, error } = useSWR('/mark/all', () =>
        StaffApi.getAllMarks(courseId).then((res) => res.data)
    );

    useEffect(() => {
        if (isLoading || error) return;
        // StaffApi.getAllMarks(courseId).then((res) => {
        let idCounter = 0;

        // Format of response:
        // {
        //     "marks": {
        //     "student1": {
        //         "task1": {
        //             "mark": 12,
        //             "out_of": 57
        //         }
        //     }
        //     }
        // }
        const studentsArr = data.marks;
        // console.log(studentsArr);
        for (const student in studentsArr) {
            for (const taskName in data.marks[student]) {
                setHeadCells((prevState) => {
                    const newState = {
                        id: taskName,
                        numeric: false,
                        disablePadding: false,
                        label: taskName
                    };
                    for (const col of prevState) {
                        if (col.id === taskName) {
                            return [...prevState];
                        }
                    }
                    return [...prevState, newState];
                });
                setRows((prevState) => {
                    let newRow = {
                        id: idCounter,
                        student: student
                    };
                    newRow[
                        taskName
                    ] = `${data.marks[student][taskName].mark}/${data.marks[student][taskName].out_of}`;
                    for (const row of prevState) {
                        if (row.student === student) {
                            row[
                                taskName
                            ] = `${data.marks[student][taskName].mark}/${data.marks[student][taskName].out_of}`;
                            return [...prevState];
                        }
                    }
                    idCounter++;
                    return [...prevState, newRow];
                });
            }
        }
    }, [courseId, navigate, data, isLoading, error]);

    const viewersRole = findRoleInCourse(courseId);

    if (isLoading) return <Typography variant="h1">Loading...</Typography>;

    if (error) return <Typography variant="h1">Error. Try Logging in again</Typography>;

    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <NavBar role={role} page="Grades" />
            </Grid>
            <Grid xs={12}>
                <Container maxWidth="xl">
                    <Grid xs={12}>
                        <Typography
                            color="textPrimary"
                            variant="h2"
                            fontWeight="600"
                            sx={{ ml: 3 }}
                        >
                            All Grades for Course ID: {courseId}
                        </Typography>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        {rows !== [] && (
                            <Grid xs>
                                <AggregatedGradesTable
                                    headCells={headCells}
                                    rows={rows}
                                    tableWidth="100%"
                                    courseId={courseId}
                                />
                            </Grid>
                        )}
                        {viewersRole === 'instructor' && (
                            <Grid xs={4}>
                                <SubmitMarksForm courseId={courseId} />
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    );
};

AggregatedGrades.propTypes = {
    role: PropTypes.string.isRequired
};

export default AggregatedGrades;
