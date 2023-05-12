import React from 'react';
import { Box, Grid, Card, Typography, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import Breadcrumb from '../../../layouts/full-layout/breadcrumb/Breadcrumb';
import Shopitems from './data';
import PageContainer from '../../../components/container/PageContainer';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Shop',
  },
];
const ShopPage = () => (
  <PageContainer title="Shop List" description="this is Shop List page">
    {/* breadcrumb */}
    <Breadcrumb title="Shop" items={BCrumb} />

    <Grid container spacing={0}>
      {Shopitems.map((product) => (
        <Grid item xs={12} lg={3} sm={4} display="flex" alignItems="stretch" key={product.id}>
          <Card sx={{ p: 0, width: '100%' }}>
            <img src={product.photo} alt="img" width="100%" />
            <CardContent sx={{ p: 3 }}>
              <Typography variant="caption">{product.category}</Typography>
              <Typography
                component={Link}
                to="/shop/shop-detail"
                fontWeight="500"
                sx={{
                  display: 'block',
                  textDecoration: 'none',
                  color: (theme) =>
                    `${
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey.A200
                        : 'rgba(0, 0, 0, 0.87)'
                    }`,
                }}
              >
                {product.title}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  mt: '15px',
                }}
              >
                <Typography variant="h5" sx={{ mr: 'auto' }}>
                  {product.price}
                </Typography>
                {product.star.map((index) => (
                  <FeatherIcon
                    icon="star"
                    key={index}
                    size="14"
                    style={{ fill: '#fdd43f', stroke: '#fdd43f' }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </PageContainer>
);

export default ShopPage;
