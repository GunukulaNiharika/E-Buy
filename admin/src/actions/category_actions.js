import { categoryConstansts} from './actionTypes';
import axiosInstance from "../helpers/axios"

export const get_categories = () => async(dispatch) =>{

    dispatch({type: categoryConstansts.GET_ALL_CATEGORIES_REQUEST});
    const res= await axiosInstance.get(`category/getcategory`);
    
    if(res.status === 200){
        const {categoryList}=res.data;
        dispatch({
            type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
            payload: { categories: categoryList}
        })
    }
    else if(res.status === 400){
        dispatch({
            type: categoryConstansts.GET_ALL_CATEGORIES_FAILURE,
            payload: {error: res.data.error}
        })
    }
}

export const addCategory= (form) => async(dispatch) =>{
    dispatch({type: categoryConstansts.ADD_NEW_CATEGORY_REQUEST});
    const res =await axiosInstance.post('/category/create',form);
   
    if(res.status===201){
        
        console.log(res.data.cat);
        dispatch({
            type: categoryConstansts.ADD_NEW_CATEGORY_SUCCESS,
            payload: {categories :res.data.cat}
        });
    }
    else{
        dispatch({
            type: categoryConstansts.ADD_NEW_CATEGORY_FAILURE,
            payload: {error:res.data.error}
        })
    }
}