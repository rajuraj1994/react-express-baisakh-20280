import React from 'react'
import { Link } from 'react-router-dom'
const AdminSidebar = () => {
  return (
    <>
    <div className="d-flex justify-content-end">
      <div className="col-md-1 mt-3">
        <button className="btn btn-success" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight">
          Menu
        </button>
        <div className="offcanvas offcanvas-end bg-dark text-white" tabindex="-1" id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel" style={{width:'300px'}}>
          <div className="offcanvas-header">
            <h5 id="offcanvasRightLabel">Admin Dashboard</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="list-unstyled">
              <li><Link to="#" className="text-decoration-none text-white">Dashboard</Link></li>
              <li><Link to="#" className="text-decoration-none text-white">Users</Link></li>
              <li><Link to="#" className="text-decoration-none text-white">Products</Link></li>
              <li><Link to="#" className="text-decoration-none text-white">Categories</Link></li>
              <li><Link to="#" className="text-decoration-none text-white">Orders</Link></li>
            </ul>
          </div>
          <div className="offcanvas-body">
            <ul className="list-unstyled">
              <li><Link to="#" className="text-decoration-none text-white">
                  <b>Name : </b> admin
                </Link></li>
              <li><Link to="#" className="text-decoration-none text-white">
                  <b>Email : </b> admin@gmail.com
                </Link></li>
            </ul>
            <div className="img">
              <img
                src="https://thumbs.dreamstime.com/b/frontal-male-passport-photo-isolated-white-background-eu-standardization-frontal-male-passport-photo-isolated-white-149548031.jpg"
                alt="" className="img-fluid rounded-circle" width="200"/>
            </div>
            <Link to="#" className="btn btn-warning text-decoration-none">Logout</Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminSidebar