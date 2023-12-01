import React from 'react';
import { Card, CardContent, Avatar, Typography, Checkbox, Box, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';

const BaseFeed = ({ img, username, time, children }) => {
  return (
    <Card
      sx={{
        mb: 4,
      }}
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            mb: 3,
          }}
        >
          <Avatar
            src={img}
            sx={{
              borderRadius: '10px',
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
        </Box>
        {children}
        <Box
          display="flex"
          alignItems="center"
          sx={{
            mt: 3,
          }}
        >
          <Tooltip title="Like">
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="likes"
              color="error"
              size="small"
              sx={{
                mr: 1,
              }}
            />
          </Tooltip>
          <Tooltip title="Comment">
            <Checkbox
              icon={<CommentIcon />}
              checkedIcon={<CommentIcon />}
              name="share"
              color="secondary"
              size="small"
              sx={{
                mr: 1,
              }}
            />
          </Tooltip>
          <Tooltip title="Share">
            <Checkbox
              icon={<ShareIcon />}
              checkedIcon={<ShareIcon />}
              name="send"
              color="secondary"
              size="small"
              sx={{
                mr: 1,
              }}
            />
          </Tooltip>
          <Box
            sx={{
              ml: 'auto',
            }}
          >
            <Tooltip title="Saved">
              <Checkbox
                icon={<BookmarkBorderIcon />}
                checkedIcon={<BookmarkIcon />}
                name="save"
                color="default"
                size="small"
              />
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

BaseFeed.propTypes = {
  img: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  time: PropTypes.any.isRequired,
  children: PropTypes.node.isRequired,
};

export default BaseFeed;
