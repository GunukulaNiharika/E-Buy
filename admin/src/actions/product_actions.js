import { productConstants } from "./actionTypes";
import axiosInstance from "../helpers/axios"

export const addProduct = (form) => async (dispatch) =>{

    dispatch({type: productConstants.ADD_PRODUCT_REQUEST});
    const res=await axiosInstance.post('/product/create',form);
    if(res.status===201){
        const {Product}=res.data;
        dispatch({
            type: productConstants.ADD_PRODUCT_SUCCESS,
            payload: {product: Product}
        });
    }
    else{
        dispatch({ 
            type:productConstants.ADD_PRODUCT_FAILURE,
            payload:{error: res.data.error}
        })
    }
}