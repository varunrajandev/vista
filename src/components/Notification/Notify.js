/*****************NPM DEPENDENCIES ***************/
import React, { memo } from 'react';
import { Alert, Snackbar } from '@mui/material';

/**
 * @description
 * @param {*} { notify }
 */
const Notify = ({ notify }) => (
  <Snackbar open={notify?.message ?? false} autoHideDuration={5000}>
    <Alert severity={notify?.type ?? 'success'}>{notify?.message ?? ''}</Alert>
  </Snackbar>
);

export default memo(Notify);
