import React from 'react'
import { useSelector } from 'react-redux'
import Carousel from './Carousel'
import {Row,Card, Divider,FloatButton} from 'antd'
import { useNavigate } from 'react-router-dom'
import {UpOutlined} from '@ant-design/icons'

const Home = () => {
  const prodList=useSelector(store=>store.prodState.prodList)
  const nav=useNavigate()

  let prodarrbogo=prodList.filter(prod=>prod.category==="men's clothing").slice(0,4)
  let prodarrtgif=prodList.filter(prod=>prod.category==="women's clothing").slice(0,4)
  let prodarr40=prodList.filter(prod=>prod.category==="electronics").slice(0,4)

  

  return (
    <div className='home'>
        <FloatButton icon={<UpOutlined />} onClick={()=>{ window.scrollTo({ top: 0, behavior: 'smooth' });}}>Go to Top </FloatButton>
      <div className='home-carousel'>
        <Carousel /> 
      </div>
      <div className='home-offer-cards'>

        <Row className='flex justify-center mt-8'>
          <Divider><span className='home-offer-title'>EXCITING OFFERS FOR YOU!</span></Divider>
        </Row>

        <Row className='mt-4 p-4 gap-4 flex justify-center'>

            <Card key = {"1"} 
              className='offer-card'
              onClick={()=>{nav(`/Shop/Men's Clothing`)}}
              title={<span className='offer-card-title'>10 Off</span>}>

              <div className='offer-card-desc'>
                <span>Use coupon code "10 Off" and get $10 discount on Men's Wear</span>
              </div>

              <div className="offer-card-box gap-4 mt-5">
              {
              prodarrbogo.map(prod=>
              (<div key={prod.id} 
                className='bg-center bg-contain bg-no-repeat h-[10vh]'
              style={{backgroundImage:`url(${prod.image})`}}>
              </div>))
              }
              </div>

            </Card>


            <Card key = {"2"} 
              onClick={()=>{nav(`/Shop/Women's Clothing`)}}
              title={<span className='offer-card-title'>EOSS</span>}>

              <div className='offer-card-desc'>
                  <span>Use coupon code "EOSS" and get 20% off on women's clothing.</span>
              </div>

              <div className="offer-card-box mt-5 gap-4">
                {
                prodarrtgif.map(prod=>
                (<div key={prod.id} 
                  className='bg-center bg-contain bg-no-repeat h-[10vh]'
                  style={{backgroundImage:`url(${prod.image})`}}>
                </div>))
                }
              </div>

            </Card>


            <Card key = {"3"} 
              onClick={()=>{nav(`/Shop/Electronics`)}}
              title={<span className='offer-card-title'>Black Friday</span>}>

              <div className='offer-card-desc'>
                <span>Use coupon code "Black Friday" and get 40% off on all electronics.</span>
              </div>

              <div className="offer-card-box mt-5 gap-4">
                {
                prodarr40.map(prod=>
                (<div key={prod.id} 
                  className='bg-center bg-contain bg-no-repeat h-[10vh]'
                style={{backgroundImage:`url(${prod.image})`}}>
                </div>))
                }
              </div>

            </Card>            
        </Row>

      </div>
    </div>
  )
}

export default Home