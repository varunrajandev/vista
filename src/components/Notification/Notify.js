/*****************NPM DEPENDENCIES ***************/
import React, { memo } from 'react';
import { Alert, Snackbar } from '@mui/material';

/**
 * @description
 * @param {*} { notify }
 */
const Notify = ({ notify }) => (
  <Snackbar open={notify.isOpen} autoHideDuration={100}>
    <Alert severity={notify.type}>{notify.message}</Alert>
  </Snackbar>
);

export default memo(Notify);
