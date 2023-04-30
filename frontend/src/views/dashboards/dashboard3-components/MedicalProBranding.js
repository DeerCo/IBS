import React from 'react';
import {
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  Grid,
  Button,
  Divider,
  Tooltip,
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';

import img1 from '../../../assets/images/users/1.jpg';
import img2 from '../../../assets/images/users/2.jpg';
import img3 from '../../../assets/images/users/3.jpg';
import img4 from '../../../assets/images/users/4.jpg';

import DashboardCard from '../../../components/base-card/DashboardCard';

const options = ['Action', 'Another Action', 'Something else here'];

const MedicalProBranding = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <DashboardCard
      title="MedicalPro Branding"
      subtitle="Branding & Website"
      action={
        <Box>
          <Tooltip title="Action">
            <IconButton
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              size="large"
              aria-label="action"
            >
              <FeatherIcon icon="more-horizontal" />
            </IconButton>
          </Tooltip>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      }
    >
      <Chip
        size="small"
        label="16 APR, 2021"
        sx={{
          backgroundColor: (theme) => theme.palette.primary.light,
          color: (theme) => theme.palette.primary.main,
          borderRadius: '6px',
          pl: 1,
          pr: 1,
          mt: -4,
        }}
      />
      <Box
        sx={{
          mt: 2,
        }}
      >
        <Grid container spacing={0}>
          <Grid
            item
            xs={4}
            lg={4}
            sx={{
              borderRight: '1px solid rgba(0,0,0,0.1)',
              pb: 2,
            }}
          >
            <Typography color="textSecondary" variant="h6" fontWeight="400">
              Due Date
            </Typography>
            <Typography variant="subtitle2" fontWeight="500">
              Oct 23, 2021
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            lg={4}
            sx={{
              borderRight: '1px solid rgba(0,0,0,0.1)',
              pb: 2,
              pl: 1,
            }}
          >
            <Typography color="textSecondary" variant="h6" fontWeight="400">
              Budget
            </Typography>
            <Typography variant="subtitle2" fontWeight="500">
              $98,500
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            lg={4}
            sx={{
              pl: 1,
              pb: 2,
            }}
          >
            <Typography color="textSecondary" variant="h6" fontWeight="400">
              Expense
            </Typography>
            <Typography variant="subtitle2" fontWeight="500">
              $63,000
            </Typography>
          </Grid>
        </Grid>
        <Divider />
      </Box>
      <Box
        sx={{
          pt: 2,
          pb: 3,
        }}
      >
        <Typography variant="h4">Teams</Typography>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            mt: 1,
          }}
        >
          <Chip
            size="small"
            label="Bootstrap"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: '#fff',
              borderRadius: '6px',
              pl: 1,
              pr: 1,
            }}
          />
          <Chip
            size="small"
            label="Angular"
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.main,
              color: '#fff',
              borderRadius: '6px',
              pl: 1,
              pr: 1,
              ml: 1,
            }}
          />
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          pt: 2,
          pb: 2,
        }}
      >
        <Typography variant="h4">Leaders</Typography>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            mt: 1,
          }}
        >
          <Avatar
            src={img1}
            alt={img1}
            sx={{
              width: '35px',
              height: '35px',
            }}
          />
          <Avatar
            src={img2}
            alt={img2}
            sx={{
              width: '35px',
              height: '35px',
              ml: 1,
            }}
          />
          <Avatar
            src={img3}
            alt={img3}
            sx={{
              width: '35px',
              height: '35px',
              ml: 1,
            }}
          />
          <Avatar
            src={img4}
            alt={img4}
            sx={{
              width: '35px',
              height: '35px',
              ml: 1,
            }}
          />
        </Box>
      </Box>
      <Divider />
      <Box
        display="flex"
        alignItems="center"
        sx={{
          pt: 2,
        }}
      >
        <Button variant="contained" color="primary">
          Add
        </Button>
        <Box
          sx={{
            ml: 'auto',
          }}
        >
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            36 Recent Transactions
          </Typography>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default MedicalProBranding;
