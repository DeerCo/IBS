import React from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Grid,
  Button,
  Divider,
  Tooltip,
} from '@mui/material';
import PropTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';

const options = ['Action', 'Another Action', 'Something else here'];

const BasePost = ({ img, username, time, children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card
      sx={{
        p: 0,
        mb: 4,
      }}
    >
      <CardContent
        sx={{
          p: '30px 30px 15px',
        }}
      >
        <Box display="flex" alignItems="center">
          <Avatar
            src={img}
            sx={{
              borderRadius: '50%',
              width: '50px',
              height: '50px',
            }}
          />
          <Box
            sx={{
              ml: 2,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{
                whiteSpace: 'nowrap',
              }}
            >
              {username}
            </Typography>
            <Typography color="textSecondary" variant="h6" fontWeight="400">
              {time}
            </Typography>
          </Box>
          <Box
            sx={{
              ml: 'auto',
            }}
          >
            <Tooltip title="Action">
              <IconButton
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <FeatherIcon icon="more-horizontal" width="18" />
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
        </Box>
      </CardContent>
      {children}
      <CardContent
        sx={{
          pr: '35px',
          pl: '35px',
        }}
      >
        <Divider style={{ marginTop: '15px' }} />
        <Box
          sx={{
            pt: 2,
          }}
        >
          <Grid container spacing={0}>
            <Grid item sm={4} xs={4} lg={4}>
              <Button>
                <Typography
                  display="flex"
                  alignItems="center"
                  sx={{
                    color: (theme) => theme.palette.grey.A200,
                  }}
                >
                  <FeatherIcon icon="thumbs-up" width="20" />
                </Typography>
                <Typography
                  component="span"
                  color="textSecondary"
                  fontWeight="500"
                  sx={{
                    ml: 1,
                    display: {
                      xs: 'none',
                      sm: 'block',
                      lg: 'block',
                    },
                  }}
                >
                  React
                </Typography>
              </Button>
            </Grid>
            <Grid
              item
              sm={4}
              xs={4}
              lg={4}
              sx={{
                textAlign: 'center',
              }}
            >
              <Button>
                <Typography
                  display="flex"
                  alignItems="center"
                  sx={{
                    color: (theme) => theme.palette.grey.A200,
                  }}
                >
                  <FeatherIcon icon="message-square" width="20" />
                </Typography>
                <Typography
                  component="span"
                  color="textSecondary"
                  fontWeight="500"
                  sx={{
                    ml: 1,
                    display: {
                      xs: 'none',
                      sm: 'block',
                      lg: 'block',
                    },
                  }}
                >
                  Comment
                </Typography>
              </Button>
            </Grid>
            <Grid
              item
              sm={4}
              xs={4}
              lg={4}
              sx={{
                textAlign: 'center',
              }}
            >
              <Button>
                <Typography
                  display="flex"
                  alignItems="center"
                  sx={{
                    color: (theme) => theme.palette.grey.A200,
                  }}
                >
                  <FeatherIcon icon="share-2" width="20" />
                </Typography>
                <Typography
                  component="span"
                  color="textSecondary"
                  fontWeight="500"
                  sx={{
                    ml: 1,
                    display: {
                      xs: 'none',
                      sm: 'block',
                      lg: 'block',
                    },
                  }}
                >
                  Share
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

BasePost.propTypes = {
  img: PropTypes.string,
  username: PropTypes.string,
  time: PropTypes.any,
  children: PropTypes.node,
};

export default BasePost;
