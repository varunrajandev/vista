/*****************NPM DEPENDENCIES ***************/
import React, {
  memo,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react';
import {
  Button,
  Box,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  createTheme,
  ThemeProvider,
  FormHelperText,
  Autocomplete,
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useForm, Controller } from 'react-hook-form';
import VerifiedIcon from '@mui/icons-material/Verified';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
/*****************LOCAL DEPENDENCIES ***************/
import { masterApi, WhatsAppStatus } from '../../AllData';
import Notify from '../Notification/Notify';
import { debounce } from '../../utils/debounce';
import { multiStepContext } from '../../ContextApi/StepContext';
// Theme
const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: 'red' },
      },
    },
  },
});

// Form Validation Schema
const schema = yup.object().shape({
  sourcingChannel: yup.string().required('Sourcing Channel is required'),
  otherSourcingChannel: yup.string().when('sourcingChannel', {
    is: (val) => val === 'Others',
    then: (schema) => schema.nullable().required('Other Sourcing is required'),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
  firstName: yup
    .string()
    .nullable()
    .required('First Name is required')
    .matches(/^[A-Za-z ]*$/, 'Please Enter Only Alphabet'),
  lastName: yup
    .string()
    .nullable()
    .matches(/^[A-Za-z ]*$/, 'Please Enter Only Alphabet'),
  gender: yup.string().nullable().required('Gender is required'),
  mobileNo: yup
    .string()
    .nullable()
    .required('Phone Number is Required')
    .matches(/^[0-9]{10}$/, 'Please Enter Valid Phone Number'), // phone validation
  secondaryMobileNumber: yup.string().nullable(),
  whatsappAvailable: yup
    .string()
    .nullable()
    .required('Whatsapp Available is required'),
  whatsappNumber: yup.string().when('whatsappAvailable', {
    is: (val) =>
      val === 'otherNumber' ||
      val === 'mobileNumber' ||
      val === 'secondaryNumber',
    then: (schema) => schema.nullable().required('Other Number is required'),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
  birthday: yup
    .date()
    .nullable()
    .min(new Date(1900, 0, 1), 'DOB must be later than ${value}')
    .max(new Date(), 'Date not greater then today')
    .typeError('Please Enter valid DOB format MM/DD/YYYY')
    .required('Date is required'),
  maritalStatus: yup.string().nullable().required('Marital Status is required'),
  religion: yup.string().nullable().required('Religion is required'),
  otherReligion: yup.string().when('religion', {
    is: (val) => val === 'OTHERS',
    then: (schema) => schema.nullable().required('Other Religion is required'),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
  covidStatus: yup.string().nullable().required('Covid Status is required'),
});

// Default Form Fields
const formFields = {
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
  isoCode: 'IN',
  nationality: 'INDIAN',
  userType: 'WORKER',
  secondaryMobileVerified: false,
  profileStatus: 'IN_ACTIVE',
};

/** @type {*} */
const getWhatsUp = {
  mobileNumber: 'mobileNo',
  secondaryNumber: 'secondaryMobileNumber',
};

/**
 * @description update the select state & handle auto save
 * @param {string} key
 * @param {string} label
 * @param {string} value
 * @param {object} error
 * @param {function} onChangeFn
 * @param {function} saveFn
 * @param {object} formValues
 * @param {function|null} [extraFn=null]
 * @param {object|null} [extraProps=null]
 */
const getSelectProps = (
  key,
  label,
  value,
  error,
  onChangeFn,
  saveFn,
  formValues,
  id = null,
  extraFn = null,
  extraProps = null
) => ({
  id: key,
  sx: { width: '100%' },
  label,
  value: value || '',
  error: error?.message ? true : false,
  onChange: ({ target: { value } }) => {
    onChangeFn(value);
    if (extraFn && extraProps) {
      extraFn(extraProps.key, extraProps.values[extraProps.getValue[value]]);
    }
    if (id) {
      saveFn({ ...formValues, [key]: value }, false);
    }
  },
});

/**
 * @description update the input state & handle auto save
 * @param {string} key
 * @param {string} label
 * @param {string} value
 * @param {object} error
 * @param {function} onChangeFn
 * @param {function} saveFn
 * @param {function|null} extraFn
 */
const getInputProps = (
  key,
  label,
  value,
  placeholder,
  error,
  onChangeFn,
  saveFn,
  extraFn = null
) => ({
  id: key,
  size: 'small',
  variant: 'outlined',
  label,
  value: value || '',
  placeholder,
  error: error?.message ? true : false,
  helperText: error?.message,
  onChange: ({ target: { value } }) => {
    onChangeFn(value);
    saveFn(key, value);
    if (extraFn) {
      extraFn(value);
    }
  },
});

/**
 * @description
 * @param {*} e
 */
const PersonalInfo = () => {
  // local states
  const [dropDownList, setDropDownList] = useState({
    source: [],
    religion: [],
    marital: [],
    gender: [],
    covid: [],
    education: [],
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'info',
  });
  const { setCurrentSteps } = useContext(multiStepContext);

  // param
  const { id } = useParams();

  // get the id from local storage
  let ID = localStorage.getItem('ID');

  // form instance
  const {
    reset,
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: { ...formFields },
    resolver: yupResolver(schema),
  });

  // get the updated form values
  const updatedFormValues = watch();

  /**
   * @description calculate the age
   * @param {string | date} birthDate
   */
  const getAge = (birthDate) =>
    new Date().getFullYear() - new Date(birthDate).getFullYear();

  // call the user details by id
  useEffect(() => {
    if (id || ID) {
      fetch(`http://13.126.160.155:8080/user/worker/profile/${id || ID}`)
        .then((res) => res.json())
        .then((res) =>
          reset({
            ...formFields,
            ...(res?.data ?? {}),
            age: res?.data?.age ?? getAge(res?.data?.birthday),
          })
        );
    }
  }, [id || ID]);

  // call the drop down api
  useEffect(() => {
    const requestParams = [
      fetch(`${masterApi}/drop-down/get/sourceChannel?flag=all`),
      fetch(`${masterApi}/drop-down/get/religion`),
      fetch(`${masterApi}/drop-down/get/maritalStatus`),
      fetch(`${masterApi}/drop-down/get/gender`),
      fetch(`${masterApi}/drop-down/get/covidVaccination`),
      fetch(`${masterApi}/drop-down/get/education`),
    ];

    Promise.allSettled(requestParams)
      .then(async ([source, religion, marital, gender, covid, education]) => {
        const sourceResponse = source.value;
        const religionResponse = religion.value;
        const maritalResponse = marital.value;
        const genderResponse = gender.value;
        const covidResponse = covid.value;
        const educationResponse = education.value;
        return [
          await sourceResponse.json(),
          await religionResponse.json(),
          await maritalResponse.json(),
          await genderResponse.json(),
          await covidResponse.json(),
          await educationResponse.json(),
        ];
      })
      .then(([source, religion, marital, gender, covid, education]) =>
        setDropDownList({
          source: source?.data ?? [],
          religion: religion?.data ?? [],
          marital: marital?.data ?? [],
          gender: gender?.data ?? [],
          covid: covid?.data ?? [],
          education: education?.data ?? [],
        })
      );
    return () => localStorage.removeItem('ID');
  }, []);

  /**
   * @description update user profile
   * @param {object} requestBody
   * @param {boolean} [isNotify=true]
   */
  const handleProfile = async (
    requestBody,
    isNotify = true,
    isNext = false
  ) => {
    try {
      let response = await axios.post(
        'http://13.126.160.155:8080/user/worker/profile',
        { ...requestBody, ...(id || ID ? { userId: id || ID } : {}) }
      );
      if (isNotify) {
        const message = response.data.message;
        setNotify({ isOpen: message, message, type: 'success' });
      }
      if (isNext) setCurrentSteps(2);
    } catch (error) {
      setNotify({
        isOpen: true,
        message: error?.message ?? 'Server Error',
        type: 'error',
      });
    }
  };

  /**
   * @description handle auto save
   * @param {string} key
   * @param {string} value
   */
  const handleAutoSave = async (key, value) => {
    // check id - user id
    if (id || ID) {
      // get the validated form field
      const validated = await trigger(key);
      // check the form field
      if (validated) {
        // save value
        handleProfile({ ...updatedFormValues, [key]: value }, false);
      }
    }
  };

  /**
   * @description handle input change, check id and validate input then save value
   *
   */
  const handleInputChange = useCallback(debounce(handleAutoSave), []);

  /**
   * @description check user mobile number
   * @param {string | number} phoneNumber
   */
  const checkMobileNumber = async (phoneNumber) =>
    phoneNumber.length === 10
      ? await fetch(
          `http://13.126.160.155:8080/user/worker/checkProfile/${phoneNumber}?userId=${
            id || ID
          }`
        )
          .then((res) => res.json())
          .then((res) =>
            res.data
              ? setError('mobileNo', { message: res?.message ?? '' })
              : clearErrors('mobileNo')
          )
      : clearErrors('mobileNo');

  return (
    <>
      <Box>
        <Notify notify={notify} />
      </Box>
      <Box bgcolor='#e1e2e3' padding='20px' flex={7} minWidth={'90%'}>
        <Box
          marginTop={5}
          sx={{
            padding: 3,
            bgcolor: 'white',
            borderRadius: 3,
          }}
        >
          {updatedFormValues?.uuid ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'right',
                gap: '5px',
              }}
            >
              <h5>Saved</h5>
              <VerifiedIcon color='secondary' fontSize='13px' />
            </div>
          ) : null}

          <ThemeProvider theme={theme}>
            <form
              onSubmit={handleSubmit(handleProfile)}
              noValidate
              autoComplete='off'
            >
              <h5 style={{ marginBottom: '6px' }}>Personal Information</h5>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
                  <InputLabel required>Sourcing Channel</InputLabel>
                  <Controller
                    control={control}
                    name='sourcingChannel'
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <Select
                          {...getSelectProps(
                            'sourcingChannel',
                            'Sourcing Channel',
                            value,
                            error,
                            onChange,
                            handleProfile,
                            updatedFormValues,
                            id || ID
                          )}
                        >
                          {dropDownList.source.map((item) => (
                            <MenuItem key={item.key} value={item.value}>
                              {item.value}
                            </MenuItem>
                          ))}
                        </Select>
                        {error?.message ? (
                          <FormHelperText error={true}>
                            {error?.message}
                          </FormHelperText>
                        ) : null}
                      </>
                    )}
                  />
                </FormControl>
                <Controller
                  control={control}
                  name='otherSourcingChannel'
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      {...(updatedFormValues?.sourcingChannel === 'Others'
                        ? { required: true }
                        : {})}
                      sx={{ width: '18%' }}
                      disabled={updatedFormValues?.sourcingChannel !== 'Others'}
                      {...getInputProps(
                        'otherSourcingChannel',
                        'Other Source',
                        value,
                        '',
                        error,
                        onChange,
                        handleInputChange
                      )}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='firstName'
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      sx={{ width: '18%' }}
                      type='text'
                      {...getInputProps(
                        'firstName',
                        'First Name',
                        value,
                        '',
                        error,
                        onChange,
                        handleInputChange
                      )}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='lastName'
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      sx={{ width: '18%' }}
                      {...getInputProps(
                        'lastName',
                        'Last Name',
                        value,
                        '',
                        error,
                        onChange,
                        handleInputChange
                      )}
                    />
                  )}
                />
                <FormControl
                  sx={{ minWidth: 120, display: 'flex', width: '18%' }}
                  size='small'
                >
                  <InputLabel required id='demo-select-small'>
                    Gender
                  </InputLabel>
                  <Controller
                    control={control}
                    name='gender'
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <Select
                          {...getSelectProps(
                            'gender',
                            'Gender',
                            value,
                            error,
                            onChange,
                            handleProfile,
                            updatedFormValues,
                            id || ID
                          )}
                        >
                          {dropDownList.gender.map((item) => (
                            <MenuItem key={item.key} value={item.key}>
                              {item.value}
                            </MenuItem>
                          ))}
                        </Select>
                        {error?.message ? (
                          <FormHelperText error={true}>
                            {error?.message}
                          </FormHelperText>
                        ) : null}
                      </>
                    )}
                  />
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 4,
                }}
              >
                <Controller
                  control={control}
                  name='mobileNo'
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      type='number'
                      sx={{
                        width: '18%',
                        '& input[type=number]': {
                          '-moz-appearance': 'textfield',
                        },
                        '& input[type=number]::-webkit-outer-spin-button': {
                          '-webkit-appearance': 'none',
                          margin: 0,
                        },
                        '& input[type=number]::-webkit-inner-spin-button': {
                          '-webkit-appearance': 'none',
                          margin: 0,
                        },
                      }}
                      {...getInputProps(
                        'mobileNo',
                        'Phone Number',
                        value,
                        '',
                        error,
                        onChange,
                        handleInputChange,
                        checkMobileNumber
                      )}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='secondaryMobileNumber'
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      sx={{
                        width: '18%',
                        '& input[type=number]': {
                          '-moz-appearance': 'textfield',
                        },
                        '& input[type=number]::-webkit-outer-spin-button': {
                          '-webkit-appearance': 'none',
                          margin: 0,
                        },
                        '& input[type=number]::-webkit-inner-spin-button': {
                          '-webkit-appearance': 'none',
                          margin: 0,
                        },
                      }}
                      type='number'
                      onWheel={(e) => e.target.blur()}
                      {...getInputProps(
                        'secondaryMobileNumber',
                        'Alternate Phone Number',
                        value,
                        '',
                        error,
                        onChange,
                        handleInputChange
                      )}
                    />
                  )}
                />
                <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
                  <InputLabel required>Whatsapp Available?</InputLabel>
                  <Controller
                    control={control}
                    name='whatsappAvailable'
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <Select
                          {...getSelectProps(
                            'whatsappAvailable',
                            'Whatsapp Available',
                            value,
                            error,
                            onChange,
                            handleProfile,
                            updatedFormValues,
                            id || ID,
                            setValue,
                            {
                              key: 'whatsappNumber',
                              values: updatedFormValues,
                              getValue: getWhatsUp,
                            }
                          )}
                        >
                          {WhatsAppStatus.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {error?.message ? (
                          <FormHelperText error={true}>
                            {error?.message}
                          </FormHelperText>
                        ) : null}
                      </>
                    )}
                  />
                </FormControl>
                <Controller
                  control={control}
                  name='whatsappNumber'
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      {...(updatedFormValues?.whatsappAvailable ===
                        'mobileNumber' ||
                      updatedFormValues?.whatsappAvailable ===
                        'secondaryNumber' ||
                      updatedFormValues?.whatsappAvailable === 'otherNumber'
                        ? { required: true }
                        : {})}
                      sx={{
                        width: '18%',
                        '& input[type=number]': {
                          '-moz-appearance': 'textfield',
                        },
                        '& input[type=number]::-webkit-outer-spin-button': {
                          '-webkit-appearance': 'none',
                          margin: 0,
                        },
                        '& input[type=number]::-webkit-inner-spin-button': {
                          '-webkit-appearance': 'none',
                          margin: 0,
                        },
                      }}
                      type='number'
                      disabled={
                        updatedFormValues.whatsappAvailable === 'notAvailable'
                      }
                      {...getInputProps(
                        'whatsappNumber',
                        'Whatsapp Number',
                        value,
                        '',
                        error,
                        onChange,
                        handleInputChange
                      )}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='age'
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      sx={{
                        width: '18%',
                        '& input[type=number]': {
                          '-moz-appearance': 'textfield',
                        },
                        '& input[type=number]::-webkit-outer-spin-button': {
                          '-webkit-appearance': 'none',
                          margin: 0,
                        },
                        '& input[type=number]::-webkit-inner-spin-button': {
                          '-webkit-appearance': 'none',
                          margin: 0,
                        },
                      }}
                      type='number'
                      {...getInputProps(
                        'age',
                        'Age',
                        value,
                        '',
                        error,
                        onChange,
                        handleInputChange
                      )}
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 4,
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Controller
                    control={control}
                    name='birthday'
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <DesktopDatePicker
                        label='DOB'
                        value={value || ''}
                        disableFuture
                        onChange={async (dateValue) => {
                          onChange(dateValue);
                          handleInputChange('birthday', dateValue);
                          const validated = await trigger('birthday');
                          if (validated) {
                            setValue('age', getAge(dateValue));
                          } else {
                            setValue('age', '');
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            sx={{ width: '18%' }}
                            size='small'
                            error={error?.message ? true : false}
                            helperText={error?.message}
                          />
                        )}
                      />
                    )}
                  />
                </LocalizationProvider>
                <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
                  <InputLabel required>Marital Status</InputLabel>
                  <Controller
                    control={control}
                    name='maritalStatus'
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <Select
                          {...getSelectProps(
                            'maritalStatus',
                            'Marital Status',
                            value,
                            error,
                            onChange,
                            handleProfile,
                            updatedFormValues,
                            id || ID
                          )}
                        >
                          {dropDownList.marital.map((item) => (
                            <MenuItem key={item.key} value={item.key}>
                              {item.value}
                            </MenuItem>
                          ))}
                        </Select>
                        {error?.message ? (
                          <FormHelperText error={true}>
                            {error?.message}
                          </FormHelperText>
                        ) : null}
                      </>
                    )}
                  />
                </FormControl>
                <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
                  <InputLabel required>Religion</InputLabel>
                  <Controller
                    control={control}
                    name='religion'
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <Select
                          {...getSelectProps(
                            'religion',
                            'Religion',
                            value,
                            error,
                            onChange,
                            handleProfile,
                            updatedFormValues,
                            id || ID
                          )}
                        >
                          {dropDownList.religion.map((item) => (
                            <MenuItem key={item.key} value={item.key}>
                              {item.value}
                            </MenuItem>
                          ))}
                        </Select>
                        {error?.message ? (
                          <FormHelperText error={true}>
                            {error?.message}
                          </FormHelperText>
                        ) : null}
                      </>
                    )}
                  />
                </FormControl>
                <Controller
                  control={control}
                  name='otherReligion'
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      {...(updatedFormValues?.religion === 'OTHERS'
                        ? { required: true }
                        : {})}
                      sx={{ width: '18%' }}
                      disabled={updatedFormValues?.religion !== 'OTHERS'}
                      InputLabelProps={{ shrink: true }}
                      {...getInputProps(
                        'otherReligion',
                        'Other Religion',
                        value,
                        '',
                        error,
                        onChange,
                        handleInputChange
                      )}
                    />
                  )}
                />
                <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
                  <InputLabel id='demo-select-small'>
                    Educational Qualifications
                  </InputLabel>
                  <Controller
                    control={control}
                    name='education'
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <Select
                          {...getSelectProps(
                            'education',
                            'Educational Qualifications',
                            value,
                            error,
                            onChange,
                            handleProfile,
                            updatedFormValues,
                            id || ID
                          )}
                        >
                          {dropDownList.education.map((item) => (
                            <MenuItem key={item.key} value={item.key}>
                              {item.value}
                            </MenuItem>
                          ))}
                        </Select>
                        {error?.message ? (
                          <FormHelperText error={true}>
                            {error?.message}
                          </FormHelperText>
                        ) : null}
                      </>
                    )}
                  />
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 4,
                }}
              >
                <Controller
                  control={control}
                  name='educationalRemarks'
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      sx={{ width: '18%' }}
                      {...getInputProps(
                        'educationalRemarks',
                        'Educational Remarks',
                        value,
                        '',
                        error,
                        onChange,
                        handleInputChange
                      )}
                    />
                  )}
                />
                <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
                  <InputLabel required>COVID Vaccination Status</InputLabel>
                  <Controller
                    control={control}
                    name='covidStatus'
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <Select
                          {...getSelectProps(
                            'covidStatus',
                            'COVID Vaccination Status',
                            value,
                            error,
                            onChange,
                            handleInputChange,
                            updatedFormValues,
                            id || ID
                          )}
                        >
                          {dropDownList.covid.map((item) => (
                            <MenuItem key={item.key} value={item.key}>
                              {item.value}
                            </MenuItem>
                          ))}
                        </Select>
                        {error?.message ? (
                          <FormHelperText error={true}>
                            {error?.message}
                          </FormHelperText>
                        ) : null}
                      </>
                    )}
                  />
                </FormControl>
                <Controller
                  control={control}
                  name='medicalCondition'
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      sx={{ width: '59%' }}
                      {...getInputProps(
                        'medicalCondition',
                        'Medical Condition(if any)',
                        value,
                        '',
                        error,
                        onChange,
                        handleInputChange
                      )}
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'end',
                  height: '100px',
                  justifyContent: 'right',
                  gap: '20px',
                }}
              >
                <Button variant='contained' type='submit'>
                  Save
                </Button>
                <Button
                  variant='contained'
                  onClick={handleSubmit((fields) =>
                    handleProfile(fields, true, true)
                  )}
                >
                  next
                </Button>
              </Box>
            </form>
          </ThemeProvider>
        </Box>
      </Box>
    </>
  );
};

export default memo(PersonalInfo);
