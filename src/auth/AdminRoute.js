import React from "react";
import { Navigate,Outlet } from "react-router-dom";
import { isAuthenticated } from ".";


const AdminRoute=()=>(
    isAuthenticated() && isAuthenticated().user.role===1 ?
    <Outlet/> :(
        <Navigate to='/signin'/>
    )
)


export default AdminRoute 
