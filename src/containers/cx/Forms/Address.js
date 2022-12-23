/****************NPM DEPENDENCIES *****************/
import axios from 'axios';
import { debounce, isEmpty } from 'lodash';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import React, { memo, useState, useEffect, useCallback } from 'react';
/****************LOCAL DEPENDENCIES *****************/
import StepperButtons from './../../../components/shared/stepper/button';
import Notify from '../../../components/Notification/Notify';
import { Axios } from '../../../http';
import CurrentAdd from '../../../components/form/CurrentAdd';
import { ENDPOINTS } from '../../../config/api.config';
import { ADDRESS_INFO_FORM_FIELDS } from '../../ycw/Ycw.Config';
import { addressFormSchema } from '../../../utils/validation-schema.util';
import ROUTE_CONFIG from '../../../config/route.config';

// Destructuring
const {
  STATE_BY_ID,
  COUNTRY,
  GET_ADDRESS,
  SAVE_ADDRESS,
  CITY_BY_ID,
  MARKET_BY_ID,
  PIN_CODE,
} = ENDPOINTS;

// Address
const address = {
  countryUuid: [],
  stateUuid: [],
  cityUuid: [],
};

const AddressInfo = () => {
  // local state
  const [notify, setNotify] = useState({ message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [dropDownList, setDropDownList] = useState({
    country: [],
    currentAddress: {
      ...address,
    }
  });
  // get the id from url
  const { id, step } = useParams();

  // navigation
  const navigate = useNavigate();

  // form instance
  const { register, handleSubmit, reset, watch, setValue, getValues, trigger } =
    useForm({
      defaultValues: {
        currentAddress: { ...ADDRESS_INFO_FORM_FIELDS },
      },
      resolver: yupResolver(addressFormSchema),
    });

  // updated forms fields
  const updatedFormFields = watch();

  /**
   * @description
   * @param {string} stateName
   * @param {string} key
   * @param {string} dropValue
   */
  const callDropDownAPIs = (stateName, key, dropValue) => {
    const urls = {
      countryUuid: `${STATE_BY_ID}${dropValue}`,
      stateUuid: `${CITY_BY_ID}${dropValue}`,
      cityUuid: `${MARKET_BY_ID}${dropValue}`,
    };
    Axios.get(urls[key])
      .then((res) => res.data)
      .then((res) => {
        setDropDownList((prevState) => ({
          ...prevState,
          [stateName]: { ...prevState[stateName], [key]: res?.data ?? [] },
        }));
      });
  };

  /**
   * @description
   * @param {string} stateName
   * @param {object} data
   */
  const handleDropDownAPIs = useCallback((stateName, data) => {
    if (data?.countryUuid) {
      callDropDownAPIs(stateName, 'countryUuid', data?.countryUuid);
    }
    if (data?.stateUuid) {
      callDropDownAPIs(stateName, 'stateUuid', data?.stateUuid);
    }
    if (data?.cityUuid) {
      callDropDownAPIs(stateName, 'cityUuid', data?.cityUuid);
    }
  }, []);

  /**
   * @description
   * @param {string} key
   * @param {string} value
   * @param {string} stateName
   */
  const handlePostalCode = (key, value, _stateName) => {
    if (key === 'postalCode' && value.length === 6) {
      Axios.get(`${PIN_CODE}${value}`).then((res) => console.log(res));
    }
  };

  // call the api when id exist
  useEffect(() => {
    if (id) {
      Axios.get(`${GET_ADDRESS}${id}`)
        .then((res) => res.data)
        .then((res) => {
          // call the related dropdown apis
          handleDropDownAPIs('currentAddress', res.data[0]);
          // update the state
          reset({
            currentAddress: { ...res.data[0] },
          });
        });
    }
  }, [handleDropDownAPIs, id, reset]);

  // call the drop down APIs
  useEffect(() => {
    axios.all([COUNTRY].map((url) => Axios.get(url))).then(
      axios.spread(({ data: country }) =>
        setDropDownList((prevState) => ({
          ...prevState,
          country: country?.data ?? [],
        }))
      )
    );
  }, []);

  /**
   * @description
   * @param {boolean} [isNotify=false]
   * @param {boolean} [isNext=false]
   */
  const handleSave = (isNotify = false, isNext = false) => {
    setIsLoading(true);
    const updatedFormValues = { ...getValues() };
    Axios.post(SAVE_ADDRESS, [
      { ...{ ...updatedFormValues.currentAddress, userId: id } },
      {
        ...{
          ...updatedFormValues.permanentAddress,
          userId: id,
          permanent: !updatedFormValues.currentAddress.permanent,
        },
      },
    ])
      .then((res) => res.data)
      .then((res) => {
        setIsLoading(false);
        if (res?.status ?? false) {
          if (isNotify) {
            setNotify({ message: res?.message ?? 'abc' });
            setTimeout(() => setNotify({ message: '' }), 4000);
          }
          if (isNext) {
            navigate(
              ROUTE_CONFIG.YCW.EDIT(
                res?.data[0]?.userId ?? '',
                parseInt(step || 4) + 1
              )
            );
          }
          // update the state
          reset({
            currentAddress: { ...res.data[0] },
          });
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  // update data on change
  useEffect(() => {
    const subscription = watch(async (value, { name, type }) => {
      const userId = value?.currentAddress?.userId ?? null;
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

  return (
    <form onSubmit={handleSubmit(() => handleSave(true))}>
      <Notify notify={notify} />
      {/* Current Address */}
      <CurrentAdd
        register={register}
        compKey='currentAddress'
        handleAddress={({ target: { name, value } }) => {
          handlePostalCode(name, value, 'currentAddress');
          handleDropDownAPIs('currentAddress', { [name.split('.')[1]]: value });
          setValue(`currentAddress[${name}]`, value);
        }}
        dropDownList={{
          ...dropDownList,
          ...dropDownList['currentAddress'],
        }}
        updatedValues={updatedFormFields}
        skip
      />
      <StepperButtons
        loading={isLoading}
        nextUrl={true}
        backUrl={ROUTE_CONFIG.YCW.EDIT(id, parseInt(step || 4) - 1)}
        handleNext={handleSubmit(() => handleSave(false, true))}
      />
    </form>
  );
};

// Default Export
export default memo(AddressInfo);
