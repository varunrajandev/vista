/***********NPM DEPENDENCIES ************ */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
/***********LOCAL DEPENDENCIES ************/
import App from './App';
import StepContext from './ContextApi/StepContext';
import configureStore from './store/store';
import { AxiosInterceptor } from './http'
// Create store
const store = configureStore();

// Axios interceptor
AxiosInterceptor(store);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <StepContext>
          <App />
        </StepContext>
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
);
