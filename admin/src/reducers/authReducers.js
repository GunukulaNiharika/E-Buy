import { authConstants } from "../actions/actionTypes"

const initState={
 token: null,
 user:{
     firstName:'',
     lastName: '',
     username:'',
     email:'',
     picture:'',
 },
 authenticate:false,
 authenticating:false
}

export default (state= initState,action) => {
    console.log(action);
    switch(action.type){
        case authConstants.LOGIN_REQUEST:
            state={
                ...state,
                authenticating:true,
                
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state={
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate:true,
                authenticating:false,
            }
    }
    return state;
}