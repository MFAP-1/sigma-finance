import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./components/homepage/Homepage";
import Wallet from "./components/wallet/Wallet";
import SignUpPage from "./components/signup/SignUpPage";
import LoginPage from "./components/login/LoginPage";
import InvestmentListPage from "./components/InvestmentList/InvestmentListPage";
import Header from "./components/header/Header";
import Logout from "./components/logout/Logout";
import Footer from "./components/footer/Footer";

class App extends React.Component {
  state = {
    loggedIn: false,
    username: "",
  };

  updateLoginState = (userName) => {
    this.setState({ loggedIn: !this.state.loggedIn, username: userName });
  };

  render() {
    console.log("username no app:", this.state.username);
    return (
      <div className="main-container bg-titanium">
        <BrowserRouter>
          <Header loggedIn={this.state.loggedIn} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/investment-list" component={InvestmentListPage} />

          <Route
            path="/wallet"
            render={(props) => (
              <Wallet {...props} username={this.state.username} />
            )}
          />
          <Route path="/signup" component={SignUpPage} />
          <Route
            path="/login"
            render={(props) => (
              <LoginPage {...props} updateLoginState={this.updateLoginState} />
            )}
          />
          <Route
            path="/logout"
            render={(props) => (
              <Logout {...props} updateLoginState={this.updateLoginState} />
            )}
          />
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
