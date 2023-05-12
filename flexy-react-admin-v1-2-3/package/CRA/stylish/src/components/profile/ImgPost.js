import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Link,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import CommentsCard from './CommentsCard';
import img1 from '../../assets/images/users/user2.jpg';
import img2 from '../../assets/images/backgrounds/post-img.jpg';

const options = ['Action', 'Another Action', 'Something else here'];

const ImgPost = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Card
        sx={{
          p: 0,
        }}
      >
        <CardContent
          sx={{
            p: '30px 30px 15px',
          }}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              src={img1}
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
                Julia Roberts
              </Typography>
              <Typography color="textSecondary" variant="h6" fontWeight="400">
                38 minutes ago
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
        <CardContent
          sx={{
            p: '30px',
            pt: 0,
          }}
        >
          <Typography
            color="textSecondary"
            variant="h5"
            fontWeight="400"
            sx={{
              mt: 2,
            }}
          >
            How you can become kickass web developer in 2021?{' '}
            <Link href="/" underline="none">
              #web development trends
            </Link>
            <Link
              href="/"
              underline="none"
              sx={{
                ml: 1,
              }}
            >
              #web trends
            </Link>{' '}
            check out -
            <Typography
              component="span"
              fontWeight="500"
              sx={{
                color: (theme) =>
                  `${
                    theme.palette.mode === 'dark' ? theme.palette.grey.A200 : 'rgba(0, 0, 0, 0.87)'
                  }`,
              }}
            >
              {' '}
              https://www.wrappixel.com
            </Typography>
          </Typography>
        </CardContent>

        <img srcSet={`${img2} 1x, ${img2} 2x`} alt={img2} width="100%" />
        <Box
          sx={{
            display: {
              sm: 'flex',
              xs: 'block',
              lg: 'flex',
            },
            alignItems: 'center',
            pl: '35px',
            pr: '35px',
            pt: '20px',
          }}
        >
          <Box display="flex" alignItems="center">
            <Tooltip title="Like" placement="top">
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  minWidth: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  p: 0,
                  mr: '-5px',
                }}
              >
                <FeatherIcon icon="thumbs-up" width="15" />
              </Button>
            </Tooltip>
            <Tooltip title="React" placement="top">
              <Button
                variant="contained"
                color="warning"
                sx={{
                  minWidth: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  mr: '-5px',
                  p: 0,
                }}
              >
                <FeatherIcon icon="smile" width="15" />
              </Button>
            </Tooltip>
            <Tooltip title="Love" placement="top">
              <Button
                variant="contained"
                color="error"
                sx={{
                  minWidth: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  ml: '-5px',
                  p: 0,
                }}
              >
                <FeatherIcon icon="heart" width="15" />
              </Button>
            </Tooltip>
            <Typography
              variant="h6"
              fontWeight="600"
              sx={{
                ml: 1,
              }}
            >
              315
            </Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            sx={{
              ml: 'auto',
            }}
          >
            <Link href="/" color="inherit" underline="none">
              <Typography variant="h6" fontWeight="600">
                6 Comments
              </Typography>
            </Link>
            <Link
              href="/"
              color="inherit"
              underline="none"
              sx={{
                ml: 2,
              }}
            >
              <Typography variant="h6" fontWeight="600">
                2 Shares
              </Typography>
            </Link>
          </Box>
        </Box>
        <CommentsCard />
      </Card>
    </Box>
  );
};

export default ImgPost;
