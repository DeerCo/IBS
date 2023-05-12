import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button, MobileStepper } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import FeatherIcon from 'feather-icons-react';

import img1 from '../../assets/images/products/product-detail-1.jpg';
import img2 from '../../assets/images/products/product-detail-2.jpg';
import img3 from '../../assets/images/products/product-detail-3.jpg';
import img4 from '../../assets/images/products/product-detail-4.jpg';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath: img1,
    id: 1,
  },
  {
    imgPath: img2,
    id: 2,
  },
  {
    imgPath: img3,
    id: 3,
  },
  {
    imgPath: img4,
    id: 4,
  },
];

const ProductCarousel = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        position: 'relative',
        margin: {
          sm: '0 auto',
          xs: '0 auto',
          lg: 'unset',
        },
      }}
    >
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <Box key={step.id}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  display: 'block',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  width: '100%',
                  borderRadius: '10px',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </Box>
        ))}
      </AutoPlaySwipeableViews>

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? (
              <FeatherIcon icon="arrow-left" width="18" />
            ) : (
              <FeatherIcon icon="arrow-right" width="18" />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <FeatherIcon icon="arrow-right" width="18" />
            ) : (
              <FeatherIcon icon="arrow-left" width="18" />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default ProductCarousel;
