import React from 'react'
import { useSelector } from 'react-redux'
import Carousel from './Carousel'
import { Col, Row,Card, Divider} from 'antd'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const prodList=useSelector(store=>store.prodState.prodList)
  let prodarrbogo=prodList.filter(prod=>prod.category==="men's clothing").slice(0,4)
  let prodarrtgif=prodList.filter(prod=>prod.category==="women's clothing").slice(0,4)
  let prodarr40=prodList.filter(prod=>prod.category==="electronics").slice(0,4)
  const nav=useNavigate()

  return (
    <>
    <div className='mt-20 h-3/4'>
      <Row  
        gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}>
        <Col span={3}></Col>
        <Col span={18}><Carousel /></Col>
        <Col span={3}></Col>
      </Row>
    </div>
    <Row className='flex justify-center mt-4'>
      <Divider>EXCITING COUPONS FOR YOU!</Divider>
    </Row>
    <div>
      <Row  
        className='mt-4'
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}>
        <Col span={3}></Col>
        <Col span={6}>
          <Card key = {"1"} onClick={()=>{nav(`/Shop/Men's Clothing`)}}
          title={"10 Off"}>
            <div>
              <h1 className='text-xl text-red-900'>Get $10 discount on Men's Wear</h1>
            </div>
          <div className="grid grid-cols-2 gap-4 mt-5">
            {
             prodarrbogo.map(prod=>
             (<div key={prod.id} 
              className='bg-center bg-contain bg-no-repeat h-[10vh] w-[10vw]'
             style={{backgroundImage:`url(${prod.image})`}}>
             </div>))
            }
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card key = {"2"} onClick={()=>{nav(`/Shop/Women's Clothing`)}}
          title={"EOSS"}>
          <div>
              <h1 className='text-xl text-red-900'>Get 20% off on women's clothing.</h1>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            {
             prodarrtgif.map(prod=>
             (<div key={prod.id} 
              className='bg-center bg-contain bg-no-repeat h-[10vh] w-[10vw]'
             style={{backgroundImage:`url(${prod.image})`}}>
             </div>))
            }
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card key = {"3"} onClick={()=>{nav(`/Shop/Electronics`)}}
          title={"Black Friday"}>
          <div>
              <h1 className='text-xl text-red-900'>Get 40% off on all electronics.</h1>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            {
             prodarr40.map(prod=>
             (<div key={prod.id} 
              className='bg-center bg-contain bg-no-repeat h-[10vh] w-[10vw]'
             style={{backgroundImage:`url(${prod.image})`}}>
             </div>))
            }
            </div>
          </Card>
        </Col>
        <Col span={3}></Col>
      </Row>
    </div>

    
    </>
  )
}

export default Home