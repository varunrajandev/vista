// Storage
import {
  hasStorage,
  getStorage,
  setStorage,
  removeStorage,
} from '../utils/storage.util';
// Fields
import { ACCESS_TOKEN } from '../config/common.config';


/** @type {*} */
const Auth = {
  // has the access token
  hasAccessToken: () => hasStorage(ACCESS_TOKEN),
  // set the access token
  getAccessToken: () => getStorage(ACCESS_TOKEN),
  // get the access token
  setAccessToken: (token) => setStorage(ACCESS_TOKEN, token),
  // remove the access token
  removeAccessToken: () => removeStorage(ACCESS_TOKEN),
};

// Default export
export default Auth;