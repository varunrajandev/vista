import { STORE_DATA, IS_LOADING, IS_ERROR } from "./actionTypes";

const initState = {
    isLoading:false,
    isError: false,
    data: []
}

const postReducer = (state = initState, action)=>{
    switch(action.type){
    case IS_LOADING : 
        return {...state, isLoading: true}

    case IS_ERROR : 
        return {...state, isLoading: false, isError: true}

    case STORE_DATA:
        return {...state, isLoading:false, data: action.payload}  //to get the new value everytime
    
    default : 
        return state;
    }
}

export {postReducer}