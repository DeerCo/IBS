import AggregatedGradesTable from '../../General/AggregatedGradesTable/AggregatedGradesTable';
import Grid from '@mui/material/Unstable_Grid2';
import NavBar from '../../Module/Navigation/NavBar';
import FlexyTabs from '../../General/FlexyTabs/FlexyTabs';
import { Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import StaffApi from '../../../api/staff_api';

const rows = [
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

const headCells = [
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

const flexyTabs = [
    {
        tabName: 'Tab 1',
        tabId: 0,
        tabSubheading: 'Example of Subheading 1',
        tabContext: (
            <Typography
                color="textSecondary"
                sx={{
                    mt: 4
                }}
            >
                Example of description 1
            </Typography>
        )
    },
    {
        tabName: 'Tab 2',
        tabId: 1,
        tabSubheading: 'Example of Subheading 2',
        tabContext: (
            <Typography
                color="textSecondary"
                sx={{
                    mt: 4
                }}
            >
                Example of description 2
            </Typography>
        )
    },
    {
        tabName: 'Aggregated Grades',
        tabId: 2,
        tabSubheading: 'Aggregated Grades',
        tabContext: <AggregatedGradesTable rows={rows} headCells={headCells} />
    }
];

const AggregatedGrades = (props) => {
    const navigate = useNavigate();

    const { courseId } = useParams();

    useEffect(() => {
        StaffApi.getAllMarks(courseId).then((res) => {
            // Format of response:
            // {
            //     "marks": {
            //     "student1": {
            //         "task1": {
            //             "mark": 12,
            //                 "out_of": 57
            //         }
            //     },
            //     "student2": {
            //         "task1": {
            //             "mark": 18,
            //                 "out_of": 57
            //         }
            //     },
            //     "student3": {
            //         "task1": {
            //             "mark": 18,
            //                 "out_of": 57
            //         }
            //     }
            // }
        });
    }, [courseId, navigate]);

    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <NavBar role="instructor" page="Grades" />
            </Grid>
            <Grid xs={12}>
                {/*TODO: Handle case where no marks have been uploaded*/}
                <FlexyTabs tabs={flexyTabs} />
            </Grid>
        </Grid>
    );
};

export default AggregatedGrades;
