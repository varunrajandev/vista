// Reselect
import { createSelector } from 'reselect';

// State
const getState = (state) => state.cxReducer;

// Get Details
export const getDetails = createSelector(getState, (state) => state.details);
