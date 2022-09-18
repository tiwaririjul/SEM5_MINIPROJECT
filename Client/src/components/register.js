import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  let navigate = useNavigate();
  // const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  if (user.password.match(passw)) {
  }

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const navigateTo = () => {
    navigate("/login");
  };

  const postData = async (e) => {
    console.log(user.name, user.email, user.password, user.confirmPassword);
    if (user.password == user.confirmPassword) {
      e.preventDefault();
      console.log(user.email);

      var mailformat =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (user.email.match(mailformat)) {
        const { name, email, password, confirmPassword } = user;

        const res = await fetch("/register", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
          }),
        });
        const data = await res.json();
        console.log(data);

        console.log("budy budy budy budy");

        if (res.status === 422 || !data) {
          window.alert("invalid registration");
          console.log("invalid registration");
        } else {
          window.alert("please check mail to verify your email");
          console.log("registration successfullllll");
        }
      } else {
        window.alert("invalid Email");
      }

      // var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    } else {
      window.alert("password doesnt match");
    }
  };

  return (
    <>
      {/* <div classNameNameName="container mt-5">
        <form method="post">
          <div classNameNameName="mb-3">
            <label for="exampleInputEmail1" classNameNameName="form-label">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputs}
              placeholder="your name"
              classNameNameName="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div classNameNameName="mb-3">
            <label for="exampleInputEmail1" classNameNameName="form-label">
              Email address
            </label>
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={user.email}
              onChange={handleInputs}
              classNameNameName="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" classNameNameName="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div classNameNameName="mb-3">
            <label for="exampleInputPassword1" classNameNameName="form-label">
              Password
            </label>
            <input
              name="password"
              placeholder="your password"
              value={user.password}
              onChange={handleInputs}
              type="password"
              classNameNameName="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div classNameNameName="mb-3">
            <label for="exampleInputPassword1" classNameNameName="form-label">
              ConfirmPassword
            </label>
            <input
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleInputs}
              placeholder="confirm your password"
              type="password"
              classNameNameName="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <NavLink to="/login" classNameNameName="signup-image-link">
            <button
              type="submit"
              onClick={postData}
              classNameNameName="btn btn-primary"
            >
              Register
            </button>
            <a id="allready" href="/login">
              allready have an account
            </a>
          </NavLink>
        </form>
      </div> */}

      {/* <div classNameName="container  ">
        
        <form action="" method="post" classNameName="registerform">
          <h3>CREATE ACCOUNT</h3>
          <div classNameName="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              required
              name="name"
              value={user.name}
              onChange={handleInputs}
              placeholder="Name"
              classNameName="form-field"
            />
          </div>
          <div classNameName="form-group">
            <label for="email">Email</label>
            <input
              name="email"
              value={user.email}
              onChange={handleInputs}
              type="email"
              required
              placeholder="Email"
              classNameName="form-field"
            />
          </div>
          <div classNameName="form-group">
            <label for="password">Password</label>
            <input
              name="password"
              value={user.password}
              onChange={handleInputs}
              type="password"
              required
              placeholder="Password"
              classNameName="form-field"
            />
          </div>
          <div classNameName="form-group">
            <label for="password">Re-enter Password</label>
            <input
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleInputs}
              type="password"
              required
              placeholder="Password"
              classNameName="form-field"
            />
          </div>

          <div classNameName="form-group buttons">
            <input
              type="button"
              name="login"
              value="Login"
              id="btn2"
              onClick={navigateTo}
              classNameName="form-field btns"
            />
            <input
              type="submit"
              name="register"
              id="btn1"
              value="Register"
              onClick={postData}
              classNameName="form-field btns"
            />
          </div>
        </form>
      
      </div> */}
      <div className="loginpage">
        <div className="container">
          <div className="content">
            <div className="left-side">
              <div className="topic-text">Register</div>
              <form action="#">
                <div className="input-box">
                  <input
                    name="name"
                    type="text"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Name"
                  />
                </div>
                <div className="input-box">
                  <input
                    name="email"
                    type="text"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Email"
                  />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    value={user.password}
                    onChange={handleInputs}
                  />
                  <div className="middle"></div>
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    name="confirmPassword"
                    placeholder="ConfirmPassword"
                    value={user.confirmPassword}
                    onChange={handleInputs}
                  />
                  <div className="middle"></div>
                </div>
                <div className="button">
                  <input type="button" value="REGISTER" onClick={postData} />
                </div>
                <div className="middle-text">
                  <p>Don't have an Account?</p>
                  <a href="/login">Login</a>
                </div>
              </form>
            </div>
            {/* <div className="center-line">
              <div className="line"></div>
              <div className="or">or</div>
            </div> */}
            {/* <div className="right-side">
              <p className="right-side-text">Login with Social Platforms</p>
              <div className="social a">
                <img src="/Logo img/google.png" alt="" />
                <input type="button" value="Continue with Google" />
              </div>
              <div className="social b">
                <img src="/Logo img/Facebook.png" alt="" />
                <input type="button" value="Continue with Facebook" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
