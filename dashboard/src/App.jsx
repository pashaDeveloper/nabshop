import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Providers from "./providers";
import Auth from "./auth"
import "./css/style.css";
import "./charts/ChartjsConfig";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/auth/signin/index";
import SignUp from "./pages/auth/signup/index";
import Users from "./pages/users/index";
import { Toaster } from "react-hot-toast";


function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    document.querySelector("html").setAttribute("dir", "rtl");
  }, [location.pathname]);
  return (
    <Providers>
      <Toaster />
      <Auth>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/users" element={<Users />} />
        </Routes>
      </Auth>
    </Providers>
  );
}

export default App;
