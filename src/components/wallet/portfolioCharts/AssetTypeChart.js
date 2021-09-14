import React from "react";
import Chart from "chart.js/auto";
import axios from "axios";

class AssetTypeChart extends React.Component {
  state = {
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
    // const currenciesArr = [...Object.keys(currenciesObj)];
    const usd_brl = currenciesObj["BRL"] / currenciesObj["USD"];
    const usd_eur = currenciesObj["EUR"] / currenciesObj["USD"];
    const brl_usd = currenciesObj["USD"] / currenciesObj["BRL"];
    const brl_eur = currenciesObj["EUR"] / currenciesObj["BRL"];
    const eur_usd = currenciesObj["USD"] / currenciesObj["EUR"];
    const eur_brl = currenciesObj["BRL"] / currenciesObj["EUR"];
    this.setState({
      // currenciesInformation: { ...currenciesObj }, // ---------------------NOT USED
      // currenciesList: [...currenciesArr], // ---------------------NOT USED
      usd_brl: usd_brl,
      usd_eur: usd_eur,
      brl_usd: brl_usd,
      brl_eur: brl_eur,
      eur_usd: eur_usd,
      eur_brl: eur_brl,
    });
    // console.log(usd_brl); // ---------------------DEBUGGER
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
    // console.log("entrou no get graph info"); // ---------------------DEBUGGER
    let labelArr = [];
    let dataArr = [];
    this.props.assetList.map((assetObj) => {
      if (assetObj.username === this.props.username) {
        if (!labelArr.includes(assetObj.assetType)) {
          labelArr.push(assetObj.assetType);
          // dataArr.push(assetObj.quantity * Number(assetObj.unitPrice)); // ---------------------DEBUGGER (No convertion)
          dataArr.push(
            this.genericCurrencyConverter(
              assetObj.quantity * Number(assetObj.unitPrice),
              assetObj.currency,
              this.props.currency
            )
          );
        } else {
          let currentIndex = labelArr.indexOf(assetObj.assetType);
          // dataArr[currentIndex] += // ---------------------DEBUGGER (No convertion)
          //   assetObj.quantity * Number(assetObj.unitPrice);
          dataArr[currentIndex] += this.genericCurrencyConverter(
            assetObj.quantity * Number(assetObj.unitPrice),
            assetObj.currency,
            this.props.currency
          );
        }
        return assetObj;
      }
      return <></>;
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
    let context = document.getElementById("canvas-AssetType").getContext("2d");
    const assetChart = new Chart(context, {
      type: "doughnut",
      data: {
        labels: [...this.state.chartLabels],
        datasets: [
          {
            label: "Asset Type Composition",
            borderColor: "rgb(170, 108, 57)",
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(255, 209, 170)",
              "rgb(0, 0, 0)",
              "rgb(50, 50, 50)",
              "rgb(255, 255, 255)",
            ],
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
          Asset Type Composition (
          {this.props.currency ? this.props.currency : "USD"})
        </h3>
        <div
          className="center-object"
          style={{ width: "25vw", paddingBottom: "10rem" }}
        >
          <canvas
            id="canvas-AssetType"
            style={{ border: "1px solid black" }}
          ></canvas>
        </div>
      </div>
    );
  }
}

export default AssetTypeChart;
