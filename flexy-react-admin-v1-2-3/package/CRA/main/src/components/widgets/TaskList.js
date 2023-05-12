import React from 'react';
import { Box, Card, CardContent, Chip, FormGroup, FormControlLabel } from '@mui/material';
import CustomCheckbox from '../forms/custom-elements/CustomCheckbox';
import WidgetCard from '../base-card/WidgetCard';

const tasks = [
  {
    id: '1',
    color: '#fc4b6c',
    title: 'Schedule meeting',
    time: 'Today',
  },
  {
    id: '2',
    color: '#0bb2fb',
    title: 'Give report to  mr.john',
    time: 'Yesterday',
  },
  {
    id: '3',
    color: '#1e4db7',
    title: 'Book flight for holiday',
    time: '1 Week',
  },
  {
    id: '4',
    color: '#fec90f',
    title: 'Forward all tasks',
    time: '2 Weeks',
  },
  {
    id: '5',
    color: '#39cb7f',
    title: 'Recieve shipment',
    time: '3 Weeks',
  },
];

const TaskList = () => (
  <Card
    sx={{
      pb: 0,
      mb: 4,
    }}
  >
    <CardContent
      sx={{
        pb: 0,
      }}
    >
      <WidgetCard title="Task List" />

      {tasks.map((task) => (
        <Box
          key={task.id}
          display="flex"
          alignItems="center"
          sx={{
            pb: 2,
          }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <CustomCheckbox bgcolor={task.color} inputprops={{ 'aria-label': 'checkbox' }} />
              }
              label={task.title}
            />
          </FormGroup>

          <Box sx={{ ml: 'auto' }}>
            <Chip
              sx={{
                backgroundColor:
                  task.time === 'Today'
                    ? (theme) => theme.palette.error.main
                    : task.time === 'Yesterday'
                    ? (theme) => theme.palette.primary.main
                    : task.time === '1 Week'
                    ? (theme) => theme.palette.secondary.main
                    : task.time === '2 Weeks'
                    ? (theme) => theme.palette.warning.main
                    : (theme) => theme.palette.success.main,
                color: '#fff',
                borderRadius: '6px',
                pl: '3px',
                pr: '3px',
                ml: '5px',
              }}
              size="small"
              label={task.time}
            />
          </Box>
        </Box>
      ))}
    </CardContent>
  </Card>
);

export default TaskList;
