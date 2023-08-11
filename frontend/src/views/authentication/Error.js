import React, { useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import PageContainer from '../../components/FlexyMainComponents/container/PageContainer';

const Error = () => {
  const navigate = useNavigate();

    useEffect(() => {
        navigate('/login')
    }, []);

  return (
    <PageContainer title="Error" description="this is Error page">
      <Box
        display="flex"
        flexDirection="column"
        height="100vh"
        textAlign="center"
        justifyContent="center"
        sx={{ backgroundColor: '#e4f5ff' }}
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            variant="h1"
            sx={{
              pt: 2,
              color: (theme) =>
                `${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(0, 0, 0, 0.87)'}`,
            }}
          >
            404
          </Typography>
          <Typography
            align="center"
            variant="h4"
            sx={{
              pt: 1,
              pb: 3,
              color: (theme) =>
                `${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(0, 0, 0, 0.87)'}`,
            }}
          >
            This page could not be found.
          </Typography>
          <Button color="primary" variant="contained" disableElevation
                  onClick={()=>{navigate('/home')}}>
            Back to Login
          </Button>
        </Container>
      </Box>
    </PageContainer>
  );
}

export default Error;
