// Axios
import axios from 'axios';

// Axios Config
import axiosConfig from './http.config';

// Cancel Source
const source = axios.CancelToken.source();

// Axios instance
const instance = axios.create({
  // withCredentials: true,
  ...axiosConfig,
  cancelToken: source.token,
});

// Cancel axios on unmount
export const cancelAxiosRequest = () => source.cancel();

// Default export
export default instance;
