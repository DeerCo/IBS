import React from 'react';
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  FormControlLabel,
  Button,
} from '@mui/material';
import CustomTextField from '../custom-elements/CustomTextField';
import CustomCheckbox from '../custom-elements/CustomCheckbox';
import CustomFormLabel from '../custom-elements/CustomFormLabel';

const FbOrdinaryForm = () => {
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
              Ordinary Form
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
            <CustomFormLabel
              sx={{
                mt: 0,
              }}
              htmlFor="email-address"
            >
              Email
            </CustomFormLabel>
            <CustomTextField
              id="email-address"
              helperText="We'll never share your email with anyone else."
              variant="outlined"
              size="small"
              fullWidth
            />
            <CustomFormLabel htmlFor="ordinary-outlined-password-input">Password</CustomFormLabel>

            <CustomTextField
              id="ordinary-outlined-password-input"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                mb: '10px',
              }}
            />
            <FormControlLabel
              control={
                <CustomCheckbox
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Check Me Out!"
              sx={{
                mb: 1,
              }}
            />
            <div>
              <Button color="primary" variant="contained">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FbOrdinaryForm;
