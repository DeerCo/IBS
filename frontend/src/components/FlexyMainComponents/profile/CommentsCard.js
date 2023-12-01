import React from 'react';
import { Box, Typography, Button, Avatar, Link, Divider, Tooltip } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import img1 from '../../assets/images/users/1.jpg';
import img2 from '../../assets/images/users/2.jpg';
import img3 from '../../assets/images/users/3.jpg';

const LinkStyles1 = {
  ml: {
    xs: 0,
    sm: 2,
    lg: 2,
  },
  mt: {
    xs: 2,
    sm: 0,
    lg: 0,
  },
};

const CommentsCard = () => (
  <Box
    sx={{
      p: '35px',
    }}
  >
    <Typography
      variant="h4"
      sx={{
        borderTop: '1px solid rgba(0,0,0,0.1)',
        pt: 2,
      }}
    >
      Comments (6)
    </Typography>

    <Box
      display="flex"
      alignItems="flex-start"
      sx={{
        mt: 3,
        pb: 3,
      }}
    >
      <Avatar
        src={img2}
        sx={{
          width: '50px',
          height: '50px',
        }}
      />
      <Box
        sx={{
          ml: 2,
        }}
      >
        <Typography variant="subtitle2" fontWeight="600">
          Bianca Anderson
          <Typography
            component="span"
            color="textSecondary"
            sx={{
              fontSize: '14px',
              ml: 1,
            }}
          >
            This read was amazing! It was so deep that i could easily apply those things to the work
            i am doing and will be helpful.
          </Typography>
        </Typography>
        <Box
          sx={{
            mt: 2,
            display: {
              xs: 'block',
              lg: 'flex',
              sm: 'flex',
            },
            alignItems: 'center',
          }}
        >
          <Box display="flex" alignItems="center">
            <Tooltip title="Like" placement="top">
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  minWidth: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  p: 0,
                }}
              >
                <FeatherIcon icon="thumbs-up" width="15" />
              </Button>
            </Tooltip>
            <Typography
              component="span"
              variant="h6"
              fontWeight="600"
              sx={{
                ml: 1,
              }}
            >
              315
            </Typography>
          </Box>

          <Link underline="none" href="/" color="textSecondary" sx={LinkStyles1}>
            <Typography variant="h6" fontWeight="500">
              React
            </Typography>
          </Link>
          <Link
            underline="none"
            href="/"
            color="textSecondary"
            sx={{
              ml: 2,
            }}
          >
            <Typography variant="h6" fontWeight="500">
              Reply
            </Typography>
          </Link>
          <Typography
            component="span"
            color="textSecondary"
            sx={{
              fontSize: '14px',
              ml: 2,
            }}
          >
            1 hour ago
          </Typography>
        </Box>
      </Box>
    </Box>
    <Divider />
    {/* 2 */}
    <Box
      display="flex"
      alignItems="flex-start"
      sx={{
        mt: 3,
        pb: 3,
        pl: {
          xs: 1,
          sm: 7,
          lg: 7,
        },
      }}
    >
      <Avatar
        src={img3}
        sx={{
          width: '50px',
          height: '50px',
        }}
      />
      <Box
        sx={{
          ml: 2,
        }}
      >
        <Typography variant="subtitle2" fontWeight="600">
          Bianca Anderson
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            sx={{
              ml: 1,
            }}
          >
            This read was amazing! It was so deep that i could easily apply those things to the work
            i am doing and will be helpful.
          </Typography>
        </Typography>
        <Box
          sx={{
            mt: 2,
            display: {
              xs: 'block',
              lg: 'flex',
              sm: 'flex',
            },
            alignItems: 'center',
          }}
        >
          <Box display="flex" alignItems="center">
            <Tooltip title="Love" placement="top">
              <Button
                variant="contained"
                color="error"
                sx={{
                  minWidth: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  p: 0,
                }}
              >
                <FeatherIcon icon="heart" width="15" />
              </Button>
            </Tooltip>
            <Typography
              component="span"
              variant="h6"
              fontWeight="600"
              sx={{
                ml: 1,
              }}
            >
              315
            </Typography>
          </Box>

          <Link underline="none" href="/" color="textSecondary" sx={LinkStyles1}>
            <Typography variant="h6" fontWeight="500">
              React
            </Typography>
          </Link>
          <Link
            underline="none"
            href="/"
            color="textSecondary"
            sx={{
              ml: 2,
            }}
          >
            <Typography variant="h6" fontWeight="500">
              Reply
            </Typography>
          </Link>
          <Typography
            component="span"
            color="textSecondary"
            sx={{
              fontSize: '14px',
              ml: 2,
              whiteSpace: 'nowrap',
            }}
          >
            1 hour ago
          </Typography>
        </Box>
      </Box>
    </Box>
    <Divider />
    {/* 3 */}
    <Box
      display="flex"
      alignItems="flex-start"
      sx={{
        mt: 3,
      }}
    >
      <Avatar
        src={img1}
        sx={{
          width: '50px',
          height: '50px',
        }}
      />
      <Box
        sx={{
          ml: 2,
        }}
      >
        <Typography variant="subtitle2" fontWeight="600">
          Bianca Anderson
          <Typography
            component="span"
            color="textSecondary"
            sx={{
              fontSize: '14px',
              ml: 1,
            }}
          >
            This read was amazing! It was so deep that i could easily apply those things to the work
            i am doing and will be helpful.
          </Typography>
        </Typography>
        <Box
          sx={{
            mt: 2,
            display: {
              xs: 'block',
              lg: 'flex',
              sm: 'flex',
            },
            alignItems: 'center',
          }}
        >
          <Box display="flex" alignItems="center">
            <Tooltip title="Like" placement="top">
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  minWidth: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  p: 0,
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
                  minWidth: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  p: 0,
                }}
              >
                <FeatherIcon icon="smile" width="15" />
              </Button>
            </Tooltip>
            <Typography
              component="span"
              variant="h6"
              fontWeight="600"
              sx={{
                ml: 1,
              }}
            >
              315
            </Typography>
          </Box>

          <Link underline="none" href="/" color="textSecondary" sx={LinkStyles1}>
            <Typography variant="h6" fontWeight="500">
              React
            </Typography>
          </Link>
          <Link
            underline="none"
            href="/"
            color="textSecondary"
            sx={{
              ml: 2,
            }}
          >
            <Typography variant="h6" fontWeight="500">
              Reply
            </Typography>
          </Link>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            sx={{
              ml: 2,
              whiteSpace: 'nowrap',
            }}
          >
            1 hour ago
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default CommentsCard;
