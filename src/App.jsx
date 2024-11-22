import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Components/Home'
import Shop from './Components/Shop'
import {Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Cart from './Components/Cart'

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/Shop' element={<Shop />}></Route>
      <Route path='/Shop/:category' element={<Shop />}></Route>
      <Route path='/Cart' element={<Cart />}></Route>
    </Routes>
    </>
  )
}

export default App
