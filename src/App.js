import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./components/homepage/Homepage";
import Wallet from "./components/wallet/Wallet";
import SignUpPage from "./components/signup/SignUpPage";
import LoginPage from "./components/login/LoginPage";
// import Header from "./components/header/Header";
import InvestmentListPage from "./components/InvestmentList/InvestmentListPage";


function App() {
  return (
    <div className="main-container bg-titanium">
      <BrowserRouter>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/investment-list" component={InvestmentListPage} />
   
        <Route path="/wallet/:userName" component={Wallet} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={LoginPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;