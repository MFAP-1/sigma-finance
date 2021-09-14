import React from "react";
import Chart from "chart.js/auto";
import axios from "axios";

import formatDate from "../../../scripts/formatDate";

class PortfolioHistory extends React.Component {
  state = {
    currency: null,
    chartLabels: [], // x axis
    chartData: [], // y axis
    graph: null,
  };

  componentDidMount = async () => {
    try {
      await this.getCurrencyData();
    } catch (err) {
      console.error(err);
    }
    this.setState({ currency: this.props.currency });
    this.getGraphInformation();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.chartLabels !== this.state.chartLabels) {
      this.renderGraph();
    }
  };

  getCurrencyData = async () => {
    const url =
      "http://api.exchangeratesapi.io/v1/latest?access_key=ac8ab16193cf913bd7bbf4e56ef3f6c2";
    const response = await axios.get(url);
    const currenciesObj = { ...response.data["rates"] };
    const usd_brl = currenciesObj["BRL"] / currenciesObj["USD"];
    const usd_eur = currenciesObj["EUR"] / currenciesObj["USD"];
    const brl_usd = currenciesObj["USD"] / currenciesObj["BRL"];
    const brl_eur = currenciesObj["EUR"] / currenciesObj["BRL"];
    const eur_usd = currenciesObj["USD"] / currenciesObj["EUR"];
    const eur_brl = currenciesObj["BRL"] / currenciesObj["EUR"];
    this.setState({
      usd_brl: usd_brl,
      usd_eur: usd_eur,
      brl_usd: brl_usd,
      brl_eur: brl_eur,
      eur_usd: eur_usd,
      eur_brl: eur_brl,
    });
  };

  genericCurrencyConverter = (
    valueToConvert,
    currentCurrency,
    targetCurrency
  ) => {
    if (targetCurrency === "USD" || targetCurrency === "") {
      if (currentCurrency === "BRL") {
        return valueToConvert * this.state.brl_usd;
      } else if (currentCurrency === "EUR") {
        return valueToConvert * this.state.eur_usd;
      } else {
        return valueToConvert; //case where its already dolar
      }
    } else if (targetCurrency === "BRL") {
      if (currentCurrency === "USD") {
        return valueToConvert * this.state.usd_brl;
      } else if (currentCurrency === "EUR") {
        return valueToConvert * this.state.eur_brl;
      } else {
        return valueToConvert; //case where its already brl
      }
    } else if (targetCurrency === "EUR") {
      if (currentCurrency === "USD") {
        return valueToConvert * this.state.usd_eur;
      } else if (currentCurrency === "BRL") {
        return valueToConvert * this.state.brl_eur;
      } else {
        return valueToConvert; //case where its already eur
      }
    }
  };

  getGraphInformation = () => {
    let labelArr = [];
    let dataArr = [0]; // 0 fixed for the first entry
    let cloneArr = [...this.props.assetList];
    cloneArr.sort((a, b) => {
      let aDate = new Date(a.dateBought);
      let bDate = new Date(b.dateBought);
      return aDate.getTime() - bDate.getTime();
    });
    cloneArr.map((assetObj) => {
      if (assetObj.username === this.props.username) {
        // adding the 0 for the first entry
        if (labelArr.length === 0) {
          labelArr.push(formatDate(assetObj.dateBought));
        }
        labelArr.push(formatDate(assetObj.dateBought));
        let currentIndex = labelArr.length - 1;
        let currentValue = this.genericCurrencyConverter(
          assetObj.quantity * Number(assetObj.unitPrice),
          assetObj.currency,
          this.props.currency
        );
        if (currentIndex >= 1) {
          dataArr.push(dataArr[currentIndex - 1] + currentValue);
        } else {
          dataArr.push(currentValue);
        }
      }
      return assetObj;
    });
    this.setState({
      chartLabels: [...labelArr],
      chartData: [...dataArr],
    });
  };

  renderGraph = () => {
    if (this.state.graph) {
      this.state.graph.destroy();
    }
    let context = document
      .getElementById("canvas-PortfolioHistory")
      .getContext("2d");
    const assetChart = new Chart(context, {
      type: "line",
      data: {
        labels: [...this.state.chartLabels],
        datasets: [
          {
            label: "Portfolio total value",
            borderColor: "rgb(170, 108, 57)",
            fill: true,
            data: [...this.state.chartData],
          },
        ],
        hoverOffset: 4,
      },
    });
    this.setState({ graph: assetChart });
  };

  render() {
    // console.log("renderizou o gráfico"); // ---------------------DEBUGGER
    return (
      <div
        className="center-object"
        style={{ flexDirection: "column", alignItems: "center" }}
      >
        <h3 style={{ width: "25rem", padding: "1rem" }}>
          Portfolio History ({this.props.currency ? this.props.currency : "USD"}
          )
        </h3>
        <div
          className="center-object"
          style={{ width: "40vw", paddingBottom: "10rem" }}
        >
          <canvas
            id="canvas-PortfolioHistory"
            style={{ border: "1px solid black" }}
          ></canvas>
        </div>
      </div>
    );
  }
}

export default PortfolioHistory;
