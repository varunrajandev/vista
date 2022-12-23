/*****************NPM DEPENDENCIES ******************/
import { isEmpty } from 'lodash';
import React, { memo } from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
/*****************LOCAL DEPENDENCIES ******************/
import { Steps } from './Forms';
import { STEPS } from './Cx.Config';
import ROUTE_CONFIG from '../../config/route.config';
import Stepper from '../../components/shared/stepper/stepper';

// Theme
const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: 'red' },
      },
    },
  },
});

const YcwForm = () => {
  // get the id & step from url
  const { id, step } = useParams();
  // navigate
  const navigate = useNavigate();

  return (
    <Box bgcolor='#E1E2E3' padding='20px' flex={7} minWidth={'90%'}>
      <Box sx={{ width: '100%' }}>
        <Stepper
          steps={STEPS}
          active={step}
          handleStepper={(activeStep) =>
            !isEmpty(id) ? navigate(ROUTE_CONFIG.CX.EDIT(id,activeStep)) : {}
          }
        >
          <Box bgcolor='#e1e2e3' padding='20px' flex={7} minWidth={'90%'}>
            <Box
              marginTop={5}
              sx={{
                padding: 3,
                bgcolor: 'white',
                borderRadius: 3,
              }}
            >
              <ThemeProvider theme={theme}>{Steps[step]}</ThemeProvider>
            </Box>
          </Box>
        </Stepper>
      </Box>
    </Box>
  );
};

// Default Export
export default memo(YcwForm);
