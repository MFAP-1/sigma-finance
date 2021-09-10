import React from "react";
import { Link } from "react-router-dom";

import sigmaIcon from "../../assets/images/logo512.png";

import "./header.css";

function Header() {
  return (
    <div id="header-div">
      <Link to="/" className="no-link-decoration">
        <div id="logo-div">
          <img src={sigmaIcon} alt="sigma-icon" id="logoImg" />
          <h1>Sigma Finance</h1>
        </div>
      </Link>
      <nav>
        <Link to="/login" className="no-link-decoration">
          Login
        </Link>
        <span> </span>
        <Link to="/signup" className="no-link-decoration">
          SignUp
        </Link>
      </nav>
    </div>
  );
}

export default Header;
