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
    // from our core API
    assetType: "",
    currency: "",
    investmentIndicator: "",
    assetName: "",
    assetSymbol: "",
    quantity: 0,
    unitPrice: 0,
    dateBought: "",
    additionalComments: "",
    manualUpdatedUnitPrice: 0,
    dateManualUpdate: "",
    // from external API
    currentUnitPrice: 0,
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

  // Core method. Loads all of this Component's state
  componentDidMount = async () => {
    // Get the asset's information from our API by its ID
    try {
      const response = await axios.get(
        `https://ironrest.herokuapp.com/sigmaFinanceAssets/${this.props.match.params.assetId}`
      );
      this.setState({ ...response.data });
    } catch (err) {
      console.error(err);
    }

    // Get asset's current unit price from external API (TYPE = Stock)
    if (this.state.assetType === "Stock") {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.state.assetSymbol}&apikey=R2P4F9RG0EKKWZEU`
        );
        this.setState({
          currentUnitPrice: response.data["Global Quote"]["08. previous close"],
        });
      } catch (err) {
        console.error(err);
      }

      // Get asset's current unit price from external API (TYPE = Crypto)
    } else if (this.state.assetType === "Crypto") {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${this.state.assetSymbol}&to_currency=${this.state.currency}&apikey=R2P4F9RG0EKKWZEU`
        );
        this.setState({
          currentUnitPrice:
            response.data["Realtime Currency Exchange Rate"][
              "5. Exchange Rate"
            ],
        });
      } catch (err) {
        console.error(err);
      }

      // Get asset's current unit price from external API (TYPE = Savings account)
    } else if (this.state.assetType === "Savings account") {
      const totalInitialValue =
        Number(this.state.unitPrice) * this.state.quantity;
      const totalValueCorrectedBySelic = await selicCalculator(
        this.state.dateBought,
        getTodayDate(),
        totalInitialValue
      );
      const totalValueCorrectedBySavingsBrazil =
        totalInitialValue +
        (totalValueCorrectedBySelic - totalInitialValue) * 0.7;
      this.setState({
        currentUnitPrice: totalValueCorrectedBySavingsBrazil,
      });

      // Get asset's current unit price from  our API (TYPE = Stock Fund or ETF or Other or Bond)
    } else if (
      this.state.assetType === "Stock Fund" ||
      this.state.assetType === "ETF" ||
      this.state.assetType === "Other" ||
      this.state.assetType === "Bond"
    ) {
      if (this.state.manualUpdatedUnitPrice !== 0) {
        this.setState({
          currentUnitPrice: this.state.manualUpdatedUnitPrice,
        });
      } else {
        alert("Sorry. You need to manually update this asset at least once.");
        this.props.history.push(
          `/wallet/manualupdate/${this.props.match.params.assetId}`
        );
      }
      // Get asset's current unit price (fallback for undeterminated types)
    } else {
      this.setState({
        currentUnitPrice: Number(this.state.unitPrice) + 20, // + 20 is a fallback/debugger
      });
    }
  };

  //
  componentDidUpdate = (prevProps, prevStats) => {
    if (
      prevStats.assetName !== this.state.assetName ||
      prevStats.currentUnitPrice !== this.state.currentUnitPrice
    ) {
      this.runInvestmentStatistic();
    }
  };

  // core method to run all the statistics calculations
  runInvestmentStatistic = async () => {
    this.setState({ loading: true });
    const totalInitialValue = this.state.unitPrice * this.state.quantity;
    const totalCurrentValue =
      Number(this.state.currentUnitPrice) * Number(this.state.quantity);
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
    console.log("total current value", this.state.totalCurrentValue);
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
            Number(this.state.currentUnitPrice),
            this.state.currency
          )}
          totalCurrentValue={formatMoney(
            this.state.statistics.totalCurrentValue,
            this.state.currency
          )}
          unitYield={formatMoney(
            Number(this.state.currentUnitPrice) - Number(this.state.unitPrice),
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
            this.state.statistics.totalYieldPercentage -
            this.state.statistics.totalYieldPercentageSavingsBrazil
          ).toFixed(3)}
          totalValueCorrectedByIPCA={formatMoney(
            this.state.statistics.totalValueCorrectedByIPCA,
            this.state.currency
          )}
          totalYieldPercentageIPCA={
            this.state.statistics.totalYieldPercentageIPCA
          }
          differenceThisAndIPCA={(
            this.state.statistics.totalYieldPercentage -
            this.state.statistics.totalYieldPercentageIPCA
          ).toFixed(3)}
        />
      </div>
    );
  }
}

export default DetailedAsset;
