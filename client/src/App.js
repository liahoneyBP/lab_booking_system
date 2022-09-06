import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router , Routes, Route} from "react-router-dom";
import Header from './components/Navbar/Header';
import Home from './pages'
import Lab from './pages/Lab'
import MyBookings from './pages/MyBookings';
import Schedule from './pages/Schedule';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import SignUpComplete from './pages/auth/SignUpComplete';
import ForgotPassword from './pages/auth/ForgotPassword';
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from './firebase';
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth"

function App() {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, []);




  return (
    <Router>
    
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/lab" element={<Lab />}></Route>
        <Route path="/mybookings" element={<MyBookings />}></Route>
        <Route path="/schedule" element={<Schedule />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up/complete" element={<SignUpComplete />}></Route>
        <Route path="/forgot/password" element={<ForgotPassword />}></Route>
        <Route path="/user/history" element={ <UserRoute><History /></UserRoute> } />
        
      </Routes>
      
    </Router>
  );
}

export default App;
