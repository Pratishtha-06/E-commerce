import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";


function Layout(){
    return (
        <>
        <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
        <Header/>
        <Outlet/>
        </div>
        </>
    )
}
export default Layout;