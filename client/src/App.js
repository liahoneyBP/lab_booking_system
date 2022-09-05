import React, { useEffect } from 'react';
import { BrowserRouter as Router , Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages'
import Lab from './pages/Lab'
import MyBookings from './pages/MyBookings';
import Schedule from './pages/Schedule';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import SignUpComplete from './pages/auth/SignUpComplete';


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from './firebase';
import { useDispatch } from "react-redux";


function App() {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token, 
          },
        });
      }
    });
    // cleanup
    return () => unsubscribe();
  }, []);




  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/lab" element={<Lab />}></Route>
        <Route path="/mybookings" element={<MyBookings />}></Route>
        <Route path="/schedule" element={<Schedule />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up/complete" element={<SignUpComplete />}></Route>
      </Routes>
       
    </Router>
  );
}

export default App;