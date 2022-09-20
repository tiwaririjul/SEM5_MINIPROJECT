import Login from "./components/login";
import Register from "./components/register";
// import Login from "./components/login";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GGoogleLogin from "./components/GoogleLogin";
import GGoogleLogout from "./components/GoogleLogout";
import QuotesPage from "./components/quotesPage";
import Forgot from "./components/forgot";
import RegisterVarifiaction from "./components/verification";
import Resetpasssword from "./components/resetpasssword";
import Nowplaying from "./components/main_components/Nowplaying";
import SideBar from "./components/main_components/SideBar";
import Search from "./components/main_components/Search";
import Home from "./components/main_components/pages/Home";
import Trends from "./components/main_components/pages/Trends";
import Albums from "./components/main_components/pages/Albums";
import Artist from "./components/main_components/pages/Artist";
import Liked from "./components/main_components/pages/Liked";
import Playlist from "./components/main_components/pages/Playlist";
import Setting from "./components/main_components/pages/Setting";
import Working from "./components/workingPage/Working";
// import { useSelector } from "react-redux";
// import ProtectedRoute from "./components/protectedRoute/protectedRoute";

function App() {
  const [musicData, setMusicData] = useState("");
  const getData = (data) => {
    setMusicData(data);
  };

  return (
    <>
      <Routes>
        <Route path="" element={<QuotesPage />} />
        {/* <Route path="/about" element={<AboutUs />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/resetpassword" element={<Resetpasssword />} />
        <Route path="/otp" element={<RegisterVarifiaction />} />
        <Route path="/googlelogin" element={<GGoogleLogin />} />
        <Route path="/googlelogout" element={<GGoogleLogout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/working" element={<Working />} />

        <Route
          path="/home"
          element={
            // <ProtectedRoute isAuthenticated={isAuthenticated}>
            <>
              <Search />
              <Home music={getData} />
              <Nowplaying data={musicData} />
            </>
            // </ProtectedRoute>
          }
        />
        <Route
          path="/Trends"
          element={
            <>
              <Search />
              <Trends />
              <Nowplaying data={musicData} />
            </>
          }
        />

        <Route path="/albums" element={<Albums />} />
        <Route path="/artist" element={<Artist />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      {/* </SideBar> */}
    </>
  );
}

export default App;
