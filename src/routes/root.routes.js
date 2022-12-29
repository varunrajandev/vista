/* ***********NPM DEPENDENCIES *********** */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
/************LOCAL DEPENDENCIES **********/
import PrivateRoutes from './private.routes';
// Components
import Login from './../pages/Login/Login';
// Containers
import YcwList from './../containers/ycw/Ycw.List';
import CxList from './../containers/cx/Cx.List';
import JobsList from './../containers/jobs/Jobs.List';
import YcwProfile from './../containers/ycw/Ycw.Profile';
import YcwForm from '../containers/ycw/Ycw.Form';
import CxForm from './../containers/cx/Cx.Form';
import JobsFrom from './../containers/jobs/Jobs.Form';
import AuthRegistration from '../containers/auth/Auth.Registration';
import JobsProfile from '../containers/jobs/Jobs.Profile';
import CxProfile from '../containers/cx/cx.Profile';

/**
 * @description
 */
const rootRoutes = () => (
  <Routes>
    {/* Credential Pages */}
    <Route path='/login' element={<Login />} />
    <Route path='/registration' element={<AuthRegistration />} />
    <Route element={<PrivateRoutes />}>
      {/* List Pages */}
      <Route path='/' element={<Navigate replace to='/ycw' />} />
      <Route path='/ycw' element={<YcwList />} />
      <Route path='/cx' element={<CxList />} />
      <Route path='/jobs' element={<JobsList />} />
      {/* Form Pages */}
      <Route path='/ycw/add/:step' element={<YcwForm />} />
      <Route path='/cx/add/:step' element={<CxForm />} />
      <Route path='/jobs/add/:step' element={<JobsFrom />} />
      <Route path='/ycw/:id/edit/:step' element={<YcwForm />} />
      <Route path='/cx/:id/edit/:step' element={<CxForm />} />
      <Route path='/jobs/:id/edit/:step' element={<JobsFrom />} />
      {/* View Pages */}
      <Route path='/ycw/:id/profile' element={<YcwProfile />} />
      <Route path='/jobs/:id/profile/:status' element={<JobsProfile />} />
      <Route path='/CX/:id/profile/:status' element={<CxProfile />} />
    </Route>
  </Routes>
);

// Default Export
export default rootRoutes;
