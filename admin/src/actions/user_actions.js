import axiosInstance from "../helpers/axios"
import {  userContants } from "./actionTypes";

export const register=(user)=> async(dispatch) => {
    dispatch({type:userContants.USER_REGISTER_REQUEST});
    const res =await axiosInstance.post(`admin/register`,{
       ...user
    });

    if(res.status===201){
        const{message}=res.data;
        
        dispatch({
            type:userContants.USER_REGISTER_SUCCESS,
            payload :{
                message
            }
        })
    }
    else if(res.status===400){
        dispatch({
            type: userContants.USER_REGISTER_FAILURE,
            payload: {
                error:res.data.error
            }
        })
    }
}