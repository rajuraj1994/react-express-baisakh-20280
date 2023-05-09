import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layouts from './components/Layouts'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import ForgetPassword from './pages/ForgetPassword'
import Products from './pages/Products'
import EmailVerify from './auth/EmailVerify'
import AdminRoute from './auth/AdminRoute'
import Dashboard from './admin/Dashboard'
import AddCategory from './admin/AddCategory'
import Category from './admin/Category'
import AddProduct from './admin/AddProduct'
import Product from './admin/Product'
import UpdateProduct from './admin/UpdateProduct'
import ProductDetails from './pages/ProductDetails'
import Shipping from './pages/Shipping'
import ConfirmOrder from './pages/ConfirmOrder'
import PaymentElement from './pages/PaymentElement'
import OrderSuccess from './pages/OrderSuccess'
import PrivateRoute from './auth/PrivateRoute'

const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layouts />}>
          <Route index element={<HomePage />} />
          <Route path='signup' element={<Register />} />
          <Route path='signin' element={<Login />} />
          <Route path='cart' element={<Cart />} />
          <Route path='forgotpassword' element={<ForgetPassword />} />
          <Route path='products' element={<Products />} />
          <Route path='productdetails/:productId' element={<ProductDetails />} />
          <Route path='email/confirmation/:token' element={<EmailVerify />} />
        </Route>
        
        <Route path='/' element={<PrivateRoute />}>
          <Route path='shipping' element={<Shipping />} />
          <Route path='confirm' element={<ConfirmOrder />} />
          <Route path='payment' element={<PaymentElement />} />
          <Route path='success' element={<OrderSuccess />} />
        </Route>


        {/* admin */}
        <Route path='/admin/' element={<AdminRoute />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='addcategory' element={<AddCategory />} />
          <Route path='category' element={<Category />} />
          <Route path='addproduct' element={<AddProduct />} />
          <Route path='product' element={<Product />} />
          <Route path='updateproduct/:productId' element={<UpdateProduct />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default MyRoutes