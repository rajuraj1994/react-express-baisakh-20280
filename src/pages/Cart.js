import React, { useState, useEffect,Fragment } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { IMG_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate=useNavigate()
    const [products, setProducts] = useState([])

    useEffect(() => {
        const cartData = localStorage.getItem('cartItems')
        const cartItems=JSON.parse(cartData)
        if(cartItems && cartItems.length >0){
            setProducts(cartItems)
        }
        else{
            setProducts([])
        }
    }, [])

    //decrease quantity
    const decreaseQty=id=>{
        const updateProducts=products.map(item=>{
            if(item.id===id && item.quantity>1){
                return {...item,quantity:item.quantity-1}
            }
            return item
        })
        setProducts(updateProducts)
        localStorage.setItem('cartItems',JSON.stringify(updateProducts))
    } 

    //increase quantity
    const increaseQty=id=>{
        const updateProducts=products.map(item=>{
            if(item.id===id && item.quantity<item.countInStock){
                return {...item,quantity:item.quantity+1}
            }
            return item
        })
        setProducts(updateProducts)
        localStorage.setItem('cartItems',JSON.stringify(updateProducts))
    } 
    //remove from cart 
    const removeCartHandler=(id,name)=>{
        const cartItems=JSON.parse(localStorage.getItem('cartItems'))
        const filterCart=cartItems.filter(item=>item.id!==id)
        localStorage.setItem('cartItems',JSON.stringify(filterCart))
        setProducts(filterCart)
        toast.success(`${name} is removed from the cart`)
    }
    // shipping handler
    const shippingHandler=()=>{
        navigate('/signin?redirect=shipping')
    }
    return (
        <>
            <ToastContainer theme='colored' position='top-center' />
            <div className="container">

                <div className="row justify-content-between my-5">
                    {products && products.length == 0 ?
                        <h2 className="text-center text-danger mt-3">Your Cart is Empty</h2>
                        : (
                            <>
                                <h2 className="text-center text-muted mt-3">Your Cart Items</h2>
                                <div className="col-md-8 shadow-lg">
                                    {products && products.map((item,i)=>(
                                        <Fragment key={i}>
                                    <hr />
                                    <div className="d-flex  p-3 align-items-center">
                                        <div className="col-3">
                                            <img src={`${IMG_URL}/${item.image}`}
                                                alt={item.name} className="img-fluid" width="150" />
                                        </div>
                                        <div className="col-3">
                                            <span><b>{item.name}</b></span>
                                        </div>
                                        <div className="col-2">
                                            <span className="text-warning">Rs.{item.price}</span>
                                        </div>
                                        <div className="col-3">
                                            <div className="d-flex">
                                                <button className="btn btn-danger" onClick={()=>decreaseQty(item.id)}>-</button> &nbsp;
                                                <input type="number" name="qty" value={item.quantity} readonly className="form-control border-0" />
                                                &nbsp;
                                                <button className="btn btn-primary" onClick={()=>increaseQty(item.id)}>+</button> &nbsp;
                                            </div>

                                        </div>
                                        <div className="col-1">
                                            <button className="btn btn-danger" onClick={()=>removeCartHandler(item.id,item.name)}>
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <hr />
                                           
                                    </Fragment>
                                    ))}
                                </div>
                                <div className="col-md-3">
                                    <div className="shadow-lg p-2">
                                        <h5>Cart Summary</h5>
                                        <hr />
                                        <span><b>Units:</b> {products.reduce((ac,item)=>(ac+Number(item.quantity)),0)}</span>
                                        <br />
                                        <span><b>Total:</b> Rs.{products.reduce((ac,item)=>(ac+item.quantity*item.price),0)}</span>
                                        <hr />
                                        <button className="btn btn-warning" onClick={shippingHandler}>CheckOut</button>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>

        </>
    )
}

export default Cart