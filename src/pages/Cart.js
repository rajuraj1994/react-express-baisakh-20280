import React from 'react'

const Cart = () => {
  return (
    <>
    <div className="container">
        <h2 className="text-center text-muted mt-3">Your Cart Items</h2>
        <div className="row justify-content-between mt-5 mb-3">
            <div className="col-md-8 shadow-lg">
                <hr/>
                <div className="d-flex  p-3 align-items-center">
                    <div className="col-3">
                        <img src="https://image.shutterstock.com/image-photo/poznan-pol-jul-20-2020-260nw-1782856739.jpg"
                            alt="" className="img-fluid" width="150"/>
                    </div>
                    <div className="col-3">
                        <span><b>DELL</b></span>
                    </div>
                    <div className="col-2">
                        <span className="text-warning">Rs.90000</span>
                    </div>
                    <div className="col-3">
                        <div className="d-flex">
                            <button className="btn btn-danger">-</button> &nbsp;
                            <input type="number" name="qty" value="2" readonly className="form-control border-0"/>
                            &nbsp;
                            <button className="btn btn-primary">+</button> &nbsp;
                        </div>

                    </div>
                    <div className="col-1">
                        <button className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
                <hr />
            </div>
            <div className="col-md-3">
                <div className="shadow-lg p-2">
                    <h5>Cart Summary</h5>
                    <hr />
                    <span><b>Units:</b> 2</span>
                    <br />
                    <span><b>Total:</b> Rs.180000</span>
                    <hr />
                    <button className="btn btn-warning">CheckOut</button>
                </div>
            </div>

        </div>
    </div>

    </>
  )
}

export default Cart