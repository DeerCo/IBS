import React from 'react';
import { Grid, Box, Card, CardContent, Typography, Button, Avatar } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import profilecover from '../../assets/images/backgrounds/profilebg.jpg';
import userimg from '../../assets/images/users/user2.jpg';

const CoverCard = () => (
  <Card
    sx={{
      padding: '0',
    }}
  >
    <img srcSet={`${profilecover} 1x, ${profilecover} 2x`} alt={profilecover} width="100%" />
    <CardContent
      sx={{
        pt: '24px',
        pb: '28px',
      }}
    >
      <Grid container spacing={0}>
        <Grid
          item
          lg={4}
          sm={12}
          xs={12}
          sx={{
            order: {
              xs: '2',
              sm: '2',
              lg: '1',
            },
          }}
        >
          <Grid
            container
            spacing={0}
            sx={{
              mt: {
                xs: 1,
              },
              mb: {
                xs: 1,
              },
            }}
          >
            <Grid
              item
              lg={4}
              sm={4}
              xs={4}
              sx={{
                textAlign: 'center',
              }}
            >
              <Typography
                sx={{
                  color: (theme) => theme.palette.grey.A200,
                }}
              >
                <FeatherIcon icon="file-text" width="20" />
              </Typography>
              <Typography
                variant="h4"
                fontWeight="600"
                sx={{
                  lineHeight: '1.2',
                }}
              >
                938
              </Typography>
              <Typography
                color="textSecondary"
                variant="h5"
                fontWeight="400"
                sx={{
                  lineHeight: '1.2',
                }}
              >
                Posts
              </Typography>
            </Grid>
            <Grid
              item
              lg={4}
              sm={4}
              xs={4}
              sx={{
                textAlign: 'center',
              }}
            >
              <Typography
                sx={{
                  color: (theme) => theme.palette.grey.A200,
                }}
              >
                <FeatherIcon icon="user-check" width="20" />
              </Typography>
              <Typography
                variant="h4"
                fontWeight="600"
                sx={{
                  lineHeight: '1.2',
                }}
              >
                3,586
              </Typography>
              <Typography
                color="textSecondary"
                variant="h5"
                fontWeight="400"
                sx={{
                  lineHeight: '1.2',
                }}
              >
                Followers
              </Typography>
            </Grid>
            <Grid
              item
              lg={4}
              sm={4}
              xs={4}
              sx={{
                textAlign: 'center',
              }}
            >
              <Typography
                sx={{
                  color: (theme) => theme.palette.grey.A200,
                }}
              >
                <FeatherIcon icon="users" width="20" />
              </Typography>
              <Typography
                variant="h4"
                fontWeight="600"
                sx={{
                  lineHeight: '1.2',
                }}
              >
                2,659
              </Typography>
              <Typography
                color="textSecondary"
                variant="h5"
                fontWeight="400"
                sx={{
                  lineHeight: '1.2',
                }}
              >
                Following
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* about profile */}
        <Grid
          item
          lg={4}
          sm={12}
          xs={12}
          sx={{
            order: {
              xs: '1',
              sm: '1',
              lg: '2',
            },
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              mt: '-90px',
            }}
          >
            <Box>
              <Box
                sx={{
                  backgroundImage: 'linear-gradient(#50b2fc,#f44c66)',
                  padding: '4px',
                  borderRadius: '50%',
                  border: (theme) =>
                    `${theme.palette.mode === 'dark' ? '3px solid #3c414c' : '3px solid #fff'}`,
                  width: '110px',
                  height: '110px',
                  overflow: 'hidden',
                  margin: '0 auto',
                }}
              >
                <Avatar
                  src={userimg}
                  alt={userimg}
                  sx={{
                    borderRadius: '50%',
                    width: '96px',
                    height: '96px',
                    border: (theme) =>
                      `${theme.palette.mode === 'dark' ? '4px solid #3c414c' : '4px solid #fff'}`,
                  }}
                />
              </Box>
              <Box
                sx={{
                  mt: '5px',
                  display: 'block',
                }}
              >
                <Typography
                  fontWeight="500"
                  sx={{
                    fontSize: '20px',
                    textAlign: 'center',
                  }}
                >
                  Julia Roberts
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="h6"
                  fontWeight="400"
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  Project Manager
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        {/* friends following buttons */}
        <Grid
          item
          lg={4}
          sm={12}
          xs={12}
          display="flex"
          alignItems="center"
          sx={{
            justifyContent: {
              sm: 'center',
              lg: 'flex-end',
            },
            mt: {
              sm: 2,
              lg: 0,
            },
            ml: {
              sm: 4,
              lg: 0,
            },
            order: {
              xs: '3',
              sm: '3',
              lg: '3',
            },
          }}
        >
          <Box
            sx={{
              display: {
                sm: 'flex',
                lg: 'flex',
                xs: 'block',
              },
              alignItems: 'center',
              justifyContent: 'flex-end',
              textAlign: {
                xs: 'center',
              },
            }}
          >
            <Button
              color="secondary"
              variant="contained"
              size="small"
              sx={{
                width: '40px',
                minWidth: '40px',
                height: '40px',
                backgroundColor: '#3762d2',
              }}
            >
              <FeatherIcon icon="facebook" width="18" />
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="small"
              sx={{
                width: '40px',
                minWidth: '40px',
                height: '40px',
                backgroundColor: '#1abbff',
                ml: 1,
              }}
            >
              <FeatherIcon icon="twitter" width="18" />
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="small"
              sx={{
                width: '40px',
                minWidth: '40px',
                height: '40px',
                backgroundColor: '#198bfe',
                ml: 1,
              }}
            >
              <FeatherIcon icon="linkedin" width="18" />
            </Button>
            <Button
              color="error"
              variant="contained"
              size="small"
              sx={{
                width: '40px',
                minWidth: '40px',
                height: '40px',
                backgroundColor: '#f7468c',
                ml: 1,
              }}
            >
              <FeatherIcon icon="instagram" width="18" />
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="small"
              sx={{
                height: '40px',
                backgroundColor: '#1a9afb',
                pl: '18px',
                pr: '18px',
                ml: 1,
                mt: {
                  xs: 1,
                  sm: 0,
                  lg: 0,
                },
              }}
            >
              Following
            </Button>
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default CoverCard;
