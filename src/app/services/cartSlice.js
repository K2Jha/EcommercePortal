import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchCartByUserId = createAsyncThunk(
    "cart/fetchCartByUserId",
    async(userId, thunkAPI) => {
        const response = await axios.get(
            `https://fakestoreapi.com/carts/user/${userId}`
        );
        return response.data;
    }
);
const cartSlice = createSlice({
    name: "cart",
    initialState: { cart: [] },
    reducers: {
        addToCart(state, action) {
            state.cart.push(action.payload);
        },
        removeFromCart(state, action) {
            console.log("inside state");
            state.cart.filter(item => item.id != action.payload);
        },
    },
    extraReducers: {
        [fetchCartByUserId.fulfilled]: (state, action) => {
            state.cart.push(action.payload);
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;