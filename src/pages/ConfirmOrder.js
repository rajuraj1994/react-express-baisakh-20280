import React from 'react'
import { isAuthenticated } from '../auth'
import { useNavigate } from 'react-router-dom'
import { IMG_URL } from '../config'

const ConfirmOrder = () => {
    const navigate = useNavigate()
    const cartItems = JSON.parse(localStorage.getItem('cartItems'))
    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'))
    const { user } = isAuthenticated()
    const totalPrice = cartItems.reduce((ac, item) => (ac + item.quantity * item.price), 0)

    const proceessToPayment=()=>{
        const data={
            totalPrice
        }
        sessionStorage.setItem('orderInfo',JSON.stringify(data))
        navigate('/payment')
    }

    return (
        <>
            <div className='container my-5'>
                <div className='row d-flex justify-content-evenly mb-3'>
                    <div className='col-8 shadow'>
                        <h2 className='text-center'>
                            Shipping Info
                        </h2>
                        <div className='co-6 offset-md-3'>
                            <div>
                                <b>Name</b>:
                                <span className='text-muted'>
                                    {user.name}
                                </span>
                            </div>
                            <div>
                                <b>Email</b>:
                                <span className='text-muted'>
                                    {user.email}
                                </span>
                            </div>
                            <div>
                                <b>City</b>:
                                <span className='text-muted'>
                                    {shippingInfo.city}
                                </span>
                            </div>
                            <div>
                                <b>Phone Number</b>:
                                <span className='text-muted'>
                                    {shippingInfo.phone}
                                </span>
                            </div>
                            <div>
                                <b>Country</b>:
                                <span className='text-muted'>
                                    {shippingInfo.country}
                                </span>
                            </div>
                            <div>
                                <b>Shipping Address</b>:
                                <span className='text-muted'>
                                    {shippingInfo.shippingAddress1},
                                    {shippingInfo.shippingAddress2}
                                </span>
                            </div>
                            <div>
                                <b>Zip</b>:
                                <span className='text-muted'>
                                    {shippingInfo.zip}
                                </span>
                            </div>

                        </div>
                        <hr />
                        <h2 className='text-center'>
                            Your Cart Items
                            {cartItems.map((item, i) => (
                                <>
                                    <hr />
                                    <div className='row d-flex align-items-center'>
                                        <div className='col-3'>
                                            <img src={`${IMG_URL}/${item.image}`}
                                                alt={item.name} className="img-fluid" width="150" />
                                        </div>
                                        <div className='col-3'>
                                            <p className='text-muted fs-5'>
                                                {item.name}
                                            </p>
                                        </div>
                                        <div className='col-2'>
                                            <p className='text-warning fs-5'>
                                                Rs.{item.price}x{item.quantity}=<b>Rs.{item.price * item.quantity}</b>
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </h2>
                    </div>
                    <div className='col-3'>
                        <h4>Order Summary</h4>
                        <hr />
                        <p>SubTotal: <span>
                            {cartItems.reduce((ac, item) => (ac + Number(item.quantity)), 0)} (Units)
                        </span></p>
                        <p>TotalPrice: Rs.<span>{totalPrice}</span></p>
                        <hr/>
                        <button className='btn btn-warning'
                        onClick={proceessToPayment}
                        >
                            Proceed to Payment
                        </button>

                    </div>

                </div>
            </div>
        </>
    )
}

export default ConfirmOrder