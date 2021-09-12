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
        <p>Trazer conteudo pra cá! Os conteúdos independentes do login</p>
        <StockHomepage/>
      </div>
    </div>
  );
}

export default HomePage;
