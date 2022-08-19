import { ADD_TO_CART, DELETE_ITEM } from "./actionType";

export const addToCart = (data) => {
  return {
    type: ADD_TO_CART,
    payload: data,
  };
};

export const delCart = (data) => {
  return {
    type: DELETE_ITEM,
    payload: data,
  };
};

