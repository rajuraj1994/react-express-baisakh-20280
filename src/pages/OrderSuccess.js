import React from 'react'
import { Link } from 'react-router-dom'
const OrderSuccess = () => {
  return (
    <>
    <div className='container my-5'>
        <div className='row d-flex justify-content-center'>
           <div className='col-6 text-center'>
            <img src='https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Circle-512.png' alt='order success' className='img-fluid d-block mx-auto my-5' height={'200'} width={'200'}/>
            <h2>Your Order has been placed Successfully</h2>
            <Link to=''>Go to Orders</Link>
           </div>
        </div>

    </div>
    </>
  )
}

export default OrderSuccess