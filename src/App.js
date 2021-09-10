import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./components/homepage/Homepage";
import Wallet from "./components/wallet/Wallet";
import SignUpPage from "./components/signup/SignUpPage";
import LoginPage from "./components/login/LoginPage";
// import Header from "./components/header/Header";

function App() {
  return (
    <div className="main-container bg-titanium">
      <BrowserRouter>
        <Route exact path="/" component={HomePage} />
        <Route path="/wallet/:userId" component={Wallet} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={LoginPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
