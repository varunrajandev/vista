/**************NPM DEPENDENCIES*****************/
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller } from 'react-hook-form';
import { isEmpty, debounce } from 'lodash';
import React, { useState, useEffect, memo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Box,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  Autocomplete,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { DesktopDatePicker } from '@mui/x-date-pickers';
/**************LOCAL DEPENDENCIES ****************/
import { Axios } from '../../../http';
import { ENDPOINTS } from '../../../config/api.config';
import { basicInfoFormSchema } from '../../../utils/validation-schema.util';
import ROUTE_CONFIG from '../../../config/route.config';
import StepperButtons from './../../../components/shared/stepper/button';
import Notify from '../../../components/Notification/Notify';
import { BASIC_INFO_FORM_FIELDS, USERS_URL } from '../Jobs.Config';
import DropDown from '../../../components/shared/DropDown';
import { convertEmptyStringIntoNull } from '../../../utils/helper.util';

// Destructuring
const {
  SKILLS,
  GET_LANGUAGE,
  GENDER,
  RELIGION,
  TRAINING_TYPE,
  AGE_PREFERENCE,
  JOBS: { GET_BY_ID, POST, UPDATE },
  WORKING_HOURS,
} = ENDPOINTS;

const BasicInfo = ({ redirect, view }) => {
  // local state
  const [notify, setNotify] = useState({ message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [dropDownList, setDropDownList] = useState({
    customer: [],
    skill: [],
    language: [],
    gender: [],
    training: [],
    age: [],
    religion: [],
    workingHours: [],
  });

  // navigate
  const navigate = useNavigate();

  // get the id from param
  let { id, step } = useParams();

  // form instance
  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { ...BASIC_INFO_FORM_FIELDS },
    resolver: yupResolver(basicInfoFormSchema),
  });

  // update watch
  const updatedFields = watch();

  // call the api
  useEffect(() => {
    axios
      .all(
        [
          SKILLS,
          GET_LANGUAGE,
          GENDER,
          RELIGION,
          TRAINING_TYPE,
          AGE_PREFERENCE,
          WORKING_HOURS,
        ].map((url) => Axios.get(url))
      )
      .then(
        axios.spread(
          (
            { data: skill },
            { data: language },
            { data: gender },
            { data: religion },
            { data: trainingType },
            { data: agePreference },
            { data: workingHours }
          ) =>
            setDropDownList((prevState) => ({
              ...prevState,
              skill: skill?.data ?? [],
              language: language?.data ?? [],
              gender: gender?.data ?? [],
              religion: religion?.data ?? [],
              training: trainingType?.data ?? [],
              age: agePreference?.data ?? [],
              workingHours: workingHours?.data ?? [],
            }))
        )
      );
  }, []);

  // call api & get the job details by id
  useEffect(() => {
    if (id) {
      const url = redirect ? `userId=${id}` : `jobId=${id}`;
      Axios.get(`${GET_BY_ID}?${url}`)
        .then((res) => res.data)
        .then((res) => {
          if (res?.status ?? false) {
            if (!redirect) {
              Axios.get(
                `${USERS_URL.url}${res?.data?.userId}&userType=CUSTOMER`
              )
                .then((r) => r.data)
                .then((r) => {
                  setDropDownList((prevState) => ({
                    ...prevState,
                    customer: r?.data ?? [],
                  }));
                  reset({ ...(res?.data ?? {}) });
                });
            } else {
              reset({ ...(res?.data ?? {}) });
            }
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, reset]);

  /**
   * @description
   * @param {boolean} [isNotify=false]
   * @param {boolean} [isNext=false]
   */
  const handleSave = (isNotify = false, isNext = false) => {
    const updatedValues = { ...getValues() };
    setIsLoading(true);
    const jobId = updatedValues?.jobId ?? '';
    Axios.post(jobId ? `${UPDATE}${jobId}` : POST, {
      ...convertEmptyStringIntoNull(updatedValues),
      customerFlow: redirect,
    })
      .then((res) => res.data)
      .then((res) => {
        setIsLoading(false);
        if (res?.status ?? false) {
          if (isNext) {
            navigate(ROUTE_CONFIG.CX.LIST);
          } else if (!redirect && isEmpty(jobId)) {
            navigate(ROUTE_CONFIG.JOBS.EDIT(res?.data?.jobId ?? '', 1));
          }
          if (isNotify) {
            setNotify({ message: res?.message ?? '' });
            setTimeout(() => setNotify({ message: '' }), 4000);
          }
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  // update data on change
  useEffect(() => {
    const subscription = watch(async (value, { name, type }) => {
      const jobId = value?.jobId ?? '';
      const conditions =
        !isEmpty(jobId) &&
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

  /** @type {*} */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAutoSave = useCallback(debounce(handleSave, 500), []);

  /**
   * @description
   * @param {string} value
   */
  const handleSearch = (value) =>
    Axios.get(`${USERS_URL.url}${value}&userType=CUSTOMER`)
      .then((res) => res.data)
      .then((res) =>
        setDropDownList((prevState) => ({
          ...prevState,
          customer: res?.data ?? [],
        }))
      );

  /** @type {*} */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = useCallback(debounce(handleSearch, 500), []);

  return (
    <form onSubmit={handleSubmit(() => handleSave(true))}>
      <Notify notify={notify} />
      <h5 style={{ marginBottom: '6px' }}>Personal Information</h5>
      {!redirect && (
        <Box sx={{ display: 'flex' }}>
          <Controller
            control={control}
            name='userId'
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              const customer =
                dropDownList?.customer?.filter(
                  (cus) => cus.userId === value
                )?.[0] ?? {};
              return (
                <Autocomplete
                  {...(view ? { variant: 'filled' } : {})}
                  disabled={view}
                  freeSolo
                  value={customer || {}}
                  sx={{ width: '25%', backgroundColor: 'white' }}
                  onChange={(_event, newValue) => onChange(newValue.userId)}
                  disableClearable
                  size='small'
                  options={dropDownList?.customer ?? []}
                  renderInput={(params) => (
                    <Box sx={{ display: 'flex' }}>
                      <TextField
                        {...params}
                        placeholder='Search Customer by Name'
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                          autoComplete: 'userId',
                        }}
                        onChange={({ target: { value } }) =>
                          value.length > 3 ? handleChange(value) : null
                        }
                        error={error?.message ?? false}
                        helperText={error?.message ?? ''}
                      />
                    </Box>
                  )}
                  getOptionLabel={(item) => item?.name ?? ''}
                />
              );
            }}
          />
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 3,
        }}
      >
        <FormControl
          sx={{ minWidth: '18%' }}
          size='small'
          {...(view ? { variant: 'filled' } : {})}
          disabled={view}
        >
          <InputLabel id='demo-select-small'>Job Type</InputLabel>
          <DropDown
            sx={{ width: '100%' }}
            labelId='demo-select-small'
            id='demo-select-small'
            value={updatedFields?.skillUuid ?? ''}
            label='Job Type'
            {...register('skillUuid')}
            error={errors?.skillUuid?.message ?? false}
          >
            {dropDownList.skill.map((item) => (
              <MenuItem key={item.uuid} value={item.uuid}>
                {item.name}
              </MenuItem>
            ))}
          </DropDown>
          {errors?.skillUuid?.message ? (
            <FormHelperText error={true}>
              {errors?.skillUuid?.message}
            </FormHelperText>
          ) : null}
        </FormControl>

        <FormControl
          sx={{ minWidth: '18%' }}
          size='small'
          {...(view ? { variant: 'filled' } : {})}
          disabled={view}
        >
          <InputLabel id='demo-select-small'>
            Working Duration (In Hours)
          </InputLabel>
          <DropDown
            sx={{ width: '100%' }}
            labelId='demo-select-small'
            id='demo-select-small'
            value={updatedFields?.workingHours ?? ''}
            label='Working Duration (In Hours)'
            {...register('workingHours')}
            error={errors?.workingHours?.message ?? false}
          >
            {dropDownList.workingHours.map((item) => (
              <MenuItem key={item.key} value={item.key}>
                {item.value}
              </MenuItem>
            ))}
          </DropDown>
          {errors?.workingHours?.message ? (
            <FormHelperText error={true}>
              {errors?.workingHours?.message}
            </FormHelperText>
          ) : null}
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            control={control}
            name='startTime'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TimePicker
                {...(view ? { variant: 'filled' } : {})}
                disabled={view}
                label='Preferred Start Time'
                value={value}
                onChange={(time) => onChange(time)}
                renderInput={(params) => (
                  <TextField
                    size='small'
                    sx={{ width: '18%' }}
                    {...params}
                    error={error?.message ?? false}
                  />
                )}
              />
            )}
          />
        </LocalizationProvider>

        <TextField
          inputProps={{
            min: 0,
          }}
          {...(view ? { variant: 'filled' } : { variant: 'outlined' })}
          disabled={view}
          type='number'
          sx={{ width: '18%' }}
          size='small'
          id='outlined-basic'
          label='Members in Family'
          value={updatedFields?.familyMember ?? ''}
          {...register('familyMember')}
          error={errors?.familyMember?.message ?? false}
          helperText={errors?.familyMember?.message ?? ''}
        />

        <FormControl
          sx={{ minWidth: '18%', display: 'flex' }}
          size='small'
          {...(view ? { variant: 'filled' } : {})}
          disabled={view}
        >
          <InputLabel id='demo-select-small'>Language Preference</InputLabel>
          <DropDown
            sx={{ width: '100%' }}
            labelId='demo-select-small'
            id='demo-select-small'
            value={updatedFields?.language ?? ''}
            label='Language Preference'
            {...register('language')}
          >
            {dropDownList.language.map((item) => (
              <MenuItem key={item.key} value={item.key}>
                {item.value}
              </MenuItem>
            ))}
          </DropDown>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 3,
        }}
      >
        <FormControl
          sx={{ minWidth: '18%', display: 'flex' }}
          size='small'
          {...(view ? { variant: 'filled' } : {})}
          disabled={view}
        >
          <InputLabel id='demo-select-small'>Training Preference</InputLabel>
          <DropDown
            sx={{ width: '100%' }}
            labelId='demo-select-small'
            id='demo-select-small'
            value={updatedFields?.traingType ?? ''}
            label='Training Preference'
            {...register('traingType')}
          >
            {dropDownList.training.map((item) => (
              <MenuItem key={item.key} value={item.key}>
                {item.value}
              </MenuItem>
            ))}
          </DropDown>
        </FormControl>

        <FormControl
          sx={{ minWidth: '18%', display: 'flex' }}
          size='small'
          {...(view ? { variant: 'filled' } : {})}
          disabled={view}
        >
          <InputLabel id='demo-select-small'>Religion Preference</InputLabel>
          <DropDown
            sx={{ width: '100%' }}
            labelId='demo-select-small'
            id='demo-select-small'
            value={updatedFields?.religion ?? ''}
            label='Religion Preference'
            {...register('religion')}
          >
            {dropDownList.religion.map((item) => (
              <MenuItem key={item.key} value={item.key}>
                {item.value}
              </MenuItem>
            ))}
          </DropDown>
        </FormControl>

        <FormControl
          sx={{ minWidth: '18%' }}
          size='small'
          {...(view ? { variant: 'filled' } : {})}
          disabled={view}
        >
          <InputLabel id='demo-select-small'>Age Preference</InputLabel>
          <DropDown
            sx={{ width: '100%' }}
            labelId='demo-select-small'
            id='demo-select-small'
            label='Age Preference'
            value={updatedFields?.agePreference ?? ''}
            {...register('agePreference')}
          >
            {dropDownList.age.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.value}
              </MenuItem>
            ))}
          </DropDown>
        </FormControl>

        <FormControl
          sx={{ minWidth: '18%' }}
          size='small'
          {...(view ? { variant: 'filled' } : {})}
          disabled={view}
        >
          <InputLabel id='demo-select-small'>Gender Preference</InputLabel>
          <DropDown
            sx={{ width: '100%' }}
            labelId='demo-select-small'
            id='demo-select-small'
            label='Gender Preference'
            value={updatedFields?.gender ?? ''}
            {...register('gender')}
          >
            {dropDownList.gender.map((item) => (
              <MenuItem key={item.key} value={item.key}>
                {item.value}
              </MenuItem>
            ))}
          </DropDown>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            control={control}
            name='startDate'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DesktopDatePicker
                disabled={view}
                disableFuture
                label='From Date'
                value={value}
                onChange={(date) => onChange(date)}
                renderInput={(params) => (
                  <TextField
                    {...{ ...params, error: error?.message ?? false }}
                    size='small'
                    sx={{ width: '18%' }}
                    helperText={error?.message ?? ''}
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
          mt: 3,
        }}
      >
        <TextField
          inputProps={{
            min: 0,
          }}
          {...(view ? { variant: 'filled' } : { variant: 'outlined' })}
          disabled={view}
          type='number'
          sx={{ width: '18%' }}
          size='small'
          id='outlined-basic'
          label='Budget (max.)'
          value={updatedFields?.maxBudget ?? ''}
          {...register('maxBudget')}
        />

        <TextField
          inputProps={{
            min: 0,
          }}
          {...(view ? { variant: 'filled' } : { variant: 'outlined' })}
          disabled={view}
          type='number'
          sx={{ width: '18%' }}
          size='small'
          id='outlined-basic'
          label='Budget (min.)'
          value={updatedFields?.minBudget ?? ''}
          {...register('minBudget')}
        />

        <TextField
          sx={{ width: '59%' }}
          size='small'
          id='outlined-basic'
          label='Remarks'
          value={updatedFields?.jobDescription ?? ''}
          {...register('jobDescription')}
          disabled={view}
          {...(view ? { variant: 'filled' } : { variant: 'outlined' })}
        />
        {/*  */}
      </Box>

      <h5 style={{ marginTop: '50px', marginBottom: '6px' }}>
        Additional Details
      </h5>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          type='number'
          sx={{ width: '18%' }}
          size='small'
          id='outlined-basic'
          label='Size of House(in sq. ft)'
          variant='outlined'
          value={updatedFields?.houseSize ?? ''}
          {...register('houseSize')}
          inputProps={{
            min: 0,
          }}
          disabled={view}
          {...(view ? { variant: 'filled' } : {})}
        />

        <FormControl
          sx={{ minWidth: 120, width: '18%' }}
          size='small'
          {...(view ? { variant: 'filled' } : {})}
          disabled={view}
        >
          <InputLabel id='demo-select-small'>Pets?</InputLabel>
          <DropDown
            sx={{ width: '100%' }}
            labelId='demo-select-small'
            id='demo-select-small'
            label='Pets?'
            value={updatedFields?.pet ?? ''}
            {...register('pet')}
          >
            <MenuItem key='pets-yes' value={true}>
              Yes
            </MenuItem>
            <MenuItem key='pets-no' value={false}>
              No
            </MenuItem>
          </DropDown>
        </FormControl>

        <TextField
          inputProps={{
            min: 0,
          }}
          {...(view ? { variant: 'filled' } : {})}
          type='number'
          sx={{ width: '18%' }}
          size='small'
          id='outlined-basic'
          label='No of Pets'
          value={updatedFields?.petCount ?? ''}
          {...register('petCount')}
          disabled={!updatedFields?.pet || view}
        />

        <div style={{ width: '18%' }}></div>
        <div style={{ width: '18%' }}></div>
      </Box>
      {redirect ? (
        <StepperButtons
          loading={isLoading}
          nextUrl={false}
          backUrl={ROUTE_CONFIG.CX.EDIT(id, parseInt(step || 3) - 1)}
          finishUrl={true}
          handleFinish={handleSubmit(() => handleSave(true, true))}
        />
      ) : null}
      {!redirect && !view ? (
        <Box
          marginTop={4}
          sx={{
            display: 'flex',
            alignItems: 'end',
            height: '40px',
            justifyContent: 'right',
            gap: '20px',
          }}
        >
          <LoadingButton loading={isLoading} variant='contained' type='submit'>
            {isEmpty(id) ? 'Save' : 'Update'}
          </LoadingButton>
          <LoadingButton
            loading={isLoading}
            variant='contained'
            onClick={() =>
              navigate(redirect ? ROUTE_CONFIG.CX.LIST : ROUTE_CONFIG.JOBS.LIST)
            }
          >
            close
          </LoadingButton>
        </Box>
      ) : null}
    </form>
  );
};

// Default export
export default memo(BasicInfo);
