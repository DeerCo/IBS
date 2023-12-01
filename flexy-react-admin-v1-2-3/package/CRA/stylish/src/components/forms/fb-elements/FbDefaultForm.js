import React from 'react';
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  FormControlLabel,
  Button,
  Grid,
  RadioGroup,
  FormControl,
  MenuItem,
} from '@mui/material';
import CustomTextField from '../custom-elements/CustomTextField';
import CustomSelect from '../custom-elements/CustomSelect';
import CustomCheckbox from '../custom-elements/CustomCheckbox';
import CustomRadio from '../custom-elements/CustomRadio';
import CustomFormLabel from '../custom-elements/CustomFormLabel';

const numbers = [
  {
    value: 'one',
    label: 'One',
  },
  {
    value: 'two',
    label: 'Two',
  },
  {
    value: 'three',
    label: 'Three',
  },
  {
    value: 'four',
    label: 'Four',
  },
];

const FbDefaultForm = () => {
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [value, setValue] = React.useState('');

  const handleChange2 = (event) => {
    setValue(event.target.value);
  };

  const [number, setNumber] = React.useState('');

  const handleChange3 = (event) => {
    setNumber(event.target.value);
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
              Default Form
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
              htmlFor="default-value"
            >
              Default Text
            </CustomFormLabel>
            <CustomTextField
              id="default-value"
              variant="outlined"
              defaultValue="George deo"
              fullWidth
              size="small"
            />
            <CustomFormLabel htmlFor="email-text">Email</CustomFormLabel>
            <CustomTextField
              id="email-text"
              type="email"
              variant="outlined"
              fullWidth
              size="small"
            />
            <CustomFormLabel htmlFor="default-outlined-password-input">Password</CustomFormLabel>

            <CustomTextField
              id="default-outlined-password-input"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              fullWidth
              size="small"
            />
            <CustomFormLabel htmlFor="outlined-multiline-static">Textarea</CustomFormLabel>

            <CustomTextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              size="small"
            />
            <CustomFormLabel htmlFor="readonly-text">Read Only</CustomFormLabel>

            <CustomTextField
              id="readonly-text"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
              size="small"
            />
            <Grid
              container
              spacing={0}
              sx={{
                mb: 2,
                mt: 2,
              }}
            >
              <Grid item lg={4} md={6} sm={12}>
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      checked={state.checkedA}
                      onChange={handleChange}
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label="Check this custom checkbox"
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
                  label="Check this custom checkbox"
                />
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      checked={state.checkedC}
                      onChange={handleChange}
                      name="checkedC"
                      color="primary"
                    />
                  }
                  label="Check this custom checkbox"
                />
              </Grid>
              <Grid item lg={4} md={6} sm={12}>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={value}
                    onChange={handleChange2}
                  >
                    <FormControlLabel
                      value="radio1"
                      control={<CustomRadio />}
                      label="Toggle this custom radio"
                    />
                    <FormControlLabel
                      value="radio2"
                      control={<CustomRadio />}
                      label="Toggle this custom radio"
                    />
                    <FormControlLabel
                      value="radio3"
                      control={<CustomRadio />}
                      label="Toggle this custom radio"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <CustomFormLabel htmlFor="standard-select-number">Select</CustomFormLabel>
            <CustomSelect
              fullWidth
              id="standard-select-number"
              variant="outlined"
              value={number}
              onChange={handleChange3}
              size="small"
              sx={{
                mb: 2,
              }}
            >
              {numbers.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomSelect>
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

export default FbDefaultForm;
