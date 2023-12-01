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

const FbRightIconForm = () => {
  const [state, setState] = React.useState({
    checkedB: false,
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
              Form with Right Icon
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
                htmlFor="username2-text"
              >
                Username
              </CustomFormLabel>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">
                    <FeatherIcon icon="user" width="20" />
                  </InputAdornment>
                }
                id="username2-text"
                placeholder="Username"
                fullWidth
                size="small"
              />
            </FormControl>
            {/* 2 */}
            <FormControl fullWidth>
              <CustomFormLabel htmlFor="mail2-text">Email</CustomFormLabel>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">
                    <FeatherIcon icon="mail" width="20" />
                  </InputAdornment>
                }
                id="mail2-text"
                placeholder="Email"
                fullWidth
                size="small"
              />
            </FormControl>
            {/* 3 */}
            <FormControl fullWidth>
              <CustomFormLabel htmlFor="pwd2-text">Password</CustomFormLabel>
              <OutlinedInput
                type="password"
                endAdornment={
                  <InputAdornment position="end">
                    <FeatherIcon icon="lock" width="20" />
                  </InputAdornment>
                }
                id="pwd2-text"
                placeholder="Password"
                fullWidth
                size="small"
              />
            </FormControl>

            <FormControl fullWidth>
              <CustomFormLabel htmlFor="cpwd2-text">Confirm Password</CustomFormLabel>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">
                    <FeatherIcon icon="lock" width="20" />
                  </InputAdornment>
                }
                id="cpwd2-text"
                placeholder="Confirm Password"
                fullWidth
                size="small"
              />
            </FormControl>
            <FormControlLabel
              control={
                <CustomCheckbox checked={state.checkedB} onChange={handleChange} name="checkedB" />
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

export default FbRightIconForm;
