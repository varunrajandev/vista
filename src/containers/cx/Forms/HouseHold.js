/***************NPM DEPENDENCIES ****************/
import axios from 'axios';
import { debounce } from 'lodash';
import { Box } from '@mui/system';
import { isEmpty, size } from 'lodash';
import React, { memo, useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  TextField,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { yupResolver } from '@hookform/resolvers/yup';
/*************LOCAL DEPENDENCIES **********/
import { Axios } from '../../../http';
import { HOUSE_HOLD_FORM_FIELDS } from '../../ycw/Ycw.Config';
import { ENDPOINTS } from '../../../config/api.config';
import ROUTE_CONFIG from '../../../config/route.config';
import Notify from '../../../components/Notification/Notify';
import StepperButtons from './../../../components/shared/stepper/button';
import { houseHoldFormSchema } from '../../../utils/validation-schema.util';
import DropDown from '../../../components/shared/DropDown';
import { convertEmptyStringIntoNull } from '../../../utils/helper.util';

// Destructuring
const {
  FAMILY_MEMBER,
  GET_ADDRESS_BY_ID,
  SKILLS,
  RELATION,
  YCW: { GET_BY_ID },
} = ENDPOINTS;

const HouseHoldInfo = ({ view }) => {
  // local state
  const [notify, setNotify] = useState({ message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [dropDownList, setDropDownList] = useState({
    relation: [],
    skills: [],
  });

  // get the id from params
  const { id, step } = useParams();

  // navigate
  const navigate = useNavigate();

  // form instance
  const {
    register,
    control,
    handleSubmit,
    reset,
    getValues,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      houseHold: [{ ...HOUSE_HOLD_FORM_FIELDS }],
      userId: null,
    },
    resolver: yupResolver(houseHoldFormSchema),
  });

  // get the updated fields
  const updatedFields = watch();

  // form field array
  const { fields, append, remove, update } = useFieldArray({
    name: 'houseHold',
    control,
  });

  // call api & get the details by id
  useEffect(() => {
    if (id) {
      Axios.get(`${GET_BY_ID}/${id}`)
        .then((res) => res.data)
        .then((res) =>
          reset({
            houseHold: res?.data?.familyMemberDto?.familyMemberDto ?? [
              { ...HOUSE_HOLD_FORM_FIELDS },
            ],
            userId: res?.data?.familyMemberDto?.userId ?? '',
          })
        );
    }
  }, [id, reset]);

  // call the related api
  useEffect(() => {
    axios.all([RELATION, SKILLS].map((url) => Axios.get(url))).then(
      axios.spread(({ data: relation }, { data: skills }) =>
        setDropDownList((prevState) => ({
          ...prevState,
          relation: relation?.data ?? [],
          skills: skills?.data ?? [],
        }))
      )
    );
  }, []);

  /**
   * @description
   * @param {*} value
   * @param {*} index
   */
  const handleAddress = (value, index) => {
    if (value !== 'null') {
      Axios.get(`${GET_ADDRESS_BY_ID}${id}?isPermanent=${value}`)
        .then((res) => res.data)
        .then((res) => {
          if (res?.status ?? false) {
            update(index, {
              ...updatedFields.houseHold[index],
              ...(res?.data ?? {}),
            });
          }
        });
    }
  };

  /**
   * @description
   * @param {boolean} [isNotify=false]
   * @param {boolean} [isNext=false]
   */
  const handleSave = (isNotify = false, isNext = false) => {
    setIsLoading(true);
    const updatedValues = { ...getValues() };
    Axios.post(FAMILY_MEMBER, {
      familyMemberDto:
        updatedValues?.houseHold.map((house) =>
          convertEmptyStringIntoNull(house)
        ) ?? [],
      userId: id,
    })
      .then((res) => res.data)
      .then((res) => {
        setIsLoading(false);
        if (res?.status ?? false) {
          if (isNext) {
            navigate(
              ROUTE_CONFIG.CX.EDIT(
                res?.data?.userId ?? '',
                parseInt(step || 3) + 1
              )
            );
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
   * @param {number} [currentIndex=0]
   */
  const checkMobileNo = (currentIndex = 0) =>
    !isEmpty(errors?.houseHold) && size(errors?.houseHold) !== 0
      ? errors?.houseHold[currentIndex]?.mobileNo?.message
      : '';

  return (
    <form onSubmit={handleSubmit(() => handleSave(true))}>
      <Notify notify={notify} />
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h5 style={{ marginBottom: '20px' }}>Household Members</h5>
        {!view ? (
          <div style={{ marginTop: '-20px' }}>
            <IconButton aria-label='delete'>
              <AddIcon
                sx={{
                  backgroundColor: 'purple',
                  color: 'white',
                  borderRadius: '50%',
                }}
                onClick={() => append({ ...HOUSE_HOLD_FORM_FIELDS })}
              />
            </IconButton>
            <span style={{ fontSize: '13px', fontWeight: 'bolder' }}>
              &nbsp; Add Household Members
            </span>
          </div>
        ) : null}
      </Box>
      {fields.map((field, index) => (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '30px',
            marginBottom: 5,
          }}
        >
          <TextField
            style={{ width: '18%' }}
            label='Name'
            size='small'
            value={updatedFields?.houseHold[index]?.name ?? ''}
            key={field.id}
            {...register(`houseHold.${index}.name`)}
            {...(view ? { variant: 'filled' } : {})}
            disabled={view}
          />
          <FormControl
            sx={{ minWidth: 120, width: '18%' }}
            size='small'
            {...(view ? { variant: 'filled' } : {})}
            disabled={view}
          >
            <InputLabel>Relationship</InputLabel>
            <>
              <DropDown
                sx={{ width: '100%' }}
                value={updatedFields?.houseHold[index]?.relationship ?? ''}
                label='Occupation'
                {...register(`houseHold.${index}.relationship`)}
                error={
                  errors?.houseHold?.[index]?.relationship?.message ?? false
                }
              >
                {dropDownList.relation.map((item) => (
                  <MenuItem value={item.key}>{item.value}</MenuItem>
                ))}
              </DropDown>
              {errors?.houseHold?.[index]?.relationship?.message ? (
                <FormHelperText error={true}>
                  {errors?.houseHold?.[index]?.relationship?.message}
                </FormHelperText>
              ) : null}
            </>
          </FormControl>
          <TextField
            size='small'
            sx={{ width: '18%' }}
            label='Others Relationship'
            value={updatedFields?.houseHold[index]?.otherrRlationship ?? ''}
            disabled={
              dropDownList.relation.some(
                (rel) =>
                  rel.key !== updatedFields?.houseHold[index]?.relationship &&
                  rel.value === 'Others'
              ) || view
            }
            {...register(`houseHold.${index}.otherrRlationship`)}
            {...(view ? { variant: 'filled' } : {})}
          />
          <TextField
            inputProps={{
              min: 0,
            }}
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
            label='Mobile Number'
            type='number'
            value={updatedFields?.houseHold[index]?.mobileNo ?? ''}
            size='small'
            {...register(`houseHold.${index}.mobileNo`)}
            error={checkMobileNo(index) || false}
            helperText={checkMobileNo(index) || ''}
            {...(view ? { variant: 'filled' } : {})}
            disabled={view}
          />
          <TextField
            inputProps={{
              min: 0,
            }}
            type='number'
            style={{ width: '18%' }}
            name='age'
            label='Age'
            value={updatedFields?.houseHold[index]?.age ?? ''}
            size='small'
            {...register(`houseHold.${index}.age`)}
            {...(view ? { variant: 'filled' } : {})}
            disabled={view}
          />
          <FormControl
            sx={{ minWidth: 120, width: '18%' }}
            size='small'
            {...(view ? { variant: 'filled' } : {})}
            disabled={view}
          >
            <InputLabel>Occupation</InputLabel>
            <DropDown
              sx={{ width: '100%' }}
              value={updatedFields?.houseHold[index]?.jobTypeUuid ?? ''}
              label='Occupation'
              {...register(`houseHold.${index}.jobTypeUuid`)}
            >
              {dropDownList.skills.map((item) => (
                <MenuItem value={item.name}>{item.name}</MenuItem>
              ))}
            </DropDown>
          </FormControl>
          <TextField
            label='Relative Job'
            size='small'
            value={updatedFields?.houseHold[index]?.otherJobType ?? ''}
            sx={{ width: '18%' }}
            disabled={
              updatedFields?.houseHold[index]?.jobTypeUuid === 'Others'
                ? false
                : true || view
            }
            {...register(`houseHold.${index}.otherJobType`)}
            {...(view ? { variant: 'filled' } : {})}
          />
          <FormControl
            sx={{ minWidth: 120, width: '18%' }}
            size='small'
            {...(view ? { variant: 'filled' } : {})}
            disabled={view}
          >
            <InputLabel>Address Type</InputLabel>
            <DropDown
              sx={{ width: '100%' }}
              name='addressType'
              value={updatedFields?.houseHold[index]?.addressType ?? ''}
              label='Address Type'
              {...register(`houseHold.${index}.addressType`, {
                onChange: ({ target: { value } }) =>
                  handleAddress(value, index),
              })}
            >
              <MenuItem value='false'>Same As Current Address</MenuItem>
              <MenuItem value='true'>Same As Permanent Address</MenuItem>
              <MenuItem value='null'>Other</MenuItem>
            </DropDown>
          </FormControl>
          <TextField
            style={{ width: '38.3%' }}
            label='Address/Locality'
            value={updatedFields?.houseHold[index]?.address ?? ''}
            size='small'
            {...register(`houseHold.${index}.address`)}
            {...(view ? { variant: 'filled' } : {})}
            disabled={view}
          />
          {index !== 0 && !view ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'right',
                width: '100%',
              }}
            >
              <IconButton>
                <DeleteIcon onClick={() => remove(index)} />
              </IconButton>
            </Box>
          ) : null}
        </Box>
      ))}
      {!view ? (
        <StepperButtons
          loading={isLoading}
          nextUrl={true}
          backUrl={ROUTE_CONFIG.CX.EDIT(id, parseInt(step || 3) - 1)}
          handleNext={handleSubmit(() => handleSave(false, true))}
        />
      ) : null}
    </form>
  );
};

// Default Export
export default memo(HouseHoldInfo);
