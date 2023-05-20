import React from 'react';
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  Button,
  FormControlLabel,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import CustomCheckbox from '../custom-elements/CustomCheckbox';
import CustomFormLabel from '../custom-elements/CustomFormLabel';

const FbLeftIconForm = () => {
  const [state, setState] = React.useState({
    checkedA: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Checkbox */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <Card
        sx={{
          p: 0,
        }}
      >
        <Box
          sx={{
            padding: '15px 30px',
          }}
          display="flex"
          alignItems="center"
        >
          <Box flexGrow={1}>
            <Typography fontWeight="500" variant="h4">
              Form with Left Icon
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent
          sx={{
            padding: '30px',
          }}
        >
          <form>
            <FormControl fullWidth>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="username-text"
              >
                Username
              </CustomFormLabel>
              <OutlinedInput
                startAdornment={
                  <InputAdornment position="start">
                    <FeatherIcon icon="user" width="20" />
                  </InputAdornment>
                }
                id="username-text"
                placeholder="Username"
                fullWidth
                size="small"
              />
            </FormControl>
            {/* 2 */}
            <FormControl fullWidth>
              <CustomFormLabel htmlFor="mail-text">Email</CustomFormLabel>
              <OutlinedInput
                startAdornment={
                  <InputAdornment position="start">
                    <FeatherIcon icon="mail" width="20" />
                  </InputAdornment>
                }
                id="mail-text"
                placeholder="Email"
                fullWidth
                size="small"
              />
            </FormControl>
            {/* 3 */}
            <FormControl fullWidth>
              <CustomFormLabel htmlFor="pwd-text">Password</CustomFormLabel>
              <OutlinedInput
                type="password"
                startAdornment={
                  <InputAdornment position="start">
                    <FeatherIcon icon="lock" width="20" />
                  </InputAdornment>
                }
                id="pwd-text"
                placeholder="Password"
                fullWidth
                size="small"
              />
            </FormControl>

            <FormControl fullWidth>
              <CustomFormLabel htmlFor="cpwd-text">Confirm Password</CustomFormLabel>
              <OutlinedInput
                startAdornment={
                  <InputAdornment position="start">
                    <FeatherIcon icon="lock" width="20" />
                  </InputAdornment>
                }
                id="cpwd-text"
                placeholder="Confirm Password"
                fullWidth
                size="small"
              />
            </FormControl>

            <FormControlLabel
              control={
                <CustomCheckbox checked={state.checkedA} onChange={handleChange} name="checkedA" />
              }
              sx={{
                mb: 2,
                mt: '10px',
              }}
              label="Remember Me!"
            />
            <Divider />
            <Box pt={3}>
              <Button
                color="primary"
                variant="contained"
                sx={{
                  mr: 1,
                }}
              >
                Submit
              </Button>
              <Button variant="contained" color="error">
                Cancel
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FbLeftIconForm;
