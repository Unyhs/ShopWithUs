import React, { useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productFetch from '../Redux/ProductFetch'
import { Spin } from 'antd'
import {ExclamationCircleOutlined} from '@ant-design/icons'

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
    <div className='flex justify-center bg-gradient-to-r from-gray-900 to-gray-400 border-0 rounded-xl'>
      <div className='flex h-[40vh] w-[40vw] justify-between items-center border-0 drop-shadow-xl rounded-xl'>
        <button className='p-5 text-2xl' onClick={prevItem}>{`<`}</button>
        <div className='p-5 flex bg-center bg-contain bg-no-repeat h-[20vh] w-[20vw]' 
        style={{backgroundImage:`url(${prodList[currentItem].image})`}}>
        </div>
        <div>
          <div className='p-5 text-2xl text-white'>{prodList[currentItem].title}</div>
          <div className='p-5 text-2xl text-white'>{`$ ${prodList[currentItem].price}`}</div>
        </div>
        <button className='p-5 text-2xl' onClick={nextItem}>{`>`}</button>
      </div>
    </div>
  )
}

export default Carousel