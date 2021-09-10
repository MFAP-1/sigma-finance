import React from "react";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import SignUp from "../signup/SignUp";

function HomePage() {
  return (
    <div>
      <Header />
      <h1>Welcome to Sigma</h1>
      <SignUp />
      <Footer />
    </div>
  );
}

export default HomePage;
