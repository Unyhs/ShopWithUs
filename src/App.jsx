import './App.css'
import Home from './Components/Home'
import Shop from './Components/Shop'
import {Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Cart from './Components/Cart'


function App() {

  return (
    <div id='app'>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/Shop' element={<Shop />}></Route>
      <Route path='/Shop/:category' element={<Shop />}></Route>
      <Route path='/Cart' element={<Cart />}></Route>
    </Routes>
    </div>
  )
}

export default App
