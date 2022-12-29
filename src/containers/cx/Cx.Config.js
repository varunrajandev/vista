/***************LOCAL DEPENDENCIES ****************/
import { ENDPOINTS } from './../../config/api.config';
import { getColumnProps } from '../../utils/helper.util';
import ROUTE_CONFIG from '../../config/route.config';

// Destructuring
const {
  CITY,
  LOCALITY_1,
  PROFILE,
  USERS,
  CUSTOMER: { GET_ALL },
} = ENDPOINTS;

// Urls
export /** @type {*} */
const URLS = [
  { key: 'city', url: CITY },
  { key: 'profile', url: PROFILE },
  { key: 'locality', url: LOCALITY_1 },
];
export const GET_URL = { key: 'search', url: GET_ALL };
export const USERS_URL = { key: 'users', url: USERS };

// Steps
export const STEPS = [
  'PERSONAL INFORMATION',
  'CURRENT ADDRESS',
  'HOUSEHOLD INFORMATION',
  'JOBS',
];

// Links
export const LINKS = [{ name: 'CX', to: '', active: true }];

// Button Links
export const BUTTON_LINKS = {
  EDIT: (id) => ({
    to: ROUTE_CONFIG.CX.EDIT(id, 1),
    text: 'EDIT CX',
  }),
  CLOSE: {
    to: '/cx',
    text: 'CLOSE',
  },
};

// Query Filters
export /** @type {*} */
const QUERY_FILTERS = {
  filter: 'firstName',
  pageNo: 1,
  pageSize: 20,
  sortby: 'desc',
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
    ...getColumnProps('microMarketName', 'SUPPLY HUB'),
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

// Person Form fields
export const PERSON_INFO_FORM_FIELDS = {
  sourcingChannel: null,
  firstName: null,
  middleName: null,
  lastName: null,
  mobileNo: null,
  secondaryMobileNumber: null,
  whatsappAvailable: null,
  whatsappNumber: null,
  email: null,
  professsion: null,
  userType: 'CUSTOMER',
  user: null,
  profileStatus: 'IN_ACTIVE',
};

// Post Person Form Fields
export const POST_PERSON_INFO_FORM_FIELDS = ({
  sourcingChannel = null,
  firstName = null,
  middleName = null,
  lastName = null,
  mobileNo = null,
  secondaryMobileNumber = null,
  whatsappAvailable = null,
  whatsappNumber = null,
  email = null,
  professsion = null,
  userId = null,
}) => ({
  userId,
  sourcingChannel,
  firstName,
  middleName,
  lastName,
  mobileNo,
  secondaryMobileNumber,
  whatsappAvailable,
  whatsappNumber,
  email,
  professsion,
  userType: 'CUSTOMER',
});
