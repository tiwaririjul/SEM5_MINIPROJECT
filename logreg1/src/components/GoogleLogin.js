import React,{ useState} from "react";
import { GoogleLogin } from "react-google-login";
// import { refreshTokenSetup } from "./refreshToken";

const clientId = '507149775109-uubqeea2jq3vck7qlq2mb3paabrctbai.apps.googleusercontent.com';
const GGoogleLogin = () => {
  const [ profile, setProfile ] = useState([]);
  const onSuccess = (res) => {
    console.log("[login success] res : ", res.profileObj);
    setProfile(res.profileObj);
    // refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("[login failed] res: ", res);
  };
  return (
    <>
      <GoogleLogin
        clientId={clientId}
        // render={(renderProps) => (
        //   <button onClick={renderProps.onClick}>Google</button>
        // )}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      ></GoogleLogin>
    </>
  );
};

export default GGoogleLogin;
