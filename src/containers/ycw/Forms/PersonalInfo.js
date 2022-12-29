/* eslint-disable react-hooks/exhaustive-deps */
/*****************NPM DEPENDENCIES ***************/
import axios from 'axios';
import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Box,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { debounce, size, isEmpty } from 'lodash';
import { useParams, useNavigate } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
/*****************LOCAL DEPENDENCIES ***************/
import { personalFormSchema } from './../../../utils/validation-schema.util';
import StepperButtons from './../../../components/shared/stepper/button';
import Notify from '../../../components/Notification/Notify';
import {
  GET_PROFILE,
  CHECK_DUPLICATE_MOBILE,
  WHATS_UP,
  PERSON_INFO_FORM_FIELDS,
  GET_WHATS_UP_MAPPER,
} from '../Ycw.Config';
import { Axios } from '../../../http';
import ROUTE_CONFIG from '../../../config/route.config';
import { ENDPOINTS } from '../../../config/api.config';
import DropDown from '../../../components/shared/DropDown';
import { convertEmptyStringIntoNull } from '../../../utils/helper.util';

// Destructuring
const { SOURCE, RELIGION, MARITAL_STATUS, GENDER, COVID, EDUCATION } =
  ENDPOINTS;

/**
 * @description update the select state & handle auto save
 * @param {string} key
 * @param {string} label
 * @param {string} value
 * @param {object} error
 * @param {function} onChangeFn
 * @param {function|null} [extraFn=null]
 * @param {object|null} [extraProps=null]
 */
const getDropDownProps = (
  key,
  label,
  value,
  error,
  onChangeFn,
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
  },
});

/**
 * @description update the input state & handle auto save
 * @param {string} key
 * @param {string} label
 * @param {string} value
 * @param {object} error
 * @param {function} onChangeFn
 * @param {function|null} extraFn
 */
const getInputProps = (
  key,
  label,
  value,
  placeholder,
  error,
  onChangeFn,
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
    if (extraFn) {
      extraFn(value);
    }
  },
});

/**
 * @description
 * @param {*}
 */
