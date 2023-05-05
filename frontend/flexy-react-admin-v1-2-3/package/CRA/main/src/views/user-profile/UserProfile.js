import React from 'react';
import { Grid } from '@mui/material';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import CoverCard from '../../components/profile/CoverCard';
import IntroCard from '../../components/profile/IntroCard';
import PhotosCard from '../../components/profile/PhotosCard';
import NewPost from '../../components/profile/NewPost';
import ImgPost from '../../components/profile/ImgPost';
import TypographyPost from '../../components/profile/TypographyPost';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'User Profile',
  },
];

const UserProfile = () => {
  return (
    <PageContainer title="User Profile" description="this is User Profile page">
      {/* breadcrumb */}
      <Breadcrumb title="User Profile" items={BCrumb} />
      {/* end breadcrumb */}
      <CoverCard />
      <Grid container spacing={0}>
        <Grid item sm={12} lg={4} xs={12}>
          <IntroCard />
          <PhotosCard />
        </Grid>
        <Grid item sm={12} lg={8} xs={12}>
          <NewPost />
          <ImgPost />
          <TypographyPost />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;
