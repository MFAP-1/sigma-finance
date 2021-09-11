import React from "react";

import Header from "../header/Header";
import Footer from "../footer/Footer";
// import SignUp from "../signup/SignUp";

function HomePage() {
  return (
    <div>
      <Header />
      <div className="center-content">
        <h1>Welcome to Sigma</h1>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
