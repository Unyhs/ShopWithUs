import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cartList=useSelector(store=>store.cartState.cartList)

  const calcSumQuantity=()=>{
    let sum=cartList.reduce((sum,item)=>{return sum+item.quantity},0)
    return sum
  }
  return (
    <div className='flex item-center fixed top-0 z-10'>
        <div className='ml-24 py-6 text-gray-900 text-2xl font-bold'> <Link to='/'>Home</Link></div>
        <div className='mx-5 mt-4 flex justify-evenly items-center bg-gray-900 rounded-2xl w-[165px] h-[50px]'>
          <Link to='/Shop' className='text-white text-2xl font-bold w-[100px]' >Shop</Link>
          <Link to='/Cart' className='p-3 text-white text-2xl font-bold bg-red-900 rounded-2xl'><FontAwesomeIcon icon={faCartShopping} />{calcSumQuantity()}</Link>
        </div>
    </div>
  )
}

export default Navbar 