import {useParams} from "react-router-dom";
import PageContainer from "../../FlexyMainComponents/container/PageContainer";
import NavBar from "../../Module/Navigation/NavBar";
import {Grid, Stack} from "@mui/material";
import {AddTaskCriteriaForm, CriteriaList} from "../../General/AddTaskCriteriaForm/AddTaskCriteriaForm";
import DashboardCard from "../../FlexyMainComponents/base-card/DashboardCard";
import {findCourseCodeInCourse} from "../../../api/staff_api";

const ModifyTaskCriteriaPage = () => {
    const { courseId, taskId } = useParams();

    const courseCode = findCourseCodeInCourse(courseId)

    return (
        <PageContainer>
            <Stack spacing={1}>
                <NavBar page="Modify Task Criteria" />
                <Grid container spacing={4}>
                    <Grid item xs={8}>
                        <DashboardCard
                            title={`List of criteria for ${taskId} in ${courseCode}`}
                            children={<CriteriaList courseId={courseId} task={taskId} />}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <DashboardCard
                            title="Add criteria for this assignment"
                            children={<AddTaskCriteriaForm courseId={courseId} taskId={taskId} />}
                        />
                    </Grid>
                </Grid>
            </Stack>
        </PageContainer>
    );
}

export default ModifyTaskCriteriaPage;