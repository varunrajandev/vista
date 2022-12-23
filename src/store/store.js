// Redux
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
// Thunk
import thunk from 'redux-thunk';
// Logger
import logger from 'redux-logger';
// React router redux
import { routerMiddleware } from 'react-router-redux';
// History
import { createBrowserHistory } from 'history';
// Reducer
import rootReducer from './reducers';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createBrowserHistory();

// Configure store
export default function configureStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, logger, routerMiddleware(history)))
  );
}
