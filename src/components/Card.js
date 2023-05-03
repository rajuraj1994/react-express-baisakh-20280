import React from 'react'
import { IMG_URL } from '../config'
import { Link } from 'react-router-dom'

const Card = (props) => {
    const{_id,product_name,product_price,product_image}=props.item
  return (
    <>
            <div className="col">
                <div className="card shadow-lg">
                    <img src={`${IMG_URL}/${product_image}`}
                        className="card-img-top" alt={product_name}/>
                    <div className="card-body">
                        <h5 className="card-title">{product_name}</h5>
                        <h5 className="card-title">Rs.{product_price}</h5>
                        <Link className="btn btn-success" to={`/productdetails/${_id}`}>View Details </Link>
                    </div>
                </div>
            </div>

    </>
  )
}

export default Card