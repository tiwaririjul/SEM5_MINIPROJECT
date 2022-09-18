import React from "react";
import { GoogleLogout } from "react-google-login";
const clientId =
  "1022564811911-1d9gr7nfaidabvndl07oamv0jkqstdf8.apps.googleusercontent.com";
const GGoogleLogout = () => {
  const onSuccess = () => {
    alert("Logout made sucessfully");
  };
  return (
    <>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSucess={onSuccess}
      ></GoogleLogout>
    </>
  );
};

export default GGoogleLogout;
