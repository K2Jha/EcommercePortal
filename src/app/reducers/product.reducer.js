import { CART } from "../constants/name";
import product from "./products.js";

const initialState = {};

export default function ProductReducer(state = product, action) {
    switch (action.type) {
        case CART.GET_ALL_PRODUCTS:
            return [...state, action.payload];
        default:
            return [...state];
    }
}