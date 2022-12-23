/***************LOCAL DEPENDENCIES ****************/
import { ENDPOINTS } from '../../config/api.config';

// Destructuring
const { CITY, SKILLS, RELIGION, GENDER, LOCALITY, WORKING_HOURS } = ENDPOINTS;
/** @type {*} */
export const MODULE_NAME = 'AUTH';

// Urls
export /** @type {*} */
const URLS = [
  { key: 'gender', url: GENDER },
  { key: 'microMarket', url: LOCALITY },
  { key: 'city', url: CITY },
  { key: 'religion', url: RELIGION },
  { key: 'skills', url: SKILLS },
  { key: 'workingHours', url: WORKING_HOURS },
];

export /** @type {*} */
const REGISTRATION_FORM_FIELDS = {
  department: 'WORKER',
  mobileNo: '',
  userType: 'WORKER',
  isoCode: 'IN',
  firstName: '',
  gender: null,
  lastName: '',
  religion: null,
  micromarketUuid: '',
  workingHours: null,
  skillUuid: null,
  age: '',
  partnerMobileNo: '',
  cityUuid: '',
  otherReligion: null,
  otherSkill: '',
};
