import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

let TaskNotes = () => {

  return (
    <Grid sx={{ marginLeft: '64px', width: '100%' }} >
      <Typography variant='h3'> Notes</Typography>
      <br />
      <Typography variant='h5'> Code: </Typography>
      <Typography variant='h6'> Assignment's code. E.g. A1</Typography>
      <br />
      <Typography variant='h5'> Name: </Typography>
      <Typography variant='h6'> Assignment's name. E.g. Assignment One </Typography>
      <br />
      <Typography variant='h5'> Weight: </Typography>
      <Typography variant='h6'> The weight of this assignment, out of 100, on the task group's grade. E.g. 50</Typography>
      <br />
      <Typography variant='h5'> Group Members Capacity: </Typography>
      <Typography variant='h6'> Minimum and maximum number of students allowed in a group. E.g. 2</Typography>
      <br />
      <Typography variant='h5'> Token: </Typography>
      <Typography variant='h6'> Maximum number of tokens allowed to use on this assignment. E.g. 3</Typography>
      <br />
      <Typography variant='h5'> Starter Code URL: </Typography>
      <Typography variant='h6'> The URL should start with https:// and end with .git. E.g. https://ibs.git </Typography>
      <br />
    </Grid>
  );
};

export default TaskNotes;
