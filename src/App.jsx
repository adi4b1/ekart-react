import React from "react"
import Ekart from "./Ekart"
import 'bootstrap/dist/css/bootstrap.min.css'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import Nav from "./Nav"
import Apireducer from '../src/context/Apireducer'
import Usersall from '../src/context/Usersall'
import Productpage from "./Productpage"
import Users from "./Users"
import Cart from "./Cart"


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App=()=>{
  return(
    <div>
      <Apireducer>
      <Usersall>
      <Nav/>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Ekart/>}/>
        <Route path="/products/:cartId" element={<Productpage/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      {/* <Ekart/> */}

      {/* ////routes */}
      </Usersall>
      </Apireducer>

    </div>
  )
}

export default App