import React from 'react';
import { Grid, Typography } from '@mui/material';

let TaskNotes = () => {

  return (
    <Grid sx={{ marginLeft: '64px', width: '100%' }} >
      <Typography variant='h3' > <b>Notes</b> </Typography>
      <br />
      <Typography variant='h5'> Code: </Typography>
      <Typography variant='h6'> Assignment's code. E.g. A1</Typography>
      <br />
      <Typography variant='h5'> Name: </Typography>
      <Typography variant='h6'> Assignment's name. E.g. Assignment One </Typography>
      <br />
      <Typography variant='h5'> Weight: </Typography>
      <Typography variant='h6'> The weight of this assignment, out of 100, on the course grade. E.g. 50</Typography>
      <br />
      <Typography variant='h5'> Group Members Capacity: </Typography>
      <Typography variant='h6'> Minimum and maximum number of students allowed in a group. E.g. 2</Typography>
      <br />
      <Typography variant='h5'> Token: </Typography>
      <Typography variant='h6'> Maximum number of tokens allowed to use on this assignment. E.g. 3</Typography>
      <br />
      <Typography variant='h5'> Task Group: </Typography>
      <Typography variant='h6'> Each Task group has a limit on the overal tokens allowed to use for the assignments in it. </Typography>
      <br />
      <Typography variant='h5'> Starter Code URL: </Typography>
      <Typography variant='h6'> The URL should start with <b>https://</b> and end with <b>.git</b>. E.g. https://ibs.git </Typography>
      <br />
    </Grid>
  );
};

export default TaskNotes;
