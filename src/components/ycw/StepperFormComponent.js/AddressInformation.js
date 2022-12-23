/****************NPM DEPENDENCIES *****************/
import axios from 'axios';
import { Box, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import React, { memo, useContext, useState, useEffect } from 'react';
/****************LOCAL DEPENDENCIES *****************/
import { masterApi } from '../../../AllData';
import CurrentAdd from '../../form/CurrentAdd';
import Notify from '../../Notification/Notify';
import { multiStepContext } from '../../../ContextApi/StepContext';
import { isEmpty } from 'lodash';

// State
const addressState = {
  addressLine1: null,
  addressLine2: null,
  addressProofType: null,
  cityUuid: null,
  countryUuid: null,
  landmark: null,
  micromarketUuid: null,
  permanent: null,
  postalCode: null,
  stateUuid: null,
  userId: null,
};
// Address
const address = {
  countryUuid: [],
  stateUuid: [],
  cityUuid: [],
};

function AddressInformation() {
  // local state
  const [currentAddress, setCurrentAddress] = useState({ ...addressState });
  const [permanentAddress, setPermanentAddress] = useState({ ...addressState });
  const [dropDownList, setDropDownList] = useState({
    addressProof: [],
    country: [],
    currentAddress: {
      ...address,
    },
    permanentAddress: {
      ...address,
    },
  });
  const [isPermanent, setIsPermanent] = useState();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  // get the id from url
  const { id } = useParams();
  // get the id from local storage
  const ID = localStorage.getItem('ID');
  // get the context
  const { setCurrentSteps, setAddressData } = useContext(multiStepContext);

  /**
   * @description
   * @param {*} message
   */
  const handleNotify = (message) =>
    setNotify({
      isOpen: true,
      message,
      type: 'error',
    });

  /**
   * @description
   * @param {string} stateName
   * @param {string} key
   * @param {string} dropValue
   */
  const callDropDownAPIs = (stateName, key, dropValue) => {
    const urls = {
      countryUuid: `http://13.126.160.155:8081/locationmaster/state/get/states/by/${dropValue}`,
      stateUuid: `http://13.126.160.155:8081/locationmaster/city/get/cities/by/${dropValue}`,
      cityUuid: `http://13.126.160.155:8081/locationmaster/micromarket/list/${dropValue}`,
    };
    try {
      fetch(urls[key])
        .then((res) => res.json())
        .then((res) => {
          setDropDownList((prevState) => ({
            ...prevState,
            [stateName]: { ...prevState[stateName], [key]: res?.data ?? [] },
          }));
        });
    } catch (error) {
      handleNotify(
        error?.message ?? 'Some went wrong while getting dropdown values'
      );
    }
  };

  /**
   * @description
   * @param {string} stateName
   * @param {object} data
   */
  const handleDropDownAPIs = (stateName, data) => {
    if (data?.countryUuid) {
      callDropDownAPIs(stateName, 'countryUuid', data?.countryUuid);
    }
    if (data?.stateUuid) {
      callDropDownAPIs(stateName, 'stateUuid', data?.stateUuid);
    }
    if (data?.cityUuid) {
      callDropDownAPIs(stateName, 'cityUuid', data?.cityUuid);
    }
  };

  /**
   * @description
   * @param {string} key
   * @param {string} value
   * @param {string} stateName
   */
  const handlePostalCode = (key, value, stateName) => {
    if (key === 'postalCode' && value.length === 6) {
      fetch(`${masterApi}/address/get/pincode/${value}`).then((res) =>
        res.json()
      );
    }
  };

  // call the api when id exist
  useEffect(() => {
    if (id || ID) {
      try {
        fetch(`http://13.126.160.155:8080/user/address/get/${id || ID}`)
          .then((res) => res.json())
          .then((res) => {
            // call the related dropdown apis
            handleDropDownAPIs('currentAddress', res.data[0]);
            handleDropDownAPIs('permanentAddress', res.data[1]);
            // update the state
            setCurrentAddress({ ...res.data[0] });
            setPermanentAddress({ ...res.data[1] });
          });
      } catch (error) {
        handleNotify(error?.message ?? 'Server Error');
      }
    }
  }, [id || ID]);

  // call the drop down APIs
  useEffect(() => {
    try {
      fetch(
        `http://13.126.160.155:8080/user/drop-down/get/documentUploadType?flag`
      )
        .then((res) => res.json())
        .then((res) =>
          setDropDownList((prevState) => ({
            ...prevState,
            addressProof: res?.data ?? [],
          }))
        );
      fetch('http://13.126.160.155:8081/locationmaster/country/get/all')
        .then((res) => res.json())
        .then((res) =>
          setDropDownList((prevState) => ({
            ...prevState,
            country: res?.data ?? [],
          }))
        );
    } catch (error) {
      handleNotify(error?.message ?? 'Server Error');
    }
  }, []);

  /**
   * @description
   * @param {boolean} check
   */
  const handleIsPermanent = (check) => {
    // update address state
    setCurrentAddress((prevState) => ({ ...prevState, ['permanent']: check }));
    setPermanentAddress((prevState) => ({
      ...prevState,
      ['permanent']: !check,
    }));
    // update permanent state
    setIsPermanent(check);
    // check update state
    setPermanentAddress({ ...(check ? currentAddress : permanentAddress) });
    setDropDownList((prevState) => ({
      ...prevState,
      permanentAddress: {
        ...(check ? prevState.currentAddress : prevState.permanentAddress),
      },
    }));
  };

  /**
   * @description
   * @param {number} step
   */
  const handleSubmit = (step) => {
    try {
      axios
        .post('http://13.126.160.155:8080/user/address/save', [
          { ...{...currentAddress, userId: id || ID }},
          { ...{...permanentAddress, userId: id || ID, permanent: !currentAddress.permanent  }},
        ])
        .then((res) => {
          if (res.status === 200 && !isEmpty(res.data.data)) {
            setAddressData(res.data.data);
            setNotify({
              isOpen: res.data.status,
              message: res.data.message,
              type: 'success',
            });
            if (step) {
              setCurrentSteps(step);
            }
          }
        });
    } catch (error) {
      handleNotify(error?.message ?? '')
    }
  };

  return (
    <>
      <Notify notify={notify} />
      <Box bgcolor='#e1e2e3' padding='20px' flex={7} minWidth={'90%'}>
        <Box
          marginTop={5}
          sx={{
            padding: 3,
            bgcolor: 'white',
            borderRadius: 3,
          }}
        >
          {/* Current Address */}
          <CurrentAdd
            labelData='Current Address'
            address={currentAddress}
            handleAddress={({ target: { name, value } }) => {
              handlePostalCode(name, value, 'currentAddress');
              handleDropDownAPIs('currentAddress', { [name]: value });
              setCurrentAddress((prevState) => ({
                ...prevState,
                [name]: value,
              }));
            }}
            dropDownList={{
              ...dropDownList,
              ...dropDownList['currentAddress'],
            }}
          />
          {/* Permanent Address */}
          <CurrentAdd
            labelData='Permanent Address'
            address={permanentAddress}
            handleAddress={({ target: { name, value } }) => {
              handlePostalCode(name, value, 'permanentAddress');
              handleDropDownAPIs('permanentAddress', { [name]: value });
              setPermanentAddress((prevState) => ({
                ...prevState,
                [name]: value,
              }));
            }}
            dropDownList={{
              ...dropDownList,
              ...dropDownList['permanentAddress'],
            }}
            isPermanent={isPermanent}
            handleIsPermanent={handleIsPermanent}
          />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'end',
              height: '100px',
              justifyContent: 'right',
              gap: '20px',
            }}
          >
            <Button
              variant='contained'
              onClick={() => {
                setCurrentSteps(3);
              }}
            >
              back
            </Button>
            <Button variant='contained' onClick={() => handleSubmit()}>
              save
            </Button>
            <Button variant='contained' onClick={() => handleSubmit(5)}>
              next
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default memo(AddressInformation);
