import React from "react";
import "./correction.css";

import ipcaCalculator from "../../../scripts/ipcaCalculator";
import selicCalculator from "../../../scripts/selicCalculator.js";
import getTodayDate from "../../../scripts/getTodayDate";

class Correction extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
      fromDate: "",
      toDate: "",
      finalAmount: 0,
      correctionType: "IPCA",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    let result;
    if (this.state.correctionType === "IPCA") {
      result = await ipcaCalculator(
        this.state.fromDate,
        this.state.toDate,
        this.state.amount
      );

      if (result === undefined) {
        this.setState({
          fromDate: "",
          toDate: ",",
        });
        return;
      }
    } else if (this.state.correctionType === "Selic") {
      result = await selicCalculator(
        this.state.fromDate,
        this.state.toDate,
        this.state.amount
      );
      if (
        result === undefined ||
        (this.state.fromDate === "" && this.state.toDate === "")
      ) {
        this.setState({
          finalAmount: 0,
        });
        return;
      }
    }
    let formatedResult = result.toFixed(2);
    this.setState({
      finalAmount: formatedResult,
    });
    console.log(this.state.finalAmount);
    console.log(this.state.fromDate);
  };

  //DATE FORMAT: YYYY-MM-DD 2020-01-29
  render() {
    return (
      <div>
        <h1 className="title-page">Monetary Correction</h1>

        <div className="ipca-form">
          <select
            name="correctionType"
            className="select-correction"
            onChange={this.handleChange}
          >
            <option>IPCA</option>
            <option>Selic</option>
          </select>

          <label>Amount:</label>
          <input
            type="number"
            className="amount-input"
            name="amount"
            onChange={this.handleChange}
          />

          <label>From date:</label>
          <input
            type="date"
            name="fromDate"
            max={getTodayDate()}
            // value= {this.state.fromDate}
            className="date-input"
            onChange={this.handleChange}
          />

          <label>To date:</label>
          <input
            type="date"
            name="toDate"
            max={getTodayDate()}
            // value= {this.state.toDate}
            className="date-input"
            onChange={this.handleChange}
          />

          <button onClick={this.handleSubmit}>Correct</button>

          <h2>R$ {this.state.finalAmount}</h2>
        </div>
      </div>
    );
  }
}

export default Correction;
