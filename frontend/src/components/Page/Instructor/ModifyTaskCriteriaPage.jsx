import {useParams} from "react-router-dom";
import PageContainer from "../../FlexyMainComponents/container/PageContainer";
import NavBar from "../../Module/Navigation/NavBar";
import {Grid} from "@mui/material";
import AddDeleteTaskCriteria from "../../General/AddDeleteTaskCriteria/AddDeleteTaskCriteria";

const ModifyTaskCriteriaPage = () => {
    const { courseId, taskId } = useParams();

    return (
        <PageContainer>
            <NavBar page="Modify Task Criteria" />
            <Grid container sx='12' sm='10' md='8' lg='6' xl='6'>
                <Grid item sx={8}>
                    TODO: Put criteria list here. Make sure each one has a delete button
                </Grid>
                <Grid item>
                    <AddDeleteTaskCriteria />
                </Grid>
            </Grid>
        </PageContainer>
    );
}

export default ModifyTaskCriteriaPage;