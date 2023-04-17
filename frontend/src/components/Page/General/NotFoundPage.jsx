import React from "react";
import {Link} from 'react-router-dom';
import {Box, Button, Grid, Typography} from "@mui/material";

let NotFoundPage = () => {
  return (
    <Grid container
          direction="column"
          height="100%"
          wrap="nowrap">
      <Grid item container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignContent="center"
            justify="center"
            flex="1 1 auto">
        <Box textAlign="center">
          <Typography variant="h6">
            We can't find the page you're looking for.
          </Typography>
          <Button variant="contained" component={Link} to="/login">
            Return to Login
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};


export default NotFoundPage;