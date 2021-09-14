import React from "react";
import axios from "axios";

//import components
import BasicInformationTable from "./detailedAssetsTable/BasicInformationTable";
import YieldAnalysisTable from "./detailedAssetsTable/YieldAnalysisTable";
import YieldComparisonTable from "./detailedAssetsTable/YieldComparisonTable";

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
    loading: false,
    statistics: {
      totalInitialValue: 0,
      totalCurrentValue: 0,
      investmentDuration: 0,
      totalYield: 0,
      totalYieldPercentage: 0,
      yieldPercentagePerYear: 0,
      yieldPercentagePerMonth: 0,
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
    this.setState({ loading: true });
    const totalInitialValue = this.state.unitPrice * this.state.quantity;
    const totalCurrentValue =
      (Number(this.state.unitPrice) + 20) * this.state.quantity;
    const investmentDuration = calculateDuration(this.state.dateBought);
    const totalYield = totalCurrentValue - totalInitialValue;
    const totalYieldPercentage = (
      (totalYield / totalInitialValue) *
      100
    ).toFixed(3);
    const yieldPercentagePerMonth = (
      totalYieldPercentage /
      (investmentDuration / 30)
    ).toFixed(3);
    const yieldPercentagePerYear = (
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
    // ipca index doesn't have value for the current month
    const totalValueCorrectedByIPCA = await ipcaCalculator(
      this.state.dateBought.includes(getTodayDate().slice(0, 7))
        ? getTodayDate().slice(0, 5) +
            Number(getTodayDate().slice(6, 7) - 1)
              .toString()
              .padStart(2, "0") +
            "-01"
        : this.state.dateBought,
      getTodayDate(),
      totalInitialValue
    );
    const totalYieldPercentageIPCA = (
      ((totalValueCorrectedByIPCA - totalInitialValue) / totalInitialValue) *
      100
    ).toFixed(3);

    this.setState({
      loading: false,
      statistics: {
        totalInitialValue: totalInitialValue,
        totalCurrentValue: totalCurrentValue,
        investmentDuration: investmentDuration,
        totalYield: totalYield,
        totalYieldPercentage: totalYieldPercentage,
        yieldPercentagePerYear: yieldPercentagePerYear,
        yieldPercentagePerMonth: yieldPercentagePerMonth,
        totalValueCorrectedBySelic: totalValueCorrectedBySelic,
        totalValueCorrectedBySavingsBrazil: totalValueCorrectedBySavingsBrazil,
        totalYieldPercentageSavingsBrazil: totalYieldPercentageSavingsBrazil,
        totalValueCorrectedByIPCA: totalValueCorrectedByIPCA,
        totalYieldPercentageIPCA: totalYieldPercentageIPCA,
      },
    });
  };

  render() {
    // console.log(getTodayDate().slice(0, 5));
    // console.log(getTodayDate().slice(6, 7));
    // console.log(Number(getTodayDate().slice(6, 7)) - 1);
    // console.log(
    //   getTodayDate().slice(0, 5) +
    //     Number(getTodayDate().slice(6, 7) - 1)
    //       .toString()
    //       .padStart(2, "0") +
    //     "-01"
    // );
    // console.log(this.state); // ---------------------DEBUGGUER
    // console.log("teste formatdate:", formatDate(this.state.dateBought)); // ---------------------DEBUGGUER
    // console.log(this.state.currency); // ---------------------DEBUGGUER
    // console.log("today no statte", this.state.today); // ---------------------DEBUGGUER
    // console.log("today chamando função", getTodayDate()); // ---------------------DEBUGGUER
    return (
      <div>
        <h2>The details for the '{this.state.assetSymbol}' asset are: </h2>
        <BasicInformationTable
          assetName={this.state.assetName}
          assetType={this.state.assetType}
          assetSymbol={this.state.assetSymbol}
          currency={this.state.currency}
          investmentIndicator={this.state.investmentIndicator}
          additionalComments={this.state.additionalComments}
          dateBought={formatDate(this.state.dateBought)}
          investmentDuration={this.state.statistics.investmentDuration}
          loading={this.state.loading}
        />
        <hr />
        {/*   +20    ------------------DEBUGGUER*/}
        <YieldAnalysisTable
          loading={this.state.loading}
          quantity={this.state.quantity}
          initalUnitValue={formatMoney(
            Number(this.state.unitPrice),
            this.state.currency
          )}
          totalInitialValue={formatMoney(
            this.state.statistics.totalInitialValue,
            this.state.currency
          )}
          currentUnitValue={formatMoney(
            Number(this.state.unitPrice) + 20,
            this.state.currency
          )}
          totalCurrentValue={formatMoney(
            this.state.statistics.totalCurrentValue,
            this.state.currency
          )}
          unitYield={formatMoney(
            Number(this.state.unitPrice) + 20 - Number(this.state.unitPrice),
            this.state.currency
          )}
          totalYield={formatMoney(
            this.state.statistics.totalYield,
            this.state.currency
          )}
          totalYieldPercentage={this.state.statistics.totalYieldPercentage}
          yieldPercentagePerYear={this.state.statistics.yieldPercentagePerYear}
          yieldPercentagePerMonth={
            this.state.statistics.yieldPercentagePerMonth
          }
        />
        <hr />
        <YieldComparisonTable
          loading={this.state.loading}
          totalCurrentValue={formatMoney(
            this.state.statistics.totalCurrentValue,
            this.state.currency
          )}
          totalYieldPercentage={this.state.statistics.totalYieldPercentage}
          yieldPercentagePerYear={this.state.statistics.yieldPercentagePerYear}
          yieldPercentagePerMonth={
            this.state.statistics.yieldPercentagePerMonth
          }
          totalValueCorrectedBySavingsBrazil={formatMoney(
            this.state.statistics.totalValueCorrectedBySavingsBrazil,
            this.state.currency
          )}
          totalYieldPercentageSavingsBrazil={
            this.state.statistics.totalYieldPercentageSavingsBrazil
          }
          differenceThisAndSavings={(
            this.state.statistics.totalYieldPercentageSavingsBrazil -
            this.state.statistics.totalYieldPercentage
          ).toFixed(3)}
          totalValueCorrectedByIPCA={formatMoney(
            this.state.statistics.totalValueCorrectedByIPCA,
            this.state.currency
          )}
          totalYieldPercentageIPCA={
            this.state.statistics.totalYieldPercentageIPCA
          }
          differenceThisAndIPCA={(
            this.state.statistics.totalYieldPercentageIPCA -
            this.state.statistics.totalYieldPercentage
          ).toFixed(3)}
        />
      </div>
    );
  }
}

export default DetailedAsset;
