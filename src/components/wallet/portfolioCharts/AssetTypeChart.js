import React from "react";
import Chart from "chart.js/auto";

// import convertCurrency from "../../../scripts/convertCurrency";

class AssetTypeChart extends React.Component {
  state = {
    chartLabels: [], // x axis
    chartData: [], // y axis
    graph: null,
  };

  componentDidMount = () => {
    this.getGraphInformation();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.chartLabels !== this.state.chartLabels) {
      this.renderGraph();
    }
  };

  getGraphInformation = () => {
    let labelArr = [];
    let dataArr = [];
    this.props.assetList.map((assetObj) => {
      if (assetObj.username === this.props.username) {
        if (!labelArr.includes(assetObj.assetType)) {
          labelArr.push(assetObj.assetType);
          dataArr.push(assetObj.quantity * Number(assetObj.unitPrice));
          // dataArr.push(
          //   convertCurrency(
          //     assetObj.currency,
          //     this.props.currency,
          //     assetObj.quantity * Number(assetObj.unitPrice)
          //   )
          // );
        } else {
          let currentIndex = labelArr.indexOf(assetObj.assetType);
          dataArr[currentIndex] +=
            assetObj.quantity * Number(assetObj.unitPrice);
          // dataArr[currentIndex] += convertCurrency(
          //   assetObj.currency,
          //   this.props.currency,
          //   assetObj.quantity * Number(assetObj.unitPrice)
          // );
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
          Asset Type Composition ({this.props.currency})
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
