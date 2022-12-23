/*****************NPM DEPENDENCIES ******************/
import React, { memo } from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
/*************LOCAL DEPENDENCIES ****************/
import BasicInfo from './Forms/BasicInfo';

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

/**
 * @description
 */
const JobsForm = () => (
  <Box bgcolor='#E1E2E3' padding='20px' flex={7} minWidth={'90%'}>
    <Box sx={{ width: '100%' }}>
      <NavLink to={'/jobs'} style={{ padding: '20px' }}>
        <ArrowBackIcon />
      </NavLink>
      <Box bgcolor='#e1e2e3' padding='20px' flex={7} minWidth={'90%'}>
        <Box
          marginTop={5}
          sx={{
            padding: 3,
            bgcolor: 'white',
            borderRadius: 3,
          }}
        >
          <ThemeProvider theme={theme}>
            <BasicInfo />
          </ThemeProvider>
        </Box>
      </Box>
    </Box>
  </Box>
);

// Default Export
export default memo(JobsForm);
