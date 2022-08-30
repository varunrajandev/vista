import { commentReducer } from "./Comments/reducer";
import { postReducer } from "./Posts/reducer";
import { cartReducer } from "./Cart/cartReducer";
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';

const mainReducers = combineReducers({
   comment: commentReducer,
   post: postReducer,
   cart: cartReducer,
})

const store = createStore(mainReducers, applyMiddleware(thunk))

export {store}