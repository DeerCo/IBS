import React from 'react';
import { Card, CardContent, Divider, Box, Typography, Button } from '@mui/material';
import CustomTextField from '../custom-elements/CustomTextField';
import CustomFormLabel from '../custom-elements/CustomFormLabel';

const FbReadonlyForm = () => (
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
            Readonly Form
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
            htmlFor="ro-name"
          >
            Name
          </CustomFormLabel>
          <CustomTextField
            id="ro-name"
            variant="outlined"
            size="small"
            defaultValue="Wrappixel"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <CustomFormLabel htmlFor="ro-email-address">Email</CustomFormLabel>

          <CustomTextField
            id="ro-email-address"
            helperText="We'll never share your email with anyone else."
            variant="outlined"
            size="small"
            defaultValue="info@wrappixel.com"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <CustomFormLabel htmlFor="ro-outlined-password-input">Password</CustomFormLabel>

          <CustomTextField
            id="ro-outlined-password-input"
            type="password"
            autoComplete="current-password"
            defaultValue="info@wrappixel.com"
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            sx={{
              mb: 2,
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

export default FbReadonlyForm;
