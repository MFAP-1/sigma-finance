import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./wallet.css";

import SelectInput from "../forms/SelectInput";
import AssetTypeChart from "./portfolioCharts/AssetTypeChart";
import PortfolioHistory from "./portfolioCharts/PortfolioHistory";
import TotalPortfolioValue from "./portfolioTable/TotalPortfolioValue";
import PortfolioTableBody from "./portfolioTable/PortfolioTableBody";
import LoggedOffPage from "../authentication/loggedoff/LoggedOffPage";

class Wallet extends React.Component {
  state = {
    assetList: [],
    currency: "",
    drawGraph1: false, // asset type composition
    drawGraph2: false, // portfolio History
    //
    totalValueUSD: 0,
    totalValueBRL: 0,
    totalValueEUR: 0,
    updatedSubtotals: false,
  };

  // loading the assets from API into an array
  componentDidMount = async () => {
    try {
      const response = await axios.get(
        "https://ironrest.herokuapp.com/sigmaFinanceAssets"
      );
      this.setState({ assetList: [...response.data] });
    } catch (err) {
      console.error(err);
    }
  };

  handleSelectCurrency = (event) => {
    this.setState({ currency: event.target.value });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.totalValueUSD !== this.state.totalValueUSD ||
      prevState.totalValueBRL !== this.state.totalValueBRL ||
      prevState.totalValueEUR !== this.state.totalValueEUR
    ) {
      this.setState({ updatedSubtotals: true });
    }
  };

  updateSubtotals = (totalValueUSD, totalValueBRL, totalValueEUR) => {
    if (!this.state.updatedSubtotals) {
      this.setState({
        totalValueUSD: totalValueUSD,
        totalValueBRL: totalValueBRL,
        totalValueEUR: totalValueEUR,
      });
    }
  };

  renderAssetListTable = () => {
    return (
      <table id="portfolio-table">
        <thead>
          <tr key="table-title">
            <th colSpan="9">Summarized portfolio</th>
          </tr>
          <tr key="table-header">
            <th>#</th>
            <th>Asset Type</th>
            <th>Asset Name</th>
            <th>Asset Symbol</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Total Value</th>
            <th>Date bought</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>
        <PortfolioTableBody
          assetList={this.state.assetList}
          username={this.props.username}
          updateSubtotals={this.updateSubtotals}
        />
        <tfoot>
          <tr key="total-Value">
            <td colSpan="6" style={{ textAlign: "right" }}>
              Total portfolio value:
            </td>
            <TotalPortfolioValue
              totalValueUSD={this.state.totalValueUSD}
              totalValueBRL={this.state.totalValueBRL}
              totalValueEUR={this.state.totalValueEUR}
              currency={this.state.currency}
            />
            <td colSpan="2">
              <SelectInput
                name="currency"
                className="select-currency-input"
                id="selectInputCurrency"
                value={this.state.currency}
                onChange={this.handleSelectCurrency}
                items={["USD", "BRL", "EUR"]}
                placeholder="Select currency for total"
                required
              />
            </td>
          </tr>
        </tfoot>
      </table>
    );
  };

  showAssetTypeGraph = () => {
    this.setState({ drawGraph1: !this.state.drawGraph1 });
  };

  showPortfolioHistory = () => {
    this.setState({ drawGraph2: !this.state.drawGraph2 });
  };

  renderOnlineWallet = () => {
    return (
      <div>
        <div id="wallet-menu-div">
          <button onClick={this.showAssetTypeGraph}>Show asset's graph</button>
          <h1>{this.props.username}, this is your portfolio</h1>
          <button onClick={this.showPortfolioHistory}>
            Show portfolio history
          </button>
        </div>
        <div id="portfolio-table-div">{this.renderAssetListTable()}</div>
        <div id="canvas-graphs-div">
          {this.state.drawGraph1 ? (
            <AssetTypeChart
              assetList={this.state.assetList}
              username={this.props.username}
              currency={this.state.currency}
            />
          ) : null}
          {this.state.drawGraph2 ? (
            <PortfolioHistory
              assetList={this.state.assetList}
              username={this.props.username}
              currency={this.state.currency}
            />
          ) : null}
        </div>
      </div>
    );
  };
  renderOfflineWallet = () => {
    return (
      <div className="center-content">
        To check your portfolio, login at:
        <br />
        <Link to="/login" className="no-link-decoration-black">
          <button>Login</button>
        </Link>
      </div>
    );
  };

  render() {
    return this.props.loggedIn ? this.renderOnlineWallet() : <LoggedOffPage />;
  }
}

export default Wallet;
