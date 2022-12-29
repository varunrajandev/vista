/***************NPM DEPENDENCIES ******************/
import React, { memo } from 'react';
import {
  Box,
  Checkbox,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import DropDown from '../shared/DropDown';
// Label
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

/**
 * @description
 * @param {boolean} {
 *   register,
 *   key,
 *   handleAddress,
 *   dropDownList,
 *   isPermanent,
 *   handleIsPermanent,
 * }
 */
const CurrentAdd = ({
  register,
  compKey,
  handleAddress,
  dropDownList,
  isPermanent,
  handleIsPermanent,
  updatedValues,
  skip,
  view,
}) => (
  <Box
    sx={{
      marginTop: compKey === 'permanentAddress' ? 5 : 0,
    }}
    key={compKey}
  >
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <h5
        style={{
          marginBottom: compKey === 'permanentAddress' ? '0px' : '20px',
        }}
      >
        {compKey === 'permanentAddress'
          ? 'Permanent Address'
          : 'Current Address'}
      </h5>
      <Box sx={{ display: compKey === 'permanentAddress' ? 'block' : 'none' }}>
        <Checkbox
          onChange={(e) => handleIsPermanent(e.target.checked)}
          {...label}
          color='success'
          checked={isPermanent ? true : false}
        />
        <span style={{ fontWeight: '100' }}>Same as current address</span>
      </Box>
    </Box>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <TextField
        sx={{ width: '18%' }}
        size='small'
        label='Flat/Building'
        variant='outlined'
        value={updatedValues[compKey]?.addressLine1 ?? ''}
        name='addressLine1'
        {...register(`${compKey}.addressLine1`, {
          onChange: handleAddress,
        })}
        {...(view ? { variant: 'filled' } : { variant: 'outlined' })}
        disabled={view}
      />
      <TextField
        sx={{ width: '18%' }}
        size='small'
        label='Society/Colony/Area'
        {...(view ? { variant: 'filled' } : { variant: 'outlined' })}
        disabled={view}
        value={updatedValues[compKey]?.addressLine2 ?? ''}
        name='addressLine2'
        {...register(`${compKey}.addressLine2`, {
          onChange: handleAddress,
        })}
      />

      <TextField
        sx={{ width: '18%' }}
        value={updatedValues[compKey]?.landmark ?? ''}
        size='small'
        label='Landmark'
        {...(view ? { variant: 'filled' } : { variant: 'outlined' })}
        disabled={view}
        name='landmark'
        {...register(`${compKey}.landmark`, {
          onChange: handleAddress,
        })}
      />

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
        size='small'
        type='number'
        value={updatedValues[compKey]?.postalCode ?? ''}
        label='Pin Code'
        {...(view ? { variant: 'filled' } : { variant: 'outlined' })}
        disabled={view}
        name='postalCode'
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 6);
        }}
        {...register(`${compKey}.postalCode`, {
          onChange: handleAddress,
        })}
      />

      <FormControl
        sx={{ minWidth: 120, width: '18%' }}
        size='small'
        {...(view ? { variant: 'filled' } : {})}
        disabled={view}
      >
        <InputLabel id='demo-select-small'>Country</InputLabel>
        <Select
          sx={{ width: '100%' }}
          label='Country'
          value={updatedValues[compKey]?.countryUuid ?? ''}
          name='countryUuid'
          {...register(`${compKey}.countryUuid`, {
            onChange: handleAddress,
          })}
        >
          {dropDownList.country.map((item) => (
            <MenuItem key={item.uuid} value={item.uuid}>
              {item.countryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    <Box
      display={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '30px',
      }}
    >
      <FormControl
        sx={{ minWidth: 120, width: skip ? '24%' : '18%' }}
        size='small'
        {...(view ? { variant: 'filled' } : {})}
        disabled={view}
      >
        <InputLabel id='demo-select-small'>State</InputLabel>
        <DropDown
          sx={{ width: '100%' }}
          label='State'
          value={updatedValues[compKey]?.stateUuid ?? ''}
          name='stateUuid'
          {...register(`${compKey}.stateUuid`, {
            onChange: handleAddress,
          })}
        >
          {dropDownList.countryUuid.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.key}
            </MenuItem>
          ))}
        </DropDown>
      </FormControl>

      <FormControl
        sx={{ minWidth: 120, width: skip ? '24%' : '18%' }}
        size='small'
        {...(view ? { variant: 'filled' } : {})}
        disabled={view}
      >
        <InputLabel id='demo-select-small'>City</InputLabel>
        <DropDown
          sx={{ width: '100%' }}
          label='City'
          name='cityUuid'
          value={updatedValues[compKey]?.cityUuid ?? ''}
          {...register(`${compKey}.cityUuid`, {
            onChange: handleAddress,
          })}
        >
          {dropDownList.stateUuid.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.key}
            </MenuItem>
          ))}
        </DropDown>
      </FormControl>

      <FormControl
        sx={{ minWidth: 120, width: skip ? '24%' : '18%' }}
        size='small'
        {...(view ? { variant: 'filled' } : {})}
        disabled={view}
      >
        <InputLabel id='demo-select-small'>Supply Hub</InputLabel>
        <DropDown
          sx={{ width: '100%' }}
          label={skip ? 'Locality' : 'Supply Hub'}
          value={updatedValues[compKey]?.micromarketUuid ?? ''}
          name='micromarketUuid'
          {...register(`${compKey}.micromarketUuid`, {
            onChange: handleAddress,
          })}
        >
          {dropDownList.cityUuid.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </DropDown>
      </FormControl>

      {!skip ? (
        <FormControl
          sx={{ minWidth: 120, width: '18%' }}
          size='small'
          {...(view ? { variant: 'filled' } : {})}
          disabled={view}
        >
          <InputLabel id='demo-select-small'>Address Proof Type</InputLabel>
          <DropDown
            sx={{ width: '100%' }}
            value={updatedValues[compKey]?.addressProofType ?? ''}
            label='Address Proof Type'
            name='addressProofType'
            {...register(`${compKey}.addressProofType`, {
              onChange: handleAddress,
            })}
          >
            {dropDownList.addressProof.map((item) => (
              <MenuItem key={item.key} value={item.key}>
                {item.value}
              </MenuItem>
            ))}
          </DropDown>
        </FormControl>
      ) : null}
      <div style={{ width: '18%' }}></div>
    </Box>
  </Box>
);

// Default Export
export default memo(CurrentAdd);
