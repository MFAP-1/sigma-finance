import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./components/homepage/Homepage";
// import Header from "./components/header/Header";
import InvestmentListPage from "./components/InvestmentList/InvestmentListPage";


function App() {
  return (
    <div className="main-container bg-titanium">
      <BrowserRouter>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/InvestmentList" component={InvestmentListPage} />
       </BrowserRouter>
     
    </div>
  );
}

export default App;