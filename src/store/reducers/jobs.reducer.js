// Action Types
import { GET, ADD, DELETE, UPDATE } from '../action.types';
// Module Name
const moduleName = 'JOBS';
// Jobs reducer
const jobsReducer = (state = {}, action) => {
  switch (action.type) {
    case `${moduleName}_${GET}`:
    case `${moduleName}_${ADD}`:
    case `${moduleName}_${UPDATE}`:
    case `${moduleName}_${DELETE}`:
      return {
        ...state,
        [action.stateKeyName]: {
          ...state[action.stateKeyName],
          ...action.payload,
        },
      };    default:
      return state;
  }
};

// Default export
export default jobsReducer;
