import { combineReducers } from "redux";
import { CartReducer } from "./cart.reducer";
import ProdcutReducer from "./product.reducer";

export const RootReducer = combineReducers({
    cartReducer: CartReducer,
});