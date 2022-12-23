/**************NPM DEPENDENCIES ***************/
import React, { useEffect, memo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  Box,
  TextField,
  CardContent,
  Card,
  Grid,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContentText,
  DialogContent,
  Button,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
/***************LOCAL DEPENDENCIES **************/
import { Axios } from '../../http';
import Auth from '../../auth/Auth';
import { get } from '../../store/action';
import { ENDPOINTS } from '../../config/api.config';
import { getDetails } from '../../store/selectors/auth.selector';
import { registrationSchema } from '../../utils/validation-schema.util';
import { MODULE_NAME, REGISTRATION_FORM_FIELDS, URLS } from './Auth.Config';

const AuthRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false);
  const [skill, setSkill] = useState('');
  // navigation
  const navigate = useNavigate();

  // dispatch
  const dispatch = useDispatch();

  // selector
  const [details] = useSelector((state) => [getDetails(state)], shallowEqual);

  // form instance
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: { ...REGISTRATION_FORM_FIELDS },
    resolver: yupResolver(registrationSchema),
  });

  // redirect to the navigate
  useEffect(() => {
    if (Auth.hasAccessToken()) {
      navigate('/');
    }
  }, [navigate]);

  // call the dropdown api
  useEffect(() => {
    dispatch(get(MODULE_NAME, URLS));
  }, [dispatch]);

  /**
   * @description check user mobile number
   * @param {string | number} phoneNumber
   */
  const checkMobileNumber = (phoneNumber) => {
    if (phoneNumber.length === 10) {
      Axios.get(`${ENDPOINTS.CHECK_MOBILE}${phoneNumber}`).then((res) =>
        res?.data?.data
          ? setError('mobileNo', { message: res?.data?.message ?? '' })
          : clearErrors('mobileNo')
      );
    } else {
      clearErrors('mobileNo');
    }
  };

  /**
   * @description
   * @param {*} [details={}]
   */
  const handleSave = (details = {}) => {
    setLoading(true);
    Axios.post(ENDPOINTS.USER_INTERNAL_ADD, details)
      .then((res) => res.data)
      .then((res) => {
        setLoading(false);
        setRegisteredSuccessfully(res?.status ?? false);
        reset({ ...REGISTRATION_FORM_FIELDS });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Grid
      sx={{
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <form
        onSubmit={handleSubmit((data) => handleSave(data))}
        noValidate
        autoComplete='off'
      >
        <Card sx={{ width: '350px', padding: '0px' }}>
          <CardContent>
            <Box
              sx={{
                fontSize: '22px',
                fontWeight: '900',
                color: '#BDBDBD',
                textAlign: 'center',
                justifyContent: 'center',
                margin: 'auto',
              }}
            >
              <NavLink to={'/'} style={{ padding: '20px' }}>
                <HomeIcon />
              </NavLink>{' '}
              Candidate Registration
            </Box>
            <Grid
              mt={0.5}
              container
              spacing={2.5}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                justifyContent: 'center',
              }}
              ml={-2}
            >
              <Grid lg={12} sm={12} sx={12} item>
                <TextField
                  sx={{
                    width: '200px',
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
                  placeholder='Phone Number'
                  variant='standard'
                  {...register('mobileNo', {
                    onChange: ({ target: { value } }) => {
                      setValue('mobileNo', value);
                      checkMobileNumber(value);
                    },
                  })}
                  error={errors?.mobileNo?.message ?? false}
                  helperText={errors?.mobileNo?.message ?? ''}
                />
              </Grid>

              <Grid lg={12} sm={12} sx={12} item>
                <TextField
                  sx={{ width: '200px' }}
                  type='text'
                  placeholder='First Name'
                  variant='standard'
                  {...register('firstName')}
                  error={errors?.firstName?.message ?? false}
                  helperText={errors?.firstName?.message ?? ''}
                />
              </Grid>

              <Grid lg={12} sm={12} sx={12} item>
                <TextField
                  sx={{ width: '200px' }}
                  size='small'
                  id='standard-size-small'
                  type='text'
                  placeholder='Last Name'
                  variant='standard'
                  {...register('lastName')}
                  error={errors?.lastName?.message ?? false}
                  helperText={errors?.lastName?.message ?? ''}
                />
              </Grid>

              <Grid lg={12} sm={12} sx={12} item>
                <Autocomplete
                  disablePortal
                  size='small'
                  id='combo-box-demo'
                  options={details?.gender ?? []}
                  onChange={(event, newValue) =>
                    setValue('gender', newValue.key)
                  }
                  renderInput={(params) => (
                    <TextField
                      sx={{ width: '200px' }}
                      variant='standard'
                      {...params}
                      placeholder='Gender'
                    />
                  )}
                  getOptionLabel={(item) => `${item.value}`}
                />
              </Grid>
              <Grid lg={12} sm={12} sx={12} item>
                <TextField
                  sx={{
                    width: '200px',
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
                  size='small'
                  id='standard-size-small'
                  type='number'
                  placeholder='Age (Years)'
                  variant='standard'
                  {...register('age')}
                  inputProps={{ min: 0, max: 90 }}
                />
              </Grid>
              <Grid lg={12} sm={12} sx={12} spacing={2.5} item>
                <Grid lg={12} sm={12} sx={12} item>
                  <Autocomplete
                    disablePortal
                    size='small'
                    id='combo-box-demo'
                    options={details?.skills ?? []}
                    onChange={(_event, newValue) => {
                      setSkill(newValue.name);
                      setValue('skillUuid', newValue.uuid);
                    }}
                    renderInput={(params) => (
                      <TextField
                        sx={{ width: '200px' }}
                        variant='standard'
                        {...params}
                        placeholder='Primary Skill'
                      />
                    )}
                    getOptionLabel={(item) => `${item.name}`}
                  />
                </Grid>

                <Grid mt={2.5} item>
                  <TextField
                    sx={{ width: '200px' }}
                    disabled={skill !== 'Others'}
                    size='small'
                    id='standard-size-small'
                    type='text'
                    placeholder='Other Skill'
                    variant='standard'
                    {...register('otherSkill')}
                  />
                </Grid>
              </Grid>
              <Grid lg={12} sm={12} sx={12} item>
                <Autocomplete
                  disablePortal
                  size='small'
                  id='combo-box-demo'
                  options={details?.city ?? []}
                  onChange={(_event, newValue) =>
                    setValue('city', newValue.uuid)
                  }
                  renderInput={(params) => (
                    <TextField
                      sx={{ width: '200px' }}
                      variant='standard'
                      {...params}
                      placeholder='City'
                    />
                  )}
                  getOptionLabel={(item) => `${item.cityName}`}
                />
              </Grid>

              <Grid lg={12} sm={12} sx={12} item>
                <Autocomplete
                  disablePortal
                  size='small'
                  id='combo-box-demo'
                  options={details?.microMarket ?? []}
                  onChange={(event, newValue) =>
                    setValue('micromarketUuid', newValue.uuid)
                  }
                  renderInput={(params) => (
                    <TextField
                      sx={{ width: '200px' }}
                      variant='standard'
                      {...params}
                      placeholder='Locality'
                    />
                  )}
                  getOptionLabel={(item) => `${item.microMarketName}`}
                />
              </Grid>

              <Grid lg={12} sm={12} sx={12} item>
                <Autocomplete
                  disablePortal
                  size='small'
                  id='combo-box-demo'
                  options={details?.workingHours ?? []}
                  onChange={(_event, newValue) =>
                    setValue('workingHours', newValue.key)
                  }
                  renderInput={(params) => (
                    <TextField
                      sx={{ width: '200px' }}
                      variant='standard'
                      {...params}
                      placeholder='Preferred Working Hours'
                    />
                  )}
                  getOptionLabel={(item) => `${item.value}`}
                />
              </Grid>

              <Grid lg={12} sm={12} sx={12} spacing={2.5} item>
                <Grid lg={12} sm={12} sx={12} item>
                  <Autocomplete
                    disablePortal
                    size='small'
                    id='combo-box-demo'
                    options={details?.religion ?? []}
                    onChange={(_event, newValue) =>
                      setValue('religion', newValue.key)
                    }
                    renderInput={(params) => (
                      <TextField
                        variant='standard'
                        sx={{ width: '200px' }}
                        {...params}
                        placeholder='Religion'
                      />
                    )}
                    getOptionLabel={(item) => `${item.value}`}
                  />
                </Grid>
                <Grid mt={2.5} item>
                  <TextField
                    sx={{ width: '200px' }}
                    disabled={getValues('religion') !== 'OTHERS'}
                    size='small'
                    id='standard-size-small'
                    type='text'
                    placeholder='Other Religion'
                    variant='standard'
                    {...register('otherReligion')}
                  />
                </Grid>
              </Grid>
              <Grid lg={12} sm={12} sx={12} item>
                <TextField
                  sx={{
                    width: '200px',
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
                  placeholder=' Partner Phone Number'
                  variant='standard'
                  {...register('partnerMobileNo')}
                  error={errors?.partnerMobileNo?.message ?? false}
                  helperText={errors?.partnerMobileNo?.message ?? ''}
                />
              </Grid>
            </Grid>
            <Grid
              mt={4}
              sx={{
                textAlign: 'center',
                justifyContent: 'center',
              }}
              item
            >
              <LoadingButton
                type='submit'
                sx={{ width: '200px' }}
                variant='contained'
                color='success'
                loading={loading}
              >
                Submit
              </LoadingButton>
            </Grid>
          </CardContent>
        </Card>
      </form>
      <Grid>
        <Dialog
          maxWidth='xs'
          open={registeredSuccessfully}
          onClose={() => setRegisteredSuccessfully(false)}
        >
          <DialogTitle>Registered</DialogTitle>
          <DialogContent>
            <DialogContentText>Profile Saved Successfully</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRegisteredSuccessfully(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default memo(AuthRegistration);
