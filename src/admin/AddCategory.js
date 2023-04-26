import React from 'react'
import AdminSidebar from './AdminSidebar'

const AddCategory = () => {
    return (
        <>
            <AdminSidebar />
            <div className='container'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-md-6'>
                        <form className='shadow p-3'>
                            <h3 className='text-center text-muted'>Add Category</h3>
                            <div className='mb-2'>
                                <label htmlFor='category'>Category Name</label>
                                <input type='text' id='category' className='form-control' />
                            </div>
                            <div className='mb-2'>
                                <button className='btn btn-primary'>
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