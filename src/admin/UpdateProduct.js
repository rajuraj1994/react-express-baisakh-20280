import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../config'
import { isAuthenticated } from '../auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const params=useParams()
    const id=params.productId
    const [categories, setCategory] = useState([])
    const[initialValues,setInitialValues]=useState({})
    const { token } = isAuthenticated()
    
    const[product_name,setProductName]=useState('')
    const[product_price,setProductPrice]=useState('')
    const[countInStock,setCountInStock]=useState('')
    const[product_description,setProductDescription]=useState('')
    const[product_image,setProductImage]=useState(null)
    const[categoryId,setCategoryId]=useState('')
    const[success, setSuccess] = useState(false)
    const[error, setError] = useState('')

    useEffect(() => {

        axios.get(`${API}/categorylist`)
        .then(res => {
            setCategory(res.data)
        })
        .catch(err => console.log(err))

        axios.get(`${API}/productdetails/${id}`)
        .then(res=>{
            setInitialValues(res.data)
            setProductName(res.data.product_name)
            setProductPrice(res.data.product_price)
            setCountInStock(res.data.countInStock)
            setProductDescription(res.data.product_description)
            setCategoryId(res.data.category._id)
        })
        .catch(err => console.log(err))
    }, [])

    const handleSubmit = async event => {
        event.preventDefault()
        const formData = new FormData();
            formData.append('product_name', product_name)
            formData.append('product_price', product_price)
            formData.append('countInStock', countInStock)
            formData.append('product_description', product_description)
            formData.append('product_image', product_image)
            formData.append('category', categoryId)
            try{
                const response=await axios.put(
                    `${API}/updateproduct/${id}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`
                        },
                    }
                )
                setSuccess(true)
                setError('')
            }
            catch(err){
                setError(err.response.data.error)
                setSuccess('')
            }
    }

    //to show error msg 
    const showError=()=>(
        error && <div className='alert alert-danger'>
            {error}
        </div>
    )

    // to show success msg
    const showSuccess=()=>(
        success && <div className='alert alert-success'>
          Product updated
        </div>
    )

    return (
        <>
            <div className='container'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-md-6'>
                        <form className='shadow p-3'>
                            <h3 className='text-center text-muted'>Add Product</h3>
                            {showError()}
                            {showSuccess()}
                            <div className='mb-2'>
                                <label htmlFor='pname'>Product Name</label>
                                <input type='text' id='pname' className='form-control'
                                    onChange={(e)=>setProductName(e.target.value)} value={product_name}
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='price'>Price</label>
                                <input type='number' id='price' className='form-control'
                                    onChange={(e)=>setProductPrice(e.target.value)} value={product_price}
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='qty'>Stock Quantity</label>
                                <input type='number' id='qty' className='form-control'
                                    onChange={(e)=>setCountInStock(e.target.value)} value={countInStock}
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='desc'>product Description</label>
                                <textarea className='form-control' id='desc'
                                    onChange={(e)=>setProductDescription(e.target.value)} value={product_description}
                                ></textarea>
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='image'>Image</label>
                                <input type='file' id='image' className='form-control' accept='image/*'
                                    onChange={(e)=>setProductImage(e.target.files[0])}
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='category'>Category</label>
                                <select className='form-control' onChange={(e)=>setCategoryId(e.target.value)}>
                                    <option value={categoryId}>{initialValues.category && initialValues.category.category_name }</option>
                                    {categories && categories.map((c, i) => (
                                        <option key={i} value={c._id}>{c.category_name}</option>
                                    ))}

                                </select>
                            </div>
                            <div className='mb-2'>
                                <button className='btn btn-primary'
                                    onClick={handleSubmit}
                                >
                                   Update Product
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct