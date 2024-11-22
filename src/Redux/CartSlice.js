import react from 'react';
import {createSlice} from '@reduxjs/toolkit';


const cartSlice=createSlice({
    name:'cart',
    initialState:{
        cartList:[],
        coupons:[]
    },
    reducers:{
        addToCart(state,action){
            let item=action.payload
            const idx=state.cartList.findIndex(cartItem=>item.id===cartItem.id);
            (idx===-1)? state.cartList.push({ ...item, quantity: 1 ,discount:false}):state.cartList[idx].quantity+=1;
        },
        removeFromCart(state,action){
            let item=action.payload
            const idx=state.cartList.findIndex(cartItem=>item.id===cartItem.id);
            (item.quantity>1)? state.cartList[idx].quantity-=1 : state.cartList=state.cartList.filter((ele)=>ele.id!=item.id)
        },
        updateCart(state,action){
            state.cartList=state.cartList.map(item=>{

                if(state.coupons.includes("eoss") && item.category==="women's clothing" && item.discount===false)
                    return {...item,price:parseFloat((item.price*0.8).toFixed(2)),discount:true}

                if(state.coupons.includes("black friday") && item.category==="electronics" && item.discount===false)
                    return {...item,price:parseFloat((item.price*0.6).toFixed(2)),discount:true}

                if(state.coupons.includes("10 off") && item.category==="men's clothing" && item.discount===false)
                    return {...item,price:parseFloat((item.price-10).toFixed(2)),discount:true}

                if((!state.coupons.includes("eoss")) && item.category==="women's clothing" && item.discount===true)
                    return {...item,price:parseFloat((item.price/0.8).toFixed(2)),discount:false}

                if((!state.coupons.includes("black friday")) && item.category==="electronics" && item.discount===true)
                    return {...item,price:parseFloat((item.price/0.6).toFixed(2)),discount:false}

                if((!state.coupons.includes("10 off")) && item.category==="men's clothing" && item.discount===true)
                    return {...item,price:parseFloat((item.price+10).toFixed(2)),discount:false}

                return item
            })
        },
        addCoupon(state,action){
            state.coupons.push(action.payload)
        },
        removeCoupon(state,action){
            state.coupons=state.coupons.filter(cou=>cou!==action.payload)
        }
    }
})

export default cartSlice;