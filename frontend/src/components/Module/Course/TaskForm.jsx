import InstructorApi from '../../../api/instructor_api';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from 'formik';
import { Button, Grid, InputLabel, Switch, TextField, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const TaskForm = ({ mode, initialValues }) => {

  const navigate = useNavigate();
  const { course_id } = useParams();
  const [task, setTask] = useState();
  const [long_name, setLongName] = useState();
  const [weight, setWeight] = useState();
  const [due_date, setDueDate] = useState(dayjs().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'));
  const [hidden, setHidden] = useState(false);
  const [min_member, setMinMember] = useState();
  const [max_member, setMaxMember] = useState();
  const [max_token, setMaxToken] = useState();
  const [change_group, SetChangeGroup] = useState(false);
  const [hide_interview, setHideInterview] = useState(false);
  const [hide_file, setHideFile] = useState(false);
  const [interview_group, setInterviewGroup] = useState();
  const [interview_groups, setInterviewGroups] = useState();
  const [task_group_id, setTaskGroupId] = useState();
  const [task_group_ids, setTaskGroupIds] = useState();
  const [starter_code_url, setStarterCodeUrl] = useState();

  useEffect(() => {
    setTask(initialValues.task);
    setLongName(initialValues.long_name);
    setWeight(initialValues.weight);
    setDueDate(dayjs(initialValues.due_date).format('YYYY-MM-DD HH:mm:ss'));
    setHidden(initialValues.hidden);
    setMinMember(initialValues.min_member);
    setMaxMember(initialValues.max_member);
    setMaxToken(initialValues.max_token);
    SetChangeGroup(initialValues.change_group);
    setHideFile(initialValues.hide_file);
    setHideInterview(initialValues.hide_interview);
    setInterviewGroup(initialValues.interview_group);
    setTaskGroupId(initialValues.task_group_id);
    setStarterCodeUrl(initialValues.starter_code_url);
  }, [initialValues]);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      setSubmitting(true);

      const body = {
        task: task,
        long_name: long_name,
        due_date: due_date,
        hidden: hidden,
        weight: weight,
        min_member: min_member,
        max_member: max_member,
        max_token: max_token,
        change_group: change_group,
        hide_interview: hide_interview,
        hide_file: hide_file,
        interview_group: interview_group,
        task_group_id: task_group_id,
        starter_code_url: starter_code_url
      };

      const body_values = Object.keys(body).map((key) =>
        body[key] === null ? undefined : body[key]);

      if (mode === 'add') {
        InstructorApi.add_task(course_id, ...body_values)
          .then((res) => res.data)
          .then((data) => {
            navigate('/instructor/course/' + course_id + '/task');
          })
          .catch((err) =>
            toast.error('Failed to add task. Try again.', {
              theme: 'colored'
            })
          );
      }
      else if (mode === 'modify') {
        InstructorApi.change_task(course_id, ...body_values)
          .then((res) => res.data)
          .then((data) => {
            navigate('/instructor/course/' + course_id + '/task');
          })
          .catch((err) =>
            toast.error('Failed to change task. Try again.', {
              theme: 'colored'
            })
          );
      }
      setSubmitting(false);
    }
  });

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleLongNameChange = (event) => {
    setLongName(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.format('YYYY-MM-DD HH:mm:ss'));
  };

  const handleHiddenChange = () => {
    setHidden(!hidden);
  };

  const handleChangeGroupChange = () => {
    SetChangeGroup(!change_group);
  };

  const handleHideInterviewChange = () => {
    setHideInterview(!hide_interview);
  };

  const handleHideFileChange = () => {
    setHideFile(!hide_file);
  };

  const handleWeightChange = (event) => {
    setWeight(parseFloat(event.target.value));
  };

  const handleMinMemberChange = (event) => {
    setMinMember(parseFloat(event.target.value));
  };

  const handleMaxMemberChange = (event) => {
    setMaxMember(parseFloat(event.target.value));
  };

  const handleMaxTokenChange = (event) => {
    setMaxToken(event.target.value ? parseFloat(event.target.value) : null);
  };

  const handleTaskGroupChange = (event) => {
    setTaskGroupId(event.target.value);
  };

  const handleStarterCodeUrl = (event) => {
    setStarterCodeUrl(event.target.value);
  };

  const handleInterviewGroup = (event) => {
    setInterviewGroup(event.target.value);
  };

  useEffect(() => {
    InstructorApi.all_task_groups(course_id)
      .then((res) => res.data)
      .then((data) => {
        const tempTaskGroupId = data.task_group.map((gp) => gp.task_group_id);
        if (tempTaskGroupId.length > 0) {
          tempTaskGroupId.sort();
          setTaskGroupIds(tempTaskGroupId);
        }
      })
      .catch((err) =>
        toast.error('Failed to fetch the task group ids for this course. Try again.', {
          theme: 'colored'
        })
      );
    InstructorApi.all_tasks(course_id).then(
      (response) => {
        if (!response || !("status" in response)) {
          toast.error("Unknown error", { theme: "colored" });
          navigate("/login");
        } else if (response["status"] === 200) {
          let tasks = response["data"]["task"]
            .filter(task => task.interview_group === null)
            .map(task => (task.task
            ));
          if (tasks.length > 0) {
            setInterviewGroups(tasks);
          }
        } else if (response["status"] === 401 || response["status"] === 403) {
          toast.warn("You need to login again", { theme: "colored" });
          navigate("/login");
        } else {
          toast.error("Unknown error", { theme: "colored" });
          navigate("/login");
        }
      })
  }, [course_id, navigate]);

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <Grid container item
          rowSpacing={2}>

          {mode === 'add' &&
            <Grid item xs={12}>
              <TextField
                required
                key="task"
                sx={{ width: '100%' }}
                label="Task"
                value={task}
                onChange={handleTaskChange}
                error={formik.touched.task && Boolean(formik.errors.task)}
              />
            </Grid>
          }
          <Grid item xs={12}>
            <TextField
              required
              sx={{ width: '100%' }}
              key="long_name"
              label="Long Name"
              value={long_name ?? ''}
              onChange={handleLongNameChange}
              error={formik.touched.long_name && Boolean(formik.errors.long_name)}
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                required
                sx={{ width: '100%' }}
                key="due_date"
                label="Due Date"
                views={['year', 'month', 'day', 'hours', 'minutes']}
                value={dayjs(due_date)}
                onChange={handleDueDateChange}
                error={formik.touched.due_date && Boolean(formik.errors.due_date)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              sx={{ width: '100%' }}
              key="weight"
              label="Weight"
              type="number"
              value={weight ?? ''}
              onChange={handleWeightChange}
              max={100}
              error={formik.touched.weight && Boolean(formik.errors.weight)}
              helperText={formik.touched.weight && formik.errors.weight}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              sx={{ width: '100%' }}
              key="min_memeber"
              label="Min Member"
              type="number"
              value={min_member ?? ''}
              onChange={handleMinMemberChange}
              error={formik.touched.min_member && Boolean(formik.errors.min_member)}
              helperText={formik.touched.min_member && formik.errors.min_member}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              sx={{ width: '100%' }}
              key="max_memeber"
              label="Max Member"
              type="number"
              value={max_member ?? ''}
              onChange={handleMaxMemberChange}
              error={formik.touched.max_member && Boolean(formik.errors.max_member)}
              helperText={formik.touched.max_member && formik.errors.max_member}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              sx={{ width: '100%' }}
              key="max_token"
              label="Max Token"
              type="number"
              value={max_token ?? ''}
              onChange={handleMaxTokenChange}
              error={formik.touched.max_token && Boolean(formik.errors.max_token)}
              helperText={formik.touched.max_token && formik.errors.max_token}
            />
          </Grid>
          {interview_groups &&
            <Grid item xs={12}>
              <TextField
                select
                sx={{ width: '100%' }}
                key="interview_group"
                label="Interview Group"
                value={interview_group ?? ''}
                onChange={handleInterviewGroup}
                error={formik.touched.interview_group && Boolean(formik.errors.interview_group)}
              >
                <MenuItem Key='None' value={undefined}>
                  <em>None</em>
                </MenuItem>
                {interview_groups.map((gp) => (
                  <MenuItem key={gp} value={gp}>
                    {gp}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          }
          {task_group_ids &&
            <Grid item xs={12}>
              <TextField
                select
                sx={{ width: '100%' }}
                key="task group"
                label="Task Group"
                value={task_group_id ?? ''}
                onChange={handleTaskGroupChange}
                error={formik.touched.task_group_id && Boolean(formik.errors.task_group_id)}
              >
                <MenuItem Key='None' value={undefined}>
                  <em>None</em>
                </MenuItem>
                {task_group_ids.map((id) => (
                  <MenuItem key={id} value={id}>
                    {id}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            /* add task group if !task_group_ids?
            <TextField
              sx={{ width: '100%' }}
              key="task group"
              label="Task Group"
              type="number"
              value={task_group_id ?? ''}
              onChange={handleTaskGroupChange}
              error={formik.touched.task_group_id && Boolean(formik.errors.task_group_id)}
            />*/
          }
          <Grid item xs={12}>
            <TextField
              sx={{ width: '100%' }}
              key="starter_code_url"
              label="Starter Code URL"
              value={starter_code_url ?? ''}
              type='url'
              onChange={handleStarterCodeUrl}
              error={formik.touched.starter_code_url && Boolean(formik.errors.starter_code_url)}
            />
          </Grid>

          <Grid container item flexDirection='row' justifyContent='space-between'>
            <Grid item>
              <InputLabel>Task Hidden</InputLabel>
              <Switch
                key="hidden"
                id="hidden"
                label="Hidden"
                checked={hidden}
                onChange={handleHiddenChange}
                error={formik.touched.hidden && Boolean(formik.errors.hidden)}
              />
            </Grid>
            <Grid item>
              <InputLabel>Allow Group Change</InputLabel>
              <Switch
                key="change_group"
                id="change_group"
                label="Change Group"
                checked={change_group}
                onChange={handleChangeGroupChange}
                error={formik.touched.change_group && Boolean(formik.errors.change_group)}
              />
            </Grid>
            <Grid item>
              <InputLabel>Hide Interview</InputLabel>
              <Switch
                key="hide_interview"
                id="hide_interview"
                label="Hide Interview"
                checked={hide_interview}
                onChange={handleHideInterviewChange}
                error={formik.touched.hide_interview && Boolean(formik.errors.hide_interview)}
              />
            </Grid>
            <Grid item>
              <InputLabel>Hide File</InputLabel>
              <Switch
                key="hide_file"
                id="hide_file"
                label="Hide File"
                checked={hide_file}
                onChange={handleHideFileChange}
                error={formik.touched.hide_file && Boolean(formik.errors.hide_file)}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Button
              sx={{ width: '100%' }}
              type="submit"
              disabled={
                formik.isSubmitting ||
                !long_name ||
                !weight ||
                weight > 100 ||
                !task ||
                !due_date ||
                !weight ||
                !min_member ||
                !max_member
              }
            >
              Submit
            </Button>
          </Grid>

        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default TaskForm;
