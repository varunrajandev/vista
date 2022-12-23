// Redux
import { combineReducers } from 'redux';
// React router redux
import { routerReducer } from 'react-router-redux';

// Reducers
import authReducer from './auth.reducer';
import commonReducer from './common.reducer';
import ycwReducer from './ycw.reducer';
import cxReducer from './cx.reducer';
import jobsReducer from './jobs.reducer';

// Put in object
const reducers = {
  authReducer,
  commonReducer,
  ycwReducer,
  cxReducer,
  jobsReducer,
};

/**
 * root reduces
 */
export default combineReducers({
  ...reducers,
  routing: routerReducer,
});
