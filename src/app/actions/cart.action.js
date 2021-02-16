import { CART } from "../constants/name";
import axios from "axios";

function addToCart(data) {
    return {
        type: CART.ADD_TO_CART,
        payload: data,
    };
}

function removeFromCart(id) {
    return {
        type: CART.REMOVE_FROM_CART,
        payload: id,
    };
}

export const getUserCart = (userId) => {
    return async(dispatch, getState) => {
        dispatch({ type: "PENDING_STATE", payload: { isLoading: true } });
        try {
            const response = await axios.get(
                "https://fakestoreapi.com/carts/user/1"
            );
            dispatch({ type: "GET_USER_CART", payload: response.data });
        } catch (error) {
            dispatch({ type: "GET_ERROR_MSG", payload: error.message });
        }
    };
};
export default { addToCart, removeFromCart };