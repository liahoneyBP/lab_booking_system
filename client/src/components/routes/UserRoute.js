import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
 
const UserRoute = ({children}) => {
    const { user } = useSelector((state) => ({...state}));
    return user && user.token ? (
        children
    ) : (
     <Navigate to="/sign-in" />
    );
};
 
export default UserRoute;