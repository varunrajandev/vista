const BASE_URL = 'http://13.126.160.155:8080/';

const URLS = {
  CUSTOMER: {
    GET_ALL: '/customer/get/all/customer',
    GET_BY_ID: (userId) => `/customer/get/details/${userId}`,
    POST: '/customer/save',
  },
  JOBS: {
    GET: '/job/get/all/job',
    GET_BY_ID: (jobId) => `/job/get/${jobId}`,
    POST: 'job/create',
    POST_BY_AGE: '/job/create/agePreference',
    DELETE: (jobId) => `/job/delete/${jobId}`,
    PUT_BY_ID: (jobId) => `/job/get/${jobId}`,
  },
};
