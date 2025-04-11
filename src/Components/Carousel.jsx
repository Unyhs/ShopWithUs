import React, { useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productFetch from '../Redux/ProductFetch'
import { Spin } from 'antd'
import {ExclamationCircleOutlined, LeftOutlined,RightOutlined} from '@ant-design/icons'

const Carousel = () => {
    const prodList=useSelector(store=>store.prodState.prodList)
    const status=useSelector(store=>store.prodState.status)
    const [currentItem,setCurrentItem]=useState(0)
    const dispatch=useDispatch()

    useEffect(()=>{
          dispatch(productFetch());
    },[dispatch]);

    const nextItem=()=>{
        setCurrentItem((curr)=>(curr===prodList.length-1)? 0:curr+1);
    }

    const prevItem=()=>{
        setCurrentItem((curr)=>(curr===0)? prodList.length-1:curr-1);
    }

  useEffect(()=>{
    const interval=setInterval(()=>{
      nextItem();
    },3000)

    return ()=>{
      clearInterval(interval)
    }
    },[currentItem])

    if(status==='loading')
      return (
      <div style={{ textAlign: 'center', marginTop: '15%'}}>
        <Spin />
        <h1>Loading...</h1>
      </div>
      )

    if(status==='error')
      return (<div style={{ textAlign: 'center', marginTop: '15%'}}>
        <ExclamationCircleOutlined />
        <h1>Something went wrong, please check again.</h1>
        </div>)

  return (
    <div className='carousel'>
      <div className='carousel-box relative'>
        <button className='carousel-box-left-button' onClick={prevItem}><LeftOutlined /></button>
        <div className='carousel-box-image' 
        style={{backgroundImage:`url(${prodList[currentItem].image})`}}>
        </div>
        <div className='mx-5'>
          <div className='carousel-box-item'>{prodList[currentItem].title}</div>
          <div className='carousel-box-price'>{`$ ${prodList[currentItem].price}`}</div>
        </div>
        <button className='carousel-box-right-button' onClick={nextItem}><RightOutlined /></button>
      </div>
    </div>
  )
}

export default Carousel