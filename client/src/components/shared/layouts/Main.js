import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Navigation from "../header/Navigation";

const Main = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Navigation />
    </>
  );
};

export default Main;
