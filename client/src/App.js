import React, {  Fragment, useEffect } from 'react';
import { BrowserRouter as Router , Routes, useParams, Route} from "react-router-dom";
import Header from './components/Navbar/Header';
import Home from './pages/Home'
import Lab from './pages/Lab'
import MyBookings from './pages/MyBookings';
import Schedule from './pages/Schedule';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import SignUpComplete from './pages/auth/SignUpComplete';
import ForgotPassword from './pages/auth/ForgotPassword';
import Profile from "./pages/user/Profile";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Password from "./pages/user/Password";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LabCreate from "./pages/admin/lab/LabCreate"
import AllLabs from "./pages/admin/lab/AllLabs"
import LabSingle from './pages/LabSingle';
import LabUpdate from "./pages/admin/lab/LabUpdate"


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
  }, [dispatch]);




  return (
    <Router>
      <React.Fragment>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/lab" element={<Lab />}></Route>
        <Route path="/mybookings" element={<MyBookings />}></Route>
        <Route path="/schedule" element={<Schedule />}> </Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up/complete" element={<SignUpComplete />}></Route>
        <Route path="/forgot/password" element={<ForgotPassword />}></Route>
        <Route path="/user/profile" element={ <UserRoute><Profile /></UserRoute> } />
        <Route path="/user/password" element={ <UserRoute><Password /></UserRoute> } />
        <Route  exact path="/admin/dashboard" element={ <AdminRoute><AdminDashboard /></AdminRoute> } />
        <Route  exact path="/admin/lab" element={ <AdminRoute><LabCreate /></AdminRoute> } />
        <Route  exact path="/admin/labs" element={ <AdminRoute><AllLabs /></AdminRoute> } />
        <Route path="/lab/:slug" element={<LabSingle />}></Route>
        <Route  exact path="/admin/lab/:slug" element={ <AdminRoute><LabUpdate /></AdminRoute> } />
      </Routes>
  
      </React.Fragment>
    </Router>
  );
}

export default App;
