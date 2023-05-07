import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Chip,
  Link,
  Radio,
  MenuItem,
  FormControl,
  Button,
  Rating,
  Divider,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import CircleTwoToneIcon from '@mui/icons-material/CircleTwoTone';
import FeatherIcon from 'feather-icons-react';
import CustomSelect from '../forms/custom-elements/CustomSelect';
import CustomFormLabel from '../forms/custom-elements/CustomFormLabel';

const ProductDetail = () => {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [size, setSize] = React.useState('10');

  const handleChange2 = (event2) => {
    setSize(event2.target.value);
  };

  //   Qty
  const [qty, setQty] = React.useState('10');

  const handleChange3 = (event3) => {
    setQty(event3.target.value);
  };
  // rating
  const [value, setValue] = React.useState(2);
  return (
    <Box>
      {/* stock text */}
      <Box display="flex" alignItems="center">
        <Chip
          label="In Stock"
          color="success"
          sx={{
            borderRadius: '6px',
            backgroundColor: (theme) => theme.palette.success.main,
            pl: '8px',
            pr: '8px',
            pt: '3px',
            pb: '3px',
            color: '#fff',
            height: 'unset',
            mr: '10px',
            '& .MuiChip-label': {
              pl: 0,
              pr: 0,
            },
          }}
        />
        <Typography color="textSecondary" variant="caption" fontWeight="400">
          Men Shoes
        </Typography>
      </Box>
      {/* title */}
      <Typography
        fontWeight="600"
        sx={{
          fontSize: {
            xs: '24px',
            sm: '30px',
            lg: '30px',
          },
          mt: '5px',
        }}
      >
        Nike branding shoes
      </Typography>
      <Typography
        variant="body1"
        fontWeight="400"
        sx={{
          mt: '10px',
          color: (theme) => theme.palette.grey.A200,
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex arcu, tincidunt bibendum
        felis.
      </Typography>

      <Typography
        fontWeight="600"
        sx={{
          fontSize: {
            xs: '24px',
            sm: '30px',
            lg: '30px',
          },
          mt: '20px',
        }}
      >
        $546.00
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          mt: '5px',
        }}
      >
        <Rating
          name="simple-controlled"
          size="small"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <Link
          href="#"
          color="inherit"
          underline="always"
          sx={{
            ml: '5px',
          }}
        >
          236 reviews
        </Link>
      </Box>
      {/* colors */}
      <Box
        display="flex"
        alignItems="center"
        sx={{
          mt: 4,
          mb: 4,
        }}
      >
        <CustomFormLabel
          sx={{
            mt: 0,
          }}
        >
          Colors
        </CustomFormLabel>
        <Box
          sx={{
            ml: 2,
          }}
        >
          <Radio
            checked={selectedValue === 'a'}
            onChange={handleChange}
            icon={<CircleIcon />}
            checkedIcon={<CircleTwoToneIcon />}
            value="a"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'A' }}
            sx={{
              '& .MuiSvgIcon-root': {
                fill: (theme) => theme.palette.primary.main,
              },
            }}
          />
          <Radio
            checked={selectedValue === 'b'}
            onChange={handleChange}
            icon={<CircleIcon />}
            checkedIcon={<CircleTwoToneIcon />}
            value="b"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'B' }}
            sx={{
              '& .MuiSvgIcon-root': {
                fill: (theme) => theme.palette.secondary.main,
              },
            }}
          />
          <Radio
            checked={selectedValue === 'c'}
            onChange={handleChange}
            icon={<CircleIcon />}
            checkedIcon={<CircleTwoToneIcon />}
            value="c"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'C' }}
            sx={{
              '& .MuiSvgIcon-root': {
                fill: (theme) => theme.palette.error.main,
              },
            }}
          />
        </Box>
      </Box>
      {/* sizes */}
      <Divider />
      <Box
        sx={{
          pt: 3,
          pb: 3,
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6} lg={6}>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                mb: {
                  xs: 3,
                  sm: 0,
                  lg: 0,
                },
              }}
            >
              <CustomFormLabel
                htmlFor="demo-simple-select-outlined"
                sx={{
                  mt: 0,
                }}
              >
                Size
              </CustomFormLabel>
              <Box
                sx={{
                  ml: 2,
                  width: '180px',
                }}
              >
                <FormControl variant="outlined" fullWidth>
                  <CustomSelect
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={size}
                    onChange={handleChange2}
                    fullWidth
                    size="small"
                  >
                    <MenuItem value={10}>1</MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
                    <MenuItem value={40}>4</MenuItem>
                    <MenuItem value={50}>5</MenuItem>
                  </CustomSelect>
                </FormControl>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <Box display="flex" alignItems="center">
              <CustomFormLabel
                htmlFor="qty-select-outlined"
                sx={{
                  mt: 0,
                }}
              >
                Qty.
              </CustomFormLabel>
              <Box
                sx={{
                  ml: 2,
                  width: '180px',
                }}
              >
                <FormControl variant="outlined" fullWidth>
                  <CustomSelect
                    labelId="qty-label"
                    id="qty-select-outlined"
                    value={qty}
                    onChange={handleChange3}
                    fullWidth
                    size="small"
                  >
                    <MenuItem value={10}>1</MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
                    <MenuItem value={40}>4</MenuItem>
                    <MenuItem value={50}>5</MenuItem>
                  </CustomSelect>
                </FormControl>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Grid
        container
        spacing={2}
        sx={{
          mt: 2,
        }}
      >
        <Grid item xs={12} sm={6} lg={6}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            sx={{
              pt: '13px',
              pb: '13px',
              display: 'block',
              width: '100%',
              borderRadius: '9px',
            }}
          >
            Buy Now
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            display="flex"
            alignitems="center"
            justifycontent="center"
            sx={{
              pt: '13px',
              pb: '13px',
              width: '100%',
              borderRadius: '9px',
            }}
          >
            <FeatherIcon icon="shopping-cart" width="20" display="flex" alignitems="center" />
            <Box
              component="span"
              sx={{
                ml: 1,
              }}
            >
              Add to Cart
            </Box>
          </Button>
        </Grid>
      </Grid>
      {/* subtext */}
      <Box
        sx={{
          mt: 5,
        }}
      >
        <Typography color="textSecondary" variant="body1" fontWeight="400">
          Dispatched in 2-3 weeks
        </Typography>
        <Link href="/" underline="always" color="inherit">
          Why the longer time for delivery?
        </Link>
      </Box>
    </Box>
  );
};

export default ProductDetail;
