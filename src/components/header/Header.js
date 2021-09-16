import React from "react";
import { Link } from "react-router-dom";
import sigmaIcon from "../../assets/images/logo512.png";
import "./header.css";

class Header extends React.Component {
  state = {
    haveBurger: false,
  };

  renderOfflineNavBar = () => {
    return (
      <nav id="nav-bar-small">
        <div>
          <Link to="/currency-converter" className="no-link-decoration">
            Converter
          </Link>
        </div>
        <div>
          <Link to="/correction" className="no-link-decoration">
            Correction
          </Link>
        </div>
        <div>
          <Link to="/news" className="no-link-decoration">
            News
          </Link>
        </div>
        <div>
          <Link to="/stocks" className="no-link-decoration">
            Stocks
          </Link>
        </div>
        <div>
          <Link to="/cryptocurrencies" className="no-link-decoration">
            Crypto
          </Link>
        </div>
        <div>
          <Link to="/login" className="no-link-decoration">
            Login
          </Link>
        </div>

        <div>
          <Link to="/signup" className="no-link-decoration">
            SignUp
          </Link>
        </div>
      </nav>
    );
  };

  renderOnlineNavBar = () => {
    return (
      <nav id="nav-bar-large">
        <div>
          <Link to="/currency-converter" className="no-link-decoration">
            Converter
          </Link>
        </div>
        <div>
          <Link to="/correction" className="no-link-decoration">
            Correction
          </Link>
        </div>

        <div>
          <Link to="/news" className="no-link-decoration">
            News
          </Link>
        </div>
        <div>
          <Link to="/stocks" className="no-link-decoration">
            Stocks
          </Link>
        </div>
        <div>
          <Link to="/cryptocurrencies" className="no-link-decoration">
            Crypto
          </Link>
        </div>
        <div>
          <Link to="/wallet" className="no-link-decoration">
            <i className="fas fa-wallet"></i> Portfolio
          </Link>
        </div>
        <div>
          <Link to="/wallet/add" className="no-link-decoration">
            Add asset
          </Link>
        </div>
        <div>
          <span style={{ textDecoration: "underline" }}>
            <i className="fas fa-user"></i>
            {this.props.state.username}
          </span>
        </div>
        <div>
          <Link to="/logout" className="no-link-decoration">
            Logout
          </Link>
        </div>
      </nav>
    );
  };

  renderMobileOfflineNavBar = () => {
    return (
      <nav id="nav-bar-small-mobile" onClick={this.toggleBurger}>
        <div className="link-mobile">
          <Link to="/currency-converter" className="no-link-decoration">
            Converter
          </Link>
        </div>
        <div className="link-mobile">
          <Link to="/correction" className="no-link-decoration">
            Correction
          </Link>
        </div>
        <div className="link-mobile">
          <Link to="/news" className="no-link-decoration">
            News
          </Link>
        </div>
        <div className="link-mobile">
          <Link to="/stocks" className="no-link-decoration">
            Stocks
          </Link>
        </div>
        <div className="link-mobile">
          <Link to="/cryptocurrencies" className="no-link-decoration">
            Crypto
          </Link>
        </div>
        <div className="link-mobile">
          <Link to="/login" className="no-link-decoration">
            Login
          </Link>
        </div>

        <div className="link-mobile">
          <Link to="/signup" className="no-link-decoration">
            SignUp
          </Link>
        </div>
      </nav>
    );
  };

  renderMobileOnlineNavBar = () => {
    return (
      <nav id="nav-bar-large-mobile" onClick={this.toggleBurger}>
        <div className="link-mobile">
          <Link to="/currency-converter" className="no-link-decoration">
            Converter
          </Link>
        </div>
        <div className="link-mobile">
          <Link to="/correction" className="no-link-decoration">
            Correction
          </Link>
        </div>

        <div className="link-mobile">
          <Link to="/news" className="no-link-decoration">
            News
          </Link>
        </div>
        <div className="link-mobile">
          <Link to="/stocks" className="no-link-decoration">
            Stocks
          </Link>
        </div>
        <div className="link-mobile">
          <Link to="/cryptocurrencies" className="no-link-decoration">
            Crypto
          </Link>
        </div>
        <div className="link-mobile">
          <Link to="/wallet" className="no-link-decoration">
            <i className="fas fa-wallet"></i> Portfolio
          </Link>
        </div>
        <div className="link-mobile">
          <Link to="/wallet/add" className="no-link-decoration">
            Add asset
          </Link>
        </div>
        <div className="link-mobile">
          <span style={{ textDecoration: "underline" }}>
            <i className="fas fa-user"></i>
            {this.props.state.username}
          </span>
        </div>
        <div className="link-mobile">
          <Link to="/logout" className="no-link-decoration">
            Logout
          </Link>
        </div>
      </nav>
    );
  };

  toggleBurger = () => {
    console.log("teste");
    this.setState({
      haveBurger: !this.state.haveBurger,
    });
  };

  render() {
    return (
      <div id="header-div">
        <div>
          <Link to="/" className="no-link-decoration-logo">
            <div id="logo-div">
              <img src={sigmaIcon} alt="sigma-icon" id="logoImg" />
              <h2>Sigma Finance</h2>
            </div>
          </Link>
        </div>
        {this.props.state.loggedIn
          ? this.state.haveBurger === false
            ? this.renderOnlineNavBar()
            : this.renderMobileOnlineNavBar()
          : this.state.haveBurger === true
          ? this.renderMobileOfflineNavBar()
          : this.renderOfflineNavBar()}
        <div className="burger" onClick={() => this.toggleBurger()}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </div>
    );
  }
}

export default Header;