const PersonalInfo = () => {
  // local state
  const [notify, setNotify] = useState({ message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [dropDownList, setDropDownList] = useState({
    source: [],
    religion: [],
    marital: [],
    gender: [],
    covid: [],
    education: [],
  });

  // navigate
  const navigate = useNavigate();

  // param
  const { id, step } = useParams();

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
    getValues,
  } = useForm({
    defaultValues: { ...PERSON_INFO_FORM_FIELDS },
    resolver: yupResolver(personalFormSchema),
  });

  // get the updated form values
  const updatedFormValues = watch();

  /**
   * @description calculate the age
   * @param {string | date} birthDate
   */
  const getAge = (birthDate) =>
    new Date().getFullYear() - new Date(birthDate).getFullYear();

  /**
   * @description
   * @param {*} age
   * @param {*} date
   */
  const getDate = (age) => new Date(`01/01/${new Date().getFullYear() - age}`);

  // call the user details by id
  useEffect(() => {
    if (id) {
      Axios.get(`${GET_PROFILE.url}${id}`)
        .then((res) => res.data)
        .then((res) => reset(res?.data ?? {}));
    }
  }, [id]);

  // call the drop down api
  useEffect(() => {
    axios
      .all(
        [SOURCE, RELIGION, MARITAL_STATUS, GENDER, COVID, EDUCATION].map(
          (url) => Axios.get(url)
        )
      )
      .then(
        axios.spread(
          (
            { data: source },
            { data: religion },
            { data: marital },
            { data: gender },
            { data: covid },
            { data: education }
          ) =>
            setDropDownList((prevState) => ({
              ...prevState,
              source: source?.data ?? [],
              religion: religion?.data ?? [],
              marital: marital?.data ?? [],
              gender: gender?.data ?? [],
              covid: covid?.data ?? [],
              education: education?.data ?? [],
            }))
        )
      );
  }, []);

  /**
   * @description
   * @param {*} formFields
   * @param {boolean} [isNext=false]
   */
  const handleSave = (isNotify = false, isNext = false) => {
    setIsLoading(true);
    const updatedValues = convertEmptyStringIntoNull({ ...getValues() });
    Axios.post(GET_PROFILE.url, {
      ...updatedValues,
      isoCode: 'IN',
      nationality: 'INDIAN',
      userType: 'WORKER',
      secondaryMobileVerified: false,
      profileStatus: 'IN_ACTIVE',
      ...(id ? { userId: id } : {}),
    })
      .then((res) => res.data)
      .then((res) => {
        setIsLoading(false);
        if (res?.status ?? false) {
          if (isNotify) {
            setNotify({ message: res?.message ?? '' });
            setTimeout(() => {
              setNotify({ message: '' });
            }, 4000);
          }
          navigate(
            ROUTE_CONFIG.YCW.EDIT(
              res?.data?.userId ?? '',
              isNext ? parseInt(step || 1) + 1 : 1
            )
          );
        }
      })
      .catch(() => setIsLoading(false));
  };

  /**
   * @description handle input change, check id and validate input then save value
   *
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAutoSave = useCallback(debounce(handleSave, 500), []);

  /**
   * @description check user mobile number
   * @param {string | number} phoneNumber
   */
  const checkMobileNumber = (phoneNumber) => {
    setValue('whatsappAvailable', '');
    setValue('whatsappNumber', '');
    if (phoneNumber.length === 10) {
      Axios.get(`${CHECK_DUPLICATE_MOBILE}${phoneNumber}?userId=${id}&userType=WORKER`).then(
        (res) =>
          res?.data?.data
            ? setError('mobileNo', { message: res?.data?.message ?? '' })
            : clearErrors('mobileNo')
      );
    } else {
      clearErrors('mobileNo');
    }
  };

  // update data on change
  useEffect(() => {
    const subscription = watch(async (value, { name, type }) => {
      const userId = value?.userId ?? null;
      const conditions =
        !isEmpty(userId) &&
        !isEmpty(name) &&
        !isEmpty(type) &&
        (type === 'change' || type === 'click');
      if (conditions) {
        // get the validated form field
        const validated = await trigger(name);
        // check the form field
        if (validated) {
          // save value
          handleAutoSave();
        }
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <form
      onSubmit={handleSubmit(() => handleSave(true))}
      noValidate
      autoComplete='off'
    >
      <Notify notify={notify} />
      <h5 style={{ marginBottom: '20px' }}>Personal Information</h5>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
          <InputLabel>Sourcing Channel</InputLabel>
          <Controller
            control={control}
            name='sourcingChannel'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <DropDown
                  {...getDropDownProps(
                    'sourcingChannel',
                    'Sourcing Channel',
                    value,
                    error,
                    onChange
                  )}
                >
                  {dropDownList.source.map((item) => (
                    <MenuItem key={item.key} value={item.value}>
                      {item.value}
                    </MenuItem>
                  ))}
                </DropDown>
                {error?.message ? (
                  <FormHelperText error={true}>{error?.message}</FormHelperText>
                ) : null}
              </>
            )}
          />
        </FormControl>
        <Controller
          control={control}
          name='otherSourcingChannel'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              {...(updatedFormValues?.sourcingChannel === 'Others' ? {} : {})}
              // ? { required: true }
              sx={{ width: '18%' }}
              disabled={updatedFormValues?.sourcingChannel !== 'Others'}
              {...getInputProps(
                'otherSourcingChannel',
                'Other Source',
                value,
                '',
                error,
                onChange
              )}
            />
          )}
        />
        <Controller
          control={control}
          name='firstName'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              sx={{ width: '18%' }}
              type='text'
              {...getInputProps(
                'firstName',
                'First Name',
                value,
                '',
                error,
                onChange
              )}
            />
          )}
        />
        <Controller
          control={control}
          name='lastName'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              sx={{ width: '18%' }}
              {...getInputProps(
                'lastName',
                'Last Name',
                value,
                '',
                error,
                onChange
              )}
            />
          )}
        />
        <FormControl
          sx={{ minWidth: 120, display: 'flex', width: '18%' }}
          size='small'
        >
          <InputLabel id='demo-select-small'>Gender</InputLabel>
          <Controller
            control={control}
            name='gender'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <DropDown
                  {...getDropDownProps(
                    'gender',
                    'Gender',
                    value,
                    error,
                    onChange
                  )}
                >
                  {dropDownList.gender.map((item) => (
                    <MenuItem key={item.key} value={item.key}>
                      {item.value}
                    </MenuItem>
                  ))}
                </DropDown>
                {error?.message ? (
                  <FormHelperText error={true}>{error?.message}</FormHelperText>
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
            field: { onChange, onBlur, value },
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
                checkMobileNumber
              )}
              autoComplete='mobileNo'
            />
          )}
        />
        <Controller
          control={control}
          name='secondaryMobileNumber'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
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
                onChange
              )}
              autoComplete='secondary-mobileNo'
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }}
            />
          )}
        />
        <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
          <InputLabel>Whatsapp Available?</InputLabel>
          <Controller
            control={control}
            name='whatsappAvailable'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <DropDown
                  {...getDropDownProps(
                    'whatsappAvailable',
                    'Whatsapp Available',
                    value,
                    error,
                    onChange,
                    setValue,
                    {
                      key: 'whatsappNumber',
                      values: updatedFormValues,
                      getValue: GET_WHATS_UP_MAPPER,
                    }
                  )}
                >
                  {size(WHATS_UP)
                    ? WHATS_UP.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))
                    : null}
                </DropDown>
                {error?.message ? (
                  <FormHelperText error={true}>{error?.message}</FormHelperText>
                ) : null}
              </>
            )}
          />
        </FormControl>
        <Controller
          control={control}
          name='whatsappNumber'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              {...(updatedFormValues?.whatsappAvailable === 'mobileNumber' ||
              updatedFormValues?.whatsappAvailable === 'secondaryNumber' ||
              updatedFormValues?.whatsappAvailable === 'otherNumber'
                ? {}
                : {})}
              // ? { required: true }
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
                updatedFormValues.whatsappAvailable === 'notAvailable' ||
                updatedFormValues?.whatsappAvailable === 'mobileNumber' ||
                updatedFormValues?.whatsappAvailable === 'secondaryNumber'
              }
              {...getInputProps(
                'whatsappNumber',
                'Whatsapp Number',
                value,
                '',
                error,
                onChange
              )}
            />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            control={control}
            name='birthday'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DesktopDatePicker
                label='DOB'
                value={value || ''}
                disableFuture
                onChange={async (dateValue) => {
                  onChange(dateValue);
                  const validated = await trigger('birthday');
                  if (validated) {
                    setValue('age', getAge(dateValue));
                  } else {
                    setValue('age', '');
                  }
                }}
                renderInput={(params) => (
                  <TextField
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
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Controller
          control={control}
          name='age'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
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
              inputProps={{
                min: 0
              }}
              type='number'
              id='age'
              size='small'
              variant='outlined'
              label='Age'
              value={value || ''}
              error={error?.message ? true : false}
              helperText={error?.message ?? ''}
              onChange={({ target: { value } }) => {
                setValue('birthday', getDate(value));
                onChange(value);
              }}
            />
          )}
        />
        <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
          <InputLabel>Marital Status</InputLabel>
          <Controller
            control={control}
            name='maritalStatus'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <DropDown
                  {...getDropDownProps(
                    'maritalStatus',
                    'Marital Status',
                    value,
                    error,
                    onChange
                  )}
                >
                  {dropDownList.marital.map((item) => (
                    <MenuItem key={item.key} value={item.key}>
                      {item.value}
                    </MenuItem>
                  ))}
                </DropDown>
                {error?.message ? (
                  <FormHelperText error={true}>{error?.message}</FormHelperText>
                ) : null}
              </>
            )}
          />
        </FormControl>
        <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
          <InputLabel>Religion</InputLabel>
          <Controller
            control={control}
            name='religion'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <DropDown
                  {...getDropDownProps(
                    'religion',
                    'Religion',
                    value,
                    error,
                    onChange
                  )}
                >
                  {dropDownList.religion.map((item) => (
                    <MenuItem key={item.key} value={item.key}>
                      {item.value}
                    </MenuItem>
                  ))}
                </DropDown>
                {error?.message ? (
                  <FormHelperText error={true}>{error?.message}</FormHelperText>
                ) : null}
              </>
            )}
          />
        </FormControl>
        <Controller
          control={control}
          name='otherReligion'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              {...(updatedFormValues?.religion === 'OTHERS' ? {} : {})}
              // ? { required: true }
              sx={{ width: '18%' }}
              disabled={updatedFormValues?.religion !== 'OTHERS'}
              InputLabelProps={{ shrink: true }}
              {...getInputProps(
                'otherReligion',
                'Other Religion',
                value,
                '',
                error,
                onChange
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
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <DropDown
                  {...getDropDownProps(
                    'education',
                    'Educational Qualifications',
                    value,
                    error,
                    onChange
                  )}
                >
                  {dropDownList.education.map((item) => (
                    <MenuItem key={item.key} value={item.key}>
                      {item.value}
                    </MenuItem>
                  ))}
                </DropDown>
                {error?.message ? (
                  <FormHelperText error={true}>{error?.message}</FormHelperText>
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
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              sx={{ width: '18%' }}
              {...getInputProps(
                'educationalRemarks',
                'Educational Remarks',
                value,
                '',
                error,
                onChange
              )}
            />
          )}
        />
        <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
          <InputLabel>COVID Vaccination Status</InputLabel>
          <Controller
            control={control}
            name='covidStatus'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <DropDown
                  {...getDropDownProps(
                    'covidStatus',
                    'COVID Vaccination Status',
                    value,
                    error,
                    onChange
                  )}
                >
                  {dropDownList.covid.map((item) => (
                    <MenuItem key={item.key} value={item.key}>
                      {item.value}
                    </MenuItem>
                  ))}
                </DropDown>
                {error?.message ? (
                  <FormHelperText error={true}>{error?.message}</FormHelperText>
                ) : null}
              </>
            )}
          />
        </FormControl>
        <Controller
          control={control}
          name='medicalCondition'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              sx={{ width: '59%' }}
              {...getInputProps(
                'medicalCondition',
                'Medical Condition(if any)',
                value,
                '',
                error,
                onChange
              )}
            />
          )}
        />
      </Box>
      <StepperButtons
        loading={isLoading}
        nextUrl={true}
        handleNext={handleSubmit(() => handleSave(false, true))}
      />
    </form>
  );
};

// Default Export
export default memo(PersonalInfo);
