import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name : 'cart',
    initialState: initialState,
    reducers : {
        addToCart : (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id)
            if(!existingItem){
                state.cartItems.push(action.payload)
                Swal.fire({
                    position : "top-end",
                    icon : "success",
                    title : "Item Added To The Cart",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else{
                Swal.fire({
                    title: "Already Added To The Cart",
                    text : "You won't be able to revert this",
                    icon : "warning",
                    showCancelButton : true,
                    confirmButtonColor : "#3085d6",
                    cancelButtonColor : "#d33",
                    confirmButtonText : "OK!"
                });
            }
        },
        removeFromCart: (state, action) => {
            if (!action.payload || !action.payload._id) return;
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
        },        
        clearCart : (state) => {
            state.cartItems = []
        }
    }
})

//export the actions

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;