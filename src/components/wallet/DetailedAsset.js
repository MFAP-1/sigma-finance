import React from "react";
import axios from "axios";

import getAmoutOfDays from "../../scripts/getAmountOfDays";
import formatMoney from "../../scripts/formatMoney";

class DetailedAsset extends React.Component {
  state = {
    // from API
    assetName: "",
    assetSymbol: "",
    quantity: 0,
    unitPrice: 0,
    dateBought: "",
    // calculated parameters
    totalYield: 0,
    totalYieldPercentage: 0,
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get(
        `https://ironrest.herokuapp.com/sigmaFinanceAssets/${this.props.match.params.assetId}`
      );
      this.setState({ ...response.data });
    } catch (err) {
      console.error(err);
    }
  };

  componentDidUpdate = (prevProps, prevStats) => {
    if (prevStats.assetName !== this.state.assetName) {
      this.runInvestimentStatistic();
    }
  };

  runInvestimentStatistic = () => {
    let totalYield =
      (Number(this.state.unitPrice) + 20) * this.state.quantity -
      this.state.unitPrice * this.state.quantity;
    this.setState({
      totalYield: totalYield,
    });
  };

  render() {
    console.log(this.state); // ---------------------DEBUGGUER
    return (
      <div>
        <h1>The details for the '{this.state.assetSymbol}' asset are: </h1>
        <ul>
          <h3>Basic Information:</h3>
          <li key="asset-name">
            <strong>Name: </strong>
            {this.state.assetName}.
          </li>
          <li key="symbol">
            <strong>Symbol: </strong>
            {this.state.assetSymbol}.
          </li>
          <li key="quantity">
            <strong>Quantity bought (units): </strong>
            {this.state.quantity}.
          </li>
          <hr />
          <h3>Values:</h3>
          <li key="start-unit-price">
            <strong>Investment start unit value: </strong>
            {formatMoney(Number(this.state.unitPrice))}
          </li>
          <li key="current-unit-price">
            <strong>Investment current unit value: </strong>
            {/*   +20    ------------------DEBUGGUER*/}
            {formatMoney(Number(this.state.unitPrice) + 20)}
          </li>
          <li key="start-total-value">
            <strong>Investment initial total value: </strong>
            {formatMoney(this.state.unitPrice * this.state.quantity)}
          </li>
          <li key="current-total-value">
            <strong>Investment current total value: </strong>
            {formatMoney(
              (Number(this.state.unitPrice) + 20) * this.state.quantity
            )}
          </li>
          <hr />
          <h3>TimeFrame:</h3>
          <li key="date-bought">
            <strong>Date Bought: </strong>
            {this.state.dateBought}
          </li>
          <li key="investiment-time">
            <strong>Investiment time: </strong>
            {getAmoutOfDays(this.state.dateBought)} days
          </li>
          <hr />
          <h3>Rendimentos:</h3>
          <li key="yield1">
            <strong>Rendimento real: </strong>
            {formatMoney(this.state.totalYield)}
          </li>
          <li key="yield1">
            <strong>Rendimento percentual total (%): </strong>
            {this.state.totalYieldPercentage}
          </li>
        </ul>
      </div>
    );
  }
}

export default DetailedAsset;
