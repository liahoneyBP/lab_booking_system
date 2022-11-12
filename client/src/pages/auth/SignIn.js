import React, { useState, useEffect} from "react";
import { toast } from "react-toastify";
import { Button } from "antd";
import { GoogleOutlined, LoginOutlined, LoadingOutlined, FacebookOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider, } from "firebase/auth";


const SignIn = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const { user } = useSelector((state) => ({ ...state }));
  
 
  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user, navigate]);


  let dispatch = useDispatch();

  /* const roleBaseRedirect = (res) => {
    if (res.data.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/profile");
    }
  } */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
   // console.table(email, password);
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    // console.log(result);
    const { user } = result;
    const idTokenResult = await user.getIdTokenResult();

    createOrUpdateUser(idTokenResult.token)
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
  /*  roleBaseRedirect(res); */
    })
    .catch((err) => console.log(err));

    navigate("/") 

  } catch (error) {
    console.log(error);
    toast.error(error.message);
    setLoading(false);
  }
};

const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
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
        shape="default"
        icon={<LoginOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Sign In with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <LoadingOutlined style={{ fontSize: '50px', color: '#f5222d' }} />
          ) : (
            <h4>Sign In</h4>
          )}
          {signinForm()}

          <Button 
            onClick={googleSignIn}
            type="danger"
            className="mb-3"
            block
            shape="default"
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
