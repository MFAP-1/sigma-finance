import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./wallet.css";

class Wallet extends React.Component {
  state = {
    assetList: [],
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get(
        "https://ironrest.herokuapp.com/sigmaFinanceAssets"
      );
      this.setState({ assetList: [...response.data] });
      // console.log(respose.data);
    } catch (err) {
      console.error(err);
    }
  };

  renderAssetList = () => {
    let portfolioTotalValue = 0;
    return (
      <table id="portfolio-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Asset Name</th>
            <th>Asset Symbol</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Value</th>
            <th>Date bought</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.assetList.map((assetObj) => {
            if (assetObj.username === this.props.username) {
              portfolioTotalValue += assetObj.quantity * assetObj.unitPrice;
              return (
                <tr key={assetObj._id}>
                  <td>x</td>
                  <td>{assetObj.assetName}</td>
                  <td>{assetObj.assetSymbol}</td>
                  <td>{assetObj.quantity}</td>
                  <td>{assetObj.unitPrice}</td>
                  <td>{assetObj.quantity * assetObj.unitPrice}</td>
                  <td>{assetObj.dateBought}</td>
                  <td>x</td>
                </tr>
              );
            }
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5">Total</td>
            <td>$ {portfolioTotalValue}</td>
          </tr>
        </tfoot>
      </table>
    );
  };

  render() {
    console.log("username na wallet", this.props.username);
    return (
      <div>
        <div className="center-content">
          <h1>Welcome to your wallet {this.props.username}</h1>
          <h3>What is up for today?</h3>
          <Link to="/wallet/add">
            <p>Add asset</p>
          </Link>
          <Link to="/wallet/update">
            <p>Update asset</p>
          </Link>
          <Link to="/wallet/delete">
            <p>Delete asset</p>
          </Link>
          <h3>This is your protfolio:</h3>
          <div>{this.renderAssetList()}</div>
        </div>
      </div>
    );
  }
}

export default Wallet;
