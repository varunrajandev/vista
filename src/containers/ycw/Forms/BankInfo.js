/****************NPM DEPENDENCIES *****************/
import { Box } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect, memo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Button,
  LinearProgress,
  FormHelperText,
} from '@mui/material';
import { useForm, useFieldArray } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Switch from '@mui/material/Switch';
import { yupResolver } from '@hookform/resolvers/yup';
import { debounce, isEmpty, omit, size } from 'lodash';
import styled from '@emotion/styled';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
/****************LOCAL DEPENDENCIES *****************/
import { Axios } from '../../../http';
import { BANK_INFO_FORM_FIELDS } from '../Ycw.Config';
import { ENDPOINTS } from '../../../config/api.config';
import ROUTE_CONFIG from '../../../config/route.config';
import { requestQuery } from '../../../utils/request.util';
import Notify from '../../../components/Notification/Notify';
import { bankFormSchema } from '../../../utils/validation-schema.util';
import StepperButtons from './../../../components/shared/stepper/button';
import { prePareBankResponse } from '../../../utils/helper.util';
import DropDown from '../../../components/shared/DropDown';

// Styled Component
const Div2 = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

// Destructuring
const {
  BANK,
  GET_BANK,
  GET_BANK_DETAILS,
  GET_ACCOUNT_TYPE,
  DOCUMENT_TYPE,
  DOCUMENT_UPLOAD,
} = ENDPOINTS;

