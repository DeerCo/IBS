import AggregatedGradesTable from '../../General/AggregatedGradesTable/AggregatedGradesTable';
import Grid from '@mui/material/Unstable_Grid2';
import NavBar from '../../Module/Navigation/NavBar';

const AggregatedGrades = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <NavBar />
            </Grid>
            <Grid xs={12}>
                <AggregatedGradesTable />
            </Grid>
        </Grid>
    );
};

export default AggregatedGrades;
