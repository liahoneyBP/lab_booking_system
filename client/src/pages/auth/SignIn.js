import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signInWithPopup,
    GoogleAuthProvider } from "firebase/auth";


import {useNavigate} from 'react-router-dom';


const SignIn = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("gustavogabirea55@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
   // console.table(email, password);
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    // console.log(result);
    const { user } = result;
    const idTokenResult = await user.getIdTokenResult();

    dispatch({
        type: "LOGGED_IN_USER",
        payload: {
            email: user.email,
            token: idTokenResult.token,
        },
    });
    navigate("/")
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    setLoading(false);
  }
};

const googleSignIn = async () => {
    signInWithPopup(auth, provider)
    .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
            type: "LOGGED_IN_USER",
            payload: {
                email: user.email,
                token: idTokenResult.token,
            },
        });
        navigate("/")
    })
    .catch((err) => {
        console.log(err);
        toast.error(err.message);
    });
}


  const signinForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Sign In</h4>
          )}
          {signinForm()}

          <Button 
            onClick={googleSignIn}
            type="dark"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
            >
                Sign In With Google
          </Button>
          <Link to="/forgot/password" className="float-right text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
