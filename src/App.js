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
import CurrencyConverterPage from "./components/InvestmentList/CurrencyConverterPage";
import Correction from "./components/InvestmentList/monetary-correction/Correction";
import News from "./components/InvestmentList/News";

// Wallet imports
import Wallet from "./components/wallet/Wallet";
import AddAsset from "./components/wallet/AddAsset";
import EditAsset from "./components/wallet/EditAsset";
import DeleteAsset from "./components/wallet/DeleteAsset";
import DetailedAsset from "./components/wallet/DetailedAsset";
import ManualUpdateAsset from "./components/wallet/manualUpdate/ManualUpdateAsset";
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
      <div id="main-container">
        <BrowserRouter>
          <Header state={this.state} />
          <main id="site-content">
            <Route exact path="/" component={HomePage} />

            {/* Investments (external API) imports */}
            <Route exact path="/stocks" component={InvestmentListPage} />
            <Route exact path="/cryptocurrencies" component={CryptoPage} />
            <Route
              exact
              path="/currency-converter"
              component={CurrencyConverterPage}
            />
            <Route exact path="/correction" component={Correction} />
            <Route exact path="/news" component={News} />

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
                <DetailedAsset
                  {...props}
                  username={this.state.username}
                  loggedIn={this.state.loggedIn}
                />
              )}
            />
            <Route
              path="/wallet/edit/:assetId"
              render={(props) => (
                <EditAsset {...props} username={this.state.username} />
              )}
            />
            <Route
              path="/wallet/manualupdate/:assetId"
              render={(props) => (
                <ManualUpdateAsset {...props} username={this.state.username} />
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
                <LoginPage
                  {...props}
                  updateLoginState={this.updateLoginState}
                />
              )}
            />
            <Route
              path="/logout"
              render={(props) => (
                <Logout {...props} updateLoginState={this.updateLoginState} />
              )}
            />
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
