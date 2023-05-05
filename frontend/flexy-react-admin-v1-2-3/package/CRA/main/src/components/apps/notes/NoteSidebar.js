import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, useMediaQuery } from '@mui/material';
import NoteList from './NoteList';

const drawerWidth = 260;

const NoteSidebar = ({ isMobileSidebarOpen, onSidebarClose }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  if (lgUp) {
    return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: 1,
          [`& .MuiDrawer-paper`]: { position: 'relative' },
        }}
        variant="permanent"
      >
        <NoteList />
      </Drawer>
    );
  }
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        zIndex: 1,
        [`& .MuiDrawer-paper`]: {
          width: 290,
          paddingTop: '70px',
        },
      }}
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
    >
      <NoteList />
    </Drawer>
  );
};

NoteSidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool.isRequired,
  onSidebarClose: PropTypes.func.isRequired,
};

export default NoteSidebar;
