import React from 'react';
import { Grid, Stack, Button, IconButton, Collapse } from '@mui/material';
import Alert from '@mui/lab/Alert';
import FeatherIcon from 'feather-icons-react';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import BaseCard from '../../components/base-card/BaseCard';
import PageContainer from '../../components/container/PageContainer';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Alert',
  },
];

const ExAlert = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <PageContainer title="Alert" description="this is Alert page">
      {/* breadcrumb */}
      <Breadcrumb title="Alert" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Filled Alert">
            <Stack spacing={1}>
              <Alert variant="filled" severity="error">
                This is an error alert — check it out!
              </Alert>
              <Alert variant="filled" severity="warning">
                This is a warning alert — check it out!
              </Alert>
              <Alert variant="filled" severity="info">
                This is an info alert — check it out!
              </Alert>
              <Alert variant="filled" severity="success">
                This is a success alert — check it out!
              </Alert>
            </Stack>
          </BaseCard>
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Action Alert">
            <Stack spacing={1}>
              <Alert variant="filled" severity="warning" onClose={() => {}}>
                This is a success alert — check it out!
              </Alert>
              <Alert
                variant="filled"
                severity="info"
                action={
                  <Button color="inherit" size="small">
                    UNDO
                  </Button>
                }
              >
                This is a success alert — check it out!
              </Alert>
            </Stack>
          </BaseCard>
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Transition Alert">
            <Stack spacing={1}>
              <Collapse in={open}>
                <Alert
                  variant="filled"
                  severity="info"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <FeatherIcon icon="x" width="20" />
                    </IconButton>
                  }
                >
                  Close me!
                </Alert>
              </Collapse>
              <Button
                disabled={open}
                variant="outlined"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Re-open
              </Button>
            </Stack>
          </BaseCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ExAlert;
