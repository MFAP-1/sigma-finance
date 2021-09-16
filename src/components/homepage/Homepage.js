import React from "react";

import StockHomepage from "./StockHomepage";
import SigmaFinancePresentation from "./SigmaFinancePresentation";

import "./homepage.css";

function HomePage() {
  return (
    <div className="container-homepage">
      <StockHomepage />
      <SigmaFinancePresentation />
    </div>
  );
}

export default HomePage;
