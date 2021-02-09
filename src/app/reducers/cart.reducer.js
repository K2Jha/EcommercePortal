import { CART } from "../constants/name";


const initialState = []

export function CartReducer(state = initialState, action) {
    // var removeIndex = state
    //     .map(function(item) {
    //         return item.id;
    //     })
    // .indexOf(action.payload);
    switch (action.type) {
        case CART.ADD_TO_CART:
            return [...state, action.payload];
        case CART.REMOVE_FROM_CART:
            return [
                ...state.filter((item) => item.id != action.payload)
            ];
        default:
            return [...state];
    }
}