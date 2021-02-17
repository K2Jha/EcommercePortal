import { CART } from "../constants/name";


const initialState = []

export function CartReducer(state = initialState, action) {
    switch (action.type) {
        case CART.ADD_TO_CART:
            return [...state, action.payload];
        case CART.REMOVE_FROM_CART:
            return [...state.filter(item => item.id != action.payload)];
        case "persist/REHYDRATE":
            return [...state, ...action.payload.cartReducer];
        default:
            return [...state];
    }
}