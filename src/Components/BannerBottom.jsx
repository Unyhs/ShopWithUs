import React from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from 'antd'
import {MenuOutlined} from '@ant-design/icons'

 const navitems=[
    {key:1,label:(<Link to={'/'}>HOME</Link>)},
    {key:2,label:(<p>Shop</p>)},
  
  ]


function BannerBottom() {
  return (
    <div className='banner bg-transparent h-[20vh] w-[20vw] mt-48'>
        <Dropdown menu={{items:navitems}} trigger={['click']} placement='bottomLeft'>
              <MenuOutlined />
        </Dropdown>
    </div>
  )
}

export default BannerBottom