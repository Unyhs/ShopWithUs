import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productSlice, { Statuses } from '../Redux/ProductSlice'
import cartSlice from '../Redux/CartSlice'
import ProductCard from './ProductCard';
import axios from 'axios';
import productFetch from '../Redux/ProductFetch';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';


const actions=cartSlice.actions;
export const categories=[
  "All", 
  "Electronics",
  "Jewelery",
  "Men's Clothing",
  "Women's Clothing"
  ]

const Shop = () => {
  const {category}=useParams()
  const prodList=useSelector((store)=>store.prodState.prodList);
  const status=useSelector((store)=>store.prodState.status) 
  const [currCategories,setCurrCategories]=useState(()=>[category? category.toLowerCase(): "all"]);
  const dispatch=useDispatch();

  useEffect(()=>{
    const getProducts = async ()=>{
      dispatch(productFetch());
    }
  getProducts()
},[]);

  const handleAddToCart=(prod)=>{
      dispatch(actions.addToCart(prod));
  }

  const toggleCat=(cat)=>{
    setCurrCategories(prev=>
      prev.includes(cat.toLowerCase())? prev.filter((currcat)=>currcat.toLowerCase()!==cat.toLowerCase())
      : [...prev,cat.toLowerCase()]
    )
  }

    if(status===Statuses.LOADING)
      return (
      <div style={{ textAlign: 'center', marginTop: '15%'}}>
        <Spin />
        <h1>Loading...</h1>
      </div>
      )

  if(status==Statuses.ERROR)
    return (
      <h1>Facing an Error!</h1>
    );

  return (
    <>
    <div className='flex flex-col flex-wrap mt-20 ml-16 gap-8'>
      <div className='flex ml-44'>
        {
          categories.map((cat)=>{
            return(
            <div key={cat}
            onClick={()=>toggleCat(cat)}
            className={`py-3 ml-8 h-[50px] w-[10vw] rounded-xl hover:cursor-pointer
            ${currCategories.includes(cat.toLowerCase())?  'bg-red-900 text-white' :  'bg-gray-100' }`}> 
            {cat}
            </div>
            )
          })
        }
        </div>
        <div className='flex flex-wrap gap-8  mt-4 ml-16'>
          {
            prodList
            .filter(prod=>currCategories.includes("all") ? true: currCategories.includes(prod.category.toLowerCase()))
              .map((prod)=>{
              return(
              <ProductCard prod={prod} handleAddToCart={handleAddToCart} key={prod.id}/>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Shop