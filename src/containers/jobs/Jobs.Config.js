/***************LOCAL DEPENDENCIES ****************/
import { ENDPOINTS } from '../../config/api.config';
import { getColumnProps } from '../../utils/helper.util';

// Destructuring
const { CITY, JOBS_STATUS, LOCALITY, JOBS, USERS } = ENDPOINTS;

// Urls
export /** @type {*} */
const URLS = [
  { key: 'city', url: CITY },
  { key: 'status', url: JOBS_STATUS },
  { key: 'locality', url: LOCALITY },
];
export const GET_URL = { key: 'search', url: JOBS.GET };
export const USERS_URL = { key: 'users', url: USERS };

// Query Filters
export /** @type {*} */
const QUERY_FILTERS = {
  city: '',
  filter: 'jobId',
  jobActiveStage: '',
  micromsrket: '',
  pageNo: 1,
  pageSize: 20,
  sortby: 'desc',
  status: '',
};

/** @type {*} */
export const MODULE_NAME = 'JOBS';

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
    ...getColumnProps('cityName', 'LOCATION', '5%'),
    style: true,
  },
  {
    ...getColumnProps('workingHours', 'DURATION', '5%'),
    style: true,
  },
  {
    ...getColumnProps('budgetRange', 'BUDGET RANGE', '13%'),
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
  jobStatus: null,
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
};
