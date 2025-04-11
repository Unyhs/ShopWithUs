import React,{useState} from 'react'
import cartSlice from '../Redux/CartSlice'
import {useSelector,useDispatch} from 'react-redux'
import { categories } from './Shop';
import { Link, useNavigate } from 'react-router-dom';
import { Table,Button, Form,Input,ConfigProvider,FloatButton} from 'antd';
import {MinusOutlined,PlusOutlined,CloseOutlined,UpOutlined, ShoppingCartOutlined} from '@ant-design/icons'

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

  const tableHeaders=[
  {title:"Product Description", dataIndex:"title",render:((text,data)=>
    (<div className='flex items-center max-w-lg'>
      <img 
      src={data.image}
      alt='image'
      className='cart-product-thumbnail'/>

      <span className='ml-4'>{data.title}</span>
      </div>
      )
    )},
  {title:"Price ($)", dataIndex:"price",render:(text)=><span>{text}</span>},
  {title:"No.", dataIndex:"quantity"},
  {title:"Amount ($)", dataIndex:"genre",render:((text,data)=>
    (<span>
      {data.price*data.quantity}
    </span>)
    )},
  {title:"Action",render:(text,data)=>(
    <div className='flex'>
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
    </div>
  )}]


  if(cartList.length===0)
    return (
    <div className='mt-60 text-my-custom-purple'>
      <p className="exclamation mt-20 text-7xl"><ShoppingCartOutlined /></p>
      <p className='text-4xl mt-4'>Your cart is empty.</p>
      <p className='text-xl mt-8 text-blue-500 underline'><Link to={'/shop'}>Click to continue shopping</Link></p>
    </div>
  )

  return(
    <div className='cart'>
      <FloatButton icon={<UpOutlined />} onClick={()=>{ window.scrollTo({ top: 0, behavior: 'smooth' });}}>Go to Top </FloatButton>
      <ConfigProvider
        theme={{
          token:{
            colorText:'#490b3d',
            fontFamily:'Baloo 2',
          }
          }}
      >
      <Table 
      rowKey={"id"}
      className='cart-table'
      dataSource={cartList} 
      columns={tableHeaders} 
      footer={()=>(<div>
        <span className='cart-footer'>No of Items: {calcSumQuantity()} </span>
        <span className='cart-footer'> Order Total: ${calcSumAmount()} </span>
      </div>)} />
      </ConfigProvider>

      <div>
      <ConfigProvider
        theme={{
          token:{
            colorText:'#490b3d',
            fontFamily:'Baloo 2',
            fontSize:'100%'
          }
          }}
      >
        <Form 
        onFinish={handleSubmit}
        className='couponBox'
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
          className='saveMoneyButton'
          htmlType="Submit"
          >Submit
          </Button>

        </Form>
        </ConfigProvider>

        <div className='flex justify-center'>
          {coupons.map((cou)=>(
            <div key={cou} className='p-2 my-2'>
            <span className='border-2 p-2 border-dashed bg-my-custom-gold hover:bg-red-600 text-xs'>
              {cou.toUpperCase()}  <span onClick={()=>{handleRemoveCoupon(cou)}}><CloseOutlined /></span>
            </span>
            </div>
          ))}  
        </div>
        
        <Button
        className='placeOrderButton' 
        onClick={()=>{
          nav('/')
          window.location.reload()
        }}>
            Place my Order
        </Button>

      </div>
      
    </div>
  )
}

export default Cart