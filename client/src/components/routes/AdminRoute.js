import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
 
const AdminRoute = ({children}) => {
    const { user } = useSelector((state) => ({...state}));
    return user && user.token && user.role === "admin" ? (
        children
    ) : (
        <>  
     <Navigate to="/" />
     </>
    );
};
 
export default AdminRoute;




