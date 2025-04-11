import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Statuses } from '../Redux/ProductSlice'
import cartSlice from '../Redux/CartSlice'
import ProductCard from './ProductCard';
import productFetch from '../Redux/ProductFetch';
import { useParams } from 'react-router-dom';
import { Spin,FloatButton } from 'antd';
import {UpOutlined} from '@ant-design/icons'


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
  const cartList=useSelector((store)=>store.cartState.cartList);
  const prodList=useSelector((store)=>store.prodState.prodList);
  const status=useSelector((store)=>store.prodState.status) 
  const [currCategories,setCurrCategories]=useState(()=>[category? category.toLowerCase(): "all"]);
  const dispatch=useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      dispatch(productFetch());
    };
    getProducts();
  }, [category, dispatch]);

  useEffect(()=>{
    setCurrCategories(()=>[category ? category.toLowerCase() : "all"])
  }, [category])

  const handleAddToCart=(prod)=>{
    dispatch(actions.addToCart(prod));
  }

  const handleRemoveFromCart=(prod)=>{
    dispatch(actions.removeFromCart(prod));
  }

  const toggleCat=(cat)=>{
    setCurrCategories(prev=>
      prev.includes(cat.toLowerCase())? prev.filter((currcat)=>currcat.toLowerCase()!==cat.toLowerCase())
      : [...prev,cat.toLowerCase()]
    )
  }

  const getQuantity=(prod)=>{
    let p=cartList.filter((ele)=>ele.id===prod.id)
    return (p.length>0)? p[0].quantity:0
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
      <div className='shop'>
        <FloatButton icon={<UpOutlined />} onClick={()=>{ window.scrollTo({ top: 0, behavior: 'smooth' });}}>Go to Top </FloatButton>
        <div className='shop-categories'>
        {
          categories.map((cat)=>{
            return(
            <div key={cat}
            onClick={()=>toggleCat(cat)}
            className={`category-card ${currCategories.includes(cat.toLowerCase())?  'bg-my-custom-purple text-white' :  'bg-gray-100' }`}> 
            {cat.toUpperCase()}
            </div>
            )
          })
        }
        </div>
        <div className="shop-items">
          {currCategories.length === 0 ? (
            <div className='empty-shop'><span>Please select a category</span></div>
            ) 
            : (prodList
            .filter((prod) =>currCategories.includes("all") || currCategories.includes(prod.category.toLowerCase()))
            .map((prod) => (
            <ProductCard prod={prod} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} getQuantity={getQuantity} key={prod.id} />
            ))
          )}
        </div>
      </div>
  )
}

export default Shop