/***************NPM DEPENDENCIES ****************/
import React from 'react';
import { isEmpty } from 'lodash';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';
import { useSelector, shallowEqual } from 'react-redux';
/***************LOCAL DEPENDENCIES **************/
import Auth from './auth/Auth';
import Routes from './routes/root.routes';
import Header from './components/Header/Header';
import Notify from './components/Notification/Notify';
import SideHeader from './components/Side header/SideHeader';
import { getError } from './store/selectors/common.selector';
// App
const App = () => {
  // get the auth state
  const isAuth = Auth.hasAccessToken();
  // selectors
  // selector
  const [error] = useSelector(
    (state) => [getError(state)],
    shallowEqual
  );
  return (
    <Box>
      {/* Start error section */}
      <Notify
        notify={{ isOpen: !isEmpty(error), message: error, type: 'error' }}
      />
      {/* End error section */}
      {isAuth && <Header />}
      <Stack direction='row'>
        {isAuth && <SideHeader />}
        <Routes />
      </Stack>
    </Box>
  );
};

// Default Export
export default App;
