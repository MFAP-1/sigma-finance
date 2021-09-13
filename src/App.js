import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

// Fixed imports
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomePage from "./components/homepage/Homepage";
// Investments (external API) imports
import InvestmentListPage from "./components/InvestmentList/InvestmentListPage";
import CryptoPage from "./components/InvestmentList/CryptoPage";
// Wallet imports
import Wallet from "./components/wallet/Wallet";
import AddAsset from "./components/wallet/AddAsset";
import UpdateAsset from "./components/wallet/UpdateAsset";
import DeleteAsset from "./components/wallet/DeleteAsset";
import DetailedAsset from "./components/wallet/DetailedAsset";
// Authentication imports
import SignUpPage from "./components/authentication/signup/SignUpPage";
import LoginPage from "./components/authentication/login/LoginPage";
import Logout from "./components/authentication/logout/Logout";

class App extends React.Component {
  state = {
    loggedIn: false,
    username: "",
  };

  updateLoginState = (userName) => {
    this.setState({ loggedIn: !this.state.loggedIn, username: userName });
  };

  render() {
    return (
      <div className="main-container bg-titanium">
        <BrowserRouter>
          <Header state={this.state} />
          <Route exact path="/" component={HomePage} />

          {/* Investments (external API) imports */}
          <Route exact path="/investment-list" component={InvestmentListPage} />
          <Route exact path="/cryptocurrencies" component={CryptoPage} />

          {/* Wallet Routes */}
          <Route
            exact
            path="/wallet"
            render={(props) => (
              <Wallet
                {...props}
                username={this.state.username}
                loggedIn={this.state.loggedIn}
              />
            )}
          />
          <Route
            path="/wallet/add"
            render={(props) => (
              <AddAsset {...props} username={this.state.username} />
            )}
          />
          <Route
            path="/wallet/details/:assetId"
            render={(props) => (
              <DetailedAsset {...props} username={this.state.username} />
            )}
          />
          <Route
            path="/wallet/update/:assetId"
            render={(props) => (
              <UpdateAsset {...props} username={this.state.username} />
            )}
          />
          <Route
            path="/wallet/delete/:assetId"
            render={(props) => (
              <DeleteAsset {...props} username={this.state.username} />
            )}
          />

          {/* Authentication Routes */}
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
