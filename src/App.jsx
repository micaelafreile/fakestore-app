import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import Home from './components/Home'
import ProductList from './components/ProductList'
import AddProduct from './components/AddProduct'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import EditProduct from './components/EditProduct'
import DeleteProducts from './components/DeleteProducts'

function App() {

  return (
    <>
      <NavigationBar/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<ProductList/>}/>
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/addproduct" element={<AddProduct/>}/>
          <Route path="/products/cart" element={<Cart/>}/>
          <Route path="/edit/:productId" element={<EditProduct/>}/>
          <Route path="/delete/:id" element={<DeleteProducts/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
