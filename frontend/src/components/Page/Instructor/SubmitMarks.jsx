import Grid from '@mui/material/Unstable_Grid2';
import NavBar from '../../Module/Navigation/NavBar';
import { Container, Typography } from '@mui/material';
import SubmitMarksForm from '../../Module/Mark/SubmitMarks/SubmitMarksForm';
import { useParams } from 'react-router-dom';
import PageContainer from '../../FlexyMainComponents/container/PageContainer';
const SubmitMarks = () => {
    const { courseId } = useParams();

    return (
        <PageContainer title="Submit Marks" description="Page for submitting marks">
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <NavBar role="instructor" page="Submit Marks" />
                </Grid>
                <Grid xs={12}>
                    <Container>
                        <SubmitMarksForm courseId={courseId} />
                    </Container>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default SubmitMarks;
