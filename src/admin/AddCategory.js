import React,{useState} from 'react'
import { isAuthenticated } from '../auth'
import { addcategory } from './apiIndex'

const AddCategory = () => {
    const[category_name,setCategory]=useState('')
    const[error,setError]=useState(false)
    const[success,setSuccess]=useState(false)
    
    //destructure token from the localStorage 
    const{token}=isAuthenticated()

    const handleChange=e=>{
        setError('')
        setCategory(e.target.value.toLowerCase())
    }

    const handleSubmit=e=>{
        e.preventDefault()
        setError('')
        setSuccess(false)
        //make request to add category 
        addcategory(token,{category_name})
        .then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                setError('')
                setSuccess(true)
                setCategory('')
            }
        })
    }

     //to show error msg 
     const showError=()=>(
        <div className='alert alert-danger' style={{display:error ? '':'none'}}>
            {error}
        </div>
    )

    // to show success msg
    const showSuccess=()=>(
        <div className='alert alert-success' style={{display:success ? '':'none'}}>
          new category added
        </div>
    )

    return (
        <>
           
            <div className='container'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-md-6'>
                        <form className='shadow p-3'>
                            <h3 className='text-center text-muted'>Add Category</h3>
                            {showError()}
                            {showSuccess()}
                            <div className='mb-2'>
                                <label htmlFor='category'>Category Name</label>
                                <input type='text' id='category' className='form-control'
                                onChange={handleChange} value={category_name}
                                 />
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

export default AddCategory