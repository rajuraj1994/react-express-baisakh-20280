import React from 'react'
import Card from '../components/Card'
import Sidebar from '../components/Sidebar'

const Products = () => {
  return (
    <>
    <div className='container-fluid'>
      <div className='row d-flex justify-content-evenly'>
        <div className='col-md-3'>
          <Sidebar/>
        </div>
        <div className='col-md-8'>
          <Card/>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Products