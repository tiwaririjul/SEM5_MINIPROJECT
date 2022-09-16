import React, { useState } from "react";
import "./registrationVerification.css";
import { useNavigate } from "react-router-dom";

const RegisterVarifiaction = () => {
  let navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleInputs = (e) => {
    const yourOtp = e.target.value;
    console.log(yourOtp);
    setOtp(yourOtp);
  };

  const postData = async () => {
    const res = await fetch("/otpverify", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userotp: otp,
      }),
    });

    if (res.json({ message: "success" })) {
      window.alert("you are ready to reset your password");
      navigate("/resetpassword");
    } else {
      window.alert("you have entered wrong otp");
      console.log("hiiii");
    }
  };

  return (
    <>
      {/* <div className="verify">
        <a href="/forgot">back</a>
        <h1>enter your otp to verify your email</h1>
        <input
          type="text"
          class="otp"
          value={otp}
          placeholder="enter your otp here"
          onChange={handleInputs}
        />
        <button id="btn" onClick={postData}>
          submit
        </button>
      </div> */}

      <div className="loginpage">
        <div className="container">
          <div className="content">
            <div className="left-side">
              <div className="topic-text">Your Otp to verify your email</div>
              <form action="#">
                <div className="input-box">
                  <input
                    name="email"
                    type="text"
                    placeholder="Code"
                    value={otp}
                    onChange={handleInputs}
                  />
                </div>
                <div className="button">
                  <input type="button" value="VERIFY" onClick={postData} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterVarifiaction;
