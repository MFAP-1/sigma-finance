import React from "react";
import axios from "axios";

//import components
import BasicInformationTable from "./detailedAssetsTable/BasicInformationTable";

// importing calculator helpers
import calculateDuration from "../../scripts/calculateDuration";
import formatMoney from "../../scripts/formatMoney";
import formatDate from "../../scripts/formatDate";
import getTodayDate from "../../scripts/getTodayDate.js";
import ipcaCalculator from "../../scripts/ipcaCalculator";
import selicCalculator from "../../scripts/selicCalculator";

class DetailedAsset extends React.Component {
  state = {
    // from API
    assetType: "",
    currency: "",
    investmentIndicator: "",
    assetName: "",
    assetSymbol: "",
    quantity: 0,
    unitPrice: 0,
    dateBought: "",
    additionalComments: "",
    // calculated parameters for statistics
    statistics: {
      totalInitialValue: 0,
      totalCurrentValue: 0,
      investmentDuration: 0,
      totalYield: 0,
      totalYieldPercentage: 0,
      YieldPercentagePerYear: 0,
      YieldPercentagePerMonth: 0,
      totalValueCorrectedBySelic: 0,
      totalValueCorrectedBySavingsBrazil: 0,
      totalYieldPercentageSavingsBrazil: 0,
      totalValueCorrectedByIPCA: 0,
      totalYieldPercentageIPCA: 0,
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
      this.runInvestmentStatistic();
    }
  };

  // core method to run all the statistics calculations
  runInvestmentStatistic = async () => {
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
    const YieldPercentagePerYear = (
      totalYieldPercentage /
      (investmentDuration / 365)
    ).toFixed(3);
    const totalValueCorrectedBySelic = await selicCalculator(
      this.state.dateBought,
      getTodayDate(),
      totalInitialValue
    );
    const totalValueCorrectedBySavingsBrazil =
      totalInitialValue +
      (totalValueCorrectedBySelic - totalInitialValue) * 0.7;
    const totalYieldPercentageSavingsBrazil = (
      ((totalValueCorrectedBySavingsBrazil - totalInitialValue) /
        totalInitialValue) *
      100
    ).toFixed(3);
    const totalValueCorrectedByIPCA = await ipcaCalculator(
      this.state.dateBought,
      getTodayDate(),
      totalInitialValue
    );
    const totalYieldPercentageIPCA = (
      ((totalValueCorrectedByIPCA - totalInitialValue) / totalInitialValue) *
      100
    ).toFixed(3);
    this.setState({
      statistics: {
        totalInitialValue: totalInitialValue,
        totalCurrentValue: totalCurrentValue,
        investmentDuration: investmentDuration,
        totalYield: totalYield,
        totalYieldPercentage: totalYieldPercentage,
        YieldPercentagePerYear: YieldPercentagePerYear,
        YieldPercentagePerMonth: YieldPercentagePerMonth,
        totalValueCorrectedBySelic: totalValueCorrectedBySelic,
        totalValueCorrectedBySavingsBrazil: totalValueCorrectedBySavingsBrazil,
        totalYieldPercentageSavingsBrazil: totalYieldPercentageSavingsBrazil,
        totalValueCorrectedByIPCA: totalValueCorrectedByIPCA,
        totalYieldPercentageIPCA: totalYieldPercentageIPCA,
      },
    });
  };

  render() {
    // console.log(this.state); // ---------------------DEBUGGUER
    // console.log("teste formatdate:", formatDate(this.state.dateBought)); // ---------------------DEBUGGUER
    // console.log(this.state.currency); // ---------------------DEBUGGUER
    // console.log("today no statte", this.state.today); // ---------------------DEBUGGUER
    // console.log("today chamando função", getTodayDate()); // ---------------------DEBUGGUER
    return (
      <div>
        <h1>The details for the '{this.state.assetSymbol}' asset are: </h1>
        <BasicInformationTable
          assetName={this.state.assetName}
          assetType={this.state.assetType}
          assetSymbol={this.state.assetSymbol}
          currency={this.state.currency}
          investmentIndicator={this.state.investmentIndicator}
          quantity={this.state.quantity}
          additionalComments={this.state.additionalComments}
          dateBought={formatDate(this.state.dateBought)}
          investmentDuration={this.state.statistics.investmentDuration}
        />
        <ul>
          <hr />
          {/* <h3>TimeFrame:</h3>
          <li key="date-bought">
            <strong>Date Bought: </strong>
            {formatDate(this.state.dateBought)}
          </li>
          <li key="investment-time">
            <strong>Investment time: </strong>
            {this.state.statistics.investmentDuration} days
          </li> */}
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
          <h3>Yield analysis:</h3>
          <li key="yield1">
            <strong>Total yield ({this.state.currency}): </strong>
            {formatMoney(this.state.statistics.totalYield, this.state.currency)}
          </li>
          <li key="yield2">
            <strong>Total yield percentage (%): </strong>
            {this.state.statistics.totalYieldPercentage}%
          </li>
          <li key="yield3">
            <strong>Estimated yield per year (%a.a.): </strong>
            {this.state.statistics.YieldPercentagePerYear}%
          </li>
          <li key="yield4">
            <strong>Estimated yield per month (%a.m.): </strong>
            {this.state.statistics.YieldPercentagePerMonth}%
          </li>
          <hr />
          <h3>
            Yield comparison with other indexes. Current corrected total value
            if invested in:
          </h3>
          <li key="comparison1">
            <strong>
              Brazil's Savings account - current corrected total (
              {this.state.currency}):{" "}
            </strong>
            {formatMoney(
              this.state.statistics.totalValueCorrectedBySavingsBrazil,
              this.state.currency
            )}
          </li>
          <li key="comparison2">
            <strong>
              Brazil's Savings account - total yield percentage (%):{" "}
            </strong>
            {this.state.statistics.totalYieldPercentageSavingsBrazil}%
          </li>
          <li key="comparison3">
            <strong>Difference yield percentage (%): </strong>
            {(
              this.state.statistics.totalYieldPercentage -
              this.state.statistics.totalYieldPercentageSavingsBrazil
            ).toFixed(3)}
            %
          </li>
          <li key="comparison4">
            <strong>
              Brazil's IPCA+0% - current corrected total ({this.state.currency}
              ):{" "}
            </strong>
            {formatMoney(
              this.state.statistics.totalValueCorrectedByIPCA,
              this.state.currency
            )}
          </li>
          <li key="comparison5">
            <strong>Brazil's IPCA+0% - total yield percentage (%): </strong>
            {this.state.statistics.totalYieldPercentageIPCA}%
          </li>
          <li key="comparison6">
            <strong>Difference yield percentage (%): </strong>
            {(
              this.state.statistics.totalYieldPercentage -
              this.state.statistics.totalYieldPercentageIPCA
            ).toFixed(3)}
            %
          </li>
        </ul>
      </div>
    );
  }
}

export default DetailedAsset;
