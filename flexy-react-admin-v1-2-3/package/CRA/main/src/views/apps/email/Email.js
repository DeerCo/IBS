import React, { useState } from 'react';
import { Card, Button, Divider, Box, Drawer, useMediaQuery } from '@mui/material';
import Breadcrumb from '../../../layouts/full-layout/breadcrumb/Breadcrumb';
import EmailLists from '../../../components/apps/email/EmailList';
import EmailSidebar from '../../../components/apps/email/EmailSidebar';
import EmailActions from '../../../components/apps/email/EmailActions';
import EmailSearch from '../../../components/apps/email/EmailSearch';
import EmailContent from '../../../components/apps/email/EmailContent';
import PageContainer from '../../../components/container/PageContainer';

const drawerWidth = 240;
const secdrawerWidth = 320;

const Email = () => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <PageContainer title="Email App" description="this is email page">
      <Breadcrumb title="Email app" subtitle="Look at Inbox" />

      <Card sx={{ display: 'flex', p: 0 }}>
        {/* Left Part */}
        {lgUp ? (
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              display: { xs: 'none', zIndex: 0, lg: 'block' },
              [`& .MuiDrawer-paper`]: { position: 'relative' },
            }}
            variant="permanent"
          >
            <EmailSidebar />
          </Drawer>
        ) : (
          <Drawer
            open={isLeftSidebarOpen}
            onClose={() => setLeftSidebarOpen(false)}
            sx={{
              width: drawerWidth,
              [`& .MuiDrawer-paper`]: { width: drawerWidth },
              flexShrink: 0,
            }}
            variant="temporary"
          >
            <EmailSidebar />
          </Drawer>
        )}
        {/* Middle Part */}
        <Box
          sx={{
            minWidth: secdrawerWidth,
            width: { xs: '100%', md: secdrawerWidth, lg: secdrawerWidth },
            flexShrink: 0,
          }}
        >
          <EmailSearch onClick={() => setLeftSidebarOpen(true)} />
          <Divider />
          <EmailActions />
          <Divider />
          <EmailLists showrightSidebar={() => setRightSidebarOpen(true)} />
        </Box>

        {/* Right Part */}
        {mdUp ? (
          <Drawer
            anchor="right"
            variant="permanent"
            sx={{
              zIndex: 0,
              flex: 'auto',
              [`& .MuiDrawer-paper`]: { position: 'relative' },
            }}
          >
            <Box sx={{ p: 3 }}>
              <EmailContent />
            </Box>
          </Drawer>
        ) : (
          <Drawer
            anchor="right"
            open={isRightSidebarOpen}
            onClose={() => setRightSidebarOpen(false)}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: '85%' },
            }}
            variant="temporary"
          >
            <Box sx={{ p: 3 }}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => setRightSidebarOpen(false)}
                sx={{ mb: 3, display: { xs: 'block', md: 'none', lg: 'none' } }}
              >
                {' '}
                Back{' '}
              </Button>
              <EmailContent />
            </Box>
          </Drawer>
        )}
      </Card>
    </PageContainer>
  );
};

export default Email;
