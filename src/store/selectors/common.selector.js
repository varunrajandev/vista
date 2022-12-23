// Reselect
import { createSelector } from 'reselect';

// State
const getState = (state) => state.commonReducer;

// Get Loading
export const getLoading = createSelector(getState, (state) => state.loading);

// Get Error
export const getError = createSelector(getState, (state) => state.error);
