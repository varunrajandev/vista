/* eslint-disable react-hooks/exhaustive-deps */
/*******************NPM DEPENDENCIES **************** */
import axios from 'axios';
import {
  Box,
  TextField,
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import React, { memo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { isEmpty, size, get } from 'lodash';
/*******************LOCAL DEPENDENCIES **************** */
import { Axios } from '../../../http';
import SkillQuestion from './SkillQuestion';
import { ENDPOINTS } from '../../../config/api.config';
import { SKILL_INFO_FORM_FIELDS } from '../Ycw.Config';
import Notify from '../../../components/Notification/Notify';
import StepperButtons from './../../../components/shared/stepper/button';
import { skillsFormSchema } from '../../../utils/validation-schema.util';
import ROUTE_CONFIG from '../../../config/route.config';
import DropDown from '../../../components/shared/DropDown';
import { convertEmptyStringIntoNull } from '../../../utils/helper.util';

//Destructuring
const { SKILL_BY_ID, SAVE_SKILL, GET_LANGUAGE, SKILLS } = ENDPOINTS;

const SkillInfo = () => {
  // local state
  const [notify, setNotify] = useState({ message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [dropDownList, setDropDownList] = useState({
    primarySkill: [],
    secondarySkill: [],
    tertiarySkill: [],
    primaryLanguage: [],
    otherLanguage: [],
  });

  // get the id from params
  const { id, step } = useParams();

  // form instance
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      ...SKILL_INFO_FORM_FIELDS,
    },
    resolver: yupResolver(skillsFormSchema),
  });

  // update form fields
  const updatedFormValues = watch();

  // call api & get the details by id
  useEffect(() => {
    if (id) {
      handleSkillById();
    }
  }, [id, reset]);

  /**
   * @description
   */
  const handleSkillById = () => {
    Axios.get(`${SKILL_BY_ID}${id}`)
      .then((res) => res.data)
      .then((res) => {
        handleSkill(get(res, 'data.skillsMappingDto[0].skillDto[0].uuid', ''));
        handleSkill(
          get(res, 'data.skillsMappingDto[0].skillDto[0].uuid', ''),
          get(res, 'data.skillsMappingDto[1].skillDto[0].uuid', '')
        );
        handleLanguage(res?.data?.primaryLanguage ?? '');
        reset({
          userId: res?.data?.userId ?? '',
          otherLanguage: res?.data?.otherLanguage ?? [],
          primaryLanguage: res?.data?.primaryLanguage ?? null,
          skillRemarks: res?.data?.skillRemarks ?? '',
          primarySkill: get(
            res,
            'data.skillsMappingDto[0].skillDto[0].uuid',
            null
          ),
          secondarySkill: get(
            res,
            'data.skillsMappingDto[1].skillDto[0].uuid',
            ''
          ),
          tertiarySkill: get(res, 'data.skillsMappingDto[2].skillDto', []),
          answers: res?.data?.skillsMappingDto ?? [],
        });
      });
  };

  // call the related api
  useEffect(() => {
    axios
      .all([`${SKILLS}?skill`, GET_LANGUAGE].map((url) => Axios.get(url)))
      .then(
        axios.spread(({ data: skill }, { data: language }) =>
          setDropDownList((prevState) => ({
            ...prevState,
            primarySkill: skill?.data ?? [],
            primaryLanguage: language?.data ?? [],
          }))
        )
      );
  }, []);

  /**
   * @description
   * @param {*} primarySkill
   * @param {string} [secondarySkill='']
   */
  const handleSkill = (primarySkill, secondarySkill = '') =>
    Axios.get(`${SKILLS}?skill=${primarySkill},${secondarySkill}`)
      .then((res) => res.data)
      .then((res) =>
        setDropDownList((prevState) => ({
          ...prevState,
          ...(secondarySkill
            ? { tertiarySkill: res?.data ?? [] }
            : { secondarySkill: res?.data ?? [] }),
        }))
      );

  /**
   * @description
   * @param {*} primaryLanguage
   */
  const handleLanguage = (primaryLanguage) =>
    Axios.get(`${GET_LANGUAGE}=${primaryLanguage}`)
      .then((res) => res.data)
      .then((res) =>
        setDropDownList((prevState) => ({
          ...prevState,
          otherLanguage: res?.data ?? [],
        }))
      );

  /**
   * @description
   * @param {*} data
   */
  const handleSave = (isNotify = false) => {
    const updatedFields = { ...getValues() };
    setIsLoading(true);
    const requestBody = convertEmptyStringIntoNull({
      otherLanguage: updatedFields?.otherLanguage ?? null,
      primaryLanguage: updatedFields?.primaryLanguage ?? null,
      skillRemarks: updatedFields?.skillRemarks ?? '',
      skillRequestDtos: [
        {
          skillLevel: 'PRIMARY',
          skillUuid: [updatedFields?.primarySkill ?? ""],
        },
        {
          skillLevel: 'SECONDARY',
          skillUuid: [updatedFields?.secondarySkill ?? ''],
        },
        {
          skillLevel: 'TERTIARY',
          skillUuid:
            !isEmpty(updatedFields?.tertiarySkill) &&
            size(updatedFields?.tertiarySkill) !== 0
              ? updatedFields?.tertiarySkill.map((t) => t.uuid)
              : [],
        },
      ],
      userId: id,
    });
    Axios.post(SAVE_SKILL, requestBody)
      .then((res) => res.data)
      .then((res) => {
        if (res?.status ?? false) {
          if (isNotify) {
            setNotify({ message: res?.message ?? '' });
            setTimeout(() => setNotify({ message: '' }), 4000);
            handleSkillById();
          }
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(() => handleSave(true))}>
        <Notify notify={notify} />
        <h5 style={{ marginBottom: '20px' }}>Skill and Language Details</h5>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            rowGap: '30px',
            justifyContent: 'space-between',
          }}
        >
          <FormControl sx={{ minWidth: 120, width: '20%' }} size='small'>
            <InputLabel id='demo-select-small'>Primary Skill</InputLabel>
            <DropDown
              sx={{ width: '100%' }}
              label='Primary Skill'
              value={updatedFormValues?.primarySkill ?? ''}
              {...register('primarySkill', {
                onChange: ({ target: { value } }) => handleSkill(value),
              })}
              error={errors?.primarySkill?.message ? true : false}
            >
              {dropDownList.primarySkill.map((items, index) => (
                <MenuItem key={index} value={items.uuid}>
                  {items.name}
                </MenuItem>
              ))}
            </DropDown>
            {errors?.primarySkill?.message ? (
              <FormHelperText error={true}>
                {errors?.primarySkill?.message ?? ''}
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl sx={{ minWidth: 120, width: '30%' }} size='small'>
            <InputLabel id='demo-select-small'>Secondary Skill</InputLabel>
            <DropDown
              sx={{ width: '100%' }}
              {...register('secondarySkill', {
                onChange: ({ target: { value } }) =>
                  handleSkill(updatedFormValues?.primarySkill ?? '', value),
              })}
              value={updatedFormValues?.secondarySkill ?? ''}
              label='Secondary Skill'
              error={errors?.secondarySkill ? true : false}
            >
              {dropDownList.secondarySkill.map((items, index) => (
                <MenuItem key={index} value={items.uuid}>
                  {items.name}
                </MenuItem>
              ))}
            </DropDown>
            {errors?.secondarySkill?.message ? (
              <FormHelperText error={true}>
                {errors?.secondarySkill?.message}
              </FormHelperText>
            ) : null}
          </FormControl>
          <Autocomplete
            multiple
            disableCloseOnDropDown
            size='small'
            sx={{ width: '45%' }}
            options={dropDownList?.tertiarySkill ?? []}
            value={updatedFormValues.tertiarySkill.map((item) => item)}
            getOptionLabel={(option) => option?.name ?? ''}
            // {...register('tertiarySkill')}
            onChange={(_e, updatedValue) =>
              setValue('tertiarySkill', updatedValue)
            }
            renderInput={(params) => (
              <TextField {...params} label='Tertiary Skill' />
            )}
          />
          <TextField
            label='Skill Remarks'
            sx={{ width: '40%' }}
            size='small'
            variant='outlined'
            value={updatedFormValues?.skillRemarks ?? ''}
            {...register('skillRemarks')}
          />
          <FormControl sx={{ minWidth: 120, width: '20%' }} size='small'>
            <InputLabel>Primary Language</InputLabel>
            <DropDown
              sx={{ width: '100%' }}
              {...register('primaryLanguage', {
                onChange: ({ target: { value } }) => handleLanguage(value),
              })}
              label='Primary Language'
              value={updatedFormValues?.primaryLanguage ?? ''}
              error={errors?.primaryLanguage ? true : false}
            >
              {dropDownList.primaryLanguage.map((items, index) => (
                <MenuItem key={index} value={items.key}>
                  {items.value}
                </MenuItem>
              ))}
            </DropDown>
            {errors?.primaryLanguage?.message ? (
              <FormHelperText error={true}>
                {errors?.primaryLanguage?.message}
              </FormHelperText>
            ) : null}
          </FormControl>
          <Autocomplete
            multiple
            disableCloseOnDropDown
            size='small'
            sx={{ width: '35%' }}
            options={dropDownList.otherLanguage}
            getOptionLabel={(option) => option?.value ?? ''}
            value={updatedFormValues?.otherLanguage ?? [].map((item) => item)}
            // {...register('otherLanguage')}
            onChange={(_e, updatedValue) =>
              setValue('otherLanguage', updatedValue)
            }
            renderInput={(params) => (
              <TextField {...params} label='Other Languages' />
            )}
          />
        </Box>
        <StepperButtons
          loading={isLoading}
          nextUrl={false}
          backUrl={ROUTE_CONFIG.YCW.EDIT(id, parseInt(step || 2) - 1)}
        />
      </form>
      {updatedFormValues?.userId && (
        <Box>
          <SkillQuestion
            id={id}
            step={step}
            answers={updatedFormValues?.answers ?? {}}
            handleCall={() => handleSkillById()}
          />
        </Box>
      )}
    </>
  );
};

// Default Export
export default memo(SkillInfo);
