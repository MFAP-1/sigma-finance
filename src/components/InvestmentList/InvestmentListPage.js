import React from "react";
import StockList from "./InvestmentList";
import CryptoList from "./CryptoList";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./InvestmentList.css";

function InvestmentListPage() {
  return (
    <div >
       <Header />
      <StockList />
      <CryptoList />
     
    </div>
  );
}

export default InvestmentListPage;

