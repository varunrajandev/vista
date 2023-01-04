/***************LOCAL DEPENDENCIES ****************/
import { ENDPOINTS } from '../../config/api.config';
import ROUTE_CONFIG from '../../config/route.config';
import { getColumnProps } from '../../utils/helper.util';

// Destructuring
const { CITY, JOBS_STATUS, LOCALITY_1, JOBS, USERS } = ENDPOINTS;

// Urls
export /** @type {*} */
const URLS = [
  { key: 'city', url: CITY },
  { key: 'status', url: JOBS_STATUS },
  { key: 'locality', url: LOCALITY_1 },
];
export const GET_URL = { key: 'search', url: JOBS.GET };
export const USERS_URL = { key: 'users', url: USERS };
export const GET_URL_BY_ID = { key: 'detailsById', url: JOBS.GET_BY_ID };
// Query Filters
export /** @type {*} */
const QUERY_FILTERS = {
  filter: 'createdAt',
  pageNo: 1,
  pageSize: 20,
  sortby: 'desc',
};

/** @type {*} */
export const MODULE_NAME = 'JOBS';

// Links
export const LINKS = [{ name: 'JOB', to: '', active: true }];

// Button Links
export const BUTTON_LINKS = {
  EDIT: (id) => ({
    to: ROUTE_CONFIG.JOBS.EDIT(id, 1),
    text: 'EDIT JOB',
  }),
  CLOSE: {
    to: '/jobs',
    text: 'CLOSE',
  },
};

// Table columns
export const COLUMNS = [
  {
    ...getColumnProps('jobId', 'JOB ID', '10%'),
    style: true,
  },
  {
    ...getColumnProps('jobType', 'JOB TYPE', '13%'),
    style: true,
  },
  {
    ...getColumnProps('userId', 'CUSTOMER ID', '10%'),
    style: true,
  },
  {
    ...getColumnProps('microMarketName', 'SUPPLY HUB', '10%'),
    style: true,
  },
  {
    ...getColumnProps('workingHours', 'DURATION', '5%'),
    style: true,
  },
  {
    ...getColumnProps('budgetRange', 'BUDGET RANGE (In Rupees)', '15%'),
    style: true,
  },
  {
    ...getColumnProps('startDate', 'START DATE', '12%'),
    style: true,
  },
  {
    ...getColumnProps('jobCurrentStatus', 'HIGHEST ACTIVE STAGE', '15%'),
    style: true,
  },
  {
    ...getColumnProps('jobStatus', 'STATUS', '15%'),
    style: true,
  },
];

// Default forms
export const BASIC_INFO_FORM_FIELDS = {
  agePreference: null,
  cityUuid: null,
  endDate: null,
  endTime: null,
  familyMember: null,
  gender: null,
  houseSize: 0,
  jobCurrentStatus: null,
  jobDescription: null,
  jobStatus: 'CREATED',
  landMark: null,
  language: null,
  maxBudget: 0,
  micromarketUuid: null,
  minBudget: 0,
  pet: false,
  petCount: 0,
  religion: null,
  skillUuid: null,
  startDate: '',
  startTime: null,
  traingType: null,
  userId: null,
  workingHours: null,
  jobId: null,
};
