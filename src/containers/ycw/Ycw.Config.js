/***************LOCAL DEPENDENCIES ****************/
import { ENDPOINTS } from '../../config/api.config';
import ROUTE_CONFIG from '../../config/route.config';
import { getColumnProps } from '../../utils/helper.util';

// Destructuring
const {
  CITY,
  SKILLS,
  PROFILE,
  USERS,
  SOURCE,
  RELIGION,
  MARITAL_STATUS,
  GENDER,
  COVID,
  EDUCATION,
  CHECK_MOBILE,
  YCW,
  LOCALITY_1,
  WORKING_HOURS,
} = ENDPOINTS;

/** @type {*} */
export const GET_WHATS_UP_MAPPER = {
  mobileNumber: 'mobileNo',
  secondaryNumber: 'secondaryMobileNumber',
};

// Urls
export /** @type {*} */
const URLS = [
  { key: 'city', url: CITY },
  { key: 'status', url: PROFILE },
  { key: 'skills', url: SKILLS },
  { key: 'gender', url: GENDER },
  { key: 'microMarket', url: LOCALITY_1 },
  { key: 'workingHours', url: WORKING_HOURS },
];
export const GET_URL = { key: 'search', url: YCW.GET_ALL };
export const GET_URL_BY_ID = { key: 'detailsById', url: YCW.GET_BY_ID };
export const USERS_URL = { key: 'users', url: USERS };
export const GET_PROFILE = { key: 'profile', url: YCW.GET_PROFILE };
export const DROP_DOWN_URLS = [
  { key: 'sourceOptions', url: SOURCE },
  { key: 'religionOptions', url: RELIGION },
  { key: 'maritalOptions', url: MARITAL_STATUS },
  { key: 'genderOptions', url: GENDER },
  { key: 'covidOptions', url: COVID },
  { key: 'educationOptions', url: EDUCATION },
];
export const CHECK_DUPLICATE_MOBILE = CHECK_MOBILE;

// Query Filters
export /** @type {*} */
const QUERY_FILTERS = {
  filter: 'createdAt',
  pageNo: 1,
  pageSize: 20,
  sortby: 'desc',
};

/** @type {*} */
export const MODULE_NAME = 'YCW';

// Table columns
export const COLUMNS = [
  {
    ...getColumnProps('userId', 'YCW ID', '10%'),
    style: true,
  },
  {
    ...getColumnProps('firstName', 'NAME', '13%'),
    style: true,
  },
  {
    ...getColumnProps('mobileNo', 'PHONE#', '8%'),
    style: true,
  },
  {
    ...getColumnProps('gender', 'GENDER', '5%'),
    style: true,
  },
  {
    ...getColumnProps('cityName', 'CITY', '5%'),
    style: true,
  },
  {
    ...getColumnProps('microMarketName', 'SUPPLY HUB', '8%'),
    style: true,
  },
  {
    ...getColumnProps('primarySkill', 'SKILLS', '13%'),
    style: true,
  },
  {
    ...getColumnProps('totalExperience', 'EXP.(YRS.)', '12%'),
    style: true,
  },
  {
    ...getColumnProps('workingHours', 'WORK HOURS', '15%'),
    style: true,
  },
  {
    ...getColumnProps('percentage', 'PERCENT COMPLETION', '15%'),
    style: true,
  },
  {
    ...getColumnProps('profileStatus', 'STATUS', '10%'),
    style: false,
  },
];

// Links
export const LINKS = [
  { name: 'PROFILE', to: '', active: true },
];

// Button Links
export const BUTTON_LINKS = {
  EDIT: (id) => ({
    to: ROUTE_CONFIG.YCW.EDIT(id, 1),
    text: 'EDIT PROFILE',
  }),
  CLOSE: {
    to: '/ycw',
    text: 'CLOSE',
  },
};
// Route Mapper
export const ROUTE_MAPPER = {
  ACTIVE: 'profile',
  IN_ACTIVE: 'edit',
  ACTIVE_AND_AVAILABLE: 'profile',
};

// Whats up details
export const WHATS_UP = [
  { value: 'mobileNumber', label: 'Same as Mobile Number' },
  { value: 'secondaryNumber', label: 'Same as Alternate Number' },
  { value: 'otherNumber', label: 'Other Number' },
  { value: 'notAvailable', label: 'Not Available' },
];

// Steps
export const STEPS = [
  'PERSONAL',
  'SKILL',
  'JOB',
  'ADDRESS',
  'DOCUMENT',
  'HOUSEHOLD',
  'BANK',
];

// Years
export const YEAR = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  '30+',
];
// Months
export const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

// Form Fields
export const HOUSE_HOLD_FORM_FIELDS = {
  age: '',
  jobTypeUuid: '',
  otherJobType: '',
  mobileNo: '',
  name: '',
  relationship: null,
  otherrRlationship: '',
  locality: '',
  addressType: null,
  address: '',
};
export const BANK_INFO_FORM_FIELDS = {
  ifscCode: '',
  bankName: '',
  branchName: '',
  branchAddress: '',
  accountType: null,
  accountHolderName: '',
  accountNumber: '',
  primary: false,
  userId: null,
  proofType: null,
  file: null,
  loading: false,
  fileName: null,
};
export const JOB_INFO_FORM_FIELDS = {
  endTime: null,
  jobRemarks: '',
  skillUuid: '',
  otherSkillUuid: '',
  maxSalaryExpected: '',
  minSalaryExpected: '',
  openToTiming: '',
  openToTraining: false,
  startTime: null,
  totalSimultaneousJob: 0,
  traningMode: null,
  userId: null,
  vehicle: null,
  workingHours: null,
  userExperienceRequestDto: {
    experienceRemarks: '',
    jobDurationMonths: '',
    jobDurationYears: '',
    jobTypeUuid: null,
    otherJobTypeUuid: '',
    reasonForLeavingJob: '',
    otherReasonForLeavingJob: '',
    totalExperienceMonths: '',
    totalExperienceYears: '',
  },
};
export const ADDRESS_INFO_FORM_FIELDS = {
  addressLine1: null,
  addressLine2: null,
  addressProofType: null,
  cityUuid: null,
  countryUuid: '4b218757-8300-45d2-b253-92ffc76a0f13',
  landmark: null,
  micromarketUuid: null,
  permanent: null,
  postalCode: null,
  stateUuid: null,
  userId: null,
};
export const SKILL_INFO_FORM_FIELDS = {
  otherLanguage: [],
  primaryLanguage: null,
  skillRemarks: '',
  primarySkill: null,
  secondarySkill: null,
  tertiarySkill: [],
  userId: null,
  answers: {},
};
export const PERSON_INFO_FORM_FIELDS = {
  sourcingChannel: null,
  otherSourcingChannel: null,
  firstName: null,
  lastName: null,
  gender: null,
  mobileNo: null,
  secondaryMobileNumber: null,
  whatsappAvailable: null,
  whatsappNumber: null,
  age: null,
  birthday: null,
  maritalStatus: null,
  religion: null,
  otherReligion: null,
  education: null,
  educationalRemarks: null,
  covidStatus: null,
  medicalCondition: null,
};
