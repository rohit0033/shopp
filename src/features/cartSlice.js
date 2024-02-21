import { createSlice } from "@reduxjs/toolkit";
import productData from "../productData";


const initialState = {
    cart: [],
    item : productData,
    totaQuantity: 0,
    totalprice: 0,
    

 };

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart:(state,action) => {
            let find = state.cart.findIndex((item) => item.id === action.payload.id);
            if(find >=0){
                state.cart[find].quantity +=1;
            }
            else{
                state.cart.push(action.payload);
            }

            
        },
        increaseItemQuantity: (state, action) => {
            let find = state.cart.findIndex((item) => item.id === action.payload);
            state.cart[find].quantity += 1;
          },
          decreaseItemQuantity: (state, action) => {
            let find = state.cart.findIndex((item) => item.id === action.payload);
            if (state.cart[find].quantity > 1) {
              state.cart[find].quantity -= 1;
            }
          },
          removeItem: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
          },
         getCartTotal:(state) => {
            let { totalQuantity, totalPrice } = state.cart.reduce(
              (cartTotal, cartItem) => {
                const { quantity, price } = cartItem;
                cartTotal.totalQuantity += quantity;
                cartTotal.totalPrice += quantity * price;
                return cartTotal;
              },
              {
                totalQuantity: 0,
                totalPrice: 0,
              }
            );
            state.totaQuantity = totalQuantity;
            state.totalprice = totalPrice;
         },
    },

    });

export const {addToCart,getCartTotal,increaseItemQuantity,removeItem,decreaseItemQuantity} = cartSlice.actions;


export default cartSlice.reducer;