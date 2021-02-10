import { CART } from "../constants/name";


const initialState = {};

export default function ProductReducer(state = initialState, action) {
    switch (action.type) {
        case CART.GET_ALL_PRODUCTS:
            return [...state, action.payload];
        case CART.ADD_TO_PRODUCTS:
            return [...state, ...action.payload];
        default:
            return [...state];
    }
}