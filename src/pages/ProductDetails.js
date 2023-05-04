import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { API, IMG_URL } from '../config'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
    const[product,setProduct]=useState({})
    const params=useParams()

    useEffect(()=>{
        const id=params.productId
        axios.get(`${API}/productdetails/${id}`)
        .then(res=>{
            setProduct(res.data)
        })
        .catch(err=>console.log(err))
    },[])

    // add to cart 
    const addToCart=()=>{
        const cartItems=JSON.parse(localStorage.getItem('cartItems')) || []
        const productItem={
            id:product._id,
            name:product.product_name,
            price:product.product_price,
            image:product.product_image,
            category:product.category,
            description:product.product_description,
            countInStock:product.countInStock,
            quantity:1
        }
        const existingItem=cartItems.find(item=>item.id===product._id)
        if(existingItem){
            toast.error('Product already in the cart')
        }
        else{
            cartItems.push(productItem)
            localStorage.setItem('cartItems',JSON.stringify(cartItems))
            toast.success(`${productItem.name} is added to cart`)
        }
    }
  return (
    <>
    <ToastContainer theme='colored' position='top-center'/>
    <div className='container shadow p-5 my-5'>
        <div className='row d-flex justify-content-between'>
            <div className='col-md-5'>
                <img src={`${IMG_URL}/${product.product_image}`} alt={product.product_name} className='img-fluid'/>
            </div>
            <div className='col-md-6'>
                <h5>{product.product_name}</h5>
                <h5>Rs.{product.product_price}</h5>
                <p>{product.product_description}</p>
                <br/>
                <br/>
                <button className='btn btn-success' onClick={addToCart}>Add to Cart</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default ProductDetails