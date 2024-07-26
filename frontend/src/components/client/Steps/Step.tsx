import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Link } from 'react-router-dom';

const steps = ['Cart', 'Order', 'Check out', 'Payment'];
const links = [
  '/shopping-cart/cart',
  '/shopping-cart/order',
  '/shopping-cart/check-out',
  '/shopping-cart/payment',
];

export default function HorizontalLinearAlternativeLabelStepper() {
  return (
    <Box mb={5} sx={{ width: '100%' }}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <Link to={links[index]}>
              <StepLabel>{label}</StepLabel>
            </Link>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
