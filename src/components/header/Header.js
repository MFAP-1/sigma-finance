import React from "react";
import { Link } from "react-router-dom";

import sigmaIcon from "../../assets/images/logo512.png";

import "./header.css";

function Header(props) {
  const renderOnlineNavBar = () => {
    return (
      <div>
        <nav id="nav-bar-large">
          <Link to="/investment-list" className="no-link-decoration">
            Invest. List
          </Link>
          <div id="wallet-nav-div">
            <Link to="/wallet" className="no-link-decoration">
              [Wallet]
            </Link>
            <Link to="/wallet" className="no-link-decoration">
              <small>Portfolio</small>
            </Link>
            <Link to="/wallet/add" className="no-link-decoration">
              <small>Add asset</small>
            </Link>
          </div>
          <span style={{ textDecoration: "underline" }}>
            <i class="fas fa-user"></i>
            {props.state.username}
          </span>
          <Link to="/logout" className="no-link-decoration">
            Logout
          </Link>
        </nav>
      </div>
    );
  };

  const renderOfflineNavBar = () => {
    return (
      <nav id="nav-bar-small">
        <Link to="/login" className="no-link-decoration">
          Login
        </Link>
        <span> </span>
        <Link to="/signup" className="no-link-decoration">
          SignUp
        </Link>
      </nav>
    );
  };

  return (
    <div id="header-div">
      <Link to="/" className="no-link-decoration">
        <div id="logo-div">
          <img src={sigmaIcon} alt="sigma-icon" id="logoImg" />
          <h1>Sigma Finance</h1>
        </div>
      </Link>
      {props.state.loggedIn ? renderOnlineNavBar() : renderOfflineNavBar()}
    </div>
  );
}

export default Header;
