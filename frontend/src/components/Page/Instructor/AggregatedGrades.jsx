import AggregatedGradesTable from '../../General/AggregatedGradesTable/AggregatedGradesTable';
import Grid from '@mui/material/Unstable_Grid2';
import NavBar from '../../Module/Navigation/NavBar';

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

const AggregatedGrades = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <NavBar />
            </Grid>
            <Grid xs={12}>
                <AggregatedGradesTable rows={rows} headCells={headCells} />
            </Grid>
        </Grid>
    );
};

export default AggregatedGrades;
