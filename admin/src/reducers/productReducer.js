import { productConstants } from "../actions/actionTypes"

const initState ={
    products: []
}
export default(state=initState,action) => {
    switch(action.type){
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state={
                ...state,
                products: action.payload.products
            }
    }
    return state;
}