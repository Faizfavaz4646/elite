import React from 'react'
import Home from './Components/Pages/Home';
import { Routes, Route } from 'react-router-dom';
import Cart from './Components/Pages/Cart/Cart';
import Login from './Components/Pages/Login/Login';
import Wishlist from './Components/Pages/Wishlist';
import Navbar from './Components/Navbar';
import SignUp from './Components/Pages/Signup/SignUp';
import ProductDetails from './Components/ProductDetails';
import ProductListing from './Components/Productlist/ProductListing';
import Orders from './Components/Orders/Oders';
import Payment from './Components/Payment/Payment';






function App() {
  return (
       <>
       
       <Navbar />
       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='cart' element={<Cart />} />
        <Route path='login' element={<Login />} />
        <Route path='wishlist' element={<Wishlist />} />
        <Route path='signup' element={<SignUp />}/>
        <Route path='productlisting' element={<ProductListing />} />
        <Route path='product/:id' element={<ProductDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<Orders />} />
       
       </Routes>

        
 
    
   
    </>
   
  
  )
}

export default App;