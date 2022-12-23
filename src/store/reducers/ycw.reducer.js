// Action Types
import { GET, ADD, DELETE, UPDATE, CLEAR } from '../action.types';
// Module Name
const moduleName = 'YCW';
// Ycw reducer
const ycwReducer = (state = {}, action) => {
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
      };
    case `${moduleName}_${CLEAR}`:
      return {
        ...state,
        [action.stateKeyName]: {
          ...state[action.stateKeyName][action.childStateKeyName],
          [action.childStateKeyName]: action.payload,
        },
      };
    default:
      return state;
  }
};

// Default export
export default ycwReducer;
