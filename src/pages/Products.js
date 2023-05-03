import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { API } from '../config'

const Products = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    axios.get(`${API}/productlist`)
      .then(res => {
        setProducts(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <>
      <div className='container-fluid'>
        <div className='row d-flex justify-content-evenly'>
          <div className='col-md-3'>
            <Sidebar />
          </div>
          <div className='col-md-8'>
            <div className="container-fluid mt-5">
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {products && products.map((product, i) => (
                  <Card key={i} item={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Products