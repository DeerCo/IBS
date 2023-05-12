import React, { useState } from 'react';
import { Card, Divider, Box } from '@mui/material';
import Breadcrumb from '../../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ChatSidebar from '../../../components/apps/chats/ChatSidebar';
import ChatContent from '../../../components/apps/chats/ChatContent';
import ChatMsgSent from '../../../components/apps/chats/ChatMsgSent';

const Chats = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(true);

  return (
    <PageContainer title="Chat ui" description="this is Chat page">
      <Breadcrumb title="Chat app" subtitle="Messenger" />
      <Card sx={{ display: 'flex', p: 0 }}>
        <ChatSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        <Box flexGrow={1}>
          <ChatContent toggleChatSidebar={() => setMobileSidebarOpen(true)} />
          <Divider />
          <ChatMsgSent />
        </Box>
      </Card>
    </PageContainer>
  );
};

export default Chats;
