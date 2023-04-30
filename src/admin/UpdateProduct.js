import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../config'
import { isAuthenticated } from '../auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
    const [categories, setCategory] = useState([])
    useEffect(() => {
        axios.get(`${API}/categorylist`)
            .then(res => {
                setCategory(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const { token } = isAuthenticated()

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async event => {
        event.preventDefault()
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
          new product added
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
                                    onChange={} value={product_name}
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='price'>Price</label>
                                <input type='number' id='price' className='form-control'
                                    onChange={} value={product_price}
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='qty'>Stock Quantity</label>
                                <input type='number' id='qty' className='form-control'
                                    onChange={} value={countInStock}
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='desc'>product Description</label>
                                <textarea className='form-control' id='desc'
                                    onChange={} value={product_description}
                                ></textarea>
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='image'>Image</label>
                                <input type='file' id='image' className='form-control' accept='image/*'
                                    onChange={}
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='category'>Category</label>
                                <select className='form-control' onChange={}>
                                    {categories.map((c, i) => (
                                        <option key={i} value={c._id}>{c.category_name}</option>
                                    ))}

                                </select>
                            </div>
                            <div className='mb-2'>
                                <button className='btn btn-primary'
                                    onClick={handleSubmit}
                                >
                                    Add
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct