import AggregatedGradesTable from '../../General/AggregatedGradesTable/AggregatedGradesTable';
import Grid from '@mui/material/Unstable_Grid2';
import NavBar from '../../Module/Navigation/NavBar';
import { Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StaffApi from '../../../api/staff_api';

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

    useEffect(() => {
        StaffApi.getAllMarks(courseId).then((res) => {
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
            const studentsArr = res.data.marks;
            // console.log(studentsArr);
            for (const student in studentsArr) {
                for (const taskName in res.data.marks[student]) {
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
                        ] = `${res.data.marks[student][taskName].mark}/${res.data.marks[student][taskName].out_of}`;
                        for (const row of prevState) {
                            if (row.student === student) {
                                row[
                                    taskName
                                ] = `${res.data.marks[student][taskName].mark}/${res.data.marks[student][taskName].out_of}`;
                                return [...prevState];
                            }
                        }
                        idCounter++;
                        return [...prevState, newRow];
                    });
                }
            }
        });
    }, [courseId, navigate]);

    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <NavBar role="instructor" page="Grades" />
            </Grid>
            <Grid xs={12}>
                {/*TODO: Handle case where no marks have been uploaded*/}
                {rows !== [] && <AggregatedGradesTable headCells={headCells} rows={rows} />}
            </Grid>
        </Grid>
    );
};

export default AggregatedGrades;
