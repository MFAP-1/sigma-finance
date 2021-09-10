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
      <nav>Link 1 Link 2</nav>
    </div>
  );
}

export default Header;
