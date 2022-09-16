import React, { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

const Resetpasssword = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const Reset = async () => {
    if (password == confirmPassword) {
      const res = await fetch("/resetPassword", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          confirmPassword,
        }),
      });
      if (res.json({ message: "password updated" })) {
        window.alert("password updated successfully");
        navigate("/login");
      }
    } else {
      window.alert("password does not match");
    }
  };

  return (
    <>
      {/* <div className="verify">
        <h1>Reset password</h1>

        <input
          type="email"
          className="btnp"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="btnp"
          value={password}
          placeholder="Enter your new password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="text"
          className="btnp"
          value={confirmPassword}
          placeholder="Confirm your new password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="btn" onClick={Reset}>
          Reset
        </button>
      </div> */}

      <div className="loginpage">
        <div className="container">
          <div className="content">
            <div className="left-side">
              <div className="topic-text">Reset Password</div>
              <form action="#">
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="middle"></div>
                </div>

                <div className="input-box">
                  <input
                    type="text"
                    name="confirmPassword"
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div className="middle"></div>
                </div>
                <div className="button">
                  <input type="button" value="RESET" onClick={Reset} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resetpasssword;
