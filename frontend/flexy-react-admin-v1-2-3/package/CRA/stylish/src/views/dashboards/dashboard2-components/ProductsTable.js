import React, { useState } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  LinearProgress,
  IconButton,
  Avatar,
  Tooltip,
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import DashboardCard from '../../../components/base-card/DashboardCard';

import img1 from '../../../assets/images/products/s1.jpg';
import img2 from '../../../assets/images/products/s2.jpg';
import img3 from '../../../assets/images/products/s3.jpg';
import img4 from '../../../assets/images/products/s4.jpg';

const items = [
  {
    id: 1,
    imgsrc: img1,
    name: 'Is it good butterscotch ice-cream?',
    tags: 'Ice-Cream, Milk, Powder',
    review: 'good',
    percent: 65,
    earnings: '546,000',
  },
  {
    id: 2,
    imgsrc: img2,
    name: 'Supreme fresh tomato available',
    tags: 'Market, Mall',
    review: 'excellent',
    percent: 98,
    earnings: '780,000',
  },
  {
    id: 3,
    imgsrc: img3,
    name: 'Red color candy from Gucci',
    tags: 'Chocolate, Yummy',
    review: 'average',
    percent: 46,
    earnings: '457,000',
  },
  {
    id: 4,
    imgsrc: img4,
    name: 'Stylish night lamp for night',
    tags: 'Elecric, Wire, Current',
    review: 'poor',
    percent: 23,
    earnings: '125,000',
  },
];

const ProductsTable = () => {
  const [products, setProducts] = useState(items);

  const Capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const deleteHandler = (id) => {
    const updateProducts = products.filter((ind) => ind.id !== id);
    setProducts(updateProducts);
  };
  return (
    <DashboardCard title="Products Performance" subtitle="Latest new products Pending">
      <Box
        sx={{
          overflow: {
            xs: 'auto',
            sm: 'unset',
          },
          mt: -2,
        }}
      >
        <Table
          sx={{
            whiteSpace: {
              xs: 'nowrap',
              sm: 'unset',
            },
          }}
        >
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell
                  sx={{
                    pl: 0,
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src={product.imgsrc}
                      alt={product.imgsrc}
                      sx={{
                        borderRadius: '10px',
                        height: '70px',
                        width: '90px',
                      }}
                    />

                    <Box
                      sx={{
                        ml: 2,
                      }}
                    >
                      <Typography variant="h5">{product.name}</Typography>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {product.tags}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    pl: 0,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                    }}
                  >
                    {Capitalize(product.review)}
                  </Typography>
                  <LinearProgress
                    value={product.percent}
                    variant="determinate"
                    sx={{
                      '& span': {
                        backgroundColor:
                          product.review === 'good'
                            ? (theme) => theme.palette.primary.main
                            : product.review === 'excellent'
                            ? (theme) => theme.palette.success.main
                            : product.review === 'average'
                            ? (theme) => theme.palette.warning.main
                            : product.review === 'poor'
                            ? (theme) => theme.palette.error.main
                            : (theme) => theme.palette.primary.main,
                      },
                    }}
                  />
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                    sx={{
                      mt: 1,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {product.percent}% sold
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6" fontWeight="400">
                    Earnings
                  </Typography>
                  <Typography variant="h5">${product.earnings}</Typography>
                </TableCell>
                <TableCell>
                  <Tooltip title="Delete" placement="top">
                    <IconButton onClick={() => deleteHandler(product.id)}>
                      <FeatherIcon
                        icon="trash"
                        width="18"
                        height="18"
                        sx={{
                          color: (theme) => theme.palette.grey.A200,
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default ProductsTable;
