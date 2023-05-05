import React from 'react';
import { Typography, IconButton, Menu, MenuItem, Button, Box, Tooltip } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import DashboardCard from '../../../components/base-card/DashboardCard';
import background2x from '../../../assets/images/backgrounds/blog-bg-2x.jpg';

const options = ['Action', 'Another Action', 'Something else here'];

const BlogCard = () => {
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
      title="Daily Activities"
      subtitle="Overview of Years"
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
      <img srcSet={`${background2x} 1x, ${background2x} 2x`} alt="img" width="100%" />

      <Typography
        variant="h4"
        sx={{
          mt: 4,
        }}
      >
        React 18 coming soon!
      </Typography>
      <Typography color="textSecondary" variant="subtitle1">
        By Johnathan Doe
      </Typography>

      <Typography
        color="textSecondary"
        sx={{
          fontSize: '14px',
          mt: 2,
        }}
      >
        This will be the small description for the news you have shown here. There could be some
        great info.
      </Typography>
      <Button
        sx={{
          mt: 4,
        }}
        variant="contained"
        color="primary"
      >
        Read More
      </Button>
    </DashboardCard>
  );
};

export default BlogCard;
