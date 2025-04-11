import React from 'react'
import {MinusOutlined,PlusOutlined} from '@ant-design/icons'
import { Button } from 'antd'

const ProductCard = ({prod,handleAddToCart,handleRemoveFromCart,getQuantity}) => {

  let quantity=getQuantity(prod)  
  return ( 
    <div className='product-card' key={prod.id}>
        <img className='product-card-image'src={prod.image} alt="Image" />
        <div className='product-card-title'>{prod.title}</div>
        <div className='product-card-price'>${prod.price}</div>
        <div className='flex justify-center mt-4'>
          <Button className='product-card-button-remove' onClick={()=>handleRemoveFromCart(prod)}><MinusOutlined /></Button>
          <p className='product-card-quantity'>{quantity}</p>
          <Button className='product-card-button-add' onClick={()=>handleAddToCart(prod)}><PlusOutlined /></Button>     
        </div>
        
    </div>
  )
}

export default ProductCard