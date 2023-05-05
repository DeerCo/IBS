import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  TextField,
  Grid,
  Divider,
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import img1 from '../../assets/images/users/user2.jpg';

const NewPost = () => (
  <Card
    sx={{
      pb: 0,
      mb: 4,
    }}
  >
    <CardContent
      sx={{
        pb: 0,
      }}
    >
      <Grid container spacing={0}>
        <Grid item sm={2} lg={1} xs={12}>
          <Avatar
            src={img1}
            alt={img1}
            sx={{
              width: '50px',
              height: '50px',
            }}
          />
        </Grid>
        <Grid
          item
          sm={10}
          lg={11}
          xs={12}
          sx={{
            mt: {
              xs: 2,
              sm: 0,
              lg: 0,
            },
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            placeholder="What would you like to post ?"
            id="add-new-post"
            inputProps={{ 'aria-label': 'What would you like to post ?' }}
            sx={{
              ml: 1,
            }}
          />
        </Grid>
      </Grid>
      <Divider style={{ marginTop: '30px' }} />
      <Box
        sx={{
          pt: 3,
        }}
      >
        <Grid container spacing={0}>
          <Grid
            item
            sm={4}
            lg={4}
            xs={12}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              display="flex"
              alignitems="center"
              sx={{
                mt: {
                  xs: 1,
                  sm: 0,
                  lg: 0,
                },
              }}
              color="error"
            >
              <Typography display="flex" alignItems="center">
                <FeatherIcon icon="video" width="20" />
                <Typography
                  component="span"
                  fontWeight="500"
                  sx={{
                    color: (theme) =>
                      `${
                        theme.palette.mode === 'dark'
                          ? theme.palette.grey.A200
                          : 'rgba(0, 0, 0, 0.87)'
                      }`,
                    ml: 1,
                  }}
                >
                  Live Video
                </Typography>
              </Typography>
            </Button>
          </Grid>
          <Grid
            item
            sm={4}
            lg={4}
            xs={12}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              display="flex"
              alignitems="center"
              sx={{
                mt: {
                  xs: 1,
                  sm: 0,
                  lg: 0,
                },
              }}
              color="success"
            >
              <Typography display="flex" alignItems="center">
                <FeatherIcon icon="camera" width="20" />
                <Typography
                  component="span"
                  fontWeight="500"
                  sx={{
                    color: (theme) =>
                      `${
                        theme.palette.mode === 'dark'
                          ? theme.palette.grey.A200
                          : 'rgba(0, 0, 0, 0.87)'
                      }`,
                    ml: 1,
                  }}
                >
                  Photo / Video
                </Typography>
              </Typography>
            </Button>
          </Grid>
          <Grid
            item
            sm={4}
            lg={4}
            xs={12}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              display="flex"
              alignitems="center"
              sx={{
                mt: {
                  xs: 1,
                  sm: 0,
                  lg: 0,
                },
              }}
              color="primary"
            >
              <Typography display="flex" alignItems="center">
                <FeatherIcon icon="file" width="20" />
                <Typography
                  component="span"
                  fontWeight="500"
                  sx={{
                    color: (theme) =>
                      `${
                        theme.palette.mode === 'dark'
                          ? theme.palette.grey.A200
                          : 'rgba(0, 0, 0, 0.87)'
                      }`,
                    ml: 1,
                  }}
                >
                  Article / Post
                </Typography>
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </CardContent>
  </Card>
);

export default NewPost;
