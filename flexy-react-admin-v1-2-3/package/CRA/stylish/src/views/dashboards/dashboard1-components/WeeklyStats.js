import React from 'react';
import {
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  Tooltip,
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/base-card/DashboardCard';

const options = ['Action', 'Another Action', 'Something else here'];

const weeks = [
  {
    avatarbg: 'secondary.main',
    icon: 'shopping-cart',
    title: 'Top Sales',
    subtitle: 'Johnathan Doe',
    profit: '+68%',
  },
  {
    avatarbg: 'warning.main',
    icon: 'star',
    title: 'Best Seller',
    subtitle: 'MaterialPro Admin',
    profit: '+68%',
  },
  {
    avatarbg: 'success.main',
    icon: 'message-square',
    title: 'Most Commented',
    subtitle: 'Ample Admin',
    profit: '+68%',
  },
];

const WeeklyStats = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const primary = theme.palette.primary.main;

  // chart
  const optionsweekstats = {
    chart: {
      height: 145,
      type: 'area',
      foreColor: '#adb0bb',
      fontFamily: 'DM sans',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    colors: [primary],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'solid',
      opacity: 0.05,
    },
    tooltip: {
      theme: 'dark',
    },
    grid: {
      show: false,
      padding: {
        right: 0,
        left: 0,
      },
    },
  };
  const seriesweekstats = [
    {
      name: 'Weekly Stats',
      data: [40, 60, 50, 65],
    },
  ];
  return (
    <DashboardCard
      title="Weekly Stats"
      subtitle="Average sales"
      custompadding="0"
      customheaderpadding="30px"
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
      {/* List */}
      <Box
        sx={{
          pl: '30px',
          pr: '30px',
        }}
      >
        {weeks.map((week) => (
          <Box
            key={week.title}
            display="flex"
            alignItems="center"
            sx={{
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                backgroundColor: week.avatarbg,
                color: '#fff',
              }}
              width="45"
            >
              <FeatherIcon icon={week.icon} width="20" />
            </Avatar>
            <Box
              sx={{
                ml: 2,
              }}
            >
              <Typography variant="h5" fontWeight="700">
                {week.title}
              </Typography>

              <Typography color="textSecondary" variant="h6" fontWeight="400">
                {week.subtitle}
              </Typography>
            </Box>
            <Box
              sx={{
                ml: 'auto',
              }}
            >
              {/* <WeekList> */}
              <Chip
                color="default"
                size="small"
                sx={{
                  borderRadius: '6px',
                  color: () => theme.palette.grey.A400,
                }}
                label={week.profit}
              />
              {/* </WeekList> */}
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          mt: 5,
          pt: 1,
        }}
      >
        <Chart options={optionsweekstats} series={seriesweekstats} type="area" height="160" />
      </Box>
    </DashboardCard>
  );
};

export default WeeklyStats;
