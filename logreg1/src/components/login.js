import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GGoogleLogin from "./GoogleLogin";
import GGoogleLogout from "./GoogleLogout";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import "./login.css";

// import { createReducer } from "@reduxjs/toolkit";

// var LocalStorage = require('node-localstorage').LocalStorage
import { gapi } from "gapi-script";

import { NavLink } from "react-router-dom";
// import { useDispatch } from "react-redux";


const Login = () => {
  const [ profile, setProfile ] = useState([]);
  const [islogedin, setIsLogedIn] = useState(false);
  const clientId = '507149775109-uubqeea2jq3vck7qlq2mb3paabrctbai.apps.googleusercontent.com';
  useEffect(() => {
      const initClient = () => {
          gapi.client.init({
              clientId: clientId,
              scope: ''
          });
      };
      gapi.load('client:auth2', initClient);
  });
  const onSuccess = (res) => {
      setProfile(res.profileObj);
      // console.log("success");
  };

  const onFailure = (err) => {
      console.log('failed', err);
  };
  const logOut = () => {
    setProfile(null);
};

  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    console.log("hi");
    console.log(email);
    console.log(password);

    const res = await fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log(res);
    const data = await res.json();
    console.log(data);

    if (res.status === 400 || !data) {
      console.log("the data is : ", data);
      window.alert("invalid credentials");
      console.log("invalid credentials");
    } else {
      window.alert("login successfull");
      setIsLogedIn(true);
      navigate("/home");

      // console.log("login successfull");
    }
  };

  return (
    <>
      <div className="loginpage">
        <div className="container">
          <div className="content">
            <div className="left-side">
              <div className="topic-text">Login</div>
              <form action="#">
                <div className="input-box">
                  <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-box" id="input">
                  <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="middle">
                    <p className="show">
                      <input
                        className="check"
                        type="checkbox"
                        // name="password"
                      />
                      Show Password
                    </p>
                    <p>
                      <a href="/forgot">Forgot password?</a>
                    </p>
                  </div>
                </div>
                <div className="button">
                  <input type="button" value="LOGIN" onClick={loginUser} />
                </div>
                <div className="middle-text">
                  <p>Don't have an Account?</p>
                  <a href="/register">Register</a>
                </div>
              </form>
            </div>
            <div className="center-line">
              <div className="line"></div>
              <div className="or">or</div>
            </div>
            <div className="right-side">
              <p className="right-side-text">Login with</p>
              <div className="social a">
                {/* <img src="./images/Facebook.png" alt="" /> */}
                {/* <input type="button" value=" Google" /> */}
                <GGoogleLogin />
              </div>
              <div className="social b">
                {/* <img src="./images/Facebook.png" alt="" />
                <input type="button" value="Facebook" /> */}
              </div>
            </div>
          </div>
        </div>

{/* comment */}
{/* <div>
            <h2>React Google Login</h2>
            
            {profile ? (
                <div>
                    <img src={profile.imageUrl} referrerpolicy="no-referrer"  alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                   
                    <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
                </div>
            ) : (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            )}
        </div> */}

      </div>
    </>
  );
};

// export const rootReducer = createReducer(
//   { isAuthenticated: islogedin },
//   {
//     login: (state) => {
//       state.isAuthenticated = true;
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//     },
//   }
// );

export default Login;
