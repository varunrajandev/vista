/***************LOCAL DEPENDENCIES ****************/
import { ENDPOINTS } from './../../config/api.config';
import { getColumnProps } from '../../utils/helper.util';

// Destructuring
const {
  CITY,
  LOCALITY,
  PROFILE,
  USERS,
  CUSTOMER: { GET_ALL },
} = ENDPOINTS;

// Urls
export /** @type {*} */
const URLS = [
  { key: 'city', url: CITY },
  { key: 'profile', url: PROFILE },
  { key: 'locality', url: LOCALITY },
];
export const GET_URL = { key: 'search', url: GET_ALL };
export const USERS_URL = { key: 'users', url: USERS };

// Steps
export const STEPS = ['PERSONAL INFORMATION', 'CURRENT ADDRESS', 'HOUSEHOLD INFORMATION', 'JOBS'];

// Query Filters
export /** @type {*} */
const QUERY_FILTERS = {
  city: '',
  filter: '',
  micromsrket: '',
  pageNo: 1,
  pageSize: 30,
  sortby: 'asc',
  status: '',
};

/** @type {*} */
export const MODULE_NAME = 'CX';

// Table columns
export const COLUMNS = [
  {
    ...getColumnProps('userId', 'CUSTOMER ID'),
  },
  {
    ...getColumnProps('name', 'NAME'),
  },
  {
    ...getColumnProps('mobileNo', 'PHONE#'),
  },
  {
    ...getColumnProps('email', 'EMAIL'),
  },
  {
    ...getColumnProps('microMarketName', 'LOCATION'),
  },
  {
    ...getColumnProps('openJob', 'OPEN JOBS'),
  },
  {
    ...getColumnProps('activeJob', 'ACTIVE JOBS'),
  },
  {
    ...getColumnProps('profileStatus', 'STATUS'),
  },
];

// Form fields
export const PERSON_INFO_FORM_FIELDS = {
  age: null,
  birthday: null,
  bloodGroup: null,
  covidStatus: null,
  education: null,
  educationalRemarks: null,
  email: null,
  firstName: null,
  formStatus: null,
  gender: null,
  isoCode: null,
  lastName: null,
  maritalStatus: null,
  medicalCondition: null,
  middleName: null,
  mobileNo: null,
  nationality: null,
  otherReligion: null,
  otherSourcingChannel: null,
  percentage: null,
  professsion: null,
  profileStatus: null,
  religion: null,
  secondaryEmail: null,
  secondaryMobileNumber: null,
  secondaryMobileVerified: null,
  sourcingChannel: null,
  userId: null,
  userType: null,
  whatsappAvailable: null,
  whatsappNumber: null,
};
