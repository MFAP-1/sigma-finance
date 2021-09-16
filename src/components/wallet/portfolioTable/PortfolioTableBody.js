import React from "react";
import { Link } from "react-router-dom";

import formatMoney from "../../../scripts/formatMoney";
import formatDate from "../../../scripts/formatDate";

function PortfolioTableBody(props) {
  let totalValueUSD = 0;
  let totalValueBRL = 0;
  let totalValueEUR = 0;
  let itemNumber = 1;
  return (
    <tbody>
      {props.assetList.map((assetObj) => {
        if (assetObj.username === props.username) {
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
              <td>{assetObj.assetType}</td>
              <td>{assetObj.assetName}</td>
              <td>{assetObj.assetSymbol}</td>
              <td>
                {formatMoney(Number(assetObj.unitPrice), assetObj.currency)}
              </td>
              <td>{assetObj.quantity}</td>
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
                  <span className="tooltiptext">Detail asset</span>
                </td>
              </Link>
              <Link
                to={`/wallet/edit/${assetObj._id}`}
                className="no-link-decoration-black"
              >
                <td style={{ width: "25px" }} className="tooltip">
                  <i className="fas fa-pen"></i>
                  <span className="tooltiptext">Edit asset</span>
                </td>
              </Link>
              <Link
                to={`/wallet/manualupdate/${assetObj._id}`}
                className="no-link-decoration-black"
              >
                <td style={{ width: "25px" }} className="tooltip">
                  <i className="fas fa-hand-paper"></i>
                  <span className="tooltiptext">Manual update</span>
                </td>
              </Link>
              <Link
                to={`/wallet/delete/${assetObj._id}`}
                className="no-link-decoration-black"
              >
                <td style={{ width: "25px" }} className="tooltip">
                  <i className="fas fa-trash"></i>
                  <span className="tooltiptext">Delete asset</span>
                </td>
              </Link>
            </tr>
          );
        } else {
          return null;
        }
      })}
      <tr key="add new asset btn">
        <td colSpan="9">
          <Link to="/wallet/add">
            <button style={{ width: "100%" }}>Add new asset</button>
          </Link>
        </td>
      </tr>
      {totalValueUSD !== 0 ? (
        <tr key="total-Value-in-USD">
          <td colSpan="6" style={{ textAlign: "right" }}>
            Portfolio value for USD assets:
          </td>
          <td>{formatMoney(totalValueUSD, "USD")}</td>
          <td colSpan="2"></td>
        </tr>
      ) : null}
      {totalValueBRL !== 0 ? (
        <tr key="total-Value-in-BRL">
          <td colSpan="6" style={{ textAlign: "right" }}>
            Portfolio value for BRL assets:
          </td>
          <td>{formatMoney(totalValueBRL, "BRL")}</td>
          <td colSpan="2"></td>
        </tr>
      ) : null}
      {totalValueEUR !== 0 ? (
        <tr key="total-Value-in-EUR">
          <td colSpan="6" style={{ textAlign: "right" }}>
            Portfolio value for EUR assets:
          </td>
          <td>{formatMoney(totalValueEUR, "EUR")}</td>
          <td colSpan="2"></td>
        </tr>
      ) : null}
      {totalValueEUR !== 0 || totalValueBRL !== 0 || totalValueUSD !== 0
        ? props.updateSubtotals(totalValueUSD, totalValueBRL, totalValueEUR)
        : null}
    </tbody>
  );
}

export default PortfolioTableBody;
