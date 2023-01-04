/**************NPM DEPENDENCIES*****************/
import axios from 'axios';
import { get } from 'lodash';
import { isEmpty } from 'lodash';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect, memo, useCallback } from 'react';
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
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { filter, size, debounce } from 'lodash';
/**************LOCAL DEPENDENCIES ****************/
import { Axios } from '../../../http';
import { ENDPOINTS } from '../../../config/api.config';
import { JOB_INFO_FORM_FIELDS, YEAR, MONTHS } from '../Ycw.Config';
import { jobFormSchema } from '../../../utils/validation-schema.util';
import ROUTE_CONFIG from '../../../config/route.config';
import StepperButtons from './../../../components/shared/stepper/button';
import Notify from '../../../components/Notification/Notify';
import DropDown from '../../../components/shared/DropDown';
import { convertEmptyStringIntoNull } from '../../../utils/helper.util';

// Destructuring
const { GET_JOB, SKILLS, WORKING_HOURS, TRAINING_MODE, LEFT_JOB, SKILL_BY_ID } =
  ENDPOINTS;

const JobInfo = () => {
  // local state
  const [notify, setNotify] = useState({ message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [dropDownList, setDropDownList] = useState({
    leftJob: [],
    skills: [],
    workingHours: [],
    trainingMode: [],
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
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: { ...JOB_INFO_FORM_FIELDS },
    resolver: yupResolver(jobFormSchema),
  });

  // update watch
  const updatedFields = watch();

  const getDisabledKey = (listKey, findKey, findValue, value) => {
    const updatedList = filter(dropDownList[listKey], [[findKey], value]);
    if (!isEmpty(updatedList) && size(updatedList) !== 0) {
      return updatedList[0]?.[findValue] ?? '';
    } else {
      return '';
    }
  };

  // call the api
  useEffect(() => {
    axios
      .all(
        [SKILLS, LEFT_JOB, WORKING_HOURS, TRAINING_MODE].map((url) =>
          Axios.get(url)
        )
      )
      .then(
        axios.spread(
          (
            { data: skills },
            { data: leftJob },
            { data: workingHours },
            { data: trainingMode }
          ) =>
            setDropDownList((prevState) => ({
              ...prevState,
              leftJob: leftJob?.data ?? [],
              skills: skills?.data ?? [],
              workingHours: workingHours?.data ?? [],
              trainingMode: trainingMode?.data ?? [],
            }))
        )
      );
  }, []);

  // call api & get the job details by id
  useEffect(() => {
    if (id) {
      Axios.get(`${GET_JOB}${id}`)
        .then((res) => res.data)
        .then((res) => {
          if (isEmpty(res.data)) {
            Axios.get(`${SKILL_BY_ID}${id}`)
              .then((sRes) => sRes.data)
              .then((skillRes) =>
                reset({
                  ...updatedFields,
                  skillUuid: get(
                    skillRes,
                    'data.skillsMappingDto.0.skillDto.0.uuid',
                    ''
                  ),
                  // endTime: new Date(new Date().setHours(12, 0, 0)),
                })
              );
          } else {
            reset(res.data);
          }
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues, id, reset]);

  /**
   * @description
   * @param {boolean} [isNotify=false]
   * @param {boolean} [isNext=false]
   */
  const handleSave = (isNotify = false, isNext = false) => {
    const updatedValues = { ...getValues() };
    setIsLoading(true);
    Axios.post(GET_JOB, {
      ...convertEmptyStringIntoNull(updatedValues),
      userExperienceRequestDto: convertEmptyStringIntoNull(updatedValues.userExperienceRequestDto),
      userId: id,
      openToTiming: updatedValues.openToTraining,
    })
      .then((res) => res.data)
      .then((res) => {
        setIsLoading(false);
        if (res?.status ?? false) {
          if (isNext) {
            navigate(
              ROUTE_CONFIG.YCW.EDIT(
                res?.data?.userId ?? '',
                parseInt(step || 3) + 1
              )
            );
          }
          if (isNotify) {
            setNotify({ message: res?.message ?? '' });
            setTimeout(() => setNotify({ message: '' }), 4000);
          }
          reset({...res?.data ?? {}})
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
      const conditions = !isEmpty(userId) && !isEmpty(name) && !isEmpty(type) && (type === 'change' || type === "click");
      if (conditions){
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

  return (
    <form onSubmit={handleSubmit(() => handleSave(true))}>
      <Notify notify={notify} />
      <h5 style={{ marginBottom: '20px' }}>Job Requirements</h5>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
          <InputLabel id='demo-select-small'>Preferred Job Types</InputLabel>
          <DropDown
            sx={{ width: '100%' }}
            label='Preferred Job Types'
            value={updatedFields?.skillUuid ?? ''}
            {...register(`skillUuid`)}
            error={errors?.skillUuid?.message ? true : false}
          >            
            {dropDownList.skills.map((item) => (
              <MenuItem value={item.uuid}>{item.name}</MenuItem>
            ))}
          </DropDown>
          {errors?.skillUuid?.message ? (
            <FormHelperText error={true}>
              {errors?.skillUuid?.message ?? ''}
            </FormHelperText>
          ) : null}
        </FormControl>
        <TextField
          label='Prefer Job Others'
          size='small'
          sx={{ width: '18%' }}
          value={updatedFields?.otherSkillUuid ?? ''}
          InputLabelProps={{ shrink: true }}
          disabled={
            getDisabledKey(
              'skills',
              'uuid',
              'name',
              updatedFields?.skillUuid
            ) === 'Others'
              ? false
              : true
          }
          {...register('otherSkillUuid')}
        />
        <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
          <InputLabel id='demo-select-small'>
            Preferred Working Hours
          </InputLabel>
          <DropDown
            sx={{ width: '100%' }}
            label='Preferred Working Hours'
            value={updatedFields?.workingHours ?? ''}
            {...register('workingHours')}
            error={errors?.workingHours?.message ?? false}
          >
            {dropDownList.workingHours.map((item) => (
              <MenuItem value={item.key}>{item.value}</MenuItem>
            ))}
          </DropDown>
          {errors?.workingHours?.message ? (
            <FormHelperText error={true}>
              {errors?.workingHours?.message ?? ''}
            </FormHelperText>
          ) : null}
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label='Preferred Start Time'
            value={updatedFields?.startTime ?? ''}
            onChange={(time) => setValue('startTime', time)}
            renderInput={(params) => (
              <TextField
                size='small'
                sx={{ width: '18%' }}
                {...{ ...params, error: errors?.startTime?.message ?? false }}
                helperText={errors?.startTime?.message ?? ''}
              />
            )}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label='Preferred End Time'
            value={updatedFields?.endTime ?? ''}
            onChange={(time) => setValue('endTime', time)}
            renderInput={(params) => (
              <TextField
                size='small'
                sx={{ width: '18%' }}
                {...{ ...params, error: errors?.endTime?.message ?? false }}
                helperText={errors?.endTime?.message ?? ''}
              />
            )}
          />
        </LocalizationProvider>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 4,
        }}
      >
        <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
          <InputLabel>Cycle/Bike available for travel?</InputLabel>
          <DropDown
            sx={{ width: '100%' }}
            label='Cycle/Bike available for travel?'
            {...register('vehicle')}
            value={updatedFields?.vehicle ?? ''}
          >
            <MenuItem value={'Cycle'}>Cycle</MenuItem>
            <MenuItem value={'Two_Wheeler'}>Two-Wheeler</MenuItem>
            <MenuItem value={'Three_Wheeler'}>Three-Wheeler</MenuItem>
            <MenuItem value={'Four_Wheeler'}>Four-Wheeler</MenuItem>
            <MenuItem value={'Not_Available'}>Not Available</MenuItem>
          </DropDown>
        </FormControl>
        {/* </Box> */}
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
          size='small'
          label='Last Salary Withdraw'
          variant='outlined'
          value={updatedFields?.minSalaryExpected ?? ''}
          {...register('minSalaryExpected')}
        />
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
          size='small'
          label='Expected Salary [max]'
          variant='outlined'
          value={updatedFields?.maxSalaryExpected ?? ''}
          {...register('maxSalaryExpected')}
        />
        <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
          <InputLabel id='demo-select-small'>Open to Training?</InputLabel>
          <DropDown
            sx={{ width: '100%' }}
            labelId='demo-select-small'
            id='demo-select-small'
            label='Open to Training?'
            value={updatedFields?.openToTraining ?? ''}
            {...register('openToTraining', {
              onChange: () => setValue("traningMode", null)
            })}
          >
            <MenuItem value='yes'>Yes</MenuItem>
            <MenuItem value='no'>No</MenuItem>
            <MenuItem value='maybe'>Maybe</MenuItem>
          </DropDown>
        </FormControl>
        <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
          <InputLabel id='demo-select-small'>Training Mode</InputLabel>
          <DropDown
            error={errors?.traningMode?.message ?? false}
            sx={{ width: '100%' }}
            label='Training Mode'
            disabled={updatedFields.openToTraining === 'no'}
            value={updatedFields?.traningMode ?? ''}
            {...register('traningMode')}
          >
            {dropDownList.trainingMode.map((item) => (
              <MenuItem value={item.key}>{item.value}</MenuItem>
            ))}
          </DropDown>
          {errors?.traningMode?.message ? (
            <FormHelperText error={true}>
              {errors?.traningMode?.message ?? ''}
            </FormHelperText>
          ) : null}
        </FormControl>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          mt: 4,
        }}
      >
        <TextField
          sx={{ width: '18%' }}
          size='small'
          label='Job Remarks'
          variant='outlined'
          {...register('jobRemarks')}
          value={updatedFields?.jobRemarks ?? ''}
        />
        <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
          <InputLabel>Total Experience (years)</InputLabel>
          <DropDown
            sx={{ width: '100%' }}
            label='Total Experience (years)'
            {...register('userExperienceRequestDto.totalExperienceYears')}
            value={
              updatedFields?.userExperienceRequestDto?.totalExperienceYears ??
              ''
            }
          >
            {YEAR.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </DropDown>
        </FormControl>
        <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
          <InputLabel id='demo-select-small'>
            Total Experience (months)
          </InputLabel>
          <DropDown
            sx={{ width: '100%' }}
            label='Total Experience (months)'
            {...register('userExperienceRequestDto.totalExperienceMonths')}
            value={
              updatedFields?.userExperienceRequestDto?.totalExperienceMonths ??
              ''
            }
          >
            {MONTHS.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </DropDown>
        </FormControl>
        <TextField
          label='Experience Remarks'
          size='small'
          sx={{ width: '18%' }}
          value={
            updatedFields?.userExperienceRequestDto?.experienceRemarks ?? ''
          }
          {...register('userExperienceRequestDto.experienceRemarks')}
        />
        <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
          <InputLabel id='demo-select-small'>Last Job Type</InputLabel>
          <DropDown
            sx={{ width: '100%' }}
            label='Last Job Type'
            {...register('userExperienceRequestDto.jobTypeUuid')}
            value={updatedFields?.userExperienceRequestDto?.jobTypeUuid ?? ''}
          >
            {dropDownList.skills.map((item) => (
              <MenuItem value={item.uuid}>{item.name}</MenuItem>
            ))}
          </DropDown>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 4,
        }}
      >
        <TextField
          label='Last Job Type Others'
          size='small'
          InputLabelProps={{ shrink: true }}
          sx={{ width: '18%' }}
          disabled={
            getDisabledKey(
              'skills',
              'uuid',
              'name',
              updatedFields?.userExperienceRequestDto?.jobTypeUuid
            ) === 'Others'
              ? false
              : true
          }
          {...register('userExperienceRequestDto.otherJobTypeUuid')}
          value={
            updatedFields?.userExperienceRequestDto?.otherJobTypeUuid ?? ''
          }
        />
        <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
          <InputLabel id='demo-select-small'>
            Last Job Duration (years)
          </InputLabel>
          <DropDown
            sx={{ width: '100%' }}
            label='Last Job Duration (years)'
            {...register('userExperienceRequestDto.jobDurationYears')}
            value={
              updatedFields?.userExperienceRequestDto?.jobDurationYears ?? ''
            }
          >
            {YEAR.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </DropDown>
        </FormControl>
        <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
          <InputLabel id='demo-select-small'>
            Last Job Duration (months)
          </InputLabel>
          <DropDown
            sx={{ width: '100%' }}
            label='Last Job Duration (months)'
            {...register('userExperienceRequestDto.jobDurationMonths')}
            value={
              updatedFields?.userExperienceRequestDto?.jobDurationMonths ?? ''
            }
          >
            {MONTHS.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </DropDown>
        </FormControl>
        <FormControl sx={{ minWidth: 120, width: '18%' }} size='small'>
          <InputLabel id='demo-select-small'>
            Reason For Leaving Last Job
          </InputLabel>
          <DropDown
            sx={{ width: '100%' }}
            label='Last Job Duration (months)'
            {...register('userExperienceRequestDto.reasonForLeavingJob')}
            value={
              updatedFields?.userExperienceRequestDto?.reasonForLeavingJob ?? ''
            }
          >
            {dropDownList.leftJob.map((item) => (
              <MenuItem value={item.key}>{item.value}</MenuItem>
            ))}
          </DropDown>
        </FormControl>
        <TextField
          label='Reason For Leaving Last Job Others'
          size='small'
          sx={{ width: '18%' }}
          InputLabelProps={{ shrink: true }}
          disabled={
            getDisabledKey(
              'leftJob',
              'key',
              'value',
              updatedFields?.userExperienceRequestDto?.reasonForLeavingJob
            ) === 'Others'
              ? false
              : true
          }
          {...register('userExperienceRequestDto.otherReasonForLeavingJob')}
          value={
            updatedFields?.userExperienceRequestDto?.otherReasonForLeavingJob ??
            ''
          }
        />
      </Box>
      <StepperButtons
        loading={isLoading}
        nextUrl={true}
        backUrl={ROUTE_CONFIG.YCW.EDIT(id, parseInt(step || 3) - 1)}
        handleNext={handleSubmit(() => handleSave(false, true))}
      />
    </form>
  );
};

// Default Export
export default memo(JobInfo);
