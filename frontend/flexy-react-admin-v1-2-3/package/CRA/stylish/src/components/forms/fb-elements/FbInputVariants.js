import React from 'react';
import { Card, CardContent, Divider, Box, Typography, FormControl } from '@mui/material';
import CustomTextField from '../custom-elements/CustomTextField';
import CustomFormLabel from '../custom-elements/CustomFormLabel';

const FbInputVariants = () => {
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
              Input Variants
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
              htmlFor="success-input"
            >
              Success Input
            </CustomFormLabel>
            <CustomTextField
              id="success-input"
              variant="outlined"
              defaultValue="Success value"
              fullWidth
              required
              size="small"
              sx={{
                '& input:valid + fieldset': {
                  borderColor: '#39cb7f',
                },
                '& input:invalid + fieldset': {
                  borderColor: '#fc4b6c',
                },
              }}
            />
            <CustomFormLabel htmlFor="error-input">Error Input</CustomFormLabel>
            <CustomTextField
              id="error-input"
              variant="outlined"
              fullWidth
              required
              size="small"
              sx={{
                '& input:valid + fieldset': {
                  borderColor: '#39cb7f',
                },
                '& input:invalid + fieldset': {
                  borderColor: '#fc4b6c',
                },
              }}
            />
            <FormControl fullWidth error>
              <CustomFormLabel htmlFor="error-text-input">Input with Error text</CustomFormLabel>
              <CustomTextField
                id="error-text-input"
                variant="outlined"
                fullWidth
                required
                size="small"
                error
                helperText="Incorrect entry."
              />
            </FormControl>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FbInputVariants;
