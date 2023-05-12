import React from 'react';
import {
  Card,
  Grid,
  Typography,
  Chip,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Pricing',
  },
];

const pricing = [
  {
    id: 1,
    badge: 'none',
    package: 'Sliver',
    dollar: '35',
    member: '3 Members',
    device: 'Single Device',
    storage: '50GB Storage',
    bkp: 'Monthly Backups',
    btnsize: 'medium',
    btncolor: 'secondary',
  },
  {
    id: 2,
    badge: 'flex',
    package: 'Platinum',
    dollar: '45',
    member: '5 Members',
    device: 'Single Device',
    storage: '80GB Storage',
    bkp: 'Monthly Backups',
    btnsize: 'large',
    btncolor: 'primary',
  },
  {
    id: 3,
    badge: 'none',
    package: 'Diamond',
    dollar: '55',
    member: '15 Members',
    device: 'Single Device',
    storage: '1TB Storage',
    bkp: 'Monthly Backups',
    btnsize: 'medium',
    btncolor: 'secondary',
  },
];

const Pricing = () => {
  return (
    <PageContainer title="Pricing" description="this is Pricing page">
      {/* breadcrumb */}
      <Breadcrumb title="Pricing" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container>
        {pricing.map((price) => (
          <Grid item xs={12} lg={4} sm={6} key={price.id}>
            <Card sx={{ textAlign: 'center', overflow: 'unset', position: 'relative' }}>
              <Chip
                sx={{
                  bgcolor: (theme) => theme.palette.warning.main,
                  mt: -4,
                  color: '#fff',
                  fontSize: '14px',
                  display: price.badge,
                  maxWidth: '120px',
                  position: 'absolute',
                  left: '0',
                  right: '0',
                  ml: 'auto',
                  mr: 'auto',
                }}
                label="Popular"
              />
              <Typography variant="h4" sx={{ mt: 3 }}>
                {price.package}
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Box sx={{ mt: 3, fontSize: '40px', fontWeight: '600' }}>
                  <sup style={{ fontSize: '15px' }}>$</sup>
                  {price.dollar}
                </Box>
                <Typography sx={{ fontSize: '15px', color: 'grey.A200', fontWeight: '400', ml: 1 }}>
                  Per Month
                </Typography>
              </Box>
              <Box sx={{ mt: 3 }}>
                <List>
                  <ListItem>
                    <ListItemText sx={{ textAlign: 'center' }} primary={price.member} />
                  </ListItem>
                  <ListItem>
                    <ListItemText sx={{ textAlign: 'center' }} primary={price.device} />
                  </ListItem>
                  <ListItem>
                    <ListItemText sx={{ textAlign: 'center' }} primary={price.storage} />
                  </ListItem>
                  <ListItem>
                    <ListItemText sx={{ textAlign: 'center' }} primary={price.bkp} />
                  </ListItem>
                </List>
              </Box>
              <Button
                variant="contained"
                size={price.btnsize}
                color={price.btncolor}
                sx={{ width: '100%', mt: 4 }}
              >
                Sign Up
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default Pricing;
