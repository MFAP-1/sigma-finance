import React from "react";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import LoginForm from "./LoginForm";

function LoginPage(props) {
  return (
    <div>
      <Header />
      <div className="center-content">
        <h2>To login, please enter your username:</h2>
        <LoginForm history={props.history} />
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
