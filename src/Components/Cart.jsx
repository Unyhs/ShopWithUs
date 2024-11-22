import React,{useState} from 'react'
import cartSlice from '../Redux/CartSlice'
import {useSelector,useDispatch} from 'react-redux'
import { categories } from './Shop';
import { useNavigate } from 'react-router-dom';
import { Table,Button, Form,Input, message, Card } from 'antd';
import {MinusOutlined,PlusOutlined,CloseOutlined} from '@ant-design/icons'

const offers=["10 off","eoss","black friday"]
const {addToCart,removeFromCart,updateCart,addCoupon,removeCoupon}=cartSlice.actions;

const Cart = () => {
  const cartList=useSelector((store)=>store.cartState.cartList);
  const coupons=useSelector((store)=>store.cartState.coupons);
  const nav=useNavigate()
  const dispatch=useDispatch()


  const handleRemove=(prod)=>{
    dispatch(removeFromCart(prod));
  }

  const handleAddToCart=(prod)=>{
    dispatch(addToCart(prod));
  }

  const handleSubmit=(value)=>{
    if(value.coupon)
    {
      dispatch(addCoupon(value.coupon))
      dispatch(updateCart())
    }
  }

  const handleRemoveCoupon=(value)=>{
    console.log(value)
    if(value)
    {
      dispatch(removeCoupon(value))
      dispatch(updateCart())
    }
  }

  const calcSumQuantity=()=>{
    let sum=cartList.reduce((sum,item)=>{return sum+item.quantity},0)
    return sum
  }

  const calcSumAmount=()=>{
    let sum=cartList.reduce((sum,item)=>{return sum+(item.quantity*item.price)},0)
    return sum.toFixed(2)
  }

  const tableHeaders=[{title:"",dataIndex:"poster",render:((text,data)=>
    (<img 
      src={data.image}
      alt='image'
      style={{objectFit:'cover'}}
      height="75" 
      width="60"/>)
    )},
  {title:"Product Name", dataIndex:"title"},
  {title:"Price", dataIndex:"price",render:(text)=>`$ ${text}`},
  {title:"Quantity", dataIndex:"quantity"},
  {title:"Amount", dataIndex:"genre",render:((text,data)=>
    (<span>
      {data.price*data.quantity}
    </span>)
    )},
  {title:"Action",render:(text,data)=>(
    <>
      <Button onClick={()=>{
          handleRemove(data)
        }}>
      <MinusOutlined />
      </Button>
      <Button onClick={()=>{
          handleAddToCart(data)
        }}>
      <PlusOutlined />
      </Button>
    </>
  )}]


  if(cartList.length===0)
    return (
    <>
    <div className='text-2xl mt-40'>Your cart is empty.</div>

    <div>
      <div className='text-2xl mt-20'>Explore our products from all categories : </div>
      <div className='flex justify-center gap-8 mt-10'>
      {categories.map(cat=>(
      <div key={cat} className='h-[15vh] w-[15vw] ring-red-900 text-xl text-gray-900 flex justify-center items-center rounded-2xl ring-2 cursor-pointer' 
      onClick={()=>{
        nav(`/Shop/${cat}`)
      }}>
        {cat}
      </div>))}
      </div>
    </div>
    </>
  )

  return(
    <div className='flex flex-col justify-center items-center'>
      <Table 
      rowKey={"id"}
      className='mt-20 w-[80vw]'
      dataSource={cartList} 
      columns={tableHeaders} 
      footer={()=>(<div>
        
        <span className='mx-5'>No of Items: {calcSumQuantity()} </span>

        <span className='mx-5'> Order Total: ${calcSumAmount()} </span>
      </div>)} />

      <div>
        <Form onFinish={handleSubmit}
        layout='inline'>
        <Form.Item 
          label="Coupon Code" 
          name='coupon'
          rules={[{validator:async(_,value)=>{
            if(value && 
              offers.includes(value) && 
              (!coupons.includes(value))
              )
            {
              return Promise.resolve()
            }else if(value && coupons.includes(value))
            {
              return Promise.reject(new Error('Coupon Code already included'));
            }else if(value)
            {
              return Promise.reject(new Error('Invalid Coupon Code'));
            }
            
          }}]}>
            
          <Input placeholder="Enter the coupon code"/>
        </Form.Item>
          <Button 
          type="primary"
          htmlType="Submit"
          >Save me some money!
          </Button>
        </Form>
        <div className='flex justify-center'>
          {coupons.map((cou)=>(
            <div key={cou} className='p-2 my-2'>
            <span className='border-2 p-2 border-dashed bg-gray-100 hover:bg-red-600 text-xs'>
              {cou.toUpperCase()}  <span onClick={()=>{handleRemoveCoupon(cou)}}><CloseOutlined /></span>
            </span>
            </div>
          ))}  
        </div>
      </div>
      <div>
        <Button type='primary' className='p-2 m-5' onClick={()=>{
          nav('/')
          window.location.reload()
        }}>Place my Order</Button>
      </div>
    </div>
  )
}

export default Cart