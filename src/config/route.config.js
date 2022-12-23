/**
 * @description
 * @param {string} routeName
 */
const commonRoutes = (routeName) => ({
  LIST: `/${routeName}`,
  ADD: `/${routeName}/add/1`,
  EDIT: (id, step) => `/${routeName}/${id}/edit/${step}`,
});

/** @type {*} */
const ROUTE_CONFIG = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
  YCW: {
    ...commonRoutes('ycw'),
    PROFILE: (id) => `/ycw/${id}/profile`,
  },
  CX: {
    ...commonRoutes('cx'),
  },
  JOBS: {
    ...commonRoutes('jobs'),
  },
};

// Default export
export default ROUTE_CONFIG;