import React from "react";
import AdminSidebar from '../admin/AdminSidebar'
import { Navigate,Outlet } from "react-router-dom";
import { isAuthenticated } from ".";


const AdminRoute=()=>(
    isAuthenticated() && isAuthenticated().user.role===1 ?
    <>
    <AdminSidebar/>
    <Outlet/>
    </>
     :(
        <Navigate to='/signin'/>
    )
)


export default AdminRoute 
