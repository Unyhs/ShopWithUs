import React from 'react'

const ProductCard = ({prod,handleAddToCart}) => {
  return ( 
    <div className='h-[40vh] w-[15vw] shadow-xl flex flex-col items-center rounded-xl' key={prod.id}>
        <img className='h-[30vh] w-[10vw] rounded-xl bg-cover bg-center hover:cursor-pointer'src={prod.image} alt="Image" />
        <div className='w-[14vw] truncate text-ellipsis'>{prod.title}</div>
        <div>Price:${prod.price}</div>
        <button className='bg-red-900 w-[100px] text-white rounded-xl' onClick={()=>handleAddToCart(prod)}>Add to Cart</button>
    </div>
  )
}

export default ProductCard