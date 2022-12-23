/***********NPM DEPENDENCIES *********** */
import axios from 'axios';
import { map, each } from 'lodash';
/***********LOCAL DEPENDENCIES ***********/
import { Axios } from './../http/index';
import { ADD, GET, DELETE, ERROR, UPDATE, LOADING, CLEAR } from './action.types';
export /**
 * @description
 * @param {*} payload
 */
const errorHandler = (payload) => async (dispatch) => {
  dispatch({ type: ERROR, payload });
  setTimeout(() => dispatch({ type: ERROR, payload: '' }), 5000);
};

export /**
 * @description
 * @param {*} payload
 */
const loading = (payload) => (dispatch) => dispatch({ type: LOADING, payload });

export /**
 * @description
 * @param {*} moduleName
 * @param {*} url
 * @param {*} stateKeyName
 * @param {*} payload
 */
const add = (moduleName, url, stateKeyName, payload) => async (dispatch) => {
  const addResponse = await Axios.post(url, payload);
  dispatch({
    type: `${moduleName}_${ADD}`,
    stateKeyName,
    payload: addResponse.status === 200 ? addResponse?.data : {},
  });
};

export /**
 * @description
 * @param {*} moduleName
 * @param {*} url
 */
const get = (moduleName, endPoints) => async (dispatch) => {
  axios.all(map(endPoints, (endPoint) => Axios.get(endPoint.url))).then(
    axios.spread((...allResponse) => {
      const payload = {};
      each(endPoints, (endPoint, key) => {
        if (allResponse[key].status === 200) {
          payload[endPoint.key] = allResponse[key]?.data?.data ?? [];
        } else {
          payload[endPoint.key] = [];
        }
      });
      dispatch({
        type: `${moduleName}_${GET}`,
        stateKeyName: 'details',
        payload,
      });
    })
  );
};

export /**
 * @description
 * @param {*} moduleName
 * @param {*} url
 * @param {*} payload
 */
const deleteD =
  (moduleName, url, payload, stateKeyName) => async (dispatch) => {
    const deleteResponse = await Axios.put(url, payload);
    dispatch({
      type: `${moduleName}_${DELETE}`,
      stateKeyName,
      payload: deleteResponse.status === 200 ? deleteResponse?.data : {},
    });
  };

export /**
 * @description
 * @param {*} moduleName
 * @param {*} url
 * @param {*} payload
 */
const put = (moduleName, url, payload, stateKeyName) => async (dispatch) => {
  const putResponse = await Axios.put(url, payload);
  dispatch({
    type: `${moduleName}_${UPDATE}`,
    stateKeyName,
    payload: putResponse.status === 200 ? putResponse?.data : {},
  });
};

export /**
 * @description
 * @param {*} moduleName
 * @param {*} stateKeyName
 * @param {*} childStateKeyName
 */
const clear = (moduleName, stateKeyName, childStateKeyName) => async (dispatch) => {
  dispatch({
    type: `${moduleName}_${CLEAR}`,
    stateKeyName,
    childStateKeyName,
    payload: {},
  });
}
