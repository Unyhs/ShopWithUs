import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Menu,ConfigProvider, Dropdown,Space } from 'antd';
import {MenuOutlined} from '@ant-design/icons'

const Navbar = () => {
  const cartList=useSelector(store=>store.cartState.cartList)

  const calcSumQuantity=()=>{
    let sum=cartList.reduce((sum,item)=>{return sum+item.quantity},0)
    return sum
  }

  const navitems=[
    {key:1,label:(<Link to={'/'}>HOME</Link>)},
    {key:2,label:(<Link to={'/shop'}>SHOP</Link>)},
    {key:3,label:(<Link to={'/shop/electronics'}>ELECTRONICS</Link>)},
    {key:4,label:(<Link to={'/shop/jewelery'}>JEWELERY</Link>)},
    {key:5,label:(<Link to={"/shop/men's clothing"}>MEN'S CLOTHING</Link>)},
    {key:6,label:(<Link to={"/shop/women's clothing"}>WOMEN'S CLOTHING</Link>)},
  ]


  return (
    <div className='navbar'> 
      <div className="navbar-box">
        <div className='navbar-menu'>
          <ConfigProvider 
            theme={{
            token:{
              colorBgContainer:'#490b3d',
              colorText:'white',
              fontFamily:'Baloo 2',
            },
            components: {
              Menu: {
                itemSelectedColor: 'yellow', // Color of the selected menu item text
                itemSelectedBorderBottom: '2px solid yellow', // Bottom border color of the selected item
              },
            },
            }}>
            <Menu items={navitems} 
            mode='horizontal'
            style={{ width: "100%", borderBottom:'none', fontSize:'100%' }}
            >
            </Menu>
          </ConfigProvider>
        </div> 

        <div className='navbar-menu-portrait'>
          <Dropdown menu={{items:navitems}} trigger={['click']} placement='bottomLeft'>
              <MenuOutlined />
          </Dropdown>
        </div>
       
        <div className="navbar-cart">
          <Link to='/Cart'className='navbar-cart-link'>
            <span className="navbar-cart-span">
              <FontAwesomeIcon icon={faCartShopping} />{calcSumQuantity()}
            </span>
          </Link>
        </div>    

      </div>
    </div>
  )
}

export default Navbar 