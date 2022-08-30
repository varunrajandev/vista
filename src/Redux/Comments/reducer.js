import { STORE_DATA } from "./actionTypes";

const initState = {
    data: []
}

const commentReducer = (state = initState, action)=>{
    switch(action.type){
    case STORE_DATA:
        return {...state, data: action.payload}  //to get the new value everytime
    
    default : 
        return state;
    }
}

export {commentReducer}