import React, { useState } from 'react';
import { Card, Box } from '@mui/material';
import Breadcrumb from '../../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import NoteSidebar from '../../../components/apps/notes/NoteSidebar';
import NoteContent from '../../../components/apps/notes/NoteContent';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Notes',
  },
];

const Notes = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(true);

  return (
    <PageContainer title="Notes ui" description="this is Note page">
      <Breadcrumb title="Note app" items={BCrumb} />
      <Card sx={{ display: 'flex', p: 0 }}>
        <NoteSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        <Box flexGrow={1}>
          <NoteContent toggleNoteSidebar={() => setMobileSidebarOpen(true)} />
        </Box>
      </Card>
    </PageContainer>
  );
};

export default Notes;
