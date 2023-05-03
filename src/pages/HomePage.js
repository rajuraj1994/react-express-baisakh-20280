import React, { useState, useEffect } from 'react'
import Slider from '../components/Slider'
import Card from '../components/Card'
import axios from 'axios'
import { API } from '../config'

const HomePage = () => {
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
      <Slider />
      <div className="container-fluid mt-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products && products.slice(0,6).map((product,i)=>(
            <Card key={i} item={product}/>
          ))} 
      </div>
    </div>
    </>
  )
}

export default HomePage