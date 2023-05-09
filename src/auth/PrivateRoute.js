import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from ".";
import Header from "../components/Header";
import Footer from "../components/Footer";


const PrivateRoute = () => (
    isAuthenticated() && isAuthenticated().user.role === 0 ?
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
        : (
            <Navigate to='/signin' />
        )
)


export default PrivateRoute 
