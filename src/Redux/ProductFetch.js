import React from "react";
import productSlice from "./ProductSlice";
import { Statuses } from "./ProductSlice";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


const productFetch=createAsyncThunk('productfetchThunk',async ()=>{
    try{
    const res= await axios.get('https://fakestoreapi.com/products')
    return res.data
    }
    catch(err)
    {
        throw err;
    }
})

export default productFetch