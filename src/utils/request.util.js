import { toQuery } from 'lodash-contrib';
/**
 * @description convert object into query string
 * @param {*} [requestBody={}]
 */
export const requestQuery = (requestBody = {}) => toQuery(requestBody);

/**
 * @description send object
 * @param {*} [requestBody={}]
 */
export const requestPayload = (requestBody = {}) => requestBody;
