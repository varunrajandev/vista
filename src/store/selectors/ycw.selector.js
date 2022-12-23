// Reselect
import { createSelector } from 'reselect';

// State
const getState = (state) => state.ycwReducer;

// Get Details
export const getDetails = createSelector(getState, (state) => state.details);
