import React from 'react';
import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import BaseCard from '../../base-card/BaseCard';

const ColorButtonGroup = () => (
  <BaseCard title="Color Button Group">
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          mb: 2,
        }}
      >
        <Stack spacing={1} direction={{ xs: 'column', sm: 'column', lg: 'row' }}>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>

          <ButtonGroup
            variant="contained"
            color="secondary"
            aria-label="outlined primary button group"
          >
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>

          <ButtonGroup
            variant="contained"
            color="warning"
            aria-label="outlined primary button group"
          >
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>

          <ButtonGroup variant="contained" color="error" aria-label="outlined primary button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>

          <ButtonGroup
            color="success"
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Stack>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          mb: 2,
        }}
      >
        <Stack spacing={1} direction={{ xs: 'column', sm: 'column', lg: 'row' }}>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>
              <FeatherIcon icon="skip-back" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="play" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="skip-forward" width="18" />
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined" color="secondary" aria-label="outlined button group">
            <Button>
              <FeatherIcon icon="skip-back" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="play" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="skip-forward" width="18" />
            </Button>
          </ButtonGroup>

          <ButtonGroup variant="outlined" color="warning" aria-label="outlined button group">
            <Button>
              <FeatherIcon icon="skip-back" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="play" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="skip-forward" width="18" />
            </Button>
          </ButtonGroup>

          <ButtonGroup variant="outlined" color="error" aria-label="outlined button group">
            <Button>
              <FeatherIcon icon="skip-back" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="play" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="skip-forward" width="18" />
            </Button>
          </ButtonGroup>

          <ButtonGroup variant="outlined" color="success" aria-label="outlined button group">
            <Button>
              <FeatherIcon icon="skip-back" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="play" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="skip-forward" width="18" />
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
      <Box display="flex" justifyContent="center">
        <Stack spacing={1} direction={{ xs: 'column', sm: 'column', lg: 'row' }}>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button>
              <FeatherIcon icon="align-left" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="align-center" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="align-right" width="18" />
            </Button>
          </ButtonGroup>
          <ButtonGroup color="secondary" variant="text" aria-label="text button group">
            <Button>
              <FeatherIcon icon="align-left" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="align-center" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="align-right" width="18" />
            </Button>
          </ButtonGroup>
          <ButtonGroup color="warning" variant="text" aria-label="text button group">
            <Button>
              <FeatherIcon icon="align-left" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="align-center" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="align-right" width="18" />
            </Button>
          </ButtonGroup>
          <ButtonGroup color="error" variant="text" aria-label="text button group">
            <Button>
              <FeatherIcon icon="align-left" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="align-center" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="align-right" width="18" />
            </Button>
          </ButtonGroup>
          <ButtonGroup color="success" variant="text" aria-label="text button group">
            <Button>
              <FeatherIcon icon="align-left" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="align-center" width="18" />
            </Button>
            <Button>
              <FeatherIcon icon="align-right" width="18" />
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </Box>
  </BaseCard>
);

export default ColorButtonGroup;
