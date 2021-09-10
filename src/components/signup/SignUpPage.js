import React from "react";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import SignUpForm from "./SignUpForm";

function SignUpPage() {
  return (
    <div>
      <Header />
      <div className="center-content">
        <h2>New Here? Please sign up below</h2>
        <SignUpForm />
      </div>
      <Footer />
    </div>
  );
}

export default SignUpPage;
