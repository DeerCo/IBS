import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Rating } from '@mui/material';

import s5 from '../../assets/images/products/s5.jpg';
import s6 from '../../assets/images/products/s6.jpg';
import s7 from '../../assets/images/products/s7.jpg';
import s8 from '../../assets/images/products/s8.jpg';

const Shopitems = [
  {
    title: 'B Natural Mixed Fruit',
    category: 'Ice-cream shop',
    price: '$50',
    colors: [(theme) => theme.palette.secondary.main, (theme) => theme.palette.primary.main],
    photo: s5,
    id: 5,
    star: [1, 2, 3, 4, 5],
  },
  {
    title: 'Mix Strawberry Candy',
    category: 'Ice-cream shop',
    price: '$25',
    colors: [(theme) => theme.palette.success.main, (theme) => theme.palette.secondary.main],
    photo: s6,
    id: 6,
    star: [1, 2, 3, 4, 5],
  },
  {
    title: 'Wafer cones',
    category: 'Ice-cream shop',
    price: '$15',
    colors: [(theme) => theme.palette.primary.main, (theme) => theme.palette.secondary.main],
    photo: s7,
    id: 7,
    star: [1, 2, 3, 4, 5],
  },
  {
    title: 'Wireless Headphones',
    category: 'Boat Headphones',
    price: '$300',
    colors: [(theme) => theme.palette.error.main, (theme) => theme.palette.warning.main],
    photo: s8,
    id: 8,
    star: [1, 2, 3, 4, 5],
  },
];
const ProductRelated = () => {
  const [value, setValue] = React.useState(2);
  return (
    <Box>
      <Typography
        variant="h2"
        fontWeight="700"
        sx={{
          pl: '15px',
          mt: 5,
          mb: 3,
        }}
      >
        Related Products
      </Typography>
      <Grid container spacing={0}>
        {Shopitems.map((product) => (
          <Grid item xs={12} lg={3} sm={4} display="flex" alignItems="stretch" key={product.title}>
            <Card sx={{ p: 0, width: '100%' }}>
              <img src={product.photo} alt="img" width="100%" />
              <CardContent sx={{ p: 3 }}>
                <Typography variant="caption">{product.category}</Typography>
                <Typography variant="h5">{product.title}</Typography>
                <Box display="flex" alignItems="center" sx={{ mt: '15px' }}>
                  <Typography variant="h5" sx={{ mr: 'auto' }}>
                    {product.price}
                  </Typography>
                  <Rating
                    size="small"
                    name={product.rname}
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductRelated;
