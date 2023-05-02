import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTrash,FaEdit} from 'react-icons/fa';
import { API, IMG_URL } from '../config';
import { isAuthenticated } from '../auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Product = () => {
    const{token}=isAuthenticated()
    const[products,setProducts]=useState([])
    useEffect(()=>{
        axios.get(`${API}/productlist`)
        .then(res=>{
         setProducts(res.data)
        })
        .catch(err=>console.log(err))
    },[])

     //delete product 
     const deleteProduct=(id)=>{
        const confirmed=window.confirm('Are you sure want to delete this product ?')
        if(confirmed){
            axios.delete(`${API}/deleteproduct/${id}`,{
               headers:{
                Authorization:`Bearer ${token}`
               } 
            })
            .then(res=>{
                toast.success('Product deleted')
                setProducts(products.filter((p)=>p._id!==id))
            })
            .catch(err=>{
                toast.error('Failed to delete')
            })

        }
    }
  return (
    <>
    <ToastContainer theme='colored' position='top-center'/>
     <div class='container'>
                <div class="row d-flex justify-content-center">
                    <div class="col-md-10 shadow">
                        <table class="table table-striped">
                            <thead>
                                    <tr>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Stock Quantity</th>
                                    <th scope="col">Product Description</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {products && products.map((p,i)=>(
                                <tr key={i}>
                                    <td>{p.product_name}</td>
                                    <td>{p.product_price}</td>
                                    <td>{p.countInStock}</td>
                                    <td>{p.product_description}</td>
                                    <td><img src={`${IMG_URL}/${p.product_image}`} width='100' alt={p.product_name}/></td>
                                    <td>{p.category.category_name}</td>
                                    <td>  
                                        <Link className='btn btn-primary' to={`/admin/updateproduct/${p._id}`}><FaEdit/></Link> <br/><br/>  
                                        <button className='btn btn-danger'
                                        onClick={()=>deleteProduct(p._id)}
                                        ><FaTrash/></button>
                                    </td>
                                </tr>
                                  ))}
                                </tbody>
                                </table>
                            </div>
                    </div>
                </div>
    </>
  )
}

export default Product