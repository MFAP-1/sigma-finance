import React from "react";
import StockList from "./InvestmentList";
import CryptoList from "./CryptoList";
import "./InvestmentList.css";

function InvestmentListPage() {
  return (
    <div >
       
      <StockList />
      <CryptoList />
   
    </div>
  );
}

export default InvestmentListPage;

