import React from 'react';
import { Grid, Button, Box, Card, CardContent, Typography } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import { NavLink } from 'react-router-dom';

import ThemeSelect from './ThemeSelect';

import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';

const Dashboard1 = () => (
  // 2

  <PageContainer title="Starter Page" description="this is Starter Page">
    {/* breadcrumb */}
    <Breadcrumb title="Starter Page" subtitle="Welcome Johnathan">
      <ThemeSelect />
      <Button
        to="/user-profile"
        component={NavLink}
        sx={{
          ml: 1,
        }}
        variant="contained"
        color="primary"
      >
        <FeatherIcon icon="user" width="18" height="18" />
        <Box fontWeight="400" sx={{ ml: 1 }}>
          Profile
        </Box>
      </Button>
    </Breadcrumb>
    {/* end breadcrumb */}
    <Grid container spacing={0}>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={12}>
        <Card>
          <CardContent>
            <Typography variant="h4">Starter Card</Typography>
            <Typography variant="body1">
              This impressive paella is a perfect party dish and a fun meal to cook together with
              your guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </PageContainer>
);
export default Dashboard1;
