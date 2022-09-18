import React from "react";
import { GoogleLogin } from "react-google-login";
import { refreshTokenSetup } from "./refreshToken";

const clientId =
  "1022564811911-1d9gr7nfaidabvndl07oamv0jkqstdf8.apps.googleusercontent.com";
const GGoogleLogin = () => {
  const onSuccess = (res) => {
    console.log("[login success] res : ", res.profileObj);
    refreshTokenSetup(res);
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
