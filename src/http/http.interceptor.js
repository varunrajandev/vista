// Axios
import axios from 'axios';
// Axios instance
import axiosInstance from './http';
// Auth
import Auth from '../auth/Auth';
// Action
import { loading, errorHandler } from '../store/action';
// ERROR_CODE
import { ERROR_CODE } from '../config/common.config';

/**
 * @description
 * @param {*} store
 * @param {*} message
 */
const handleError = (store, message) => {
  // show to error message
  store.dispatch(errorHandler(message));
  setTimeout(() => {
    // hide to error message
    store.dispatch(errorHandler(''));
  }, 4000);
}

// Axios interceptor
const axiosInter = (store) => {
  // add a request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // get auth
      const isAuth = Auth.hasAccessToken();
      const token = Auth.getAccessToken();
      // check auth
      if (!isAuth) {
        new axios.Cancel(ERROR_CODE.CANCELLED);
      }
      // config.headers.frontEnv = REACT_APP_ENV;
      config.headers.Authorization = isAuth ? `token=${token}` : '';
      // dispatch the loading action
      store.dispatch(loading(true));
      // Do something before request is sent
      return config;
    },
    (error) => {
      handleError(store, 'Server Error');
      // dispatch the loading action
      store.dispatch(loading(false));
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      store.dispatch(loading(false));
      return response;
    },
    (error) => {
      // handle error
      handleError(store, 'Server Error')
      // dispatch the loading action
      store.dispatch(loading(false));
      // check error response
      if (error?.response?.status ?? false) {
        switch (error?.response?.status) {
          case 401:         
            Auth.removeAccessToken();
            return Promise.reject({
              message: ERROR_CODE[error?.response?.status],
              error,
            });
          default:
            return Promise.reject({ message: ERROR_CODE.DEFAULT, error });
        }
      }      
      return Promise.reject(error);
    }
  );
};

// Default Export
export default axiosInter;
