// React
import { memo } from 'react';
// React router
import { Navigate, Outlet } from 'react-router-dom';
// Auth
import Auth from '../auth/Auth';
// Routes
import ROUTES from '../config/route.config';

// Destructuring
const { LOGIN } = ROUTES;

/**
 * @description
 * @param {*} { children }
 */
const PrivateRoutes = () =>
  Auth.hasAccessToken() ? <Outlet /> : <Navigate to={LOGIN} />;

// Default Export
export default memo(PrivateRoutes);
