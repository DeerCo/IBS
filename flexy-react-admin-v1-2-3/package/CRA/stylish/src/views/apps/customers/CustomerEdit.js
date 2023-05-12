import React from 'react';
import { Avatar, Card, Grid, Typography, Button, Autocomplete } from '@mui/material';

import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full-layout/breadcrumb/Breadcrumb';

import av1 from '../../../assets/images/users/4.jpg';
import CustomTextField from '../../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/custom-elements/CustomFormLabel';

const Teams = [
  {
    id: 'eric',
    label: 'Eric',
  },
  {
    id: 'joao',
    label: 'Joao',
  },
  {
    id: 'tushly',
    label: 'Tushly',
  },
  {
    id: 'pnaji',
    label: 'Pnaji',
  },
];
const CustomerEdit = () => (
  <PageContainer title="Customer Edit" description="this is Customer Edit page">
    <Breadcrumb title="Edit page" subtitle="Customer" />
    <Grid container spacing={0}>
      <Grid item lg={4} md={12} xs={12}>
        <Card sx={{ p: 3 }}>
          <Avatar alt="Remy Sharp" src={av1} sx={{ width: 110, height: 110 }} />
          <Typography variant="h2" sx={{ mt: 1 }}>
            Nirav Joshi
          </Typography>
          <Typography variant="body2">FullStack Developer</Typography>
          <Typography variant="h6" fontWeight="600" sx={{ mt: 3, mb: 1 }}>
            Address
          </Typography>
          <Typography variant="body2">
            11, Avenue Ganesh, Near Osia plex, opposit Apex Tower, New York, USA
          </Typography>
          <Button color="error" variant="contained" sx={{ mt: 3 }}>
            Delete Account
          </Button>
        </Card>
      </Grid>
      <Grid item lg={8} md={12} xs={12}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="600" sx={{ mb: 3 }}>
            Edit Details
          </Typography>
          <form>
            <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
            <CustomTextField
              id="name"
              variant="outlined"
              defaultValue="Nirav Joshi"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            />

            <CustomFormLabel htmlFor="Email">Email</CustomFormLabel>
            <CustomTextField
              id="Email"
              variant="outlined"
              defaultValue="nirav@gadga.com"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            />

            <CustomFormLabel htmlFor="project">Project Name</CustomFormLabel>
            <CustomTextField
              id="project"
              variant="outlined"
              defaultValue="Hosting Press HTML"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            />

            <CustomFormLabel htmlFor="project-details">Project Description</CustomFormLabel>
            <CustomTextField
              id="project-details"
              variant="outlined"
              multiline
              rows={4}
              defaultValue="Sard about this site or you have been to it, but you cannot figure out what it is or what it can do. 
                        MTA web directory is the simplest way in which one can bid on a link, or a few links if they wish to do so. which makes it much easier for someone to find what they are looking for if "
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            />

            <CustomFormLabel>Users</CustomFormLabel>

            <Autocomplete
              multiple
              id="tags-outlined"
              options={Teams}
              getOptionLabel={(option) => option.label}
              defaultValue={[Teams[1]]}
              filterSelectedOptions
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  placeholder="users"
                  size="small"
                  aria-label="users"
                  sx={{
                    mb: 3,
                  }}
                />
              )}
            />
            <CustomFormLabel htmlFor="week">Week</CustomFormLabel>
            <CustomTextField
              id="week"
              variant="outlined"
              defaultValue="40"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            />

            <CustomFormLabel htmlFor="Budget">Budget</CustomFormLabel>
            <CustomTextField
              id="Budget"
              variant="outlined"
              defaultValue="$2.4K"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            />

            <Button color="primary" variant="contained">
              Update
            </Button>
          </form>
        </Card>
      </Grid>
    </Grid>
  </PageContainer>
);

export default CustomerEdit;
