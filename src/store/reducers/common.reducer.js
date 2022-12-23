// Action Types
import { ERROR, LOADING } from '../action.types';
// Initial State
import { INITIAL_STATE } from '../initial.state';

// Common reducer
const commonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${LOADING}`:
      return {
        ...state,
        loading: action.payload,
      };
    case `${ERROR}`:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Default export
export default commonReducer;
