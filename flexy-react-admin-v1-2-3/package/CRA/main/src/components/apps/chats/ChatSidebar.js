import React from 'react';
import { Drawer, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import ChatListing from './ChatListing';

const drawerWidth = 240;

const ChatSidebar = ({ isMobileSidebarOpen, onSidebarClose }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  if (lgUp) {
    return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { position: 'relative' },
        }}
        variant="permanent"
      >
        <ChatListing />
      </Drawer>
    );
  }
  return (
    <Drawer
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      sx={{ zIndex: 1, [`& .MuiDrawer-paper`]: { paddingTop: '70px' } }}
    >
      <ChatListing />
    </Drawer>
  );
};

ChatSidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
};

export default ChatSidebar;
