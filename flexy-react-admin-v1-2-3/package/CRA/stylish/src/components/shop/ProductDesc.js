import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Card, CardContent, Tabs, Tab } from '@mui/material';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const ProductDesc = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card
      sx={{
        p: {
          xs: '20px',
          sm: '35px',
          lg: '35px',
        },
      }}
    >
      <CardContent
        sx={{
          p: 0,
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              textColor="secondary"
              allowScrollButtonsMobile
              scrollButtons
              indicatorColor="secondary"
            >
              <Tab
                sx={{
                  textTransform: 'capitalize',
                }}
                label="Description"
                {...a11yProps(0)}
              />
              <Tab
                sx={{
                  textTransform: 'capitalize',
                }}
                label="Reviews"
                {...a11yProps(1)}
              />
              <Tab
                sx={{
                  textTransform: 'capitalize',
                }}
                label="Comments"
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0} component="div">
            <Typography
              fontWeight="500"
              sx={{
                fontSize: {
                  xs: '16px',
                  sm: '24px',
                  lg: '24px',
                },
              }}
            >
              Sed at diam elit. Vivamus tortor odio, pellentesque eu tincidunt a, aliquet sit amet
              lorem pellentesque eu tincidunt a, aliquet sit amet lorem.
            </Typography>
            <Typography
              color="textSecondary"
              sx={{
                mt: 4,
              }}
            >
              Cras eget elit semper, congue sapien id, pellentesque diam. Nulla faucibus diam nec
              fermentum ullamcorper. Praesent sed ipsum ut augue vestibulum malesuada. Duis vitae
              volutpat odio. Integer sit amet elit ac justo sagittis dignissim.
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
              fontWeight="400"
              sx={{
                mt: 4,
              }}
            >
              Vivamus quis metus in nunc semper efficitur eget vitae diam. Proin justo diam,
              venenatis sit amet eros in, iaculis auctor magna. Pellentesque sit amet accumsan urna,
              sit amet pretium ipsum. Fusce condimentum venenatis mauris et luctus. Vestibulum ante
              ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography
              fontWeight="500"
              sx={{
                fontSize: {
                  xs: '16px',
                  sm: '24px',
                  lg: '24px',
                },
              }}
            >
              Vivamus tortor odio, pellentesque eu tincidunt a, aliquet sit amet lorem pellentesque
              eu tincidunt a, aliquet sit amet lorem.
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
              fontWeight="400"
              sx={{
                mt: 4,
              }}
            >
              Cras eget elit semper, congue sapien id, pellentesque diam. Nulla faucibus diam nec
              fermentum ullamcorper. Praesent sed ipsum ut augue vestibulum malesuada. Duis vitae
              volutpat odio. Integer sit amet elit ac justo sagittis dignissim.
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
              fontWeight="400"
              sx={{
                mt: 4,
              }}
            >
              Quis metus in nunc semper efficitur eget vitae diam. Proin justo diam, venenatis sit
              amet eros in, iaculis auctor magna. Pellentesque sit amet accumsan urna, sit amet
              pretium ipsum. Fusce condimentum venenatis mauris et luctus. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia curae;
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography
              fontWeight="500"
              sx={{
                fontSize: {
                  xs: '16px',
                  sm: '24px',
                  lg: '24px',
                },
              }}
            >
              Vivamus tortor odio, pellentesque eu tincidunt a, aliquet sit amet lorem pellentesque
              eu tincidunt a, aliquet sit amet lorem.
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
              fontWeight="400"
              sx={{
                mt: 4,
              }}
            >
              Cras eget elit semper, congue sapien id, pellentesque diam. Nulla faucibus diam nec
              fermentum ullamcorper. Praesent sed ipsum ut augue vestibulum malesuada. Duis vitae
              volutpat odio. Integer sit amet elit ac justo sagittis dignissim.
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
              fontWeight="400"
              sx={{
                mt: 4,
              }}
            >
              Vivamus quis metus in nunc semper efficitur eget vitae diam. Proin justo diam,
              venenatis sit amet eros in, iaculis auctor magna. Pellentesque sit amet accumsan urna,
              sit amet pretium ipsum. Fusce condimentum venenatis mauris et luctus. Vestibulum ante
              ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
            </Typography>
          </TabPanel>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductDesc;
