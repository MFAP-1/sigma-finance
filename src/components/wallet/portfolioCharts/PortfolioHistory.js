import React from "react";
import Chart from "chart.js/auto";

// import convertCurrency from "../../../scripts/convertCurrency";
import formatDate from "../../../scripts/formatDate";

class PortfolioHistory extends React.Component {
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
    let cloneArr = [...this.props.assetList];
    cloneArr.sort((a, b) => {
      let aDate = new Date(a.dateBought);
      let bDate = new Date(b.dateBought);
      return aDate.getTime() - bDate.getTime();
    });
    cloneArr.map((assetObj) => {
      if (assetObj.username === this.props.username) {
        labelArr.push(formatDate(assetObj.dateBought));
        let currentIndex = labelArr.length - 1;
        if (currentIndex >= 1) {
          dataArr.push(
            dataArr[currentIndex - 1] +
              assetObj.quantity * Number(assetObj.unitPrice)
          );
        } else {
          dataArr.push(assetObj.quantity * Number(assetObj.unitPrice));
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
    let context = document.getElementById("canvas-AssetType").getContext("2d");
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
          Portfolio History ({this.props.currency})
        </h3>
        <div
          className="center-object"
          style={{ width: "40vw", paddingBottom: "10rem" }}
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

export default PortfolioHistory;
