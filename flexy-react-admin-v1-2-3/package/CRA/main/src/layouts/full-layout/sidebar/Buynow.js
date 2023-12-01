import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import sidebarBuynowsvg from '../../../assets/images/backgrounds/sidebar-buynow-bg.svg';

const Buynow = () => (
  // const customizer = useSelector((state)=> state.CustomizerReducer);

  <Box pb={5} mt={5}>
    <Box
      pl={3}
      pr={3}
      m={1}
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.light,
        borderRadius: '10px',
        overflow: 'hidden',
      }}
      style={{ position: 'relative' }}
    >
      <img src={sidebarBuynowsvg} alt={sidebarBuynowsvg} className="buyNowImg" />
      <Box pb={3} pt={3} sx={{ width: '60%' }}>
        <Typography variant="h4" fontWeight="700" mb={2}>
          Upgrade to Premium
        </Typography>
        <Button
          color="secondary"
          href="https://www.wrappixel.com/templates/flexy-react-material-dashboard-admin/"
          fullWidth
          target="_blank"
          disableElevation
          variant="contained"
        >
          Upgrade
        </Button>
      </Box>
    </Box>
  </Box>
);
export default Buynow;
