import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./wallet.css";

import formatMoney from "../../scripts/formatMoney";
import formatDate from "../../scripts/formatDate";

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
    } catch (err) {
      console.error(err);
    }
  };

  renderAssetList = () => {
    let totalValueUSD = 0;
    let totalValueBRL = 0;
    let totalValueEUR = 0;
    let itemNumber = 1;
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
            <th colSpan="3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.assetList.map((assetObj) => {
            if (assetObj.username === this.props.username) {
              let currentValue = assetObj.quantity * assetObj.unitPrice;
              switch (assetObj.currency) {
                case "USD":
                  totalValueUSD += currentValue;
                  break;
                case "BRL":
                  totalValueBRL += currentValue;

                  break;
                case "EUR":
                  totalValueEUR += currentValue;
                  break;
                default:
                  console.log("erro");
              }
              return (
                <tr key={assetObj._id}>
                  <td>{itemNumber++}</td>
                  <td>{assetObj.assetName}</td>
                  <td>{assetObj.assetSymbol}</td>
                  <td>{assetObj.quantity}</td>
                  <td>
                    {formatMoney(Number(assetObj.unitPrice), assetObj.currency)}
                  </td>
                  <td>
                    {formatMoney(
                      assetObj.quantity * assetObj.unitPrice,
                      assetObj.currency
                    )}
                  </td>
                  <td>{formatDate(assetObj.dateBought, assetObj.currency)}</td>
                  <Link
                    to={`/wallet/details/${assetObj._id}`}
                    className="no-link-decoration-black"
                  >
                    <td style={{ width: "25px" }} className="tooltip">
                      <i className="fas fa-info"></i>
                      <span class="tooltiptext">Detail asset</span>
                    </td>
                  </Link>
                  <Link
                    to={`/wallet/update/${assetObj._id}`}
                    className="no-link-decoration-black"
                  >
                    <td style={{ width: "25px" }} className="tooltip">
                      <i className="fas fa-pen"></i>
                      <span class="tooltiptext">Edit asset</span>
                    </td>
                  </Link>
                  <Link
                    to={`/wallet/manualupdate/${assetObj._id}`}
                    className="no-link-decoration-black"
                  >
                    <td style={{ width: "25px" }} className="tooltip">
                      <i class="fas fa-hand-paper"></i>
                      <span class="tooltiptext">Manual update</span>
                    </td>
                  </Link>
                  <Link
                    to={`/wallet/delete/${assetObj._id}`}
                    className="no-link-decoration-black"
                  >
                    <td style={{ width: "25px" }} className="tooltip">
                      <i className="fas fa-trash"></i>
                      <span class="tooltiptext">Delete asset</span>
                    </td>
                  </Link>
                </tr>
              );
            } else {
              return <></>;
            }
          })}
          <tr key="add new asset btn">
            <td colSpan="8">
              <Link to="/wallet/add" className="no-link-decoration">
                <button style={{ width: "100%" }}>Add new asset</button>
              </Link>
            </td>
          </tr>
        </tbody>
        <tfoot>
          {totalValueUSD !== 0 ? (
            <tr key="total Value in USD">
              <td colSpan="5" style={{ textAlign: "right" }}>
                Portfolio value in USD:
              </td>
              <td>{formatMoney(totalValueUSD, "USD")}</td>
              <td colSpan="2"></td>
            </tr>
          ) : (
            ""
          )}
          {totalValueBRL !== 0 ? (
            <tr key="total Value in BRL">
              <td colSpan="5" style={{ textAlign: "right" }}>
                Portfolio value in BRL:
              </td>
              <td>{formatMoney(totalValueBRL, "BRL")}</td>
              <td colSpan="2"></td>
            </tr>
          ) : (
            ""
          )}
          {totalValueEUR !== 0 ? (
            <tr key="total Value in EUR">
              <td colSpan="5" style={{ textAlign: "right" }}>
                Portfolio value in EUR:
              </td>
              <td>{formatMoney(totalValueEUR, "EUR")}</td>
              <td colSpan="2"></td>
            </tr>
          ) : (
            ""
          )}
        </tfoot>
      </table>
    );
  };

  renderOnlineWallet = () => {
    return (
      <div>
        <div className="center-content">
          <h1>Welcome to your wallet {this.props.username}</h1>
          <h3>This is your summarized protfolio:</h3>
          <div id="portfolio-table-div">{this.renderAssetList()}</div>
          <div>Add Pie Chart here</div>
        </div>
      </div>
    );
  };
  renderOfflineWallet = () => {
    return (
      <div className="center-content">
        To check your wallet, login at:
        <br />
        <Link to="/login" className="no-link-decoration-black">
          <button>Login</button>
        </Link>
      </div>
    );
  };

  render() {
    return this.props.loggedIn
      ? this.renderOnlineWallet()
      : this.renderOfflineWallet();
  }
}

export default Wallet;
