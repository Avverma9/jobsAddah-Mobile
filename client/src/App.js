import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./component/Footer/Footer";
import NavScrollExample from "./component/Header/Header";
import LandingPage from "./component/LandingPage/Landingpage";
import VideoPage from "./component/Youtube/Video";
import VideoMI11T from "./component/Youtube/mi11t";
import VideoMI11x from "./component/Youtube/mi11x";
import Tool from "./component/Youtube/tools";
import Sidebar from "./component/Admin/Sidebar";
import Requests from "./component/Youtube/Requests";
import Rom from "./component/Youtube/rom";

import Profile from "./component/Profile/Profile.jsx"; // Add the import statement for Profile
import Login from "./component/Authentication/Loginpage";
import Signup from "./component/Authentication/Signup";

function App() {
  return (
    <Router>
      <NavScrollExample />

      <Routes>
        <Route path="/requests" element={<Requests />} />
        <Route path="/videos" element={<VideoPage />} />
        <Route path="/mi11Tpro" element={<VideoMI11T />} />
        <Route path="/mi11x" element={<VideoMI11x />} />
        <Route path="/tools" element={<Tool />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/roms" element={<Rom />} />
        <Route path="/av" element={<Sidebar />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
