import React from "react";
import axios from "axios";

import calculateDuration from "../../scripts/calculateDuration";
import formatMoney from "../../scripts/formatMoney";
import formatDate from "../../scripts/formatDate";

class DetailedAsset extends React.Component {
  state = {
    // from API
    assetType: "",
    currency: "USD",
    assetName: "",
    assetSymbol: "",
    quantity: 0,
    unitPrice: 0,
    dateBought: "",
    additionalComments: "",
    // calculated parameters
    statistics: {
      totalInitialValue: 0,
      totalCurrentValue: 0,
      investmentDuration: 0,
      totalYield: 0,
      totalYieldPercentage: 0,
      YieldPercentagePerMonth: 0,
    },
  };

  // Get the asset's information from the API by its ID
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

  //
  componentDidUpdate = (prevProps, prevStats) => {
    if (prevStats.assetName !== this.state.assetName) {
      this.runInvestimentStatistic();
    }
  };

  runInvestimentStatistic = () => {
    const totalInitialValue = this.state.unitPrice * this.state.quantity;
    const totalCurrentValue =
      (Number(this.state.unitPrice) + 20) * this.state.quantity;
    const investmentDuration = calculateDuration(this.state.dateBought);
    const totalYield = totalCurrentValue - totalInitialValue;
    const totalYieldPercentage = (
      (totalYield / totalInitialValue) *
      100
    ).toFixed(3);
    const YieldPercentagePerMonth = (
      totalYieldPercentage /
      (investmentDuration / 30)
    ).toFixed(3);
    this.setState({
      statistics: {
        totalInitialValue: totalInitialValue,
        totalCurrentValue: totalCurrentValue,
        investmentDuration: investmentDuration,
        totalYield: totalYield,
        totalYieldPercentage: totalYieldPercentage,
        YieldPercentagePerMonth: YieldPercentagePerMonth,
      },
    });
  };

  render() {
    // console.log(this.state); // ---------------------DEBUGGUER
    // console.log("teste formatdate:", formatDate(this.state.dateBought)); // ---------------------DEBUGGUER
    console.log(this.state.currency); // ---------------------DEBUGGUER
    return (
      <div>
        <h1>The details for the '{this.state.assetSymbol}' asset are: </h1>
        <ul>
          <h3>Basic Information:</h3>
          <li key="asset-name">
            <strong>Name: </strong>
            {this.state.assetName}.
          </li>
          <li key="asset-type">
            <strong>Asset Type: </strong>
            {this.state.assetType}.
          </li>
          <li key="symbol">
            <strong>Symbol: </strong>
            {this.state.assetSymbol}.
          </li>
          <li key="currency">
            <strong>Currency: </strong>
            {this.state.currency}.
          </li>
          <li key="quantity">
            <strong>Quantity bought (units): </strong>
            {this.state.quantity}.
          </li>
          <li key="additional-comments">
            <strong>Additional comments: </strong>
            {this.state.additionalComments}.
          </li>
          <hr />
          <h3>TimeFrame:</h3>
          <li key="date-bought">
            <strong>Date Bought: </strong>
            {formatDate(this.state.dateBought)}
          </li>
          <li key="investiment-time">
            <strong>Investiment time: </strong>
            {this.state.statistics.investmentDuration} days
          </li>
          <hr />
          <h3>Investments values:</h3>
          <li key="start-unit-price">
            <strong>Initial unit value: </strong>
            {formatMoney(Number(this.state.unitPrice), this.state.currency)}
          </li>
          <li key="current-unit-price">
            <strong>Current unit value: </strong>
            {/*   +20    ------------------DEBUGGUER*/}
            {formatMoney(
              Number(this.state.unitPrice) + 20,
              this.state.currency
            )}
          </li>
          <li key="start-total-value">
            <strong>Initial total value: </strong>
            {formatMoney(
              this.state.statistics.totalInitialValue,
              this.state.currency
            )}
          </li>
          <li key="current-total-value">
            <strong>Current total value: </strong>
            {formatMoney(
              this.state.statistics.totalCurrentValue,
              this.state.currency
            )}
          </li>
          <hr />
          <h3>Rendimentos:</h3>
          <li key="yield1">
            <strong>Rendimento real acumulado: </strong>
            {formatMoney(this.state.statistics.totalYield, this.state.currency)}
          </li>
          <li key="yield2">
            <strong>Rendimento percentual total acumulado (%a.a.): </strong>
            {this.state.statistics.totalYieldPercentage}
          </li>
          <li key="yield3">
            <strong>Rendimento percentual estimado ao mês (%a.m.): </strong>
            {this.state.statistics.YieldPercentagePerMonth}
          </li>
        </ul>
      </div>
    );
  }
}

export default DetailedAsset;
