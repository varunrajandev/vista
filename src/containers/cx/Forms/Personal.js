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
import {
  PERSON_INFO_FORM_FIELDS,
  POST_PERSON_INFO_FORM_FIELDS,
} from './../Cx.Config';
import { Axios } from '../../../http';
import ROUTE_CONFIG from '../../../config/route.config';
import { ENDPOINTS } from '../../../config/api.config';
import { convertEmptyStringIntoNull } from '../../../utils/helper.util';
import DropDown from '../../../components/shared/DropDown';

// Destructuring
const {
  CX_SOURCE,
  PROFESSION,
  RELIGION,
  GENDER,
  YCW: { GET_PROFILE },
  CUSTOMER: { POST },
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
const PersonalInfo = ({ view }) => {
  // local state
  const [notify, setNotify] = useState({ message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [dropDownList, setDropDownList] = useState({
    source: [],
    profession: [],
    gender: [],
    religion: [],
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
      Axios.get(`${GET_PROFILE}${id}`)
        .then((res) => res.data)
        .then((res) =>
          reset(POST_PERSON_INFO_FORM_FIELDS({ ...(res?.data ?? {}) }))
        );
    }
  }, [id]);

  // call the drop down api
  useEffect(() => {
    axios
      .all(
        [CX_SOURCE, PROFESSION, RELIGION, GENDER].map((url) => Axios.get(url))
      )
      .then(
        axios.spread(
          (
            { data: source },
            { data: profession },
            { data: religion },
            { data: gender }
          ) =>
            setDropDownList((prevState) => ({
              ...prevState,
              source: source?.data ?? [],
              profession: profession?.data ?? [],
              religion: religion?.data ?? [],
              gender: gender?.data ?? [],
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
      ...convertEmptyStringIntoNull(updatedValues),
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
            ROUTE_CONFIG.CX.EDIT(
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
      Axios.get(
        `${CHECK_DUPLICATE_MOBILE}${phoneNumber}?userId=${id}&userType=CUSTOMER`
      ).then((res) =>
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
        <FormControl
          sx={{ minWidth: 120, width: '18%' }}
          size='small'
          {...(view ? { variant: 'filled' } : {})}
          disabled={view}
        >
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
              {...(view ? { variant: 'filled' } : {})}
              disabled={view}
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
              {...(view ? { variant: 'filled' } : {})}
              disabled={view}
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
              {...(view ? { variant: 'filled' } : {})}
              disabled={view}
            />
          )}
        />
        <FormControl
          sx={{ minWidth: 120, display: 'flex', width: '18%' }}
          size='small'
          {...(view ? { variant: 'filled' } : {})}
          disabled={view}
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
          alignItems: 'center',
          mt: 2,
        }}
      >
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
              {...(view ? { variant: 'filled' } : {})}
              disabled={view}
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
              {...(view ? { variant: 'filled' } : {})}
              disabled={view}
            />
          )}
        />
        <FormControl
          sx={{ minWidth: 120, width: '18%' }}
          size='small'
          {...(view ? { variant: 'filled' } : {})}
          disabled={view}
        >
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
                updatedFormValues?.whatsappAvailable === 'secondaryNumber' ||
                view
              }
              {...getInputProps(
                'whatsappNumber',
                'Whatsapp Number',
                value,
                '',
                error,
                onChange
              )}
              {...(view ? { variant: 'filled' } : {})}
            />
          )}
        />
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              type='text'
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
                onChange
              )}
              autoComplete='email'
              {...(view ? { variant: 'filled' } : {})}
              disabled={view}
            />
          )}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <FormControl
          sx={{ minWidth: 120, width: '18%', marginRight: '32px' }}
          size='small'
          {...(view ? { variant: 'filled' } : {})}
          disabled={view}
        >
          <InputLabel>Profession</InputLabel>
          <Controller
            control={control}
            name='professsion'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <DropDown
                  {...getDropDownProps(
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
                </DropDown>
              </>
            )}
          />
        </FormControl>
        <Controller
          control={control}
          name='otherProfession'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              sx={{ width: '18%', marginRight: '32px' }}
              type='text'
              {...getInputProps(
                'otherProfession',
                'Other Profession',
                value,
                '',
                error,
                onChange
              )}
              {...(view ? { variant: 'filled' } : {})}
              disabled={updatedFormValues?.professsion !== 'OTHERS' || view}
            />
          )}
        />
        <FormControl
          sx={{ minWidth: 120, width: '18%', marginRight: '32px' }}
          size='small'
          {...(view ? { variant: 'filled' } : {})}
          disabled={view}
        >
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
              disabled={updatedFormValues?.religion !== 'OTHERS' || view}
              InputLabelProps={{ shrink: true }}
              {...getInputProps(
                'otherReligion',
                'Other Religion',
                value,
                '',
                error,
                onChange
              )}
              {...(view ? { variant: 'filled' } : {})}
            />
          )}
        />
      </Box>
      {!view ? (
        <StepperButtons
          loading={isLoading}
          nextUrl={true}
          handleNext={handleSubmit(() => handleSave(false, true))}
        />
      ) : (
        <br />
      )}
    </form>
  );
};

// Default Export
export default memo(PersonalInfo);
