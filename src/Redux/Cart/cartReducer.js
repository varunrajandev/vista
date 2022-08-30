import { ADD_TO_CART, DELETE_ITEM } from "./actionType";

const Cart = [];

export const cartReducer = (state = Cart, action) => {
  const product = action.payload;
  switch (action.type) {
    case ADD_TO_CART:
      
    //here we find if product is already available
      const present = state.find((c) => c.id === product.id);

      //if present update quentity and total amount
      if (present) {
        return state.map((c) =>
          c.id === product.id ? { ...c, quantity: c.quantity + 1, totalAmount: (c.quantity + 1) * c.mrp, } : c
        );
      } else {
        const product = action.payload;

        const res = [
          ...state,
          { ...product, quantity: 1, totalAmount: product.mrp },
        ];

        // console.log(res);
        return res;
      }
      

    case DELETE_ITEM:
      const present1 = state.find((c) => c.id === product.id);
      if (present1.quantity === 1) {
        return state.filter((c) => c.id !== present1.id);
      } else {
        return state.map((c) =>
          c.id === product.id ? { ...c, quantity: c.quantity - 1, totalAmount: (c.quantity - 1) * c.mrp, } : c
        );
      }

    default:
      return state;
  }
};