const BankInfo = () => {
  // local state
  const [notify, setNotify] = useState({ message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [dropDownList, setDropDownList] = useState({
    accountType: [],
    documentType: [],
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
    setValue,
    watch,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bank: [{ ...BANK_INFO_FORM_FIELDS }],
      userId: null,
    },
    resolver: yupResolver(bankFormSchema),
    mode: 'all',
  });

  // update fields from form
  const updatedFields = watch();

  // form field array
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'bank',
  });

  // call the drop down api
  useEffect(() => {
    axios
      .all(
        [GET_ACCOUNT_TYPE, `${DOCUMENT_TYPE}=bank`].map((url) => Axios.get(url))
      )
      .then(
        axios.spread(({ data: accountType }, { data: documentType }) =>
          setDropDownList((prevState) => ({
            ...prevState,
            accountType: accountType?.data ?? [],
            documentType: documentType?.data ?? [],
          }))
        )
      );
  }, []);

  // call api by id
  useEffect(() => {
    if (id) {
      Axios.get(`${GET_BANK}${id}`)
        .then((res) => res.data)
        .then((res) =>
          reset({
            bank: prePareBankResponse(
              res?.data?.bankResponse ?? [{ ...BANK_INFO_FORM_FIELDS }]
            ),
            userId: res?.data?.userId ?? '',
          })
        );
    }
  }, [id, reset]);

  /**
   * @description
   * @param {*} checked
   * @param {*} index
   */
  const handleSwitch = (checked, index) =>
    setValue(
      'bank',
      updatedFields.bank.map((bankDetails, ind) =>
        index === ind
          ? { ...bankDetails, primary: checked }
          : { ...bankDetails, primary: false }
      )
    );

  /**
   * @description
   * @param {*} ifsc
   */
  const handleIfsc = (ifsc, index) =>
    Axios.get(`${GET_BANK_DETAILS}${ifsc}`)
      .then((res) => res.data)
      .then((res) => {
        if (res?.data ?? false) {
          const updatedFormValues = getValues();
          setValue(
            'bank',
            updatedFormValues.bank.map((bank, ind) =>
              index === ind
                ? {
                    ...bank,
                    ...(res?.data ?? {}),
                  }
                : bank
            )
          );
        }
      });

  /**
   * @description
   * @param {boolean} [isNotify=false]
   * @param {boolean} [isNext=false]
   */
  const handleSave = (isNotify = false, isNext = false) => {
    setIsLoading(true);
    const updatedValues = { ...getValues() };
    Axios.post(BANK, {
      bankDetailsResponse: [
        ...updatedValues?.bank.map((bankDetails) => ({
          ...omit(bankDetails, [
            'proofType',
            'file',
            'loading',
            'documentResponseDto',
            'filePath',
            'fileName',
            'uuid',
          ]),
        })),
      ],
      userId: id || '',
    })
      .then((res) => res.data)
      .then((res) => {
        setIsLoading(false);
        if (res?.status ?? false) {
          if (isNotify) {
            setNotify({ message: res?.message ?? '' });
            setTimeout(() => setNotify({ message: '' }), 4000);
          }
          if (isNext) {
            navigate(ROUTE_CONFIG.YCW.LIST);
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
      let ifscCode = undefined;
      if (!isEmpty(name)) {
        ifscCode = name.split('.');
        ifscCode = size(ifscCode) ? ifscCode[2] : null;
      }
      const conditions =
        !isEmpty(userId) &&
        !isEmpty(name) &&
        !isEmpty(type) &&
        (type === 'change' || type === 'click') &&
        ifscCode !== 'ifscCode';

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

  /** @type {*} */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleIfscCode = useCallback(debounce(handleIfsc, 500), []);

  /**
   * @description
   * @param {*} file
   * @param {*} stateName
   */
  const handleFileUpload = (index, file, isReuploaded) => {
    setValue(`bank.${index}.loading`, true);
    if (id) {
      const document = new FormData();
      document.append('document', file);
      Axios.post(
        `${DOCUMENT_UPLOAD}?${requestQuery({
          UserId: id,
          documentContext: 'BANK',
          documentSide: 'FRONT',
          documentType: updatedFields?.bank[index]?.proofType ?? '',
          documentNo: updatedFields?.bank[index]?.accountNumber ?? '',
          isActive: true,
          isReuploaded,
        })}`,
        document
      )
        .then((res) => res.data)
        .then((res) => {
          if (res?.status ?? false) {
            setNotify({ message: res?.message ?? '' });
            setTimeout(() => setNotify({ message: '' }), 4000);
            if (updatedFields?.userId ?? '') {
              Axios.get(`${GET_BANK}${id}`)
                .then((res) => res.data)
                .then((res) =>
                  reset({
                    bank: prePareBankResponse(
                      res?.data?.bankResponse ?? [
                        { ...BANK_INFO_FORM_FIELDS },
                      ]
                    ),
                    userId: res?.data?.userId ?? '',
                  })
                );
            } else {
              setValue(`bank.${index}.file`, res?.data?.fileUrl ?? '');
              setValue(`bank.${index}.fileName`, res?.data?.fileName ?? '');
            }
          }
          setValue(`bank.${index}.loading`, false);
        })
        .catch(() => {
          setValue(`bank.${index}.loading`, false);
        });
    }
  };

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
        <h5 style={{ marginBottom: '20px' }}>Bank Account information</h5>
        <div style={{ marginTop: '-20px' }}>
          <IconButton>
            <AddIcon
              sx={{
                backgroundColor: 'purple',
                color: 'white',
                borderRadius: '50%',
              }}
              onClick={() => append({ ...BANK_INFO_FORM_FIELDS })}
            />
          </IconButton>
          <span style={{ fontSize: '13px', fontWeight: 'bolder' }}>
            &nbsp; Add a new bank account
          </span>
        </div>
      </Box>
      {fields.map((field, index) => (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            rowGap: '30px',
            justifyContent: 'space-between',
            marginBottom: 5,
          }}
          key={field.id}
        >
          <TextField
            key={`${field.id}_${field.ifscCode}`}
            style={{ width: '18%' }}
            label='IFSC Code'
            value={updatedFields?.bank[index]?.ifscCode ?? ''}
            size='small'
            {...register(`bank.${index}.ifscCode`, {
              onChange: ({ target: { value } }) => handleIfscCode(value, index),
            })}
            error={errors?.bank?.[index]?.ifscCode?.message ?? false}
            helperText={errors?.bank?.[index]?.ifscCode?.message ?? false}
          />
          <TextField
            key={`${field.id}_${field.bankName}`}
            style={{ width: '18%' }}
            label='Name of the the Bank'
            size='small'
            value={updatedFields?.bank[index]?.bankName ?? ''}
            {...register(`bank.${index}.bankName`)}
          />
          <TextField
            key={`${field.id}_${field.branchName}`}
            style={{ width: '18%' }}
            label='Branch Name'
            placeholder='Branch Name'
            value={updatedFields?.bank[index]?.branchName ?? ''}
            size='small'
            {...register(`bank.${index}.branchName`)}
          />
          <TextField
            key={`${field.id}_${field.branchAddress}`}
            style={{ width: '38.5%' }}
            label='Branch Address'
            value={updatedFields?.bank[index]?.branchAddress ?? ''}
            size='small'
            {...register(`bank.${index}.branchAddress`)}
          />
          <FormControl sx={{ minWidth: 120, width: '18%' }} size='small' key={`${field.id}_${field.accountType}`}>
            <InputLabel>Type of Account</InputLabel>
            <DropDown
              sx={{ width: '100%' }}
              value={updatedFields?.bank[index]?.accountType ?? ''}
              label='Type of Account'
              {...register(`bank.${index}.accountType`)}
            >
              {dropDownList.accountType.map((item) => (
                <MenuItem value={item.key}>{item.value}</MenuItem>
              ))}
            </DropDown>
            {errors?.bank?.[index]?.accountType?.message ? (
              <FormHelperText error={true}>
                {errors?.bank?.[index]?.accountType?.message}
              </FormHelperText>
            ) : null}
          </FormControl>

          <TextField
            key={`${field.id}_${field.accountHolderName}`}
            style={{ width: '18%' }}
            label='Account Holder Name'
            value={updatedFields?.bank[index]?.accountHolderName ?? ''}
            size='small'
            {...register(`bank.${index}.accountHolderName`)}
          />
          <TextField
            key={`${field.id}_${field.accountNumber}`}
            style={{ width: '18%' }}
            label='Account Number'
            value={updatedFields?.bank[index]?.accountNumber ?? ''}
            size='small'
            type="number"
            {...register(`bank.${index}.accountNumber`, {
              onChange: ({ target: { value } }) => {
                setValue(`bank.${index}.accountNumber`, value);
                setValue(`bank.${index}.fileName`, null);
                setValue(`bank.${index}.file`, null);
              },
            })}
            error={errors?.bank?.[index]?.accountNumber?.message ?? false}
            helperText={errors?.bank?.[index]?.accountNumber?.message ?? ''}
          />
          <FormControl sx={{ minWidth: 120, width: '18%' }} size='small' key={`${field.id}_${field.proofType}`}>
            <InputLabel>Bank Account Proof</InputLabel>
            <DropDown
              sx={{ width: '100%' }}
              value={updatedFields?.bank[index]?.proofType ?? ''}
              label='Type of Account'
              {...register(`bank.${index}.proofType`, {
                onChange: ({ target: { value } }) => {
                  setValue(`bank.${index}.proofType`, value);
                  setValue(`bank.${index}.fileName`, null);
                  setValue(`bank.${index}.file`, null);
                },
              })}
            >
              {dropDownList.documentType.map((item) => (
                <MenuItem key={`${field.id}_${field.bankName}_${item.key}`} value={item.key}>{item.value}</MenuItem>
              ))}
            </DropDown>
            {errors?.bank?.[index]?.proofType?.message ? (
              <FormHelperText error={true}>
                {errors?.bank?.[index]?.proofType?.message}
              </FormHelperText>
            ) : null}
          </FormControl>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '18%',
              alignItems: 'center',
            }}
            key={`${field.id}_${field.ifscCode}_delete_button`}
          >
            <IconButton aria-label='delete'>
              {index !== 0 ? (
                <DeleteIcon onClick={() => remove(index)} />
              ) : null}
            </IconButton>

            <Switch
              key={`${field.id}_${field.ifscCode}`}
              checked={updatedFields?.bank[index]?.primary ?? false}
              onChange={({ target: { checked } }) =>
                handleSwitch(checked, index)
              }
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <span style={{ fontSize: '13px', fontWeight: 'bolder' }}>
              Default
            </span>
          </div>
          {!isEmpty(updatedFields?.bank[index]?.proofType) &&
          !isEmpty(updatedFields?.bank[index]?.accountNumber) ? (
            <Box
              sx={{
                boxShadow: 3,
                width: '20%',
                display: 'grid',
                padding: '30px',
                boxSizing: 'borderBox',
              }}
            >
              {errors?.bank?.[index]?.file?.message ? (
                <FormHelperText error={true}>
                  {errors?.bank?.[index]?.file?.message}
                </FormHelperText>
              ) : null}
              <Div2>
                <TextSnippetOutlinedIcon />
                <p style={{ fontSize: '13px', fontWeight: 'bolder' }}>
                  {' '}
                  Proof Document{' '}
                </p>
              </Div2>
              <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                <Typography>
                  <Button
                    upload="true"
                    component='label'
                    startIcon={<AttachFileOutlinedIcon />}
                    color='secondary'
                  >
                    {isEmpty(updatedFields?.bank[index]?.file)
                      ? 'Upload Proof'
                      : 'Reupload Proof'}
                    <input
                      hidden
                      type='file'
                      name='file'
                      onChange={({ target: { files } }) =>
                        handleFileUpload(
                          index,
                          files[0],
                          isEmpty(updatedFields?.bank[index]?.file)
                            ? false
                            : true
                        )
                      }
                    />
                  </Button>
                </Typography>
              </Box>
              {isLoading ? <LinearProgress color='inherit' /> : null}
              {updatedFields?.bank[index]?.file &&
              updatedFields?.bank[index]?.fileName ? (
                <img
                  style={{ width: '120px', height: '120px', padding: '10px 0' }}
                  src={updatedFields?.bank[index]?.file}
                  alt={updatedFields?.bank[index]?.fileName}
                  title={updatedFields?.bank[index]?.fileName}
                />
              ) : null}
            </Box>
          ) : null}
        </Box>
      ))}
      <StepperButtons
        loading={isLoading}
        nextUrl={false}
        backUrl={ROUTE_CONFIG.YCW.EDIT(id, parseInt(step || 7) - 1)}
        finishUrl={true}
        handleFinish={handleSubmit(() => handleSave(false, true))}
      />
    </form>
  );
};

// Default Export
export default memo(BankInfo);
