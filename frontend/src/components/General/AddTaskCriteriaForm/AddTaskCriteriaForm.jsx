import AssignmentIcon from '@mui/icons-material/Assignment';
import StaffApi from "../../../api/staff_api";
import useSWR, {mutate} from "swr";
import {
    Avatar,
    Badge,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Stack,
    TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Form, FormikProvider, useFormik} from "formik";

const CRITERIA_LIST_CACHE_KEY = 'criteria-list';

export const AddTaskCriteriaForm = ({ courseId, taskId }) => {
    const initialValues = {
        criteriaName: '',
        total: 0,
        description: ''
    }

    const formik = useFormik({
        initialValues,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            StaffApi.addCriterionForTask(courseId, taskId, values.criteriaName, values.total, values.description)
                .then((res) => {
                    mutate(CRITERIA_LIST_CACHE_KEY)
                })
                .catch((err) => {
                    toast.error('Unknown error', { theme: 'colored' });
                });

            setSubmitting(false);
        }
    })

    return (
        <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        required
                        id="criteriaName"
                        key="criteriaName"
                        name="criteriaName"
                        label="Criteria Name"
                        value={formik.values.criteriaName}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.criteriaName &&
                            Boolean(formik.errors.criteriaName)
                        }
                    />

                    <TextField
                        id="description"
                        key="description"
                        name="description"
                        label="Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.description &&
                            Boolean(formik.errors.description)
                        }
                    />

                    <TextField
                        id="total"
                        key="total"
                        name="total"
                        label="Total"
                        type="number"
                        helperText="How many points is this criterion worth?"
                        value={formik.values.total}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.total &&
                            Boolean(formik.errors.total)
                        }
                    />
                    <Button type="submit" variant="contained">Add Criteria</Button>
                </Stack>
            </Form>
        </FormikProvider>
    );
}

export const CriteriaList = ({ courseId, task }) => {
    const [criteriaList, setCriteriaList] = useState([])

    const criteriaListFetcher = () => StaffApi.getCriteriaForTask(courseId, task).then((res) => res.data).then((data) => data.criteria);

    /**
     * data will be an array in the shape of:
     * {
     *      criteria_id: number;
     *      task: string;
     *      criteria: string;
     *      total: string;
     *      description: string;
     * }
     */
    const { data, error, isLoading, mutate } = useSWR(CRITERIA_LIST_CACHE_KEY, criteriaListFetcher);

    useEffect(() => {
        if (isLoading || error || data === CRITERIA_LIST_CACHE_KEY) return;

        const tempCritList = data.map((criterion) => criterion);
        setCriteriaList(tempCritList);

    }, [data, isLoading, error]);

    const onDelete = (criterionId) => {
        StaffApi.deleteCriterionForTask(courseId, criterionId).then((res) => {
            if (res.status === 200) {
                mutate(CRITERIA_LIST_CACHE_KEY);
            } else {
                toast.error('Unknown error', { theme: 'colored' });
            }
        })
    }

    if (isLoading) return <h1>Loading...</h1>

    if (error) return <h1>An error occurred...</h1>

    if (!data) return <h1>No criteria found. Add some!</h1>

    if (criteriaList.length === 0) return <h2>No criteria found for this task. Use the form to add criterion.</h2>

    return (
        <List>
            {criteriaList.map((criterion) => (
                <ListItem secondaryAction={
                    <IconButton
                        onClick={() => onDelete(criterion.criteria_id)}
                        edge="end"
                        aria-label="delete"
                    >
                        <DeleteIcon />
                    </IconButton>
                }>
                    <ListItemAvatar>
                        <Badge badgeContent={criterion.total} color="primary">
                            <Avatar>
                                <AssignmentIcon />
                            </Avatar>
                        </Badge>
                    </ListItemAvatar>
                    <ListItemText
                        primary={criterion.criteria}
                        secondary={criterion.description}
                    />
                </ListItem>
            ))}
        </List>
    );
}