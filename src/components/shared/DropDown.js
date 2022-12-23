/***********NPM Dependencies ****************/
import { Select, MenuItem } from '@mui/material';
import { memo } from 'react';

/**
 * @description
 * @param {*} props
 */
const DropDown = (props) => <Select {...props}><MenuItem value="">Select Options</MenuItem>{props.children}</Select>;

export default memo(DropDown);
