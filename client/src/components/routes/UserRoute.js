import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirect";
 
const UserRoute = ({children}) => {
    const { user } = useSelector((state) => ({...state}));
    return user && user.token ? (
        children
    ) : (
        <>  
     <Navigate to="/sign-in" />
     </>
    );
};
 
export default UserRoute;