/*************NPM DEPENDENCIES *****************/
import { useParams } from 'react-router-dom';
import React, { memo, useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
/*************LOCAL DEPENDENCIES *****************/
import { Axios } from '../../http';
import { ENDPOINTS } from '../../config/api.config';
import Nav from './../../components/shared/nav/nav';
import Notify from '../../components/Notification/Notify';
import { BUTTON_LINKS, LINKS } from './Jobs.Config';
import BasicInfo from './Forms/BasicInfo';
import ROUTE_CONFIG from '../../config/route.config';

// Destructuring
const {
  JOBS: { STATUS },
} = ENDPOINTS;

const Profile = () => {
  // get the id from url
  const { id, status } = useParams();
  // local state
  const [isActive, setIsActive] = useState(status === 'ACTIVE');
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({ message: '' });
  // navigation
  const navigate = useNavigate();
  /**
   * @description
   * @param {*} checked
   */
  const handleActive = (checked) => {
    setIsLoading(true);
    Axios.post(
      `${STATUS}/${id}?jobStatus=${checked ? 'ACTIVE' : 'IN_ACTIVE'}`
    )
      .then((res) => res.data)
      .then((res) => {
        if (res?.status) {
          if (res?.data ?? false) {
            setIsActive(checked);
            setIsLoading(false);
            navigate(
              ROUTE_CONFIG.JOBS.PROFILE(id, checked ? 'ACTIVE' : 'IN_ACTIVE')
            );
            setNotify({ message: 'Jobs Updated Successfully' });
            setTimeout(() => {
              setNotify({ message: '' });              
            }, 4000);
          }
        }
      })
      .catch(() => {
        setIsLoading(false);
        setNotify({ message: 'Server Error', type: 'error' });
        setTimeout(() => setNotify({ message: '' }), 4000);
      });
  };

  return (
    <Box bgcolor='#fafbfb' flex={7}>
      <Notify notify={notify} />
      <Nav
        handleActive={({ target: { checked } }) => handleActive(checked)}
        navDetails={{
          id,
          isLoading,
          status: status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE',
          active: isActive,
          edit: BUTTON_LINKS.EDIT(id),
          close: BUTTON_LINKS.CLOSE,
          links: LINKS,
        }}
      />
      <Box
        sx={{
          padding: 5,
          bgcolor: 'white',
          borderRadius: 3,
        }}
      >
        <BasicInfo view />
      </Box>
    </Box>
  );
};

// Default Export
export default memo(Profile);
