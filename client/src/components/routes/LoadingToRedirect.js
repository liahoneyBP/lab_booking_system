import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && navigate("/sign-in");
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="container p-5 text-center">
      
      <p>Please Sign-In First, Redirecting in {count} seconds...</p>
    </div>
  );
};

export default LoadingToRedirect;
