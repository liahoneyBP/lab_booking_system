import React, { useState } from "react";
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";

 
const SignUp = () => {
  const [email, setEmail] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ENV --->", process.env.REACT_APP_SIGNUP_REDIRECT_URL)
    const actionCodeSettings = {
      url: process.env.REACT_APP_SIGNUP_REDIRECT_URL,
      handleCodeInApp: true,
    };
 
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
 
    window.localStorage.setItem("emailForSignIn", email);
 
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration`
    );
 
    setEmail("");
  };
 
  const signUpForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
 
        <button className="btn btn-dark" type="submit">
          Sign Up
        </button>
      </form>
    );
  };
 
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Sign Up</h4>
     
          {signUpForm()}
        </div>
      </div>
    </div>
  );
};
 
export default SignUp;