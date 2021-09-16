import React from "react";

import "../CurrencyConverterPage.css";

import ipcaCalculator from "../../../scripts/ipcaCalculator";
import selicCalculator from "../../../scripts/selicCalculator.js";
import getTodayDate from "../../../scripts/getTodayDate";
import formatMoney from "../../../scripts/formatMoney";
import LoadingAnimationLinear from "../../loading/LoadingAnimationLinear";

class Correction extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
      fromDate: "",
      toDate: "",
      finalAmount: 0,
      correctionType: "IPCA",
      loading: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
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
        return null;
      }
    }
    let formatedResult = result.toFixed(2);
    this.setState({
      finalAmount: formatedResult,
    });
    this.setState({ loading: false });
    // console.log(this.state.finalAmount);
    // console.log(this.state.fromDate);
  };

  //DATE FORMAT: YYYY-MM-DD 2020-01-29
  render() {
    return (
      <div className="converter-form-box">
        <div>
          <h2>Monetary Correction</h2>
          <p>
            <br />
            Input the value that you want to correct.
            <br />
            Input the target correction index.
            <br />
            Then, set the time-frame.
          </p>
        </div>
        <form className="converter-form" onSubmit={this.handleSubmit}>
          <div className="converter-form-couple-div">
            <div>
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                min="0"
                step="0.01"
                value={this.state.amount}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Index</label>
              <select name="correctionType" onChange={this.handleChange}>
                <option>IPCA</option>
                <option>Selic</option>
              </select>
            </div>
          </div>
          <div className="converter-form-couple-div">
            <div>
              <label>From</label>
              <input
                type="date"
                name="fromDate"
                max={getTodayDate()}
                // value= {this.state.fromDate}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <label>To</label>
              <input
                type="date"
                name="toDate"
                max={getTodayDate()}
                // value= {this.state.toDate}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <button>Correction: using {this.state.correctionType}</button>
          {this.state.loading ? (
            <div className="center-object">
              <LoadingAnimationLinear color={"black"} />
            </div>
          ) : (
            <h2>{formatMoney(Number(this.state.finalAmount), "BRL")}</h2>
          )}
        </form>
      </div>
    );
  }
}

export default Correction;
