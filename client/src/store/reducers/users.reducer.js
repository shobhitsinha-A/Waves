import {
    AUTH_USER,
    SIGN_OUT,
    UPDATE_USER_PROFILE,
    USER_CHANGE_EMAIL,
    USER_ADD_TO_CART
    
} from '../types'
let DEFAULT_USER_STATE = {
    data:{
        _id:null,
        email:null,
        firstname:null,
        lastname:null,
        history:[],
        verified:null
    },
    auth:null,
    cart:[]
}
//when we make  a request to a serveer we get data back that data
//is going to go in the function and data inside action
//action.type: id pf the reducer and payload is data we get back the server 

export default function usersReducer(state=DEFAULT_USER_STATE,action){
    switch(action.type){
        case AUTH_USER:
            return { ...state,
                //we are using axios so everything insede data 
               data: { ...state.data, ...action.payload.data },
               auth: action.payload.auth
            }
            case SIGN_OUT:
            return {...state, 
                data: { ...DEFAULT_USER_STATE.data },
                auth:false
            }
            case UPDATE_USER_PROFILE:
            return { ...state, data: {...action.payload }}
            case USER_CHANGE_EMAIL:
            return {
                ...state,
                data:{ ...state.data, email: action.payload }
            }
            case USER_ADD_TO_CART:
            return {...state, cart: action.payload}
        default:
            return state
    }
}