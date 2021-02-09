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

export const getProducts = () => {
    console.log("inside middleware");
    return async function(dispatch) {
        type: CART.GET_ALL_PRODUCTS
        const response = await axios.get("https://fakestoreapi.com/products");
        if (response["success"] == true) {
            console.log("response", response);
            return (response["data"]);
        } else {
            return (response["error"]);
        }
    };
};

export default { addToCart, removeFromCart };