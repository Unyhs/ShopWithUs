import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import productFetch from "./ProductFetch";

export const Statuses={
    SUCCESS:"success",
    ERROR:"error",
    LOADING:"loading"
}

const productSlice=createSlice({
    name:"product",
    initialState:{
        prodList:[],
        status:Statuses.LOADING
    },
    // reducers:{
    //     setProdList(state,action){
    //         state.prodList=action.payload
    //     },

    //     setStatus(state,action){
    //         state.status=action.payload
    //     }
    // },

    extraReducers:(builder)=>{
        builder.addCase(productFetch.pending,(state)=>{
            state.status=Statuses.LOADING;
            state.prodList=[];
        }).addCase(productFetch.fulfilled,(state,action)=>{
            state.prodList=action.payload;
            state.status=Statuses.SUCCESS;
        }).addCase(productFetch.rejected,(state)=>{
            state.status=Statuses.ERROR;
            state.prodList=[];
        })
    }
})

export default productSlice