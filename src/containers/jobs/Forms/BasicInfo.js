/**************NPM DEPENDENCIES*****************/
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
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
  Select,
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

// Destructuring
const {
  SKILLS,
  GET_LANGUAGE,
  GENDER,
  RELIGION,
  TRAINING_TYPE,
  AGE_PREFERENCE,
  JOBS: { GET_BY_ID, POST },
} = ENDPOINTS;

const BasicInfo = ({ redirect }) => {
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
    setValue,
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
            { data: agePreference }
          ) =>
            setDropDownList((prevState) => ({
              ...prevState,
              skill: skill?.data ?? [],
              language: language?.data ?? [],
              gender: gender?.data ?? [],
              religion: religion?.data ?? [],
              training: trainingType?.data ?? [],
              age: agePreference?.data ?? [],
            }))
        )
      );
  }, []);

  // call api & get the job details by id
  useEffect(() => {
    if (id) {
      Axios.get(`${GET_BY_ID}${id}`)
        .then((res) => res.data)
        .then((res) => {
          if (res?.status ?? false) reset(res?.data ?? {});
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
    Axios.post(POST, {
      ...updatedValues,
      userId: '',
    })
      .then((res) => res.data)
      .then((res) => {
        setIsLoading(false);
        if (res?.status ?? false) {
          if (isNext) {
            navigate(ROUTE_CONFIG.CX.LIST);
          }
          if (isNotify) {
            setNotify({ message: res?.message ?? '' });
            setTimeout(() => setNotify({ message: '' }), 4000);
          }
          reset({ ...(res?.data ?? {}) });
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
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
      <Box sx={{ display: 'flex' }}>
        <Autocomplete
          // value={dropDownList.customer.filter(cus => cus.userId === updatedFields?.userId ?? '')[0]}
          sx={{ width: '25%', backgroundColor: 'white' }}
          freeSolo
          id='free-solo-2-demo'
          onChange={(_event, newValue) => setValue('userId', newValue?.userId ?? '')}
          disableClearable
          size='small'
          options={dropDownList?.customer ?? []}
          renderInput={(params) => (
            <Box sx={{ display: 'flex' }}>
              <TextField
                placeholder='Search Customer by Name & Mobile Number'
                onChange={(e) =>
                  e.target.value.length >= 3
                    ? handleChange(e.target.value)
                    : null
                }
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  autoComplete: 'userId',
                }}
                error={errors?.userId?.message ?? false}
                helperText={errors?.userId?.message ?? ''}
              />
            </Box>
          )}
          getOptionLabel={(item) =>
            item.name && item.mobile
              ? `${item.name}`
              : ''
          }
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 3,
        }}
      >
        <FormControl sx={{ minWidth: '18%' }} size='small'>
          <InputLabel id='demo-select-small'>Job Type</InputLabel>
          <Select
            sx={{ width: '100%' }}
            labelId='demo-select-small'
            id='demo-select-small'
            value={updatedFields?.skillUuid ?? ''}
            label='Job Type'
            {...register('skillUuid')}
            error={errors?.skillUuid?.message ?? false}
          >
            {dropDownList.skill.map((item) => (
              <MenuItem value={item.uuid}>{item.name}</MenuItem>
            ))}
          </Select>
          {errors?.skillUuid?.message ? (
            <FormHelperText error={true}>
              {errors?.skillUuid?.message}
            </FormHelperText>
          ) : null}
        </FormControl>

        <TextField
          sx={{ width: '18%' }}
          size='small'
          id='outlined-basic'
          label='Work Duration(in hours)'
          variant='outlined'
          value={updatedFields?.workingHours ?? ''}
          {...register('workingHours')}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label='Preferred Start Time'
            value={updatedFields?.startTime ?? ''}
            renderInput={(params) => (
              <TextField
                size='small'
                sx={{ width: '18%' }}
                {...{ ...params, error: errors?.startTime?.message ?? false }}
              />
            )}
            onChange={(time) => setValue('startTime', time)}
          />
        </LocalizationProvider>

        <TextField
          text='number'
          sx={{ width: '18%' }}
          size='small'
          id='outlined-basic'
          label='# Members in Family*'
          variant='outlined'
          value={updatedFields?.familyMember ?? ''}
          {...register('familyMember')}
          error={errors?.familyMember?.message ?? false}
          helperText={errors?.familyMember?.message ?? ''}
        />

        <FormControl sx={{ minWidth: '18%', display: 'flex' }} size='small'>
          <InputLabel id='demo-select-small'>Language Preference</InputLabel>
          <Select
            sx={{ width: '100%' }}
            labelId='demo-select-small'
            id='demo-select-small'
            value={updatedFields?.language ?? ''}
            label='Language Preference'
            {...register('language')}
          >
            {dropDownList.language.map((item) => (
              <MenuItem value={item.key}>{item.value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 3,
        }}
      >
        <FormControl sx={{ minWidth: '18%', display: 'flex' }} size='small'>
          <InputLabel id='demo-select-small'>Training Preference</InputLabel>
          <Select
            sx={{ width: '100%' }}
            labelId='demo-select-small'
            id='demo-select-small'
            value={updatedFields?.traingType ?? ''}
            label='Training Preference'
            {...register('traingType')}
          >
            {dropDownList.training.map((item) => (
              <MenuItem value={item.key}>{item.value}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: '18%', display: 'flex' }} size='small'>
          <InputLabel id='demo-select-small'>Religion Preference</InputLabel>
          <Select
            sx={{ width: '100%' }}
            labelId='demo-select-small'
            id='demo-select-small'
            value={updatedFields?.religion ?? ''}
            label='Religion Preference'
            {...register('religion')}
          >
            {dropDownList.religion.map((item) => (
              <MenuItem value={item.key}>{item.value}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: '18%' }} size='small'>
          <InputLabel id='demo-select-small'>Age Preference</InputLabel>
          <Select
            sx={{ width: '100%' }}
            labelId='demo-select-small'
            id='demo-select-small'
            label='Age Preference'
            value={updatedFields?.agePreference ?? ''}
            {...register('agePreference')}
          >
            {dropDownList.age.map((item) => (
              <MenuItem value={item.value}>{item.value}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: '18%' }} size='small'>
          <InputLabel id='demo-select-small'>Gender Preference</InputLabel>
          <Select
            sx={{ width: '100%' }}
            labelId='demo-select-small'
            id='demo-select-small'
            label='Gender Preference'
            value={updatedFields?.gender ?? ''}
            {...register('gender')}
          >
            {dropDownList.gender.map((item) => (
              <MenuItem value={item.key}>{item.value}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            disableFuture
            label='Require From Date'
            value={updatedFields?.startDate ?? ''}
            onChange={(time) => setValue('startDate', time)}
            renderInput={(params) => (
              <TextField
                {...{ ...params, error: errors?.startDate?.message ?? false }}
                size='small'
                sx={{ width: '18%' }}
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
          sx={{ width: '18%' }}
          size='small'
          id='outlined-basic'
          label='Budget (max.)'
          variant='outlined'
          value={updatedFields?.maxBudget ?? ''}
          {...register('maxBudget')}
        />

        <TextField
          sx={{ width: '18%' }}
          size='small'
          id='outlined-basic'
          label='Budget (min.)'
          variant='outlined'
          value={updatedFields?.minBudget ?? ''}
        />

        <TextField
          sx={{ width: '59%' }}
          size='small'
          id='outlined-basic'
          label='Remarks'
          variant='outlined'
          value={updatedFields?.jobDescription ?? ''}
          {...register('jobDescription')}
        />
        {/*  */}
      </Box>

      <h5 style={{ marginTop: '50px', marginBottom: '6px' }}>
        Additional Details
      </h5>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          sx={{ width: '18%' }}
          size='small'
          id='outlined-basic'
          label='Size of House(in sq. ft)'
          variant='outlined'
          value={updatedFields?.houseSize ?? ''}
          {...register('houseSize')}
        />

        <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
          <InputLabel id='demo-select-small'>Pets?*</InputLabel>
          <Select
            sx={{ width: '100%' }}
            labelId='demo-select-small'
            id='demo-select-small'
            label='Pets?'
            value={updatedFields?.pet}
            {...register('pet')}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ width: '18%' }}
          size='small'
          id='outlined-basic'
          label='No of Pets*'
          value={updatedFields?.petCount ?? ''}
          {...register('petCount')}
          disabled={!updatedFields?.pet}
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
          handleFinish={handleSubmit(() => handleSave(false, true))}
        />
      ) : (
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
            save
          </LoadingButton>
          <LoadingButton
            loading={isLoading}
            variant='contained'
            onClick={() => navigate(ROUTE_CONFIG.JOBS.LIST)}
          >
            close
          </LoadingButton>
        </Box>
      )}
    </form>
  );
};

// Default export
export default memo(BasicInfo);
