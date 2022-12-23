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
  Select,
  FormHelperText,
} from '@mui/material';
import { debounce, size, isEmpty } from 'lodash';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
/*****************LOCAL DEPENDENCIES ***************/
import { perFormSchema } from './../../../utils/validation-schema.util';
import StepperButtons from './../../../components/shared/stepper/button';
import Notify from '../../../components/Notification/Notify';
import {
  CHECK_DUPLICATE_MOBILE,
  WHATS_UP,
  GET_WHATS_UP_MAPPER,
} from '../../ycw/Ycw.Config';
import { PERSON_INFO_FORM_FIELDS } from './../Cx.Config';
import { Axios } from '../../../http';
import ROUTE_CONFIG from '../../../config/route.config';
import { ENDPOINTS } from '../../../config/api.config';

// Destructuring
const {
  CX_SOURCE,
  PROFESSION,
  CUSTOMER: { GET_BY_ID, POST },
} = ENDPOINTS;

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
const getSelectProps = (
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
    profession: [],
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
    resolver: yupResolver(perFormSchema),
  });

  // get the updated form values
  const updatedFormValues = watch();

  // call the user details by id
  useEffect(() => {
    if (id) {
      Axios.get(`${GET_BY_ID}${id}`)
        .then((res) => res.data)
        .then((res) => reset(res?.data ?? {}));
    }
  }, [id]);

  // call the drop down api
  useEffect(() => {
    axios.all([CX_SOURCE, PROFESSION].map((url) => Axios.get(url))).then(
      axios.spread(({ data: source }, { data: profession }) =>
        setDropDownList((prevState) => ({
          ...prevState,
          source: source?.data ?? [],
          profession: profession?.data ?? [],
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
    const updatedValues = { ...getValues() };
    Axios.post(POST, {
      ...updatedValues,
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
      Axios.get(`${CHECK_DUPLICATE_MOBILE}${phoneNumber}?userId=${id}`).then(
        (res) =>
          res?.data?.data
            ? setError('mobileNo', { message: res?.data?.message ?? '' })
            : clearErrors('mobileNo')
      );
    } else {
      clearErrors('mobileNo');
    }
  };
  console.log(dropDownList, 'dropDownList');
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
          <InputLabel required>Sourcing Channel</InputLabel>
          <Controller
            control={control}
            name='sourcingChannel'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select
                  {...getSelectProps(
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
                </Select>
                {error?.message ? (
                  <FormHelperText error={true}>{error?.message}</FormHelperText>
                ) : null}
              </>
            )}
          />
        </FormControl>
        <Controller
          control={control}
          name='firstName'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
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
                onChange
              )}
            />
          )}
        />
        <Controller
          control={control}
          name='middleName'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              sx={{ width: '18%' }}
              {...getInputProps(
                'middleName',
                'Middle Name',
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
        <Controller
          control={control}
          name='mobileNo'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
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
                  .slice(0, 6);
              }}
            />
          )}
        />
        <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
          <InputLabel required>Whatsapp Available?</InputLabel>
          <Controller
            control={control}
            name='whatsappAvailable'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select
                  {...getSelectProps(
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
                </Select>
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
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
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
                'email',
                'Email ID',
                value,
                '',
                error,
                onChange,
                checkMobileNumber
              )}
              autoComplete='email'
            />
          )}
        />
        <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
          <InputLabel>Profession</InputLabel>
          <Controller
            control={control}
            name='professsion'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select
                  {...getSelectProps(
                    'professsion',
                    'Profession',
                    value,
                    error,
                    onChange
                  )}
                >
                  {dropDownList.profession.map((item) => (
                    <MenuItem key={item.key} value={item.key}>
                      {item.value}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
          />
        </FormControl>
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
