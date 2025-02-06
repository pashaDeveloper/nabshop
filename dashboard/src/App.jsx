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
import Tags from "./pages/tags";
import Posts from "./pages/posts";
import AddPost from "./pages/posts/add";
import Units from "./pages/units";
import Categories from "./pages/categories";
import AddCategory from "./pages/categories/add";
import Products from "./pages/products";
import AddProduct from "./pages/products/add";


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
          <Route exact path="/tags" element={<Tags />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/units" element={<Units />} />
          <Route exact path="/posts" element={<Posts />} />
          <Route exact path="/posts/add" element={<AddPost />} />
          <Route exact path="/categories/add" element={<AddCategory />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/add" element={<AddProduct />} />
        </Routes>
      </Auth>
    </Providers>
  );
}

export default App;
