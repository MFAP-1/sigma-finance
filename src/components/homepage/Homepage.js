import React from "react";
import StockHomepage from "../InvestmentList/StockHomepage";

// import Header from "../header/Header";
// import Footer from "../footer/Footer";
// import SignUp from "../signup/SignUp";

function HomePage() {
  return (
    <div >
      <div className="center-content">
        <h1>Welcome to Sigma</h1>
         <StockHomepage/>
      </div>
    </div>
  );
}

export default HomePage;
