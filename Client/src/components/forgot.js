import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import User from "../../../backend1/models/userSchema";

const Forgot = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");

  // const databaseEmail = User.findOne({ email: email });

  const getOtp = async (e) => {
    var mailformat =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.match(mailformat)) {
      e.preventDefault();

      const res = await fetch("/forgotPassword", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (
        res.json({ message: "success" }) ||
        !res.json({ message: "user not found" })
      ) {
        window.alert("email sent successfully");
        navigate("/otp");
      }
    } else {
      window.alert("please write valid email");
    }
  };

  // console.log("hi");

  return (
    <>
      {/* <form action="">
        <input
          type="email"
          placeholder="Your Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <button type="submit" className="btn btn-primary" onClick={getOtp}>
          send mail
        </button>
      </form> */}

      <div className="loginpage">
        <div className="container">
          <div className="content">
            <div className="left-side">
              <div className="topic-text">Your email</div>
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
                <div className="button">
                  <input type="button" value="SEND EMAIL" onClick={getOtp} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgot;
