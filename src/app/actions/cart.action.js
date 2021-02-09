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
        payload: id
    }
}

function addToProducts(data) {
    return {
        type: CART.ADD_TO_PRODUCTS,
        payload: data,
    };
}

export async function fetchProducts(dispatch, getState) {
    const response = await axios.get("https://fakestoreapi.com/products");
    dispatch(addToProducts(response.data));
}

export default { addToCart, removeFromCart };