import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import cartSlice from "../Redux/CartSlice";
import productSlice from "../Redux/ProductSlice"


const store=configureStore({
    reducer:{
        cartState:cartSlice.reducer,
        prodState:productSlice.reducer
    }
})

export default store;