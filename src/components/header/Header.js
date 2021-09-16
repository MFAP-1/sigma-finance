import React from "react";
import { Link } from "react-router-dom";

import sigmaIcon from "../../assets/images/logo512.png";

import "./header.css";

function Header(props) {
  const renderOnlineNavBar = () => {
    return (
      <div>
        <nav id="nav-bar-large">
          <div id="nav-div">
            <Link to="/currency-converter" className="no-link-decoration">
              Converter
            </Link>
            <Link to="/correction" className="no-link-decoration">
              Correction
            </Link>
          </div>
          <div id="nav-div">
            <Link to="/news" className="no-link-decoration">
              News
            </Link>
            <Link to="/stocks" className="no-link-decoration">
              Stocks
            </Link>
            <Link to="/cryptocurrencies" className="no-link-decoration">
              Crypto
            </Link>
          </div>
          <div id="nav-div">
            <Link to="/wallet" className="no-link-decoration">
              <i className="fas fa-wallet"></i> Portfolio
            </Link>
            <Link to="/wallet/add" className="no-link-decoration">
              Add asset
            </Link>
          </div>
          <div id="nav-div">
            <span style={{ textDecoration: "underline" }}>
              <i className="fas fa-user"></i>
              {props.state.username}
            </span>
            <Link to="/logout" className="no-link-decoration">
              Logout
            </Link>
          </div>
        </nav>
      </div>
    );
  };

  const renderOfflineNavBar = () => {
    return (
      <nav id="nav-bar-small">
        <div id="nav-div">
          <Link to="/currency-converter" className="no-link-decoration">
            Converter
          </Link>
          <Link to="/correction" className="no-link-decoration">
            Correction
          </Link>
        </div>
        <div id="nav-div">
          <Link to="/news" className="no-link-decoration">
            News
          </Link>
          <Link to="/stocks" className="no-link-decoration">
            Stocks
          </Link>
          <Link to="/cryptocurrencies" className="no-link-decoration">
            Crypto
          </Link>
        </div>
        <div id="nav-div-small">
          <Link to="/login" className="no-link-decoration">
            Login
          </Link>
          <span> </span>
          <Link to="/signup" className="no-link-decoration">
            SignUp
          </Link>
        </div>
      </nav>
    );
  };

  return (
    <header id="header-div">
      <Link to="/" className="no-link-decoration-logo">
        <div id="logo-div">
          <img src={sigmaIcon} alt="sigma-icon" id="logoImg" />
          <h2>Sigma Finance</h2>
        </div>
      </Link>
      {props.state.loggedIn ? renderOnlineNavBar() : renderOfflineNavBar()}
    </header>
  );
}

export default Header;
